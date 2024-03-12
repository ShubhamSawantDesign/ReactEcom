import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import $ from 'jquery';
import Swal from 'sweetalert2';
import 'jquery-validation';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OwlCarousel from 'react-owl-carousel2';
import {FacebookShareButton, FacebookIcon,WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon, TelegramShareButton , TelegramIcon} from "react-share";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import GoogleLogin from 'react-google-login';
import MetaTags from 'react-meta-tags';


const templates = {
    items: 5,
    nav: false,
    rewind: true,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 20,
    responsive: {
        "0": {
            "items":2
        },
        "480": {
            "items":2
        },
        "768": {
            "items":3
        },
        "992": {
            "items":5
        },
        "1440": {
            "items":5
        }
    }
};


class Product extends React.Component {
    
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
            exhangerate:'',
            email : '',
            password: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getTemplates();
        this.getchangeCurrency();
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
            this.props.history.go(0);
        }else if(res.data.status === 401){
        	Swal.fire({
				position: 'center',
				timer: 8000,
        		title: "Failed! to login please check your email and password",
        		text: res.data.message,
        		icon: "error",
				showConfirmButton: false,
        	});
			this.setState({ LoginisLoading: false });
        	// this.props.history.push("../user-login");
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
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: `Ok`,
                    // showConfirmButton: false,
                    icon: "success",
                    // timer: 8000
                    // denyButtonText: ``,
                  }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
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
                        this.props.history.go(0);
                    } else if (result.isDenied) {
                    //   Swal.fire('Changes are not saved', '', 'info')
                    }
                  })	
			
				
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
				// this.props.history.push("../user-login");
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
    
    async getTemplates() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/get_template/${params.id}`);
        if(response.data.templates){
            this.setState({ 
                templateImage: response.data.templates.image,
                templateCatname: response.data.templates.category_name,
                templateId: response.data.templates.id,
                templateFiletype: response.data.templates.file_type,
                templateCompatibility: response.data.templates.add_desc,
                templateTitle: response.data.templates.title,
                templateCatId: response.data.templates.category,
                youtube: response.data.templates.youtube,
                templateUploaded: response.data.templates.uploaded_by,
                templatetags: response.data.templates.tags,
                templateVendorId: response.data.templates.vendor_id,
                templatePrice: response.data.templates.price,
                product_price: response.data.product_price,
                discount: response.data.templates.discount,
                templateDesc: response.data.templates.description,
                 isLoading: false});
            // this.setState({templateNumber : this.state.templates.length});
            this.catChange(this.state.templateCatId);
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-template");
        }
    }

    async catChange(id) {
        this.setState({ isLoading: true });
        const response = await axios.get('api/vendor_auth/chk_id/'+id);
        if(response.data.status == 200){
            $(".dis-n").show();
            $(".dis-n1").hide();
        }else{
            $(".dis-n").hide();
            $(".dis-n1").show();
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

    addToCart = async (e) => {
        e.preventDefault();
        const { match: { params } } = this.props;
        if(localStorage.getItem('user')){
            const user_email = JSON.parse(localStorage.getItem('user')).email;
            const formData = new FormData();
            formData.append('product_id', this.state.templateId);
            formData.append('product_name', this.state.templateTitle);
            formData.append('image', this.state.templateImage);
            formData.append('price', this.state.product_price);
            formData.append('discount', this.state.discount);
            formData.append('file_type', this.state.file_type);
            formData.append('vendor_id', this.state.templateVendorId);
            formData.append('currency',localStorage.getItem('currency'));
            formData.append('user_email', user_email);
            const res = await axios.post('api/auth/add_to_cart',formData);
           
                if(res.data.status === 200){
                    Swal.fire({
                        title:  "Digital asset added to cart successfully",
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: `Ok`,
                        // showConfirmButton: false,
                        icon: "success",
                        // timer: 8000
                        // denyButtonText: ``,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            this.props.history.go(0);
                        } else if (result.isDenied) {
                        //   Swal.fire('Changes are not saved', '', 'info')
                        }
                      })		
                }else if(res.data.status === 423){
                    Swal.fire({
                        title: "Product Exist",
                        text:res.data.message,
                        type: "error",
                    });
                    // this.props.history.push("../admin-contributer_view_template");
                }
        }else{
            Swal.fire({
                title: "Login needed!",
                text:'Please login first',
                type: "error",
            });
            // this.props.history.go(0);
        }
       
    }

    addToWishlist = async (e) => {
        e.preventDefault();
        const { match: { params } } = this.props;
        if(localStorage.getItem('user')){
            const user_email = JSON.parse(localStorage.getItem('user')).email;
            const formData = new FormData();
            formData.append('product_id', this.state.templateId);
            formData.append('product_name', this.state.templateTitle);
            formData.append('image', this.state.templateImage);
            formData.append('price', this.state.product_price);
            formData.append('discount', this.state.discount);
            formData.append('file_type', this.state.file_type);
            formData.append('vendor_id', this.state.templateVendorId);
            formData.append('currency',localStorage.getItem('currency'));
            formData.append('user_email', user_email);
            const res = await axios.post('api/auth/add_to_wishlist',formData);
           
                if(res.data.status === 200){
                    Swal.fire({
                        title:  "Digital asset added to wishlist successfully",
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: `Ok`,
                        // showConfirmButton: false,
                        icon: "success",
                        // timer: 8000
                        // denyButtonText: ``,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            this.props.history.go(0);
                        } else if (result.isDenied) {
                        //   Swal.fire('Changes are not saved', '', 'info')
                        }
                      })		

                    
                }else if(res.data.status === 423){
                    Swal.fire({
                        title: "Product Exist",
                        text:res.data.message,
                        type: "error",
                    });
                    // this.props.history.push("../admin-contributer_view_template");
                }
        }else{
            Swal.fire({
                title: "Login needed!",
                text:'Please login first',
                type: "error",
            });
            // this.props.history.go(0);
        }
       
    }

    render(){
        const desc = this.state.templateDesc ? this.state.templateDesc.substring(0, 200) : '';
        return(
            <div>
                <Navbar />
                <MetaTags>
                    <title>Artaux | Celebrating Creativity</title>
                    <meta name="description" content={desc} />
                    <meta property="og:title" content={this.state.templateTitle} />
                    <meta property="og:image" content={"https://data.artaux.io/images/template/"+this.state.templateImage} />
                </MetaTags>
                <main className="main">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                        <div className="container-fluid d-flex align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
                                <li className="breadcrumb-item">{this.state.templateCatname}</li>
                                <li className="breadcrumb-item active" aria-current="page">{this.state.templateTitle}</li>
                            </ol>
                        </div>
                    </nav>

                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="product-details-top">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="product-gallery product-gallery-vertical">
                                            <div className="row">
                                                <figure className="product-main-image">
                                                    {this.state.youtube ?
                                                    <Popup trigger={<img id="" src={"https://data.artaux.io/images/template/"+this.state.templateImage} data-zoom-image={"https://data.artaux.io/images/template/"+this.state.templateImage} alt="product image" />} modal className="dis" >
                                                        <div>
                                                        <iframe width="100%" height="315" src={"https://www.youtube.com/embed/"+this.state.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                        </div>
                                                    </Popup>
                                                    :
                                                    <img id="product-zoom" className="" src={"https://data.artaux.io/images/template/"+this.state.templateImage}  data-zoom-image={'https://data.artaux.io/images/template/'+this.state.templateImage} alt="{this.state.templateTitle}" style={{display:"block"}}/>
                                                    }
                                                    {/* <Link to="#" id="btn-product-gallery" className="btn-product-gallery">
                                                        <i className="icon-arrows"></i>
                                                    </Link> */}
                                                </figure>

                                                {/* <div id="product-zoom-gallery" className="product-image-gallery">
                                                    <Link className="product-gallery-item active" href="#" data-image="../images/products/single/1.jpg" data-zoom-image="../images/products/single/1-big.jpg">
                                                        <img src="assets/images/frontend_images/products/single/1-small.jpg" alt="" />
                                                    </Link>

                                                   
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="product-details">
                                            <h1 className="product-title text-capitalize">{this.state.templateTitle}</h1>

                                            <div className="ratings-container">
                                                <p id="review-link">Product By: {this.state.templateUploaded}</p>
                                            </div>

                                            <div className="product-price">
                                                <span>{this.state.sign}</span> {parseFloat(this.state.product_price /this.state.exhangerate).toFixed(2)}
                                                {this.state.discount != 0 ?
                                                <small className="ml-2 old-amt"> <span>{this.state.sign}</span> {parseFloat(this.state.templatePrice /this.state.exhangerate).toFixed(2)}</small> 
                                                :null}
                                            </div>

                                            <div className="product-content">
                                                <p dangerouslySetInnerHTML={{ __html: desc + "..."}}></p>
                                            </div>

                                            <div className="product-details-action">
                                                {localStorage.getItem('user') ?
                                                <Link to="#" onClick={this.addToCart} className="btn btn-primary btn-shadow mr-2 mt-1"><span>Add to cart</span></Link>
                                                :
                                                <Popup trigger={<a href="#" className="btn btn-primary btn-shadow mr-2 mt-1"><span>Add to cart</span></a>} modal>
                                                    <div className="p-3">
                                                        <ul className="nav nav-pills nav-fill">
                                                            <li className="nav-item">
                                                                <div className="nav-link active" id="signin-tab-2">Sign in to Artaux</div>
                                                            </li>
                                                        </ul>
                                                        <form method="post" onSubmit={this.loginUser.bind(this)}  id="loginForm">
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
                                                                <button type="submit" className="btn btn-primary btn-shadow mr-2">
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
                                                                <Link to="../forgot-password/" className="forgot-link ml-3">Forgot Password?</Link>
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
                                                </Popup>
                                                }
                                                {localStorage.getItem('user') ?
                                                    <Link to="#" onClick={this.addToWishlist} className="btn btn-primary btn-shadow mt-1" title="Wishlist"><span>Add to Wishlist</span></Link>
                                                    :
                                                    <Popup trigger={<a href="#" className="btn btn-primary btn-shadow mt-1" title="Wishlist"><span>Add to Wishlist</span></a>} modal>
                                                        <div className="p-3">
                                                            <ul className="nav nav-pills nav-fill">
                                                                <li className="nav-item">
                                                                    <div className="nav-link active" id="signin-tab-2">Sign in to Artaux</div>
                                                                </li>
                                                            </ul>
                                                            <form method="post" onSubmit={this.loginUser.bind(this)}  id="loginForm">
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
                                                                    <button type="submit" className="btn btn-primary btn-shadow mr-2" >
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
                                                                    <Link to="../forgot-password/" className="forgot-link ml-3">Forgot Password?</Link>
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
                                                    </Popup>
                                                    }
                                            </div>

                                            <div className="product-details-footer">
                                                <div className="product-cat">
                                                    <p className="mb-1">Product ID: #{this.state.templateId}</p>
                                                    <p className="mb-1">File Format:{this.state.templateFiletype}</p>
                                                    {this.state.templatetags &&
                                                    <p className="mb-1">Tags: {this.state.templatetags}</p>
                                                    }
                                                    {this.state.youtube &&
                                                    <Popup trigger={<Link to="#" className="btn btn-primary btn-shadow mr-2 text-white" style={{fontSize:"20px"}}><i className="fa fa-video-camera"></i><span>Watch Preview</span></Link>} modal className="dis-n" style={{display:"none"}}>
                                                        <div>
                                                        <iframe width="100%" height="315" src={"https://www.youtube.com/embed/"+this.state.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                        </div>
                                                    </Popup>
                                                    }
                                                    
                                                </div>
                                            </div>
                                            <div className="product-details-footer">
                                                <div className="social-icons social-icons-sm">
                                                    <span className="social-label">Share:</span>
                                                    <FacebookShareButton 
                                                        url={"https://data.artaux.io/product_"+this.state.templateId}
                                                        quote={this.state.templateTitle}
                                                    >
                                                        <FacebookIcon size={36} className="m-2" />
                                                    </FacebookShareButton>
                                                    <WhatsappShareButton 
                                                        url={"https://data.artaux.io/product_"+this.state.templateId}
                                                        title ={this.state.templateTitle}
                                                    >
                                                        <WhatsappIcon size={36} className="m-2" />
                                                    </WhatsappShareButton>
                                                    <TwitterShareButton 
                                                        url={"https://data.artaux.io/product_"+this.state.templateId}
                                                        title ={this.state.templateTitle}
                                                    >
                                                        <TwitterIcon size={36} className="m-2" />
                                                    </TwitterShareButton>
                                                    <TelegramShareButton 
                                                        url={"https://data.artaux.io/product_"+this.state.templateId}
                                                        title ={this.state.templateTitle}
                                                    >
                                                        <TelegramIcon size={36} className="m-2" />
                                                    </TelegramShareButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="product-details-tab">
                             <Tabs className="container">
                                <TabList >
                                <Tab>Description</Tab>
                                <Tab>Compatibility</Tab>
                                {/* <Tab>Review</Tab> */}
                                </TabList>

                                <TabPanel className="tab-pane fade show active" id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                                    <div className="product-desc-content">
                                    <p dangerouslySetInnerHTML={{ __html: this.state.templateDesc}}></p>    
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="product-desc-content">
                                         <p dangerouslySetInnerHTML={{ __html: this.state.templateCompatibility}}></p>  
                                    </div>
                                </TabPanel>
                                {/* <TabPanel >
                                        <div className="reviews">
                                            <h3>Reviews (2)</h3>
                                            <div className="review">
                                                <div className="row no-gutters">
                                                    <div className="col-auto">
                                                        <h4><Link to="#">Samanta J.</Link></h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings">
                                                                <div className="ratings-val" style={{width: "80%"}}></div>
                                                            </div>
                                                        </div>
                                                        <span className="review-date">6 days ago</span>
                                                    </div>
                                                    <div className="col">
                                                        <h4>Good, perfect size</h4>

                                                        <div className="review-content">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                                        </div>

                                                        <div className="review-action">
                                                            <Link to="#"><i className="icon-thumbs-up"></i>Helpful (2)</Link>
                                                            <Link to="#"><i className="icon-thumbs-down"></i>Unhelpful (0)</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="review">
                                                <div className="row no-gutters">
                                                    <div className="col-auto">
                                                        <h4><Link to="#">John Doe</Link></h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings">
                                                                <div className="ratings-val" style={{width: "100%"}}></div>
                                                            </div>
                                                        </div>
                                                        <span className="review-date">5 days ago</span>
                                                    </div>
                                                    <div className="col">
                                                        <h4>Very good</h4>

                                                        <div className="review-content">
                                                            <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                                        </div>

                                                        <div className="review-action">
                                                            <Link to="#"><i className="icon-thumbs-up"></i>Helpful (0)</Link>
                                                            <Link to="#"><i className="icon-thumbs-down"></i>Unhelpful (0)</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                             */}
                            </Tabs>
                            </div>

                            {/* <h2 className="title text-center mb-2">You May Also Like</h2>
                            <OwlCarousel options={templates} className="carousel-equal-height owl-simple">
                                        <div className="product">
                                            <span className="product-label label-sale">Sale</span>
                                            <figure className="product-media">
                                                <a href="../product/">
                                                    <img src="assets/images/frontend_images/products/p1.jpg" alt="Product image" className="product-image" />
                                                </a>
                                            </figure>
                                            <div className="product-body">
                                                <h3 className="product-title"><a href="../product/">Adobe after effects dance vibes effect</a></h3>
                                                <div className="product-price">
                                                    <span className="new-price">₹19.50</span>
                                                    <span className="old-price">Was ₹32.50</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <figure className="product-media">
                                                <a href="../product/">
                                                    <img src="assets/images/frontend_images/products/p2.jpg" alt="Product image" className="product-image" />
                                                </a>
                                            </figure>
                                            <div className="product-body">
                                                <h3 className="product-title"><a href="../product/">Sales report excel sheet file template</a></h3>
                                                <div className="product-price">
                                                    ₹17.34
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <span className="product-label label-sale">Sale</span>
                                            <figure className="product-media">
                                                <a href="../product/">
                                                    <img src="assets/images/frontend_images/products/p3.jpg" alt="Product image" className="product-image" />
                                                </a>
                                            </figure>
                                            <div className="product-body">
                                                <h3 className="product-title"><a href="../product/">Holi invitation party PSD template</a></h3>
                                                <div className="product-price">
                                                    <span className="new-price">₹14.95</span>
                                                    <span className="old-amt">Was ₹18.99</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <figure className="product-media">
                                                <a href="../product/">
                                                    <img src="assets/images/frontend_images/products/p4.jpg" alt="Product image" className="product-image" />
                                                </a>
                                            </figure>

                                            <div className="product-body">
                                                <h3 className="product-title"><a href="../product/">Professional resume template Docx</a></h3>
                                                <div className="product-price">
                                                    ₹17.99
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <figure className="product-media">
                                                <a href="../product/">
                                                    <img src="assets/images/frontend_images/products/p5.jpg" alt="Product image" className="product-image" />
                                                </a>
                                            </figure>

                                            <div className="product-body">
                                                <h3 className="product-title"><a href="../product/">Wedding invitation card AI template</a></h3>
                                                <div className="product-price">
                                                    ₹11.68
                                                </div>
                                            </div>
                                        </div>
                                    </OwlCarousel>
                                 */}
                        </div>
                    </div>
                </main>

                {/* Sticky Bar */}
                <div className="sticky-bar p-0">
                    <div className="container-fluid">
                        <div className="row p-1">
                            <div className="col-6">
                                <figure className="product-media">
                                    <Link to="product.php">
                                        <img src={"https://data.artaux.io/images/template/"+this.state.templateImage} alt="Product image" />
                                    </Link>
                                </figure>
                                <h4 className="product-title"><Link to="product.php">{this.state.templateTitle}</Link></h4>
                            </div>

                            <div className="col-6 justify-content-end">
                                <div className="product-price">
                                    <span>{this.state.sign}</span> {parseFloat(this.state.product_price /this.state.exhangerate).toFixed(2)}
                                    {this.state.discount != 0 ?
                                    <small className="ml-2 old-amt"> <span>{this.state.sign}</span> {parseFloat(this.state.templatePrice /this.state.exhangerate).toFixed(2)}</small> 
                                    :null}
                                </div>
                                {/* <div className="product-details-quantity">
                                    <input type="number" id="sticky-cart-qty" className="form-control" value="1" min="1" max="10" step="1" data-decimals="0" required>
                                </div> */}

                                <div className="product-details-action">
                                    
                                    
                                    {localStorage.getItem('user') ?
                                                <Link to="#!" onClick={this.addToCart} className="btn btn-primary btn-shadow"><span>Add To Cart</span></Link>
                                                :
                                                <Popup trigger={<a href="#" className="btn btn-primary btn-shadow"><span>Add To Cart</span></a>} modal>
                                                    <div className="p-3">
                                                        <ul className="nav nav-pills nav-fill">
                                                            <li className="nav-item">
                                                                <div className="nav-link active" id="signin-tab-2">Sign in to Artaux</div>
                                                            </li>
                                                        </ul>
                                                        <form method="post" onSubmit={this.loginUser.bind(this)}  id="loginForm">
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
                                                                <button type="submit" className="btn btn-primary btn-shadow mr-2">
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
                                                                <Link to="../forgot-password/" className="forgot-link ml-3">Forgot Password?</Link>
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
                                                </Popup>
                                                }
                                                {localStorage.getItem('user') ?
                                                    <Link to="#!" onClick={this.addToWishlist} className="btn-product btn-wishlist ml-2" title="Wishlist"><span>Add to Wishlist</span></Link>
                                                    :
                                                    <Popup trigger={<a href="#" className="btn-product btn-wishlist ml-2" title="Wishlist"><span>Add to Wishlist</span></a>} modal>
                                                        <div className="p-3">
                                                            <ul className="nav nav-pills nav-fill">
                                                                <li className="nav-item">
                                                                    <div className="nav-link active" id="signin-tab-2">Sign in to Artaux</div>
                                                                </li>
                                                            </ul>
                                                            <form method="post" onSubmit={this.loginUser.bind(this)}  id="loginForm">
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
                                                                    <button type="submit" className="btn btn-primary btn-shadow mr-2" >
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
                                                                    <Link to="../forgot-password/" className="forgot-link ml-3">Forgot Password?</Link>
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
                                                    </Popup>
                                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Product;