import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Form, Input, Row, Col, Button, message, Select } from 'antd';
import i18n from 'i18n';
import { compose } from 'redux'
import { withTranslation } from 'react-i18next';
import { baseActions } from 'store/actions/base.actions';
import { matchService } from 'services/match.services';
import { teamService } from 'services/team.services';


const formItemLayout = {
    labelCol: { sm: { span: 24 }, md: { span: 8 } },
    wrapperCol: { sm: { span: 24 }, md: { span: 16 } }
};

const MatchEdit = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({ teamList: [] })

    const setFormFields = (result) => {
        const { team1, team2, ...others } = result;
        const model = { team1: team1.id, team2: team2.id, ...others };
        form.setFieldsValue(model);
    }

    useEffect(() => {
        if (!state.teamList.length) {
            loadTeamList();
        }
        if (props.id) {
            props.setLoading(true);
            matchService.getById(props.id).then(result => {
                setFormFields(result);
                props.setLoading(false);
            }).catch(err => {
                props.setLoading(false);
                if (err.i18n) {
                    message.error(i18n.t(err.i18n));
                } else {
                    message.error(err.message);
                }
            });
        } else {
            form.resetFields();
        }
    }, [props.id, props.componentKey]);

    const loadTeamList = () => {
        props.setLoading(true);
        teamService.getAll().then(result => {
            const teamList = result.map(m => ({ id: m.id, teamName: m.teamName }));
            setState({ ...state, teamList })
            props.setLoading(false);
        }).catch(err => {
            props.setLoading(false);
            if (err.i18n) {
                message.error(i18n.t(err.i18n));
            } else {
                message.error(err.message);
            }
        });
    }

    const onFinish = async (values) => {
        props.setLoading(true);
        const params = {
            ...values,
            team1: { id: values.team1 },
            team2: { id: values.team2 }
        }
        matchService.save(params).then(result => {
            message.success(i18n.t("procesessissuccessful"));
            setFormFields(result);
            props.setLoading(false);
            props.gridRefresh();
        }).catch(err => {
            props.setLoading(false);
            if (err.i18n) {
                message.error(i18n.t(err.i18n));
            } else {
                message.error(err.message);
            }
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form {...formItemLayout} form={form} onFinish={onFinish} scrollToFirstError onFinishFailed={onFinishFailed} autoComplete="off" >
            <Form.Item name="id" noStyle />
            <Row>
                <Col xs={24} sm={24} lg={24}>
                    <Form.Item name="team1" label={i18n.t("team1")} rules={[{ required: true, },]}  >
                        <Select placeholder={i18n.t("team1")}>
                            {state.teamList.map(item => <Select.Option value={item.id}>{item.teamName}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <Form.Item name="team2" label={i18n.t("team2")} rules={[{ required: true, },]}  >
                        <Select placeholder={i18n.t("team2")} >
                            {state.teamList.map(item => <Select.Option value={item.id}>{item.teamName}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <Form.Item name="score" label={i18n.t("score")} rules={[{ required: false, },]}  >
                        <Input placeholder={"0-0"} />
                    </Form.Item>
                </Col>

            </Row>
            <Row>
                <Col className='footer-button' xs={24} sm={24} lg={24}>
                    <Button type="primary" htmlType="submit">
                        {i18n.t("save")}
                    </Button>
                </Col>
            </Row>
        </Form >
    );
};

const mapDispatchToProps = { setLoading: baseActions.setLoading };

export default compose(withTranslation(), connect(null, mapDispatchToProps))(MatchEdit);
