import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'react-custom-modal/dist/index.css'
import Modal from 'react-custom-modal'
import Swal from 'sweetalert2';


class AdminLogin extends React.Component{
	constructor(props) {
		super(props)

		this.dialog = React.createRef()
		this.showDialog = this.showDialog.bind(this)

	  }
	  state = {
		email : '',
		password: '',
	}
	  showDialog() {
		this.dialog.current.show({
		  component: <CustomDialog/>,
		  animation: 'slideUp'
		})
	  }

    handleInput = (e) => {
		e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    loginAdmin = async (e) => {
        e.preventDefault();
		if(localStorage.getItem('sa_user')){
			localStorage.clear()
		}
		this.setState({ isLoading: true });
        const res = await axios.post("api/vendor_auth/vendor_login", this.state);
        console.log(res.data.token);
        if(res.data.token){
			await axios.get('api/vendor_auth/vendor_profile?token='+ res.data.token).then(
				res => {
					localStorage.setItem("ve_user",JSON.stringify(res.data));
				},
				err => {
					console.log(err);
				}
			);
			Swal.fire({


				title:  "You have logged in successfully",
				showDenyButton: false,
				confirmButtonText: `Ok`,
				showCancelButton: false,
				showConfirmButton: false,
				icon: "success",
				timer: 1800
				
				// denyButtonText: ``,
			  }).then((result) => {
				/* Read more about isConfirmed, isDenied below */
 
				this.setState({ isLoading: false });
					
					localStorage.setItem("ve_token",JSON.stringify(res.data.token));
					window.location.href="../admin";

				/* if (result.isConfirmed) {
					this.setState({ isLoading: false });
					
					localStorage.setItem("ve_token",JSON.stringify(res.data.token));
					window.location.href="../admin";
				} else if (result.isDenied) {
				  Swal.fire('Changes are not saved', '', 'info')
				} */
			  })		
        }else if(res.data.status === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		type: "error",
				icon:"error",
        	});
			this.setState({ isLoading: false });
        	// this.props.history.push("../admin-login");
        }else if(res.data.status === 422){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		type: "error",
				icon:"error",
				position: 'center',
                showConfirmButton: false,
                timer: 8000
        	});
			this.setState({ isLoading: false });
        	// this.props.history.push("../admin-login");
        }
    }
    render(){
        return (
            <>
	            <div class="hold-transition login-page l-bg">
		            <div className="login-box">
					  	<div className="login-logo" style={{color: 'black'}}>
					    	<b>Artaux</b> Contributor Login
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
									<p className="mb-1 mt-3">
										<a href="/forgot-password-vendor/">Forgot Password?</a>
									</p>
							        <div className="row">
							         	<div className="col-12 row">
							            	<button type="submit" className="btn btn-primary btn-block ">Sign In&nbsp; {this.state.isLoading ? <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> :<span className="fas fa-lock"></span>} </button>
							          	</div>
							        </div>
							        <a href="/"><i className="fa fa-angle-left"></i> Back To Site</a>
							        <a onClick={() =>{window.location.href="/contributor-register"}} className="float-right" style={{cursor:'pointer'}}>Become a Contributor <i className="fa fa-angle-right"></i></a>
				      			</form>
								  <hr />
								<div >
									<center>
									<button href="#" className="btn btn-default btn-block " onClick={this.showDialog}>Contributor Benefits</button>
									</center>
									<Modal className='Custom'
										dialogClass='CustomDialog'
										ref={this.dialog}/>
								</div>
			    			</div>
				  		</div>
					</div>
				</div>
            </>
        );
    }
	
}
class CustomDialog extends React.Component {
	render() {
	  const {close} = this.props
	  return (
		<div>
		  <div className='modal-header' style={{borderBottom:"0px"}}>
			<span className='title'>Contributor Benefits <span style={{fontSize:"12px"}}>(Click On The Points To Read More)</span></span>
			<button className='close-btn' onClick={close}>
			  <span>&times;</span>
			</button>
		  </div>
		  <div className='modal-body' style={{maxWidth:"500px"}}>
				<div className="accordion accordion-icon" id="accordion-3">
					<div className="card">
						<div className="card-header" id="heading3-1">
							<h2 className="card-title">
							<a role="button" data-toggle="collapse" href="#collapse3-1" aria-expanded="true" aria-controls="collapse3-1">
								<i className="icon-star-o" />1. Build reliable source of income.
							</a>
							</h2>
						</div>{/* End .card-header */}
						<div id="collapse3-1" className="collapse show" aria-labelledby="heading3-1" data-parent="#accordion-3">
							<div className="card-body">
							List your digital resources on website and build a solidified stream of income for yourself.
							</div>{/* End .card-body */}
						</div>{/* End .collapse */}
					</div>{/* End .card */}
					<div className="card">
						<div className="card-header" id="heading3-2">
							<h2 className="card-title">
							<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-2" aria-expanded="false" aria-controls="collapse3-2">
								<i className="icon-info-circle" />2. Earn a higher commision than any other existing platforms offer.
							</a>
							</h2>
						</div>{/* End .card-header */}
						<div id="collapse3-2" className="collapse" aria-labelledby="heading3-2" data-parent="#accordion-3">
							<div className="card-body">
							You keep 60% of revenue earned on the sale of each of your product listed.
							</div>{/* End .card-body */}
						</div>{/* End .collapse */}
					</div>{/* End .card */}
					<div className="card">
						<div className="card-header" id="heading3-3">
							<h2 className="card-title">
							<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-3" aria-expanded="false" aria-controls="collapse3-3">
								<i className="icon-heart-o" />3. Growth hack your place in the creative marketplace with our data insights
							</a>
							</h2>
						</div>{/* End .card-header */}
						<div id="collapse3-3" className="collapse" aria-labelledby="heading3-3" data-parent="#accordion-3">
							<div className="card-body">
							Use our periodic data analysis reports to find what customers want from you and what ideas of yours are being loved the most. 
							</div>{/* End .card-body */}
						</div>{/* End .collapse */}
					</div>{/* End .card */}
					<div className="card">
						<div className="card-header" id="heading3-4">
							<h2 className="card-title">
							<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-4" aria-expanded="false" aria-controls="collapse3-4">
								<i className="icon-heart-o" />4. Global exposure through our advertising efforts
							</a>
							</h2>
						</div>{/* End .card-header */}
						<div id="collapse3-4" className="collapse" aria-labelledby="heading3-4" data-parent="#accordion-3">
							<div className="card-body">
							Through our advertising on differnt distribution channels and social media, reach out to potential customers across differnt countries.
							</div>{/* End .card-body */}
						</div>{/* End .collapse */}
					</div>{/* End .card */}
					<div className="card">
						<div className="card-header" id="heading3-5">
							<h2 className="card-title">
							<a className="collapsed" role="button" data-toggle="collapse" href="#collapse3-5" aria-expanded="false" aria-controls="collapse3-5">
								<i className="icon-heart-o" />5. Get help with legal licensing of your products
							</a>
							</h2>
						</div>{/* End .card-header */}
						<div id="collapse3-5" className="collapse" aria-labelledby="heading3-5" data-parent="#accordion-3">
							<div className="card-body">
							We would be happy to help you in formulating and including a license along with your product, that explains how the user is expected to treat the resource and defining what actions could be taken if the resources are deemed abused as per the terms. 
							</div>{/* End .card-body */}
						</div>{/* End .collapse */}
					</div>{/* End .card */}
				</div>{/* End .accordion */}
			</div>
		  <div className='modal-footer' style={{justifyContent:"center"}}>
			<button className='btn btn-primary ' onClick={close}>Close</button>
		  </div>
		</div>
	  )
	}
  }



export default AdminLogin;