import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../../inc/Footer";
import Navbar from "../../inc/Navbar";
import Sidebar from "../../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class AccountDetails extends React.Component {
    state = {
        upi_id: '',
       bank_name: '',
       branch_name:'',
       ifsc:'',
       acc_no:'',
       name:'',
       email:'',
    }
    
    componentDidMount() {
        this.getData();
    }

    async getData() {
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        const id = JSON.parse(localStorage.getItem('ve_user')).id;
        const res = await axios.get('api/vendor_auth/view_bank_details/'+id+'?token='+ tk);
        if(res.data.details){
        	this.setState({
                upi_id: res.data.details.upi_id,
                bank_name: res.data.details.bank_name,
                branch_name:res.data.details.branch_name,
                ifsc:res.data.details.ifsc,
                acc_no:res.data.details.acc_no,
                name:res.data.details.name,
                email:res.data.details.email,
            });
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    Changedetails = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        var id= JSON.parse(localStorage.getItem('ve_user')).id;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('upi_id', this.state.upi_id);
        formData.append('bank_name',this.state.bank_name);
        formData.append('branch_name',this.state.branch_name);
        formData.append('ifsc',this.state.ifsc);
        formData.append('acc_no',this.state.acc_no);
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        const res = await axios.post('api/vendor_auth/account_details?token='+ tk, formData);
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
                                        <h1>Account Details</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">Account Details</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-8">
                                    <form method="post" onSubmit={this.Changedetails.bind(this)}>
                                        
                                            
                                                {JSON.parse(localStorage.getItem('ve_user')).nationality === 'Indian' ?
                                                <div>
                                                    <div className="card card-primary">
                                                        <div className="card-body">
                                                            <label className="required">UPI ID</label>
                                                            <input type="text" className="form-control"  name="upi_id" value={this.state.upi_id} onChange={this.handleInput} placeholder="Enter UPI ID" />
                                                        </div>
                                                    </div>
                                                    <label style={{fontSize:"20px"}}>Or</label>
                                                    <div className="card card-primary">
                                                        <div className="card-body">
                                                            <div className="form-group">
                                                                <label className="required">Bank Name</label>
                                                                <input type="text" className="form-control" name="bank_name" value={this.state.bank_name} onChange={this.handleInput} placeholder="Enter bank name" />
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="required">Bank Branch Name</label>
                                                                <input type="text" className="form-control" name="branch_name" value={this.state.branch_name} onChange={this.handleInput} placeholder="Enter bank branch name" />
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="required">IFSC Code</label>
                                                                <input type="text" className="form-control" name="ifsc" value={this.state.ifsc} onChange={this.handleInput} placeholder="Enter IFSC code" />
                                                            </div>
                                                            
                                                            <div className="form-group">
                                                                <label className="required">Account No.</label>
                                                                <input type="text" className="form-control" name="acc_no" value={this.state.acc_no} onChange={this.handleInput} placeholder="Enter account no" />
                                                            </div>
                                                            
                                                            <div className="form-group">
                                                                <label className="required">Beneficiary Name</label>
                                                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInput} placeholder="Enter beneficiary name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="card card-primary">
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label className="required">Paypal Email</label>
                                                        <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Enter Paypal email" />
                                                    </div>
                                                </div>
                                                </div>
                                                }

                                                <div className="card-footer">
                                                    <button type="reset" className="btn btn-primary">Reset</button>
                                                    <button type="submit" className="btn btn-primary ml-2">{this.state.isLoading ? <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> : <i className="fa fa-check"></i>} Add/Update Details</button>
                                                </div>
                                            
                                        </form>
                                        
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

export default AccountDetails;