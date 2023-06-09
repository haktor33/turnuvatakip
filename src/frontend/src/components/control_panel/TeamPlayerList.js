import React from "react";
import DataGrid from "components/datagrid/DataGrid";
import Edit from "./TeamPlayerEdit";

const TeamPlayerList = (props) => {

    const dataGridProps = {
        querName: "team/player/getTeamPlayer",
        columnNameList: [
            { name: "teamName" },
            { name: "playerName" },
            { name: "playerNumber" },
        ],
    }

    if (props.isEditable) {
        dataGridProps.columnNameList.push({ name: "id", title: "infocard", columnType: "InfoCardLink", comp: Edit });
        dataGridProps.columnNameList.push({ name: "id", title: "delete", columnType: "DeleteLink", href: "team/player/delete/" });
        dataGridProps.newRecordComponent = Edit;
    }

    return <DataGrid {...dataGridProps} />;
}

export default TeamPlayerList;