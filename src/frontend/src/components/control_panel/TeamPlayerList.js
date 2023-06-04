import React from "react";
import DataGrid from "components/datagrid/DataGrid";

const TeamPlayerList = () => {

    const dataGridProps = {
        querName: "/team/player/getTeamPlayer",
        columnNameList: [
            { name: "teamName" },
            { name: "playerName" },
            { name: "playerNumber" },
        ],
    }

    return <DataGrid {...dataGridProps} />;
}

export default TeamPlayerList;