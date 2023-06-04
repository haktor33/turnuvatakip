import React from "react";
import DataGrid from "components/datagrid/DataGrid";
import Edit from "./MatchEdit";

const MatchList = (props) => {

    const dataGridProps = {
        querName: "team/match/getAll",
        columnNameList: [
            { name: "team1", columnType: "ChildData", childName: "teamName" },
            { name: "team2", columnType: "ChildData", childName: "teamName" },
            { name: "score" },
        ],
    }
    
    if (props.isEditable) {
        dataGridProps.columnNameList.push({ name: "id", title: "infocard", columnType: "InfoCardLink", comp: Edit });
        dataGridProps.columnNameList.push({ name: "id", title: "delete", columnType: "DeleteLink", href: "team/match/delete/" });
        dataGridProps.newRecordComponent = Edit;
    }

    return <DataGrid {...dataGridProps} />;
}

export default MatchList;