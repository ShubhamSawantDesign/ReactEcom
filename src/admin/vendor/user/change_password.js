import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../../inc/Footer";
import Navbar from "../../inc/Navbar";
import Sidebar from "../../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class ChangePassword extends React.Component {
    state = {
        name: '',
       main_cat: 0,
       old_pwd:'',
       new_pwd:'',
       comfirm_pwd:'',
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    ChangePassword = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        var id= JSON.parse(localStorage.getItem('ve_user')).id;
        var email= JSON.parse(localStorage.getItem('ve_user')).email;
        console.log('email',email);
        const formData = new FormData();
        formData.append('id', id);
        formData.append('email', email);
        formData.append('password',this.state.old_pwd);
        formData.append('new_pwd',this.state.new_pwd);
        formData.append('comfirm_pwd',this.state.comfirm_pwd);
        const res = await axios.post('api/vendor_auth/change_password?token='+ tk, formData);
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
                                        <h1>Change Password</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">Change Password</li>
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
                                            <form method="post" onSubmit={this.ChangePassword.bind(this)}>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className="required">Current Password</label>
                                                        <input type="password" className="form-control" id="exampleInputEmail1" name="old_pwd" value={this.state.old_pwd} onChange={this.handleInput} placeholder="Enter current password" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className="required">New Password</label>
                                                        <input type="password" className="form-control" id="exampleInputEmail1" name="new_pwd" value={this.state.new_pwd} onChange={this.handleInput} placeholder="Enter new password" />
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className="required">Confirm Password</label>
                                                        <input type="password" className="form-control" id="exampleInputEmail1" name="comfirm_pwd" value={this.state.comfirm_pwd} onChange={this.handleInput} placeholder="Enter confirm password" />
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button type="reset" className="btn btn-primary">Reset</button>
                                                    <button type="submit" className="btn btn-primary ml-2">{this.state.isLoading ? <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> : <i className="fa fa-check"></i>} Update Password </button>
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

export default ChangePassword;