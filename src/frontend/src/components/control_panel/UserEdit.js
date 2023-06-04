import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Form, Input, Row, Col, Button, message, InputNumber, Select } from 'antd';
import i18n from 'i18n';
import { compose } from 'redux'
import { withTranslation } from 'react-i18next';
import { baseActions } from 'store/actions/base.actions';
import { userService } from 'services/user.services';


const formItemLayout = {
    labelCol: { sm: { span: 24 }, md: { span: 8 } },
    wrapperCol: { sm: { span: 24 }, md: { span: 16 } }
};

const UserEdit = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (props.id) {
            props.setLoading(true);
            userService.getById(props.id).then(result => {
                form.setFieldsValue(result);
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
        userService.save(values).then(result => {
            message.success(i18n.t("procesessissuccessful"));
            form.setFieldsValue(result);
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
                <Col xs={24} sm={24} lg={12}>
                    <Form.Item name="fullName" label={i18n.t("fullName")} rules={[{ required: true, },]}  >
                        <Input placeholder={i18n.t("fullName")} />
                    </Form.Item>
                </Col>
                {/* <Col xs={24} sm={24} lg={12}>
                    <Form.Item name="email" label={i18n.t("email")} rules={[{ required: false, },]}  >
                        <Input placeholder={i18n.t("email")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={12}>
                    <Form.Item name="username" label={i18n.t("userName")} rules={[{ required: false, },]}  >
                        <Input placeholder={i18n.t("userName")} />
                    </Form.Item>
                </Col> */}
                <Col xs={24} sm={24} lg={12}>
                    <Form.Item name="age" label={i18n.t("age")} rules={[{ required: true, },]}  >
                        <InputNumber placeholder={i18n.t("age")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={12}>
                    <Form.Item name="role" label={i18n.t("role")} rules={[{ required: true, },]}  >
                        <Select placeholder={i18n.t("age")} >
                            <Select.Option value="ROLE_USER">{i18n.t("user")}</Select.Option>
                            <Select.Option value="ROLE_TEAMLEADER">{i18n.t("teamLeader")}</Select.Option>
                            <Select.Option value="ROLE_ADMIN">{i18n.t("admin")}</Select.Option>
                        </Select>
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

export default compose(withTranslation(), connect(null, mapDispatchToProps))(UserEdit);
