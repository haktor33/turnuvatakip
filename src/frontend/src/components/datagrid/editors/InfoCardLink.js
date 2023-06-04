import React, { useState } from "react";
import { Button, Spin, Modal } from "antd";
import i18n from '../../../i18n';
import { connect } from "react-redux";
import { PlusSquareOutlined } from "@ant-design/icons";

const InfoCardLink = (props) => {
    const [state, setState] = useState({ modalVisible: false, componentKey: 0 });

    const showModal = () => {
        //const random = min + (Math.random() * (max - min));
        let { componentKey } = state;
        componentKey++;
        setState({ ...state, modalVisible: true, componentKey });
    };

    const handleCancel = () => {
        setState({ ...state, modalVisible: false });
    };

    const getButtonComp = () => {
        if (props.cellData) {
            return (
                <Button key={state.componentKey} size="small" type="link" onClick={showModal}>
                    {i18n.t(props.title)}
                </Button>
            );
        } else {
            return (
                <Button key={state.componentKey} icon={<PlusSquareOutlined />} type="primary" onClick={showModal}>
                    {i18n.t(props.title)}
                </Button>
            );
        }

    };

    const getModalContent = () => {
        if (props.comp) {
            const { cellData: id, gridRefresh, componentKey, ...otherProps } = props;
            const compProps = { id, gridRefresh, componentKey: state.componentKey, otherProps };
            return (
                <Modal key={state.componentKey} style={{ top: "50px" }} width="95%" title={i18n.t("infocard")} open={state.modalVisible} cancelButtonProps={{ hidden: true }} okButtonProps={{ hidden: true }} onCancel={handleCancel}>
                    <Spin spinning={props.loading}>
                        <props.comp {...compProps} />
                    </Spin>
                </Modal >
            );
        } else {
            return null;
        }
    };

    return (
        <div key={state.componentKey}>{getButtonComp()}{getModalContent()}</div>
    );
}

const stateCreators = state => {
    return { loading: state.base.loading };
}

export default connect(stateCreators)(InfoCardLink);