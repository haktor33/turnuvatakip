import React, { useEffect } from "react";
import { Tabs, message } from 'antd';
import UserList from "components/control_panel/UserList";
import TournamentList from "components/control_panel/TournamentList";
import MatchList from "components/control_panel/MatchList";
import ScoreBoardList from "components/control_panel/ScoreBoardList";
import TeamList from "components/control_panel/TeamList";
import TeamPlayerList from "components/control_panel/TeamPlayerList";

const items = [
    {
        key: '1',
        label: `User List`,
        children: <UserList />,
    },
    {
        key: '2',
        label: 'Tournament List',
        children: <TournamentList isEditable />,
    },
    {
        key: 'teamList',
        label: `Team List`,
        children: <TeamList isEditable />,
    },
    {
        key: 'playerList',
        label: `Team Player List`,
        children: <TeamPlayerList isEditable />,
    },
    {
        key: '5',
        label: `Match List`,
        children: <MatchList isEditable />,
    },
    {
        key: 'scoreboard',
        label: `Score Board List`,
        children: <ScoreBoardList />,
    },
];

const AdminPage = () => {
    const userData = JSON.parse(localStorage.getItem('AuthStorage'));
    if (!userData.roles || !userData.roles.includes("ROLE_ADMIN")) {
        message.error("Bu sayfayi gorme yetkiniz yok!");
        return <></>
    }

    return <Tabs destroyInactiveTabPane defaultActiveKey="playerList" items={items} />

}

export default AdminPage;