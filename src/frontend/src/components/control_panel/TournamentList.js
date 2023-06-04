import React from "react";
import DataGrid from "components/datagrid/DataGrid";
import Edit from "./TournamentEdit";

const TournamentList = (props) => {

    const dataGridProps = {
        querName: "tournament/getAll",
        columnNameList: [
            { name: "year" },
            { name: "typeValue", title: "Turnuva Türü" },
            { name: "maxPlayerCount", title: "Turnuva Takım Oyuncu Sayısı" },

        ],
    }
    if (props.isEditable) {
        dataGridProps.columnNameList.push({ name: "id", title: "infocard", columnType: "InfoCardLink", comp: Edit });
        dataGridProps.columnNameList.push({ name: "id", title: "delete", columnType: "DeleteLink", href: "tournament/delete/" });
        dataGridProps.newRecordComponent = Edit;
    }

    return <DataGrid {...dataGridProps} />;
}

export default TournamentList;