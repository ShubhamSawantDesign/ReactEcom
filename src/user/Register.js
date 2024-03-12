import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import $ from 'jquery';
import 'jquery-validation';
import Swal from 'sweetalert2';

class Login extends React.Component {
	state = {
        name: '',
        email : '',
        mobile : '',
        profession : '',
        password: '',
        password_confirmation: '',
    }

	componentDidMount() {
		$(document).ready(function(){


			$.validator.addMethod("alphanumeric", function(value, element) {
				return this.optional(element) || /^[a-z ]+$/i.test(value);
			}, "Please enter characters only");

			$("#registerForm").validate({
				
				rules:{
					name:{
						required:true,
						alphanumeric:true,
						maxlength: 50,
					},
					email:{
						required:true,
						email: true,
					},
					password:{
						required:true,
						minlength:6
					},
					confirm_password:{
						required:true,
						equalTo: "#password",
					}
				},
				messages:{
					name:{ 
						required:"Please enter name",
						maxlength: "Please enter max 50 characters"
					},
					email:{ 
						required: "Please enter email. ",
						email: "Please enter valid email. ",
					},
					password:{
						required:"Please enter password",
						minlength: "Your password must be atleast 6 characters long"
					},
					confirm_password:{
						required:"Please confirm password",
						equalTo: "Please enter the same password"
					}
				}
			});
		});
	}

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleEmailInput = async (e) => {
		this.setState({[e.target.name]: e.target.value});
		const res = await axios.post("api/auth/email-chk", this.state);
		if(res.data.status === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		icon: "error",
        	});
        }
        
    }

    addUser = async (e) => {
        e.preventDefault();
		this.setState({ isLoading: true });
        const res = await axios.post("api/auth/register", this.state);
        if(res.data.status === 200){
        	Swal.fire({
        		title: "Success!",
        		text: res.data.message,
        		icon: "success",
        	});
			this.setState({ isLoading: false });
            this.props.history.push("../user-login");
        }else if(res.data.status === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		icon: "error",
        	});
			this.setState({ isLoading: false });
        	this.props.history.push("../user-register");
        }else if(res.data.status === 422){
			if(res.data.message.email){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message.email,
        		icon: "error",
        	});
			}else if(res.data.message.mobile){
				Swal.fire({
					title: "Failed!",
					text: res.data.message.mobile,
					icon: "error",
				});
			}else if(res.data.message.name){
				Swal.fire({
					title: "Failed!",
					text: res.data.message.name,
					icon: "error",
				});
			}
			this.setState({ isLoading: false });
        	this.props.history.push("../user-register");
        }
    }

	 responseGoogle = async (e) => {
		// console.log(e.profileObj);
		// e.preventDefault();
		this.setState({
			google_email:e.profileObj.email,
			google_id:e.profileObj.googleId,
			google_name:e.profileObj.name, 
			isLoading: true });
        const res = await axios.post("api/auth/register", this.state);
        if(res.data.status === 200){
        	Swal.fire({
        		title: "Success!",
        		text: res.data.message,
        		icon: "success",
        	});
			this.setState({ isLoading: false });
            this.props.history.push("../user-login");
        }else if(res.data.status === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		icon: "error",
        	});
			this.setState({ isLoading: false });
        	this.props.history.push("../user-register");
        }else if(res.data.status === 422){
			if(res.data.message.email){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message.email,
        		icon: "error",
        	});
			}else if(res.data.message.mobile){
				Swal.fire({
					title: "Failed!",
					text: res.data.message.mobile,
					icon: "error",
				});
			}else if(res.data.message.name){
				Swal.fire({
					title: "Failed!",
					text: res.data.message.name,
					icon: "error",
				});
			}
			this.setState({ isLoading: false });
        	this.props.history.push("../user-register");
        }
	  }

    render(){
        if(localStorage.getItem('user')){
            this.props.history.push("../");
        }
        return(
            <div>
                <Navbar />

                <main className="main">
			        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
			            <div className="container-fluid">
			                <ol className="breadcrumb">
			                    <li className="breadcrumb-item"><a href="index.php"><i className="fa fa-home"></i> Home</a></li>
			                    <li className="breadcrumb-item active" aria-current="page">Register</li>
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
			                                        <div className="nav-link active" id="register-tab-2">Sign up to Artaux</div>
			                                    </li>
			                                </ul>

			                                <div className="tab-content">
			                                    <div className="tab-pane fade show active">
			                                        <form onSubmit={this.addUser} method="post" id="registerForm">
			                                            <div className="form-group">
			                                                <label htmlFor="name" className="field-required">Name</label>
			                                                <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInput} placeholder="Please enter your name" required />
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="email" className="field-required">Email</label>
			                                                <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInput} onBlur={this.handleEmailInput} placeholder="Please enter email" required />
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="profession" className="field-required">Profession</label>
			                                                <input type="text" className="form-control" id="profession" name="profession" value={this.state.profession} onChange={this.handleInput} placeholder="Please enter profession" required/>
			                                            </div>

														<div className="form-group">
			                                                <label htmlFor="mobile" className="field-required">Mobile Number</label>
			                                                <input type="text" className="form-control" name="mobile" id="mobile" maxlength="11" minLength="10" value={this.state.mobile} onChange={this.handleInput} placeholder="Please enter mobile number" required />
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="password" className="field-required">Password</label>
			                                                <input type="password" className="form-control" name="password" id="password" value={this.state.password} onChange={this.handleInput} placeholder="Please enter password" required />
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="confirm-password" className="field-required">Confirm Password</label>
			                                                <input type="password" equalto="#password" className="form-control" id="password_confirmation" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleInput} placeholder="Please confirm password" required />
			                                            </div>
														<span> By clicking on sign up you're automatically agreeing to <a href={"cms-page/tems_of_use"}>Terms Of Use</a> of Artaux.</span>
			                                            <div className="form-footer row d-flex ">
														
			                                                <button type="submit" className="btn btn-primary btn-shadow btn-block">
			                                                    <span className="row"><i className="fa fa-pencil"></i> Sign Up&nbsp; {this.state.isLoading && <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> } </span>
			                                                    {/* <i className="icon-long-arrow-right"></i> */}
			                                                </button>
			                                                <Link to="user-login" className="btn btn-link">
			                                                    <span> Already a Member? Sign In</span>
			                                                    <i className="icon-long-arrow-right"></i>
			                                                </Link>
			                                            </div>
														<hr></hr>
			                                        </form>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>

			                    <div className="col-md-6">
			                        <img src="assets/images/frontend_images/user-reg.jpg" />
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

export default Login;
