import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";

class EditBanner extends React.Component {

    constructor() {
        super();
        this.state = {
            phone: null,
            email: null,
            address: null, 
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getContactDetails();
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    async getContactDetails() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk = localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/edit_contact_details/${params.id}?token=`+ tk);
        if(response.data.contact){
            this.setState({
                phone: response.data.contact.phone,
                email: response.data.contact.email,
                address: response.data.contact.address,
                isLoading: false
            });
        }
    }

    editContactDetails = async (e) => {
        e.preventDefault();
        const { match: { params } } = this.props;
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const formData = new FormData();
        formData.append('mobile', this.state.phone);
        formData.append('email', this.state.email);
        formData.append('address', this.state.address);
        fetch(`https://data.artaux.io/api/admin_auth/update_contact_details/${params.id}?token=`+ tk,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        }).then((res)=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Contact updated successfully',
                showConfirmButton: false,
                timer: 8000
            });
            // this.props.history.push("../admin-view-contact");
        }).catch((error)=>{
            Swal.fire({
                title: "Failed!",
                text: 'Banner not added.',
                type: "error",
            });
            // this.props.history.push("../admin-add-banner");
        })
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
                                    <h1>Edit Contact Details</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Edit Contact Details</li>
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
                                        <form onSubmit={this.editContactDetails.bind(this)} method="post">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="phone" className="required">Phone</label>
                                                    <input type="tel" name="phone" id="phone" value={this.state.phone} onChange={this.handleInput} className="form-control" placeholder="Enter phone number" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="email" className="required">Email</label>
                                                    <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleInput} id="email" placeholder="Enter email" />
                                                </div>

                                                {/* <div className="form-group">
                                                    <label htmlFor="address" className="required">Address</label>
                                                    <input type="text" name="address" className="form-control" value={this.state.address} onChange={this.handleInput} id="address" placeholder="Enter address" />
                                                </div> */}
                                            </div>

                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary ml-2"><i className="fa fa-check"></i> Update Details </button>
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

export default EditBanner;