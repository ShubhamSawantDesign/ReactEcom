import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
 

class Footer extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            category:'',
            cart:'',
            totalPrice: '',
            cartId: '',
            cartVendorId: '',
            cartPrice:'',
            cartCount:0,

        }
    }

    componentDidMount() {
        this.getdata();
        this.getCart();
        if(localStorage.getItem('user') ){
            this.setState({ cartLink: '/cart'});
        }else{
            this.setState({ cartLink: '#'});
        }
        if(localStorage.getItem('currency')){
        this.setState({currency:localStorage.getItem('currency')});
        }else{
            this.setState({currency:'INR'});
             localStorage.setItem("currency","INR");
        }
       
    }

    async getdata() {
        this.setState({ isLoading: true });
        const response = await axios.get('/api/auth/get_footer_data');
        if(response.data.status == 200){
            this.setState({ 
                category: response.data.category,
                subcategory: response.data.subcategory,
                filetype: response.data.filetype,
                INR_rate: response.data.INR_rate.rate,
                USD_rate: response.data.USD_rate.rate,
                GBP_rate: response.data.GBP_rate.rate,
                EURO_rate: response.data.EURO_rate.rate,
                DIRHAM_rate: response.data.DIRHAM_rate.rate,
                 isLoading: false});
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
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }   
    }

    async getCart() {
        if(localStorage.getItem('user')){
        const email = JSON.parse(localStorage.getItem('user')).email;
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/get_cart/${email}`);
        if(response.data.cart){
            this.setState({ 
                cart: response.data.cart,
                totalPrice: response.data.total_price,
                cartId: response.data.cart.id,
                cartVendorId: response.data.cart.vendor_id,
                cartPrice: response.data.cart.price,
                cartCount: response.data.cartCount,
                wishlistCount: response.data.wishlistCount,
                 isLoading: false});
                 if(this.state.cartCount === 0 || this.state.cartCount === null ){
                    this.setState({cartCount:0 });
                 }
                 if(this.state.wishlistCount === 0 || this.state.wishlistCount === null ){
                    this.setState({wishlistCount:0 });
                 }
            // this.setState({templateNumber : this.state.templates.length});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-template");
        }
    }
    }

 

    async ChangeCurrency(e) {
        console.log('rate',this.state.changecurrency)
        localStorage.setItem("currency",this.state.changecurrency);
        // this.props.history.push("/");
    }
    
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    search = async (e) => {
        e.preventDefault();
             window.location.href="/search/"+this.state.keyword+"/"+this.state.file_type;
    }
    render(){
    return(
        <div>
            <footer className="footer footer-2">
                <div className="footer-middle">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-lg-6 col-xl-5">
                                <div className="widget widget-about">
                                    <img src="/assets/images/frontend_images/Artaux-01.svg" className="footer-logo" alt="Footer Logo" width="105" height="25" />
                                    
                                    <p>Artaux is a platform built in collaboration with artists from across the globe, who joined the forces to help people better express their already ingenious ideas.</p>
                                </div>
                            </div>

                            <div className="col-lg-6 col-xl-7">
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <div className="widget">
                                            <h4 className="widget-title">Information</h4>
                                            <ul className="widget-list">
                                                <li><a href={"/about"}>About Us</a></li>
                                                <li><a href={"/contact"}>Contact Us</a></li>
                                                <li><a href={"/cms-page/tems_of_use"}>Terms Of Use</a></li>
                                                <li><a href={"/policies"}>Our Policies</a></li>
                                                <li><a href={"/cms-page/agreement"}>Contributor Agreement</a></li>
                                                <li><a href={"/cms-page/license"}>End User License Agreement</a></li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="widget">
                                            <h4 className="widget-title">Contact Information</h4>
                                            <ul className="widget-list">
                                                <li><i className="icon-phone"></i>
			            								<a href="tel:+919372389474">+91 9372389474</a></li>
                                                <li><i className="icon-envelope"></i>
			            								<a href="mailto:info@artaux.io">info@artaux.io</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="container-fluid">
                        <p className="footer-copyright">Copyright © Artaux | All Rights Reserved.</p>

                        <div className="social-icons social-icons-color">
                            <span className="social-label">Follow Us On</span>
                            <a href="#" className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
                            <a href="#" className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
                            <a href="#" className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
                            <a href="#" className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube"></i></a>
                            <a href="#" className="social-icon social-pinterest" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </footer>

            <button id="scroll-top" title="Back to Top"><i className="icon-arrow-up"></i></button>

            <div className="mobile-menu-overlay"></div>

            <div className="mobile-menu-container">
                <div className="mobile-menu-wrapper">
                    <span className="mobile-menu-close"><i className="icon-close"></i></span>
                    
                    <form onSubmit={this.search.bind(this)} method="post" encType="multipart/form-data" className="mobile-search">
                        <label htmlFor="mobile-search" className="sr-only">Search</label>
                        <input type="search" className="form-control" name="keyword" id="search" value={this.state.keyword} onChange={this.handleInput} placeholder="Search template..." required autoFocus={true} />
                        <input type="hidden" id="file_type" name="file_type" value='All'  placeholder="Search template..." required autoFocus={true} />
                        <button className="btn btn-primary" type="submit"><i className="icon-search"></i></button>
                    </form>

                    <ul className="nav nav-pills-mobile" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="mobile-menu-link" data-toggle="tab" href="#mobile-menu-tab" role="tab" aria-controls="mobile-menu-tab" aria-selected="true">Currency & account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="mobile-cats-link" data-toggle="tab" href="#mobile-cats-tab" role="tab" aria-controls="mobile-cats-tab" aria-selected="false">Categories</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="mobile-menu-tab" role="tabpanel" aria-labelledby="mobile-menu-link">
                            <nav className="mobile-nav">
                                <ul className="mobile-menu">
                                    <li>
                                        <a href="#">Menu</a>
                                        <ul>
                                            <li className={window.location.pathname === '/' ? 'active' :null}>
                                            {/* <a href="/">Home</a> */}
                                            </li>
                                            <li className={window.location.pathname === '/trending_templates' ? 'active' :null}><a href={'/trending_templates'}>Trending</a></li> 
                                            <li className={window.location.pathname === '/hot_templates' ? 'active' :null}><a href={'/hot_templates'}>Hot</a></li> 
                                            {/* <li className={window.location.pathname === '/blogs' ? 'active' :null}><a href={"/blogs"}>Blogs</a></li> */}
                                            <li className={window.location.pathname === '/about' ? 'active' :null}><a href={"/about"}>About Us</a></li>
                                            <li className={window.location.pathname === '/contact' ? 'active' :null}><a href={"/contact"}>Contact Us</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">{this.state.currency}</a>
                                        <ul>
                                            <li><a href="/" onClick={(e) => {localStorage.setItem("currency","INR");}}>₹ INR</a></li>
                                            <li><a href="/" onClick={(e) => { localStorage.setItem("currency","USD");}}>$ USD</a></li>
                                            {/* <li><a href="/" onClick={(e) => {localStorage.setItem("currency","GBP");}}>£ GBP</a></li>
                                            <li><a href="/" onClick={(e) => {localStorage.setItem("currency","EURO");}}>€ Euro</a></li> */}
                                            {/* <li><a href="/" onClick={(e) => {localStorage.setItem("currency","DIRHAM");}}>د.إ  Dirham</a></li> */}
                                        </ul>
                                    </li>
                                    {localStorage.getItem('user') ?
                                    <li>
                                        <a to="#!" style={{textTransform:"capitalize",color:"white"}}><i className="fa fa-user"></i> {JSON.parse(localStorage.getItem('user')).name}</a>
                                        <ul>
                                            <li><a href={'/account'}><i className="fa fa-user"></i> Profile</a></li>
                                            <li><a href={'/wishlist'}><i className="fa fa-download"></i> Wishlist</a></li>
                                            <li><a href={'/user-login'} onClick={() => localStorage.clear()}><i className="fa fa-power-off"></i> Logout</a></li>
                                        </ul>
                                    </li>
                                        :null}
                                        {localStorage.getItem('user') === null ?
                                        <li><a href="../user-login" style={{textTransform:"uppercase",color:"white"}}><i className="fa fa-lock"></i> User Sign In</a></li>:null}
                                        {localStorage.getItem('user') === null ?
                                        <li><a onClick={() =>{window.location.href="/admin-contributer_login"}} style={{cursor:'pointer',color:"white"}}><i className="fa fa-money"></i> Sell Your Art</a></li>:null}
                                        {
                                        localStorage.getItem('user') === null ?<li><a href="/user-register" className="btn btn-primary btn-shadow" style={{color:'white'}}><i className="fa fa-user"></i> Register Now</a></li>:null}
                                    
                                </ul>
                            </nav>
                        </div>
                        <div className="tab-pane fade" id="mobile-cats-tab" role="tabpanel" aria-labelledby="mobile-cats-link">
                            <nav className="mobile-cats-nav">
                                
                                {this.state.category &&
                                    <ul className="mobile-cats-menu">
                                    {this.state.category.map( categories =>
                                        <li><a  href={'/products_'+categories.id+'_'+categories.name} ><b><i className="icon-angle-right"></i>{categories.name}</b></a>
                                        {this.state.subcategory &&
                                            <ul>
                                                {this.state.subcategory.filter(subcategories => subcategories.main_cat == categories.id).map( subcategories =>
                                                    <li className="item-lead">
                                                        <a  href={'/products_'+subcategories.id+'_'+subcategories.name} style={{paddingLeft: "0rem",paddingRight:"0rem"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="icon-angle-right"></i>{subcategories.name}</a>
                                                    </li>
                                                   
                                                )}
                                            </ul>
                                        }
                                        </li>
                                        )}
                                    </ul>
                                }
                               
                            </nav>
                        </div>
                    </div>

                    {/* <div className="social-icons">
                        <a href="#" className="social-icon" target="_blank" title="Facebook"><i className="icon-facebook-f"></i></a>
                        <a href="#" className="social-icon" target="_blank" title="Instagram"><i className="icon-instagram"></i></a>
                        <a href="#" className="social-icon" target="_blank" title="Twitter"><i className="icon-twitter"></i></a>
                    </div> */}
                </div>
            </div>

            <div className="modal fade" id="signin-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="icon-close"></i></span>
                            </button>

                            <div className="form-box" style={{backgroundColor: "linear-gradient(216deg, #8e70513b, transparent)"}}>
                                <div className="form-tab">
                                    <ul className="nav nav-pills nav-fill" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">Sign In</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="tab-content-5">
                                        <div className="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
                                            <form action="#" id="loginForm">
                                                <div className="form-group">
                                                    <label htmlFor="email" className="field-required">Email</label>
                                                    <input type="text" className="form-control" id="email" name="email" required />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="password" className="field-required">Password</label>
                                                    <input type="password" name="password" className="form-control" id="password" required />
                                                    {/* <span toggle="#password" className="fa fa-fw fa-eye field-icon" id="show-pass"></span> */}
                                                </div>

                                                <div className="form-footer">
                                                    <button type="submit" className="btn btn-outline-primary-2">
                                                        <span><i className="fa fa-lock"></i> LOG IN</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>
                                                    <a href="forgot-password.php" className="forgot-link">Forgot Password?</a>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                                            <form action="#" method="post" id="registerForm">
                                                <div className="form-group">
                                                    <label htmlFor="name" className="field-required">Name</label>
                                                    <input type="text" className="form-control" id="name" name="name" required />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="email" className="field-required">Email</label>
                                                    <input type="email" className="form-control" id="email" name="email" required />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="password" className="field-required">Password</label>
                                                    <input type="password" className="form-control" name="password" id="password" required />
                                                    {/* <span pass="#password1" className="fa fa-fw fa-eye field-icon" id="showPass"></span> */}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="confirm-password" className="field-required">Confirm Password</label>
                                                    <input type="password" className="form-control" id="confirm_password" name="confirm_password" required />
                                                </div>

                                                <div className="form-footer row d-flex justify-content-center">
                                                    <button type="submit" className="btn btn-outline-primary-2 btn-block">
                                                        <span><i className="fa fa-pencil-alt"></i> SIGN UP</span>
                                                        <i className="icon-long-arrow-right"></i>
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
        </div>
    )
}
}

export default Footer;