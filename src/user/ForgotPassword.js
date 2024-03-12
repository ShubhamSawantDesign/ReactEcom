import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
 

class ForgotPassword extends React.Component {
	constructor() {
        super();
        this.state = {
			email:'',
			acc_type:''
        }
    }
	componentDidMount() {
		const { match: { params } } = this.props;
        if(params.type){
            this.setState({acc_type:params.type});
        }else{
            this.setState({acc_type:"user"});
        }
    }

	handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});   
    }

	forgotPassword = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        const formData = new FormData();
        formData.append('type', this.state.acc_type);
        formData.append('email', this.state.email);
        const res = await axios.post('api/auth/forgot_password', formData);
        if(res.data.status === 200){
        	Swal.fire({
        		 position: 'center',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 8000
        	});
            this.setState({ isLoading: false });
			this.props.history.push("/user-login");
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
            <div>
                <Navbar />

                <main className="main">
			        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
			            <div className="container-fluid">
			                <ol className="breadcrumb">
			                    <li className="breadcrumb-item"><a href="index.php"><i className="fa fa-home"></i> Home</a></li>
			                    <li className="breadcrumb-item active" aria-current="page">Forgot Password</li>
			                </ol>
			            </div>
			        </nav>

			        <div className="login-page bg-image pt-8 pb-8 pt-md-2 pb-md-2 pt-lg-17 pb-lg-17" style={{background: "#fff"}}>
			        	<div className="container-fluid">
			                <div className="row d-flex justify-content-center">
			                    <div className="col-md-6">
			                        <div className="form-box">
			                            <div className="form-tab">
			                                <ul className="nav nav-pills nav-fill">
			                                    <li className="nav-item">
			                                        <a className="nav-link active" id="signin-tab-2" data-toggle="tab" href="#signin-2" role="tab" aria-controls="signin-2" aria-selected="false">Forgot Password</a>
			                                    </li>
			                                </ul>

			                                <div className="tab-content">
			                                    <div className="tab-pane fade show active" id="signin-2" role="tabpanel" aria-labelledby="signin-tab-2">
			                                    	<span>You can reset your password here, please enter registered email address.</span>
			                                        <form  method="post" onSubmit={this.forgotPassword.bind(this)}>
			                                            <div className="form-group">
			                                                <label for="email" className="field-required">Email</label>
			                                                <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInput} required />
			                                            </div>

			                                            <div className="form-footer">
			                                                <button type="submit" className="btn btn-primary btn-shadow ">
			                                                    <span>Submit</span>
			                                                    {this.state.isLoading ? <img src="/assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/>:<i className="icon-long-arrow-right"></i> }
			                                                </button>
			                                            </div>
			                                        </form>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			        	</div>
			        </div>
			    </main>

                <Footer />
            </div>
        )
    }
}

export default ForgotPassword;