import React from "react";
import { Tabs } from "antd";
import TournamentList from "components/control_panel/TournamentList";
import MatchList from "components/control_panel/MatchList";
import ScoreBoardList from "components/control_panel/ScoreBoardList";
import TeamPlayerList from "components/control_panel/TeamPlayerList";

const items = [
    {
        key: '1',
        label: 'Tournament List',
        children: <TournamentList isEditable={false} />,
    },
    {
        key: '3',
        label: `Match List`,
        children: <MatchList isEditable={false} />,
    },
    {
        key: '4',
        label: `Score Board List`,
        children: <ScoreBoardList />,
    },
    {
        key: '5',
        label: `Team Player List`,
        children: <TeamPlayerList />,
    },
];

const HomePage = () => {
    return <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} />
}

export default HomePage;