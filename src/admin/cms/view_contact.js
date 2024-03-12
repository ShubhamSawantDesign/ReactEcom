import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";

class ViewContact extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }
    
    componentDidMount() {
        this.getContact();
    }

    async getContact() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_contact?token='+ tk);
        console.table(response);
        if(response.data.contact){
            this.setState({ contact: response.data.contact, isLoading: false});
        }
    }

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
                                    <h1>Contact Us</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Contact</li>
                                        <li className="breadcrumb-item active">Contact Us</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                        {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading Details...</h6> }
                                        {this.state.contact &&
                                            <table id="example1" className="table table-bordered table-striped ">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Phone No.</th>
                                                        <th className="text-center">Email</th>
                                                        {/* <th className="text-center">Address</th> */}
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.contact.map(
                                                    (contact, index) =>
                                                    <tr key={index}>
                                                        <td className="text-center">{contact.phone}</td>
                                                        <td className="text-center">{contact.email}</td>
                                                        {/* <td className="text-center">{contact.address}</td> */}
                                                        <td className="text-center"><a href={'/admin-edit-contact-details/'+contact.id} className="btn btn-success btn-sm"><i className="fas fa-pencil-square-o" title="Edit Details"></i></a></td>
                                                    </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            }
                                        </div>
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

export default ViewContact;