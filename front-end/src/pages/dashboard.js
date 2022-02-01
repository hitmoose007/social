import React from "react";
import Header from "../components/header";
import { withRouter } from "react-router-dom";

function  Dashboard(){

    return(
        <div>
            <Header />
            <h1>Dashboard</h1>
        </div>
    )
}

export default withRouter(Dashboard);