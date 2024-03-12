import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import 'jquery-validation';
import $ from 'jquery';
import moment from "moment";
import { GoogleLogout } from 'react-google-login';
import ReactTooltip from 'react-tooltip';

class Account extends React.Component {	
	constructor() {
        super();
        this.state = {
            data: [],
            id:'',
			comfirm_pwd:'',
			new_pwd:'',
			old_pwd:'',
			name:JSON.parse(localStorage.getItem('user')).name,
			profession:JSON.parse(localStorage.getItem('user')).profession,
			email:JSON.parse(localStorage.getItem('user')).email,
			user_id:JSON.parse(localStorage.getItem('user')).id
        }
    }

    componentDidMount() {
        this.getCart();
        this.getOrders();
        this.getchangeCurrency();
		$(document).ready(function(){
			$("#changePasswordForm").validate({
				rules:{
					new_pwd:{
						required:true,
					},
					comfirm_pwd:{
						required:true,
						equalTo:"#new_pwd",
					},
					old_pwd:{
						required:true,
					},
				},
				messages:{
					new_pwd:{ 
						required: "Please enter password. ",
					},
					comfirm_pwd:{ 
						required: "Please enter password. ",
						equalTo: "Password does not match"
					},
					password:{ 
						required:"Please enter password. ",
					},
				}
			});
		});
    }
    
    async getCart() {
        const id = JSON.parse(localStorage.getItem('user')).id;
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/view_order/${id}`);
        if(response.data.orders){
            this.setState({ 
                 orders: response.data.orders,
                isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }
    }

    async getOrders() {
        const email = JSON.parse(localStorage.getItem('user')).email;
        var tk= localStorage.getItem('token').replace(/['"]+/g, '');
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/view_user_orders/${email}?token=`+tk);
        if(response.data.orders){
            this.setState({ 
                 inv_orders: response.data.orders,
                isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }
    }

     async getchangeCurrency() {
        const response = await axios.get(`/api/auth/get_rates`);
        if(response.data){
            this.setState({ 
                INR_rate: response.data.INR_rate.rate,
                USD_rate: response.data.USD_rate.rate,
                GBP_rate: response.data.GBP_rate.rate,
                EURO_rate: response.data.EURO_rate.rate,
                DIRHAM_rate: response.data.DIRHAM_rate.rate,
                isLoading: false});
            // this.setState({templateNumber : this.state.templates.length});
        }
        // console.log('rate',this.state.INR_rate)
        const INR_rate = this.state.INR_rate;
        const GBP_rate = this.state.USD_rate;
        const USD_rate = this.state.GBP_rate;
        const EURO_rate = this.state.EURO_rate;
        const DIRHAM_rate = this.state.DIRHAM_rate;
        if(localStorage.getItem('currency') == 'INR'){
            this.setState({exhangerate:INR_rate });
            this.setState({sign:'₹' });
        }else if(localStorage.getItem('currency') == 'USD'){
            this.setState({exhangerate:USD_rate });
            this.setState({sign:'$' });
        }else if(localStorage.getItem('currency') == 'GBP'){
            this.setState({exhangerate:GBP_rate });
            this.setState({sign:'£' });
        }else if(localStorage.getItem('currency') == 'EURO'){
            this.setState({exhangerate:EURO_rate });
            this.setState({sign:'€' });
        }else if(localStorage.getItem('currency') == 'DIRHAM'){
            this.setState({exhangerate:DIRHAM_rate });
            this.setState({sign:'.إ ' });
        }
    }

	async updateDownload(id){
        const formData = new FormData();
		this.setState({ isLoading: true });
        formData.append('id', id);
        const response = await axios.post('api/auth/update_download',formData);
        if(response.data.status == 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 2500
            });
            window.location.href="/account/downloads";
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }
    }
	handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});   
    }
	updateAccount = async (e) =>{
		e.preventDefault();
		this.setState({ isLoading: true });
        const formData = new FormData();
        formData.append('user_id', this.state.user_id);
        formData.append('name', this.state.name);
        formData.append('profession', this.state.profession);
        formData.append('email', this.state.email);
        const response = await axios.post('api/auth/update_account',formData);
        if(response.data.status == 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 8000
            });
            // this.props.history.go(0);
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }
    }

	updatePassword = async (e) =>{
		e.preventDefault();
		this.setState({ isLoading: true });
        const formData = new FormData();
        formData.append('user_id', this.state.user_id);
        formData.append('new_pwd', this.state.new_pwd);
        formData.append('old_pwd', this.state.old_pwd);
        formData.append('comfirm_pwd', this.state.comfirm_pwd);
        const response = await axios.post('api/auth/change_password',formData);
        if(response.data.status == 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 8000
            });
            this.props.history.push('/account');
        }else if(response.data.status === 402){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.data.message,
                showConfirmButton: false,
                timer: 8000
            });
        }else if(response.data.status === 401){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.data.message,
                showConfirmButton: false,
                timer: 8000
            });
        }
        
    }

    render(){
		const { match: { params } } = this.props
		if(!localStorage.getItem('user')){
			var username = 'User';
			this.props.history.push("../user-login");
			window.location.reload();
		}else{
			username = JSON.parse(localStorage.getItem('user')).name;
			var email = JSON.parse(localStorage.getItem('user')).email;
			var profession = JSON.parse(localStorage.getItem('user')).profession;
		}
        return(
            <div>
                <Navbar />

                <main className="main ">
				    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
				        <div className="container-fluid">
				            <ol className="breadcrumb">
				                <li className="breadcrumb-item"><a href="index.php"><i className="fa fa-home"></i> Home</a></li>
				                <li className="breadcrumb-item active" aria-current="page">My Account</li>
				            </ol>
				        </div>
				    </nav>

				    <div className="page-content">
				    	<div className="dashboard">
				            <div className="container-fluid">
				            	<div className="row">
				            		<aside className="col-md-2 col-lg-2">
				            			<ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
										    <li className="nav-item">
												{params.tab === undefined ?
										        <a className="nav-link active" id="tab-dashboard-link" data-toggle="tab" href="#tab-dashboard" role="tab" aria-controls="tab-dashboard" aria-selected="true"><i className="fa fa-list"></i> Dashboard</a>
												:<a className="nav-link" id="tab-dashboard-link" data-toggle="tab" href="#tab-dashboard" role="tab" aria-controls="tab-dashboard" aria-selected="false"><i className="fa fa-list"></i> Dashboard</a>}
										    </li>
										    <li className="nav-item" data-tip data-for="downloadTip">
												{params.tab === 'downloads' ?
										        <a className="nav-link active" id="tab-downloads-link" data-toggle="tab" href="#tab-downloads" role="tab" aria-controls="tab-downloads" aria-selected="true"><i className="fa fa-download" ></i> Downloads</a>
										    	:<a className="nav-link" id="tab-downloads-link" data-toggle="tab" href="#tab-downloads" role="tab" aria-controls="tab-downloads" aria-selected="false"><i className="fa fa-download" ></i> Downloads</a>}
												<ReactTooltip id="downloadTip" place="right" effect="solid">
													Files purchased and ready to download appear here.
												</ReactTooltip>
											</li>
										    <li className="nav-item" data-tip data-for="orderTip">
												{params.tab === 'orders' ?
										        <a className="nav-link active" id="tab-orders-link" data-toggle="tab" href="#tab-orders" role="tab" aria-controls="tab-orders" aria-selected="false"><i className="fa fa-bell"></i> Orders</a>
												:<a className="nav-link" id="tab-orders-link" data-toggle="tab" href="#tab-orders" role="tab" aria-controls="tab-orders" aria-selected="false"><i className="fa fa-bell"></i> Orders</a>}
												<ReactTooltip id="orderTip" place="right" effect="solid">
												Track your purchase history.
												</ReactTooltip>
											</li>
										    <li className="nav-item" data-tip data-for="accountTip">
												{params.tab === 'details' ?
										        <a className="nav-link active" id="tab-account-link" data-toggle="tab" href="#tab-account" role="tab" aria-controls="tab-account" aria-selected="false"><i className="fa fa-user"></i> Account Details</a>
												:<a className="nav-link" id="tab-account-link" data-toggle="tab" href="#tab-account" role="tab" aria-controls="tab-account" aria-selected="false"><i className="fa fa-user"></i> Account Details</a>}
												<ReactTooltip id="accountTip" place="right" effect="solid">
												Manage your personal information.
												</ReactTooltip>
											</li>
											{!JSON.parse(localStorage.getItem('user')).google_id ?
										    <li className="nav-item">
												{params.tab === 'change_password' ?
										        <a className="nav-link active" id="tab-change-link" data-toggle="tab" href="#tab-change" role="tab" aria-controls="tab-change" aria-selected="false"><i className="fa fa-user"></i> Change Password</a>
												:<a className="nav-link" id="tab-change-link" data-toggle="tab" href="#tab-change" role="tab" aria-controls="tab-change" aria-selected="false"><i className="fa fa-user"></i> Change Password</a>}
											</li>
											:null}
										    <li className="nav-item">
										        <a className="nav-link" href={'/'}  onClick={() => localStorage.clear()}><i className="fa fa-power-off"></i> Sign Out</a>
										    </li>
										</ul>
				            		</aside>

				            		<div className="col-md-10 col-lg-10">
				            			<div className="tab-content">
											{params.tab === undefined ?
										    <div className="tab-pane fade show active" id="tab-dashboard" role="tabpanel" aria-labelledby="tab-dashboard-link">
										    	<p>Hello <span className="font-weight-normal text-dark">{username}</span> (Not <span className="font-weight-normal text-dark">User</span>? <Link to={'/'} onClick={() => localStorage.clear()}>Log out</Link>) 
										    	<br/>
										    	From your account dashboard you can view your downloads, view your  orders, and edit your password and account details.</p>
										    </div>
											:<div className="tab-pane fade" id="tab-dashboard" role="tabpanel" aria-labelledby="tab-dashboard-link">
											<p>Hello <span className="font-weight-normal text-dark">{username}</span> (Not <span className="font-weight-normal text-dark">User</span>? <Link to={'/'} onClick={() => localStorage.clear()}>Log out</Link>) 
											<br/>
											From your account dashboard you can view your downloads, view your  orders, and edit your password and account details.</p>
										</div>}

										{params.tab === 'orders' ?
										    <div className="tab-pane fade show active" id="tab-orders" role="tabpanel" aria-labelledby="tab-orders-link">
										   	 <div className="page-content">
										        <div className="container">
										        {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
												{this.state.inv_orders  &&
										          <table className="table table-wishlist table-mobile">
										            <thead>
										              <tr>
										                <th className="pop-fo">Order id</th>
										                <th className="pop-fo">Template Names</th>
										                <th className="pop-fo">Price</th>
										                <th className="pop-fo">Date</th>
										                {/* <th>Action</th> */}
										                <th />
										                <th />
										              </tr>
										            </thead>
										            <tbody>
										            {this.state.inv_orders.map(
														order =>
										              <tr>
										                <td className="pop-fo">{order.id}</td>
										                <td className="pop-fo">
										                    <h3 className="product-title">
										                      {order.template_names}
										                    </h3>{/* End .product-title */}
										                </td>
										                <td className="pop-fo">{this.state.sign} {parseFloat(order.grand_total /this.state.exhangerate).toFixed(2)}</td>
										                <td>{moment(order.updated_at).format("DD MMM YYYY")}</td>
										                {/*<td className="action-col">
										                  <div className="dropdown">
										                    <button className="btn btn-block btn-outline-primary-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										                      <i className="icon-list-alt" />View Invoice
										                    </button>
										                  </div>
										                </td>*/}
										              </tr>
										              )}
										            </tbody>
										          </table>
										      }
										        </div>{/* End .container */}
										      </div>
										    	{/* <p>No order has been made yet.</p>
										    	<a href="products.php" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></a>*/}
										    </div>
											:<div className="tab-pane fade" id="tab-orders" role="tabpanel" aria-labelledby="tab-orders-link">
											<div className="page-content">
											<div className="container">
											{this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
											{this.state.inv_orders  &&
											  <table className="table table-wishlist table-mobile">
												<thead>
												  <tr>
													<th className="pop-fo">Order id</th>
													<th className="pop-fo">Invoice id</th>
													<th className="pop-fo">Digital Assets Names</th>
													<th className="pop-fo">Price</th>
													<th className="pop-fo">Date</th>
													{/* <th>Action</th> */}
													<th />
													<th />
												  </tr>
												</thead>
												<tbody>
												{this.state.inv_orders.map(
													order =>
												  <tr>
													<td>{order.id}</td>
													<td>{order.invoice_id}</td>
													<td>
														<h3 className="product-title">
														  {order.template_names}
														</h3>{/* End .product-title */}
													</td>
													<td>{this.state.sign} {parseFloat(order.grand_total /this.state.exhangerate).toFixed(2)}</td>
													<td>{moment(order.updated_at).format("DD MMM YYYY")}</td>
													{/*<td className="action-col">
													  <div className="dropdown">
														<button className="btn btn-block btn-outline-primary-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														  <i className="icon-list-alt" />View Invoice
														</button>
													  </div>
													</td>*/}
												  </tr>
												  )}
												</tbody>
											  </table>
										  }
											</div>{/* End .container */}
										  </div>
											{/* <p>No order has been made yet.</p>
											<a href="products.php" className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></a>*/}
										</div>
										}

										{params.tab === 'downloads' ?
										<div  className="tab-pane fade active show" id="tab-downloads" role="tabpanel" aria-labelledby="tab-downloads-link">
										{this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
										{this.state.orders  &&
											<div className="container-fluid row">
												<h2 className="title text-left mb-2 col-md-12">Downloads</h2>
												<p className="col-md-12">(Note: Users will only be able to download the files twice)</p>
												{this.state.orders.map(
															template =>
													<article className="entry entry-list col-md-6">
														<div className="row align-items-center">
															<div className="col-md-2">
																<figure className="entry-media" style={{height: '113px',width:'110px'}}>
																	<a href="javascript:void">
																		<img src={'https://data.artaux.io/images/template/'+template.product_image } alt="image desc" style={{height: '113px'}}/>
																	</a>
																</figure>
															</div>
                                                              &nbsp;
															  &nbsp;
															  &nbsp;
															<div className="col-md-9">
																<div className="entry-body">
																	<h2 className="entry-title">
																		<a href="javascript:void">{template.product_name}</a>
																	</h2>
																	<div className="entry-cats font-weight-bold">
																		Purchased On: {moment(template.updated_at).format("DD MMM YYYY")}| <i className="fa fa-file-excel-o"></i> {template.product_filetype}
																	</div>
																	<div className="entry-content">
																		<a className="btn btn-primary text-white" onClick={this.updateDownload.bind(this,template.id)} href={'https://data.artaux.io/images/template/'+template.product_file } download> <i className="fa fa-download"></i> Download Now({template.download})</a>
																	</div>
																</div>
															</div>
														</div><hr/>
													</article>
												)}
											</div>
										}
										</div>
										:<div  className="tab-pane fade" id="tab-downloads" role="tabpanel" aria-labelledby="tab-downloads-link">
										{this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
										{this.state.orders  &&
											<div className="container-fluid row">
												<h2 className="title text-left mb-2 col-md-12">Downloads</h2>
												<p className="col-md-12">(Note: Users will only be able to download the files twice)</p>
												{this.state.orders.map(
															template =>
													<article className="entry entry-list col-md-6">
														<div className="row align-items-center">
															<div className="col-md-2">
																<figure className="entry-media" style={{height: '113px',width:'100px'}}>
																	<a href="javascript:void">
																		<img src={'https://data.artaux.io/images/template/'+template.product_image } alt="image desc" style={{height: '113px'}}/>
																	</a>
																</figure>
															</div>

															<div className="col-md-9">
																<div className="entry-body">
																	<h2 className="entry-title">
																		<a href="javascript:void">{template.product_name}</a>
																	</h2>
																	<div className="entry-cats font-weight-bold">
																		Purchased On: {moment(template.updated_at).format("DD MMM YYYY")}| <i className="fa fa-file-excel-o"></i> {template.product_filetype}
																	</div>
																	<div className="entry-content">
																		<a className="btn btn-primary text-white" onClick={this.updateDownload.bind(this,template.id)} href={'https://data.artaux.io/images/template/'+template.product_file } download> <i className="fa fa-download"></i> Download Now({template.download})</a>
																	</div>
																</div>
															</div>
														</div><hr/>
													</article>
												)}
											</div>
										}
										</div>}

										{params.tab === 'details' ?
										<div className="tab-pane fade show active col-md-8" id="tab-account" role="tabpanel" aria-labelledby="tab-account-link">
											<form onSubmit={this.updateAccount.bind(this)} method="POST">
												<label>Name *</label>
												<input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInput} required />
												<input type="hidden" className="form-control" name="user_id" value={this.state.id} required />

												<label>Email address *</label>
												<input type="email" className="form-control" disabled = {true} value={this.state.email}  required />

												<label>Profession *</label>
												<input type="text" className="form-control" name="profession" value={this.state.profession} onChange={this.handleInput} required />

												<button type="submit" className="btn btn-primary">
													<span>{this.state.isLoading ? <i className="fa fa-spinner"></i> :<i className="fa fa-check"></i>} Save</span>
													{/* <i className="icon-long-arrow-right"></i> */}
												</button>
											</form>
										</div>
										:<div className="tab-pane fade col-md-8" id="tab-account" role="tabpanel" aria-labelledby="tab-account-link">
											<form onSubmit={this.updateAccount.bind(this)} method="POST">
												<label>Name *</label>
												<input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInput} required />
												<input type="hidden" className="form-control" name="user_id" value={this.state.id} required />

												<label>Email address *</label>
												<input type="text" className="form-control" disabled = {true} value={this.state.email}  required />

												<label>Profession *</label>
												<input type="text" className="form-control" name="profession" value={this.state.profession} onChange={this.handleInput} required />

												<button type="submit" className="btn btn-primary">
													<span>{this.state.isLoading ? <i className="fa fa-spinner"></i> :<i className="fa fa-check"></i>}Save</span>
													{/* <i className="icon-long-arrow-right"></i> */}
												</button>
											</form>
										</div>
										}

										{params.tab === 'change_password' ?
										<div className="tab-pane fade show active col-md-8" id="tab-change" role="tabpanel" aria-labelledby="tab-change-link">
											<form onSubmit={this.updatePassword.bind(this)} method="POST" id="changePasswordForm">
												<div className="row">		
													<label>Old Password *</label>
													<input type="password" className="form-control" name="old_pwd" id="old_pwd" value={this.state.old_pwd} onChange={this.handleInput} required />
													<input type="hidden" className="form-control" name="user_id" value={this.state.id} required />
												</div>
												<div className="row">
													<label>New Password *</label>
													<input type="password" className="form-control" name="new_pwd" id="new_pwd" value={this.state.new_pwd} onChange={this.handleInput}  required />
												</div>
												<div className="row">
													<label>Confirm Password *</label>
													<input type="password" className="form-control" name="comfirm_pwd" id="comfirm_pwd" value={this.state.comfirm_pwd} onChange={this.handleInput} required />
												</div>
												<div className="row">
													<button type="submit" className="btn btn-primary">
														<span>{this.state.isLoading ? <i className="fa fa-spinner"></i> :<i className="fa fa-check"></i>} Update</span>
														<i className="icon-long-arrow-right"></i>
													</button>
												</div>
											</form>
										</div>
										:<div className="tab-pane fade col-md-8" id="tab-change" role="tabpanel" aria-labelledby="tab-change-link">
	   										<form onSubmit={this.updatePassword.bind(this)} method="POST" id="changePasswordForm">
												<div className="row">		
													<label>Old Password *</label>
													<input type="password" className="form-control" name="old_pwd" id="old_pwd" value={this.state.old_pwd} onChange={this.handleInput} required />
													<input type="hidden" className="form-control" name="user_id" value={this.state.id} required />
												</div>
												<div className="row">
													<label>New Password *</label>
													<input type="password" className="form-control" name="new_pwd" id="new_pwd" value={this.state.new_pwd} onChange={this.handleInput}  required />
												</div>
												<div className="row">
													<label>Confirm Password *</label>
													<input type="password" className="form-control" name="comfirm_pwd" id="comfirm_pwd" value={this.state.comfirm_pwd} onChange={this.handleInput} required />
												</div>
												<div className="row">
												<button type="submit" className="btn btn-primary">
													<span>{this.state.isLoading ? <i className="fa fa-spinner"></i> :<i className="fa fa-check"></i>} Update</span>
													<i className="icon-long-arrow-right"></i>
												</button>
												</div>
											</form>
										</div>
										}
									{/* <div className="tab-pane fade" id="tab-address" role="tabpanel" aria-labelledby="tab-address-link">
										<p>The following addresses will be used on the checkout page by default.</p>

										<div className="row">
											<div className="col-lg-6">
												<div className="card card-dashboard">
													<div className="card-body">
														<h3 className="card-title">Billing Address</h3>
														<p>User Name<br/>
														User Company<br/>
														John str<br/>
														New York, NY 10001<br/>
														1-234-987-6543<br/>
														yourmail@mail.com<br/>
														<a href="#">Edit <i className="icon-edit"></i></a></p>
													</div>
												</div>
											</div>

											<div className="col-lg-6">
												<div className="card card-dashboard">
													<div className="card-body">
														<h3 className="card-title">Shipping Address</h3>
														<p>You have not set up this type of address yet.<br/>
														<a href="#">Edit <i className="icon-edit"></i></a></p>
													</div>
												</div>
											</div>
										</div>
									</div> */}
										
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

export default Account;