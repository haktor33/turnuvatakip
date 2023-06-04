import React from "react";
import { Tabs } from 'antd';
import UserList from "components/control_panel/UserList";
import TournamentList from "components/control_panel/TournamentList";
import MatchList from "components/control_panel/MatchList";
import ScoreBoardList from "components/control_panel/ScoreBoardList";

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
        key: '3',
        label: `Match List`,
        children: <MatchList isEditable />,
    },
    {
        key: '4',
        label: `Score Board List`,
        children: <ScoreBoardList />,
    },
];

const AdminPage = () => {

    return <Tabs destroyInactiveTabPane defaultActiveKey="4" items={items} />

}

export default AdminPage;