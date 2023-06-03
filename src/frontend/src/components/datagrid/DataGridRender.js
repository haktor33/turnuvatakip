import React from "react";
import { Tag } from "antd";
import moment from "moment";
import { Sorter } from './DataGridProps';
import WebLink from "./editors/WebLink";
import ConfirmLink from "./editors/ConfirmLink";
import InfoCard from "./editors/InfoCardLink";
import DeleteLink from "./editors/DeleteLink";

export const columnRenderType = (props) => {
    const { columnType, cellData } = props;
    switch (columnType) {
        case "ChildData":
           return cellData[props.childName];
        case "Date":
            return cellData;
        case "Constant":
            return props.constant[cellData].title;
        case "Boolean":
            let val, color;
            if (cellData) {
                val = "Evet";
                color = "green";
            } else {
                val = "Hayır";
                color = "volcano";
            }
            return <Tag color={color} key={val}>{val}</Tag>
        case "TreeData":
            return cellData.map(m => <Tag color={"cyan"} key={m[props.treeDataColName]}>{m[props.treeDataColName]}</Tag>);
        case "DateTime":
            return moment(cellData).format("DD/MM/YYYY HH:mm");
        case "WebLink":
            return <WebLink {...props} />;
        case "InfoCardLink":
            return <InfoCard {...props} />;
        case "ConfirmLink":
            return <ConfirmLink {...props} />;
        case "DeleteLink":
            return <DeleteLink {...props} />;
        default:
            return cellData;
    }
}

export const sortType = (columnType) => {
    var sortType = {};
    switch (columnType) {
        case 'String':
            sortType = Sorter.DEFAULT;
            break;
        case 'Date':
            sortType = Sorter.DATE;
            break;
        default:
            sortType = Sorter.DEFAULT;
    }

    return { sorter: { compare: sortType } };
}