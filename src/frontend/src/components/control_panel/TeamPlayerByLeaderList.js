import React from "react";
import DataGrid from "components/datagrid/DataGrid";

const TeamPlayerByLeaderList = (props) => {

    const dataGridProps = {
        querName: "team/player/getOwnTeamPlayer",
        columnNameList: [
            { name: "teamName" },
            { name: "playerName" },
            { name: "playerNumber" },
            { name: "isMain", columnType: "Boolean" },
            { name: "id", title: "Asil Oyuncu Yap", columnType: "ConfirmLink", href: "team/player/updatePlayerStatus?status=true&playerId=" },
            { name: "id", title: "Yedek Oyuncu Yap", columnType: "ConfirmLink", href: "team/player/updatePlayerStatus?status=false&playerId=" }
        ],
    }

    return <DataGrid {...dataGridProps} />;
}

export default TeamPlayerByLeaderList;