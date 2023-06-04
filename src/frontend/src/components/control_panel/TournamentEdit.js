import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Form, Row, Col, Button, message, InputNumber, Select } from 'antd';
import i18n from 'i18n';
import { compose } from 'redux'
import { withTranslation } from 'react-i18next';
import { baseActions } from 'store/actions/base.actions';
import { tournamentService } from 'services/tournament.services';


const formItemLayout = {
    labelCol: { sm: { span: 24 }, md: { span: 8 } },
    wrapperCol: { sm: { span: 24 }, md: { span: 16 } }
};

const TournamentEdit = (props) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        props.setLoading(true);
        tournamentService.save(values).then(result => {
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


    useEffect(() => {
        if (props.id) {
            props.setLoading(true);
            tournamentService.getById(props.id).then(result => {
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

    return (
        <Form {...formItemLayout} form={form} onFinish={onFinish} scrollToFirstError onFinishFailed={onFinishFailed} autoComplete="off" >
            <Form.Item name="id" noStyle />
            <Row>
                <Col xs={24} sm={24} lg={12}>
                    <Form.Item name="year" label={i18n.t("year")} rules={[{ required: true, },]}  >
                        <InputNumber placeholder={i18n.t("year")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={12}>
                    <Form.Item name="maxPlayerCount" label={i18n.t("maxPlayerCount")} rules={[{ required: true, },]}  >
                        <InputNumber placeholder={i18n.t("maxPlayerCount")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={12}>
                    <Form.Item name="typeValue" label={i18n.t("type")} rules={[{ required: true, },]}  >
                        <Select placeholder={i18n.t("type")} >
                            <Select.Option value="FOOTBALL">{i18n.t("FOOTBALL")}</Select.Option>
                            <Select.Option value="BASKETBALL">{i18n.t("BASKETBALL")}</Select.Option>
                            <Select.Option value="VOLLEYBALL">{i18n.t("VOLLEYBALL")}</Select.Option>
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

export default compose(withTranslation(), connect(null, mapDispatchToProps))(TournamentEdit);
