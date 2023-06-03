import React from "react";
import DataGrid from "components/datagrid/DataGrid";
import Edit from "./TournamentEdit";

const TournamentList = () => {

    const dataGridProps = {
        querName: "tournament/getAll",
        columnNameList: [
            { name: "year" },
            { name: "typeValue", title: "Turnuva Türü" },
            { name: "id", title: "infocard", columnType: "InfoCardLink", comp: Edit },
            { name: "id", title: "delete", columnType: "DeleteLink", href: "tournament/delete/" },
        ],
        newRecordComponent: Edit
    }

    return <DataGrid {...dataGridProps} />;
}

export default TournamentList;