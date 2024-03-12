import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";

class About extends React.Component {
    render(){
        return(
            <div>
                <Navbar />

                <main className="main">
			        <div className="container-fluid">
			        <img src="assets/images/frontend_images/404.gif" alt="Not Found" />
			        </div>
			    </main>

                <Footer />
            </div>
        )
    }
}

export default About;