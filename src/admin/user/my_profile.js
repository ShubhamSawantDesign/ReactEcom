import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";

class AdminProfile extends React.Component {
    render(){
        return(
            <>
                <Navbar />

                <Sidebar />

                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Profile</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Profile</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card card-primary">
                                        <form>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Name</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" value="John Doe" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Email</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" value="john@domain.com" />
                                                </div>
                                            </div>

                                            <div className="card-footer">
                                                <button type="reset" className="btn btn-primary">Reset</button>
                                                <button type="submit" className="btn btn-primary ml-2"><i className="fa fa-check"></i> Update Info</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

               <Footer />
            </>
        )
    }
}

export default AdminProfile;