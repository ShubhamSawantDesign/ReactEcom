import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";

class Error extends React.Component {
    render(){
        return(
            <div>
                <Navbar />

                <main className="main">
			        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
			            <div className="container-fluid">
			                <ol className="breadcrumb">
			                    <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
			                    <li className="breadcrumb-item active" aria-current="page">404</li>
			                </ol>
			            </div>
			        </nav>
			        <div className="container-fluid">
			        	<div className="page-header page-header-big text-center" style={{backgroundImage: 'url("assets/images/frontend_images/404.gif")'}}>
			    			{/* <h1 className="page-title text-white">About us<span className="text-white">Who we are</span></h1> */}
			        	</div>
			        </div>

                </main>

                <Footer />
            </div>
        )
    }
}

export default Error;