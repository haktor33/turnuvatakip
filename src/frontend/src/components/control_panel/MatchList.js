import React from "react";
import DataGrid from "components/datagrid/DataGrid";

const MatchList = () => {

    const dataGridProps = {
        querName: "team/match/getAll",
        columnNameList: [
            { name: "team1", columnType: "ChildData", childName: "teamName" },
            { name: "team2", columnType: "ChildData", childName: "teamName" },
            { name: "score" },
            { name: "id", title: "delete", columnType: "DeleteLink", href: "team/match/delete/" },
        ],
    }

    return <DataGrid {...dataGridProps} />;
}

export default MatchList;