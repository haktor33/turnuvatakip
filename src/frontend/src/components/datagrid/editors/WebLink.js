import { Button, message } from "antd";
import React from "react";
import i18n from '../../../i18n';
import { queryService } from "../../../services/query.service";

const WebLink = (props) => {

    const onClick = () => {
        const pathName = props.href + props.cellData;
        queryService.executeLink(pathName).then(result => {
            message.success(result);
        }).catch(err => {
            message.error(err.Errors);
        });
    }

    return <Button size="small" type="link" onClick={onClick}>{i18n.t(props.title)}</Button>;
}

export default WebLink;