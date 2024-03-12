import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../../inc/Footer";
import Navbar from "../../inc/Navbar";
import Sidebar from "../../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class VendorProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
        }
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        this.setState({ name: JSON.parse(localStorage.getItem('ve_user')).name,email: JSON.parse(localStorage.getItem('ve_user')).email});
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
        
    }

    editProfile = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        var id= JSON.parse(localStorage.getItem('ve_user')).id;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('email', this.state.email);
        formData.append('name',this.state.name);
        const res = await axios.post('api/vendor_auth/edit_profile?token='+ tk, formData);
        if(res.data.status === 200){
        	Swal.fire({
        		 position: 'center',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 8000
        	});
            this.setState({ isLoading: false });
        }else if(res.data.status === 401){
        	Swal.fire({
        		position: 'center',
                icon: 'error',
                title: res.data.message,
                showConfirmButton: false,
                timer: 8000
        	});
        	this.setState({ isLoading: false });
        }else if(res.data.status === 402){
        	Swal.fire({
        		position: 'center',
                icon: 'error',
                title: res.data.message,
                showConfirmButton: false,
                timer: 8000
        	});
        	this.setState({ isLoading: false });
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
                                        <form method="post" onSubmit={this.editProfile.bind(this)}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Name</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" name="name" value={this.state.name} onChange={this.handleInput} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Email</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail1" email="email" value={this.state.email} onChange={this.handleInput} readonly disabled/>
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

export default VendorProfile;