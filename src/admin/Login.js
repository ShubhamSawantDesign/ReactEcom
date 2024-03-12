import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
 
import Swal from 'sweetalert2';


class AdminLogin extends React.Component{
	state = {
        email : '',
        password: '',
    }

    handleInput = (e) => {
		e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    loginAdmin = async (e) => {
        e.preventDefault();
		if(localStorage.getItem('ve_user')){
			localStorage.clear()
		}
		this.setState({ isLoading: true });
        const res = await axios.post("api/admin_auth/admin_login", this.state);
        console.log(res.data.token);
        if(res.data.token){
         //    Swal.fire({
        	// 	title: "You have logged in successfully.",
        	// 	text: res.data.message,
        	// 	type: "success",
        	// });
			await axios.get('api/admin_auth/admin_profile?token='+ res.data.token).then(
				res => {
					localStorage.setItem("sa_user",JSON.stringify(res.data));
				},
				err => {
					console.log(err);
				}
			);
			this.setState({ isLoading: false });
			localStorage.setItem("sa_token",JSON.stringify(res.data.token));
			window.location.href="../admin";
            // this.props.history.push("../admin");
        }else if(res.data.status === 401){
        	Swal.fire({
        		position: 'center',
				  icon: 'error',
				  title: res.data.message,
				  showConfirmButton: false,
				  timer: 2500
        	});
			this.setState({ isLoading: false });
        	this.props.history.push("../admin-login");
        }else if(res.data.status === 422){
        	Swal.fire({
				position: 'center',
				  icon: 'error',
				  title: res.data.message,
				  showConfirmButton: false,
				  timer: 2500
			  });
			this.setState({ isLoading: false });
        	this.props.history.push("../admin-login");
        }
    }
    render(){
        return (
            <>
	            <div class="hold-transition login-page">
		            <div className="login-box">
					  	<div className="login-logo">
					    	<b>Artaux</b> Admin Login
					  	</div>
					  	<div className="card">
					    	<div className="card-body login-card-body">
					      		<p className="login-box-msg">Sign in to start your session</p>
				      			<form method="post" onSubmit={this.loginAdmin.bind(this)} id="loginForm">
							        <div className="input-group mb-3">
							          <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInput}  placeholder="Email" required />
							          <div className="input-group-append">
							            <div className="input-group-text">
							              <span className="fas fa-envelope"></span>
							            </div>
							          </div>
							        </div>
							        <div className="input-group mb-3">
							          <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password" required />
							          <div className="input-group-append">
							            <div className="input-group-text">
							              <span className="fas fa-lock"></span>
							            </div>
							          </div>
							        </div>
									{/* <p className="mb-1 mt-3">
										<a href="#">Forgot Password?</a>
									</p> */}
							        <div className="row">
							         	<div className="col-12 row">
										 <button type="submit" className="btn btn-primary btn-block ">Sign In&nbsp; {this.state.isLoading && <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> } </button>
							          	</div>
							        </div>
							        <a href="/"><i className="fa fa-angle-left"></i> Back to site</a>
				      			</form>
			    			</div>
				  		</div>
					</div>
				</div>
            </>
        );
    }
}

export default AdminLogin;