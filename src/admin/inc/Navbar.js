import React from "react";
import {Link, withRouter} from "react-router-dom";

class Navbar extends React.Component {
render(){
    return(
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                     <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a> 
                    </li>
                    {/* <li className="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" className="nav-link">Home</a>
                    </li> */}
                </ul>
                <ul className="navbar-nav ml-auto">
                    

                    <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#" style={{textTransform:"capitalize"}}>
                    {localStorage.getItem('sa_user') ?
                        <i className="far fa-user" > {JSON.parse(localStorage.getItem('sa_user')).name}</i>
                        :null}
                    
                    {localStorage.getItem('ve_user') ?
                        <i className="far fa-user" > {JSON.parse(localStorage.getItem('ve_user')).name}</i>
                        :null}
                    
                    </a>
                    {localStorage.getItem('sa_user') ?
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <div className="dropdown-divider" />
                        {/* <a href="admin-profile" className="dropdown-item">
                            <i className="fas fa-user mr-2" /> My Profile
                        </a> */}
                        <div className="dropdown-divider" />
                        <a href="/admin-change-password" className="dropdown-item">
                            <i className="fas fa-lock mr-2" /> Change Password
                        </a>
                        <div className="dropdown-divider" />
                        <Link to={'/admin-login'} onClick={() => localStorage.clear()} className="dropdown-item">
                            <i className="fas fa-power-off mr-2" /> Logout
                        </Link>
                    </div>
                    :null}

                    {localStorage.getItem('ve_user') ?
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <div className="dropdown-divider" />
                        <a href="admin-contributer_profile" className="dropdown-item">
                            <i className="fas fa-user mr-2" /> My Profile
                        </a>
                        <div className="dropdown-divider" />
                        <a href="/admin-contributer_change-password" className="dropdown-item">
                            <i className="fas fa-lock mr-2" /> Change Password
                        </a>
                        <div className="dropdown-divider" />
                        <Link to={'/admin-contributer_login'} onClick={() => localStorage.clear()} className="dropdown-item">
                            <i className="fas fa-power-off mr-2" /> Logout
                        </Link>
                    </div>
                    :null}
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                    </li>
                   
                </ul>
            </nav>

        </>
    )
}
}

export default Navbar;