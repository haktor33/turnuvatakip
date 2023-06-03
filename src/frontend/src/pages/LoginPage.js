import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Checkbox, Form, Input } from 'antd';
import i18n from 'i18n';
import { withTranslation } from 'react-i18next';
import { authActions } from 'store/actions/auth.actions'

const LoginPage = (props) => {
    const search = useLocation().search;

    const onFinish = (values) => {
        const { username, password } = values;
        props.login(username, password);
        //props.login(username, sha256(password));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (props.loggedIn) {
            const redirectUrl = new URLSearchParams(search).get('redirectUrl');
            if (redirectUrl)
                window.location = redirectUrl;
            else
                window.location.href = "/";
        }
    }, [props.loggedIn])

    return (
        <Form
            labelCol={{ span: 8, }}
            wrapperCol={{ span: 16, }}
            style={{ maxWidth: 600, }}
            initialValues={{ remember: true, }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item label={i18n.t("userName")} name="username" rules={[{ required: true, message: 'Please input your username!', },]} >
                <Input />
            </Form.Item>

            <Form.Item label={i18n.t("password")} name="password" rules={[{ required: true, message: 'Please input your password!', },]}  >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16, }}>
                <Checkbox>{i18n.t("rememberMe")} </Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16, }}  >
                <Button type="primary" htmlType="submit">
                    {i18n.t("submit")}
                </Button>
            </Form.Item>
        </Form>
    );

}

const mapStateToProps = (state) => {
    const { loggingIn, loggedIn } = state.auth;
    return { loggingIn, loggedIn };
}

const mapDispatchToProps = {
    login: authActions.login,
    logout: authActions.logout,
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(LoginPage);
