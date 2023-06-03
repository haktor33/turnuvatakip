import React, { useEffect } from "react";
import { Button } from "antd";
import { userService } from "services/user.services";


const HomePage = () => {

    useEffect(() => {
        userService.getAll().then(result => {
            console.log(result);
        })

    }, [])

    return (
        <div>
            <Button>HomePage </Button>
        </div>

    );
}

export default HomePage;