import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Form, Row, Col, Button, message, Select, InputNumber } from 'antd';
import i18n from 'i18n';
import { compose } from 'redux'
import { withTranslation } from 'react-i18next';
import { baseActions } from 'store/actions/base.actions';
import { userService } from 'services/user.services';
import { teamPlayerService } from 'services/player.services';
import { teamService } from 'services/team.services';


const formItemLayout = {
    labelCol: { sm: { span: 24 }, md: { span: 8 } },
    wrapperCol: { sm: { span: 24 }, md: { span: 16 } }
};

const TeamPlayerEdit = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({ userList: [], teamList: [] })

    const setFormFields = (result) => {
        const { team, player, ...others } = result;
        const model = { team: team.id, player: player.id, ...others };
        form.setFieldsValue(model);
    }

    useEffect(() => {
        if (!state.userList.length || !state.teamList.length) {
            loadModuleData();
        }
        if (props.id) {
            props.setLoading(true);
            teamPlayerService.getById(props.id).then(result => {
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
            player: { id: values.player },
            team: { id: values.team }
        }
        teamPlayerService.save(params).then(result => {
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
        const promises = [userService.getAll(), teamService.getAll()];
        Promise.all(promises).then(result => {
            const userList = result[0].map(m => ({ id: m.id, label: m.fullName }));
            const teamList = result[1].map(m => ({ id: m.id, label: m.teamName }));
            setState({ ...state, userList, teamList })
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
                    <Form.Item name="team" label={i18n.t("team")} rules={[{ required: true, },]}  >
                        <Select placeholder={i18n.t("team")}>
                            {state.teamList.map(item => <Select.Option value={item.id}>{item.label}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <Form.Item name="player" label={i18n.t("player")} rules={[{ required: true, },]}  >
                        <Select placeholder={i18n.t("player")} >
                            {state.userList.map(item => <Select.Option value={item.id}>{item.label}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={24}>
                    <Form.Item name="number" label={i18n.t("number")} rules={[{ required: true, },]}  >
                        <InputNumber placeholder={i18n.t("number")} />
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

export default compose(withTranslation(), connect(null, mapDispatchToProps))(TeamPlayerEdit);
