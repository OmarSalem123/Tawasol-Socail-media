import React from "react";
import Sidebar from "./Sidebar";

const Private = ({component: Component}) => (
    <>
    <Sidebar/>
    <Component/>
    </>
);

export default Private;