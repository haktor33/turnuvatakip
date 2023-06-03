import { Button, message, Popconfirm } from "antd";
import React from "react";
import i18n from '../../../i18n';
import { queryService } from "../../../services/query.service";

const ConfirmLink = (props) => {

    const confirm = () => {
        const pathName = props.href + props.cellData;
        queryService.executeLink(pathName).then(result => {
            message.success(result);
        }).catch(err => {
            message.error(err.Errors);
        });
    }

    return (
        <Popconfirm title="Are you sure?" onConfirm={confirm}>
            <Button size="small" type="link">{i18n.t(props.title)}</Button>
        </Popconfirm>
    );
}

export default ConfirmLink;