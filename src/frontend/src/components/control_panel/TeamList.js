import React from "react";
import DataGrid from "components/datagrid/DataGrid";
import Edit from "./TeamEdit";

const TeamList = (props) => {

    const dataGridProps = {
        querName: "team/getAll",
        columnNameList: [
            { name: "tournament", columnType: "ChildData", childName: "typeValue" },
            { name: "teamName" },
            { name: "teamLeader", columnType: "ChildData", childName: "fullName" },
        ],
    }

    if (props.isEditable) {
        dataGridProps.columnNameList.push({ name: "id", title: "infocard", columnType: "InfoCardLink", comp: Edit });
        dataGridProps.columnNameList.push({ name: "id", title: "delete", columnType: "DeleteLink", href: "team/delete/" });
        dataGridProps.newRecordComponent = Edit;
    }

    return <DataGrid {...dataGridProps} />;
}

export default TeamList;