import { Button, message, Popconfirm } from "antd";
import React from "react";
import i18n from 'i18n';
import { queryService } from "services/query.service";

const DeleteLink = (props) => {

    const confirm = () => {
        const pathName = props.href + props.cellData;
        const urlParams = { method: "DELETE" };
        queryService.executeLink(pathName, urlParams).then(result => {
            message.success(result);
            props.gridRefresh();
        }).catch(err => {
            message.error(err.Errors);
        });
    }

    return (
        <Popconfirm title="Are you sure to delete this task?" onConfirm={confirm}>
            <Button size="small" danger type="link">{i18n.t(props.title)}</Button>
        </Popconfirm>
    );
}

export default DeleteLink;