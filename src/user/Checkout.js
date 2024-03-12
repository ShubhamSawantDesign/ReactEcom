import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { timers } from "jquery";

const client = {
    sandbox:    'AX10ES3JSKrkBYvEVW1pWN153Ul8TNGJJF5k_4fPUwmSOxF12YahnLWqGhhizFdFmltQ0GVJcNgP19EW',
    production: 'AbqXfa7fOJlGFazORMnrfvra5XVhvmisdySSBgzwH3XtLDUU3FtY_0S0-pB4ASayozlEHTPyjEJR4k79',
}

class Checkout extends React.Component {
	constructor() {
        super();
        if(localStorage.getItem('user')){
        this.state = {
            data: [],
            id:'',
            amount: 100,
			name:JSON.parse(localStorage.getItem('user')).name,
			email:JSON.parse(localStorage.getItem('user')).email,
			country:JSON.parse(localStorage.getItem('user')).country,
			city:JSON.parse(localStorage.getItem('user')).city,
            state:JSON.parse(localStorage.getItem('user')).state,
        }
        }
        this.changeAmount = this.changeAmount.bind(this);
        this.openCheckout = this.openCheckout.bind(this);
        
    }

    changeAmount(e) {
        this.setState({amount: e.target.value})
      }

      openCheckout() {
        if(this.state.country === '' || this.state.city === '' || this.state.state === '' || this.state.email === '' || this.state.name === ''){
            Swal.fire({
                title: "Please fill all details to continue.",
                text: '',
                type: "error",
                icon:"error",
            });
        }else{
          const price = parseFloat(this.state.GrandPrice /this.state.exhangerate).toFixed(2);
            let options = {
            // "key": "rzp_test_BgNploSiDbpKmI",
            "key": "rzp_live_QlN4oRfzA2Qkty",
            "amount": price * 100, // 2000 paise = INR 20, amount in paisa
            "name": "Artaux",
            "description": "Purchase template",
            "image": "/assets/images/frontend_images/artaux.png",
            "handler": function (response){
                
                this.setState({payment_method : 'Razorpay'});
                this.setState({payment_id : response.razorpay_payment_id});
                // console.log('payment_id',this.state.payment_id)
                this.placeOrder();
            }.bind(this),
            "prefill": {
                "name": this.state.name,
                "email": this.state.email
                
            },
            "notes": {
                "address": "Hello World"
            },
            "theme": {
                "color": "#9f66d3"
            }
            };
        
            let rzp = new window.Razorpay(options);
            rzp.open();
        }
    }

    

    componentDidMount() {
        if(!localStorage.getItem('user')){
            var username = 'User';
            this.props.history.push("../user-login");
            window.location.reload();
        }
        this.getCart();
         this.getchangeCurrency();
    }

    async getCart() {
        const email = JSON.parse(localStorage.getItem('user')).email;
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/get_cart/${email}`);
        if(response.data.cart){
            this.setState({ 
                cart: response.data.cart,
                totalPrice: response.data.total_price,
                cartId: response.data.cart.id,
                cartVendorId: response.data.cart.vendor_id,
                cartdiscount: response.data.cart.discount,
                cartPrice: response.data.cart.price,
                isLoading: false});
            // this.setState({templateNumber : this.state.templates.length});
            console.log('discount',this.state.cart)
            if(localStorage.getItem('currency') == 'INR'){
            	// const gstPrice = this.state.totalPrice*18/100;
                const gstPrice = this.state.totalPrice*0/100;
            	const grandPrice = this.state.totalPrice + gstPrice;
            	this.setState({
                GrandPrice: grandPrice,
                GstPrice: gstPrice,
                });
            }else{
            	this.setState({
                GrandPrice: this.state.totalPrice,
                });
            }
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            // this.props.history.push("../admin-view-template");
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

	handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});   
    }

    placeOrder = async (e) => {
        // e.preventDefault();
        this.setState({ placeOrderisLoading: true });
        if(localStorage.getItem('user')){
			var tk= localStorage.getItem('token').replace(/['"]+/g, '');
            const user_email = JSON.parse(localStorage.getItem('user')).email;
            const user_id = JSON.parse(localStorage.getItem('user')).id;
            const formData = new FormData();
            formData.append('user_id', user_id);
            formData.append('totalPrice', this.state.GrandPrice);
            formData.append('name', this.state.name);
            formData.append('country', this.state.country);
            formData.append('city', this.state.city);
            formData.append('state', this.state.state);
            formData.append('email', this.state.email);
            formData.append('user_email', user_email);
            formData.append('payment_id', this.state.payment_id);
            formData.append('payment_method', this.state.payment_method);
            formData.append('currency',localStorage.getItem('currency'));
            const res = await axios.post('api/auth/place_order?token='+tk,formData);
           
                if(res.data.status === 200){
                    Swal.fire({
                        title: "Order Placed!",
                        text: 'Order place successfully',
                        type: "success",
                        icon:"success",
                    });
                    this.setState({ placeOrderisLoading: false });
                    this.props.history.push("/account/downloads");
                }else if(res.data.status === 423){
                    Swal.fire({
                        title: "Order not Plcaced",
                        text:res.data.message,
                        type: "error",
                    });
                    this.setState({ placeOrderisLoading: false });
                    // this.props.history.push("../admin-contributer_view_template");
                }
           

        }else{
            Swal.fire({
                title: "Login needed!",
                text:'Please login first',
                type: "error",
            });
            this.props.history.push("../admin-contributer_view_template");
            this.setState({ placeOrderisLoading: false });
        }
       
    }

    paypalPayment(res){
           
            this.setState({payment_method : 'Paypal'});
            this.setState({payment_id : res.paymentID});
            // console.log(this.state);
            this.placeOrder();
    };
    paypalPaymentCancel(data){
           
        Swal.fire({
            title: "Payment Cancel!",
            text: data,
            type: "error",
            icon:"error",
        });
    };
    paypalPaymentError(res){
           
        Swal.fire({
            title: "Payment Cancel!",
            text: res,
            type: "error",
            icon:"error",
        });
    };
    render(){
        if(!localStorage.getItem('user')){
            var username = 'User';
            this.props.history.push("../user-login");
            window.location.reload();
        }
        return(
            <div>
                <Navbar />

                <main className="main">
			        <nav aria-label="breadcrumb" className="breadcrumb-nav">
			            <div className="container-fluid">
			                <ol className="breadcrumb">
			                    <li className="breadcrumb-item"><a href="index.php"><i className="fa fa-home"></i> Home</a></li>
			                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
			                </ol>
			            </div>
			        </nav>

			        <div className="page-content">
			            <div className="checkout">
			                <div className="container-fluid">
			                    {/* <form method="post" onSubmit={this.placeOrder.bind(this)}> */}
			                    <form method="post" onSubmit={this.placeOrder.bind(this)}>
			                        <div className="row">
			                            <div className="col-lg-9">
			                                <h2 className="checkout-title">Billing Details <span style={{fontSize:"12px"}}>(Input fields shown below are mandatory for tax purposes.{localStorage.getItem('currency') === 'USD' && ' without filling all details you cant see place order button.' })
</span></h2>
			                                <div className="row">
			                                    <div className="col-sm-6">
			                                        <label className="field-required">Name</label>
			                                        <input type="text" className="form-control" name="name" id="name"  value={this.state.name} onChange={this.handleInput} required=""/>
			                                    </div>

			                                    <div className="col-sm-6">
			                                        <label className="field-required">Email</label>
			                                        <input type="email" className="form-control" name="email" id="email" required value={this.state.email} onChange={this.handleInput} required=""/>
			                                    </div>
			                                </div>

			                                <div className="row">
			                                    <div className="col-sm-4">
					                                <label className="field-required">Country </label>
					                                <input type="text" className="form-control" name="country" id="country" required value={this.state.country} onChange={this.handleInput} required=""/>
			                                    </div>

			                                    <div className="col-sm-4">
			                                        <label className="field-required">Town / City </label>
			                                        <input type="text" className="form-control" name="city" id="city" required value={this.state.city} onChange={this.handleInput} required=""/>
			                                    </div>

                                                <div className="col-sm-4">
                                                    <label className="field-required">State </label>
                                                    <input type="text" className="form-control" name="state" id="state" required value={this.state.state} onChange={this.handleInput} required=""/>
                                                </div>
			                                </div>
			                            </div>
			                            <aside className="col-lg-3">
			                                <div className="summary">
			                                    <h3 className="summary-title">Your Order</h3>
												{this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                        			{this.state.cart  &&
														<table className="table table-summary">
															<thead>
																<tr>
																	<th>Template</th>
																	<th>Total</th>
																</tr>
															</thead>

															<tbody>
															{this.state.cart.map(
																(cart, index) =>
																<tr key={index++}>
																	<td>{cart.product_name}</td>
																	<td><span>{this.state.sign}</span> {parseFloat(cart.price /this.state.exhangerate).toFixed(2)}</td>
																</tr>
																)}
																<tr className="summary-total">
																	<td>Total:</td>
																	<td><span>{this.state.sign}</span> {parseFloat(this.state.totalPrice /this.state.exhangerate).toFixed(2)}</td>
																</tr>
																{localStorage.getItem('currency') === 'INR' &&
																<tr className="summary-total">
																	<td>GST(0%):</td>
																	<td><span>{this.state.sign}</span>{parseFloat(this.state.GstPrice).toFixed(2)}</td>
																</tr>
																}
																<tr className="summary-total">
																	<td>Grand Total:</td>
																	<td><span>{this.state.sign}</span> {parseFloat(this.state.GrandPrice /this.state.exhangerate).toFixed(2)}</td>
																</tr>
															</tbody>
														</table>
													}
                                                <span> All purchases are subject to terms stated in the <a href={"cms-page/license"}>End User License Agreement.</a> Please make sure you read and understand all the terms.</span>
                                                {localStorage.getItem('currency') === 'INR' ?
			                                    <button type="button" onClick={this.openCheckout} className="btn btn-outline-primary-2 btn-order btn-block">
                                                    {this.state.placeOrderisLoading && <img src="/assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> }
			                                        <span className="btn-text btn-lg">Place Order</span>
			                                        <span className="btn-hover-text btn-lg">Proceed to Pay</span>
			                                    </button>
                                                :this.state.country === '' || this.state.city === '' || this.state.state === '' || this.state.email === '' || this.state.name === '' ?<p></p>:
                                                <div className="text-center">
                                                    <PaypalExpressBtn env="sandbox" client={client} currency={localStorage.getItem('currency')} total={parseFloat(this.state.GrandPrice /this.state.exhangerate).toFixed(2)} onSuccess={this.paypalPayment.bind(this)} onCancel={this.paypalPaymentCancel.bind(this)} onError={this.paypalPaymentError.bind(this)}/>
                                                    {this.state.placeOrderisLoading &&<img src="/assets/images/frontend_images/ajax-loader.gif" alt="loading1...." style={{height:'15px'}}/>}
                                                </div>
                                                }
                                               
                                                

			                                </div>
			                            </aside>
			                        </div>
			                    </form>
			                </div>
			            </div>
			        </div>
			    </main>

                <Footer />
            </div>
        )
    }
}

export default Checkout;