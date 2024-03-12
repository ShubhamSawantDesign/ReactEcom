import React from "react";
import { Link } from "react-router-dom";

 

class dashboard extends React.Component {
    render(){
        var greeting = "";
        var dt=new Date();
        var year = dt.getFullYear();
        var hour = dt.getHours();
        if( hour >= 1 && hour < 12){
            greeting = 'Good Morning!!';
        }
        if( hour >= 12 && hour < 19){
            greeting = 'Good Afternoon!!';
        }
        else{
            greeting = 'Good Evening!!';
        }
        return(
            <div className="layout">
                <div className="sidebar">
                    <h1>Your</h1>
                    <h1>Dashboard</h1>
                    <div className="actionBtn">
                        <button className="active"><Link to="/">Home</Link></button>
                        <button className="unactive">Dashboard</button>
                        <button className="active"><Link to="/addPosts">Create Posts</Link></button>
                    </div>
                    <div className="footer"><p className="p1">No copyright | ©️ {year}</p></div>
                </div>
                <div className="PostDiv">
                  
                </div>
                <div className="right-sidebar">
                    <div className="Greeting">
                        <h2>{greeting}</h2>
                        <h5>Hello, Welcome Back!. And Have A Nice Day</h5>
                        <button className="primary">View Events</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default dashboard;