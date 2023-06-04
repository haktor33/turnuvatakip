import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Form, Input, Row, Col, Button, message, Select } from 'antd';
import i18n from 'i18n';
import { compose } from 'redux'
import { withTranslation } from 'react-i18next';
import { baseActions } from 'store/actions/base.actions';
import { userService } from 'services/user.services';
import { tournamentService } from 'services/tournament.services';
import { teamService } from 'services/team.services';


const formItemLayout = {
    labelCol: { sm: { span: 24 }, md: { span: 8 } },
    wrapperCol: { sm: { span: 24 }, md: { span: 16 } }
};

const TeamEdit = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({ userList: [], tournamentList: [] })

    const setFormFields = (result) => {
        const { tournament, teamLeader, ...others } = result;
        const model = { tournament: tournament.id, teamLeader: teamLeader.id, ...others };
        form.setFieldsValue(model);
    }

    useEffect(() => {
        if (!state.userList.length || !state.tournamentList.length) {
            loadModuleData();
        }
        if (props.id) {
            props.setLoading(true);
            teamService.getById(props.id).then(result => {
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

    const onFinish = async (values) => {
        props.setLoading(true);
        const params = {
            ...values,
            teamLeader: { id: values.teamLeader },
            tournament: { id: values.tournament }
        }
        teamService.save(params).then(result => {
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

    const loadModuleData = () => {
        props.setLoading(true);
        const promises = [userService.getAll(), tournamentService.getAll()];
        Promise.all(promises).then(result => {
            const userList = result[0].map(m => ({ id: m.id, label: m.fullName }));
            const tournamentList = result[1].map(m => ({ id: m.id, label: m.typeValue }));
            setState({ ...state, userList, tournamentList })
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

    return (
        <Form {...formItemLayout} form={form} onFinish={onFinish} scrollToFirstError onFinishFailed={onFinishFailed} autoComplete="off" >
            <Form.Item name="id" noStyle />
            <Row>
                <Col xs={24} sm={24} lg={24}>
                    <Form.Item name="tournament" label={i18n.t("tournament")} rules={[{ required: true, },]}  >
                        <Select placeholder={i18n.t("tournament")}>
                            {state.tournamentList.map(item => <Select.Option value={item.id}>{item.label}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <Form.Item name="teamLeader" label={i18n.t("teamLeader")} rules={[{ required: true, },]}  >
                        <Select placeholder={i18n.t("teamLeader")} >
                            {state.userList.map(item => <Select.Option value={item.id}>{item.label}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <Form.Item name="teamName" label={i18n.t("teamName")} rules={[{ required: true, },]}  >
                        <Input placeholder={i18n.t("teamName")} />
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

export default compose(withTranslation(), connect(null, mapDispatchToProps))(TeamEdit);
