import React from "react";
import DataGrid from "components/datagrid/DataGrid";

const ScoreBoardList = () => {

    const dataGridProps = {
        querName: "team/match/getScoreBoard",
        columnNameList: [
            { name: "team" },
            { name: "score" },
        ],
    }

    return <DataGrid {...dataGridProps} />;
}

export default ScoreBoardList;