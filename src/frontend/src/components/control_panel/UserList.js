import React from "react";
import DataGrid from "components/datagrid/DataGrid";
import UserEdit from "./UserEdit";

const UserList = () => {

    const dataGridProps = {
        querName: "user/getAll",
        columnNameList: [
            { name: "fullName" },
            { name: "role" },
            { name: "username" },
            { name: "email" },
            { name: "age" },
            { name: "id", title: "infocard", columnType: "InfoCardLink", comp: UserEdit },
            { name: "id", title: "delete", columnType: "DeleteLink", href: "user/delete/" },
        ],
        newRecordComponent: UserEdit
    }

    return <DataGrid {...dataGridProps} />;
}

export default UserList;