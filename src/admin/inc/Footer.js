import React from "react";
import {Link} from "react-router-dom";
 

const Footer = () => {
    return(
        <>
            <div>
            {/* /.content-wrapper */}
            <footer className="main-footer">
            
                <strong>All rights reserved. Copyright © 2021.</strong>
                {/* <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.1.0
                </div> */}
            </footer>
            {/* Control Sidebar */}
            <aside className="control-sidebar control-sidebar-dark">
                {/* Control sidebar content goes here */}
            </aside>
            {/* /.control-sidebar */}
            </div>

        </>
        )
}

export default Footer;