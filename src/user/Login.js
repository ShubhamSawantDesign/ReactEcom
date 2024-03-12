import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'jquery-validation';
import GoogleLogin from 'react-google-login';

class Login extends React.Component {
	state = {
        email : '',
        password: '',
    }

	componentDidMount() {
        $(document).ready(function(){
			$("#loginForm").validate({
				rules:{
					email:{
						required:true,
						email: true,
					},
					password:{
						required:true,
					},
				},
				messages:{
					email:{ 
						required: "Please enter email. ",
						email: "Please enter valid email. ",
					},
					password:{ 
						required:"Please enter password. ",	
					},
				}
			});
			});
    }

    handleInput = (e) => {
		e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    loginUser = async (e) => {
        e.preventDefault();
		this.setState({ LoginisLoading: true });
        const res = await axios.post("api/auth/login", this.state);
        console.log(res.data.token);
        if(res.data.token){
            Swal.fire({
        		title: "You have logged in successfully.",
        		text: res.data.message,
        		icon: "success",
        	});
            localStorage.setItem("token",JSON.stringify(res.data.token));
			await axios.get('api/auth/profile?token='+ res.data.token).then(
				res => {
					localStorage.setItem("user",JSON.stringify(res.data));
				},
				err => {
					console.log(err);
				}
			);
			this.setState({ LoginisLoading: false });
            this.props.history.push("/");
        }else if(res.data.status === 401){
        	Swal.fire({
				position: 'center',
				timer: 8000,
        		title: "Login Failed! Please check your email or password and try again",
        		text: res.data.message,
        		icon: "error",
				showConfirmButton: false,
        	});
			this.setState({ LoginisLoading: false });
        	this.props.history.push("../user-login");
        }else if(res.data.status === 404){
        	Swal.fire({
				position: 'center',
				timer: 8000,
        		title: "Failed!",
        		text: res.data.message,
        		icon: "error",
				showConfirmButton: false,
        	});
        	this.setState({ LoginisLoading: false });
        }
    }
	responseGoogle = async (e) => {
		// console.log(e.profileObj);
		// e.preventDefault();
		this.setState({
			google_email:e.profileObj.email,
			google_id:e.profileObj.googleId,
			google_name:e.profileObj.name,  });
			this.setState({ GoogleLoginisLoading: true });
			const res = await axios.post("api/auth/login", this.state);
			console.log(res.data.token);
			if(res.data.token){
				Swal.fire({
					title: "You have logged in successfully.",
					text: res.data.message,
					icon: "success",
				});
				localStorage.setItem("token",JSON.stringify(res.data.token));
				await axios.get('api/auth/profile?token='+ res.data.token).then(
					res => {
						localStorage.setItem("user",JSON.stringify(res.data));
					},
					err => {
						console.log(err);
					}
				);
				this.setState({ GoogleLoginisLoading: false });
				this.props.history.push("/");
			}else if(res.data.status === 401){
				Swal.fire({
					position: 'center',
					timer: 8000,
					title: "Failed! to login please check your email and password",
					text: res.data.message,
					icon: "error",
					showConfirmButton: false,
				});
				this.setState({ GoogleLoginisLoading: false });
				this.props.history.push("../user-login");
			}else if(res.data.status === 404){
				Swal.fire({
					position: 'center',
					timer: 8000,
					title: "Failed!",
					text: res.data.message,
					icon: "error",
					showConfirmButton: false,
				});
				this.setState({ GoogleLoginisLoading: false });
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
			                    <li className="breadcrumb-item"><a href="/"><i className="fa fa-home"></i> Home</a></li>
			                    <li className="breadcrumb-item active" aria-current="page">Login & Register</li>
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
			                                        <div className="nav-link active" id="signin-tab-2">Sign in to Artaux</div>
			                                    </li>
			                                </ul>
			                                <div className="tab-content">
			                                    <div className="tab-pane fade show active" id="signin-2" role="tabpanel" aria-labelledby="signin-tab-2">
			                                        <form method="post" onSubmit={this.loginUser.bind(this)} id="loginForm">
			                                            <div className="form-group">
			                                                <label htmlFor="email" className="field-required">Email</label>
			                                                <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Please enter email" required />
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="password" className="field-required">Password</label>
			                                                <input type="password" name="password" className="form-control" id="password" value={this.state.password} onChange={this.handleInput} placeholder="Please enter password" required />
			                                                {/* <span toggle="#password" className="fa fa-fw fa-eye field-icon" id="show-pass"></span> */}
			                                            </div>

			                                            <div className="form-footer">
			                                                <button type="submit" className="btn btn-primary btn-shadow " >
			                                                    <span className="row"><i className="fa fa-lock"></i>Sign In&nbsp; {this.state.LoginisLoading && <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> } </span>
			                                                   {/*<i className="icon-long-arrow-right"></i>*/} 
			                                                </button>
															{/* <label>Or</label> */}
															<GoogleLogin
																clientId="441175534750-r42e3nknlgktq4primpc9tk1r7p25ga1.apps.googleusercontent.com"
																render={renderProps => (
																	<button onClick={renderProps.onClick} className="btn btn-primary btn-shadow" disabled={renderProps.disabled} style={{padding: ".55rem 1.2rem"}}><i className="fa fa-google-plus"></i> Google Sign In &nbsp;&nbsp;&nbsp;{this.state.GoogleLoginisLoading && <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> }</button>
																  )}
																buttonText="Sign Up"
																onSuccess={this.responseGoogle}
																onFailure={this.responseGoogle}
																cookiePolicy={'single_host_origin'}
															/>
			                                                <Link to="../forgot-password/" className="forgot-link">Forgot Password?</Link>
			                                            </div>
														<hr style={{marginTop: "10px"}}></hr>
														<div className="row">
															<a href={"/user-register"} className="btn btn-primary btn-shadow m-2">
			                                                    <span className="row"><i className="fa fa-user"></i>Sign Up As User &nbsp; {this.state.isLoading && <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> } </span>
			                                                   {/*<i className="icon-long-arrow-right"></i>*/} 
			                                                </a>
															
														</div>
			                                        </form>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    <div className="col-md-6">
			                        <img src="assets/images/frontend_images/Hello.png" />
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

