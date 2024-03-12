import React from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';


class Navbar extends React.Component {
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
            wishlistCount:0,
            // changecurrency:'INR'
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
        const response = await axios.get('/api/auth/get_header_data');
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
        
        <>
        <header className="header header-12  bubble-bg" style={{backgroundColor:'#00000000'}}>
            <div className="header-top">
                <div className="container-fluid">
                    <div className="header-left">
                        <a href="mailto:info@artaux.io"><i className="icon-envelope"></i> info@artaux.io</a>
                        
                    </div>
                    <div className="header-right ">
                        <ul className="top-menu vis-n">
                            <li>
                                <Link to="/">Menu</Link>
                                <ul className="dropdown-links">
                                    <li>
                                        <div className="header-dropdown">
                                            <Link to="#!">{this.state.currency}</Link>
                                            <div className="header-menu">
                                                <ul>
                                                    <li><a href="/" onClick={(e) => {localStorage.setItem("currency","INR");}}>₹ INR</a></li>
                                                    <li><a href="/" onClick={(e) => { localStorage.setItem("currency","USD");}}>$ USD</a></li>
                                                    {/* <li><a href="/" onClick={(e) => {localStorage.setItem("currency","GBP");}}>£ GBP</a></li>
                                                    <li><a href="/" onClick={(e) => {localStorage.setItem("currency","EURO");}}>€ Euro</a></li> */}
                                                    {/* <li><a href="/" onClick={(e) => {localStorage.setItem("currency","DIRHAM");}}>د.إ  Dirham</a></li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    {localStorage.getItem('user') ?
                                    <li>
                                        <div className="header-dropdown ">
                                            <Link to="#!" style={{textTransform:"capitalize"}}><i className="fa fa-user"></i>{JSON.parse(localStorage.getItem('user')).name}</Link>
                                            <div className="header-menu">
                                                <ul>
                                                    <li><Link to={'/account'}><i className="fa fa-user"></i>Profile</Link></li>

                                                    <li><Link to={'/account/downloads'}><i className="fa fa-download"></i> Downloads</Link></li>
                                                    <li><Link to={'/user-login'} onClick={() => localStorage.clear()}><i className="fa fa-power-off"></i> Logout</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                        :null}
                                        {localStorage.getItem('user') === null ?
                                        
                                        <div className="header">
                                            <Link onClick={() =>{window.location.href="/admin-contributer_login"}}><i className="fa fa-money"></i>Sell Your Art</Link>
                                            &nbsp;
                                            &nbsp;
                                            <Link to="../user-login"><i className="fa fa-lock"></i>User Sign In</Link>
                                            {/*<div className="header-menu">
                                                <ul>
                                                    <li><a onClick={() =>{window.location.href="/admin-contributer_login"}} style={{cursor:'pointer'}}><i className="fa fa-lock"></i> Contributor Sign In</a></li>
                                                    <li><Link to="../user-login"><i className="fa fa-lock"></i> User Sign In</Link></li>
                                                </ul>
                                            </div>*/}
                                        </div> 
                                        :null}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="header-middle">
                <div className="container-fluid">
                    <div className="header-left">
                        <button className="mobile-menu-toggler">
                            <span className="sr-only">Toggle mobile menu</span>
                            <i className="icon-bars"></i>
                        </button>

                        <a href={"/"} className="logo frontlogo">
                            <img src="/assets/images/frontend_images/Artaux-01.svg" alt="Artaux" />
                        </a>
                    </div>

                    <div className="header-right">
                        <div className="header-search header-search-extended header-search-visible header-search-no-radius">
                            <Link to="#" className="search-toggle" role="button"><i className="icon-search"></i></Link>
                            <form onSubmit={this.search.bind(this)} method="post" encType="multipart/form-data">
                                <div className="header-search-wrapper search-wrapper-wide">
                                    <label htmlFor="q" className="sr-only">Search</label>
                                    <input type="search" className="form-control" name="keyword" id="search" value={this.state.keyword} onChange={this.handleInput} placeholder="Search..." required autoFocus={true}  style={{fontFamily:'Poppins'}}/>
                                    <div className="select-custom">
                                        {this.state.filetype &&
                                        <select id="file_type" name="file_type" value={this.state.file_type} style={{fontFamily:'Poppins',minWidth:'172px !important'}}
                                            onChange={(e) => {
                                                this.setState({ file_type:e.target.value });
                                            }} >
                                            <option >Select Extension</option>
                                            <option value={"All"}>All</option>
                                            {this.state.filetype.map(
                                             filetypes =>
                                                <option value={filetypes.file_type}>{filetypes.file_type}</option>
                                            )}
                                        </select>
                                        }
                                    </div>
                                    <button className="btn btn-primary" type="submit"><i className="icon-search"></i></button>
                                </div>
                            </form>
                        </div>

                        <div className="header-dropdown-link">
                        {localStorage.getItem('user') ?
                            <div className="account dis-n">
                                <Link to="../account" title="My account">
                                    <div className="icon">
                                        {/* <i className="icon-user"></i> */}
                                        <img src="/assets/images/frontend_images/account.svg" alt="Account" style={{height:'30px'}} />
                                    </div>
                                    <p>Account</p>
                                </Link>
                            </div>
                            :null}
                            <div className="wishlist">
                                <a href={"/wishlist"} title="Wishlist">
                                    <div className="icon">
                                        {/* <i className="icon-heart-o"></i> */}
                                        <img src="/assets/images/frontend_images/wishlist.svg" alt="Wishlist" style={{height:'30px'}} />
                                        <span className="wishlist-count badge">{this.state.wishlistCount}</span>
                                    </div>
                                    <p>Wishlist</p>
                                </a>
                            </div>

                            <div className="dropdown cart-dropdown">
                                <a href={this.state.cartLink} className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                    <div className="icon">
                                        {/* <i className="icon-shopping-cart"></i> */}
                                        <img src="/assets/images/frontend_images/cart.svg" alt="Cart" style={{height:'30px'}} />
                                        <span className="cart-count">{this.state.cartCount}</span>
                                    </div>
                                    <p>Cart</p>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right">
                                {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                        {this.state.cart  &&
                                            <div className="dropdown-cart-products">
                                            {this.state.cart.map(
                                                (cart) =>
                                                <div className="product">
                                                    <div className="product-cart-details">
                                                        <h4 className="product-title">
                                                            <a href={"../product_"+cart.product_id}>{cart.product_name}</a>
                                                        </h4>
                                                        <span className="cart-product-info">
                                                             <span>{this.state.sign}</span> {parseFloat(cart.price /this.state.exhangerate).toFixed(2)}
                                                        </span>
                                                    </div>

                                                    <figure className="product-image-container">
                                                        <a href={"../product_"+cart.product_id} className="product-image">
                                                            <img src={'https://data.artaux.io/images/template/'+cart.image } alt="product" />
                                                        </a>
                                                    </figure>
                                                    {/* <Link to="#!" onclick={this.deleteCart(cart.id)} className="btn-remove" title="Remove Product"><i className="icon-close"></i></Link> */}
                                                </div>
                                                )}
                                                
                                            </div>
                                        }
                                    <div className="dropdown-cart-total">
                                        <span>Total</span>
                                        <span className="cart-total-price"> <span>{this.state.sign}</span> {parseFloat(this.state.totalPrice /this.state.exhangerate).toFixed(2)}</span>
                                    </div>

                                    <div className="dropdown-cart-action">
                                        <a href={this.state.cartLink} className="btn btn-primary">View Cart</a>
                                        {this.state.totalPrice === 0 ?
                                        <a  href="#" className="btn btn-outline-primary-2 disabled" style={{cursor:'not-allowed'}}><span>Checkout</span><i className="icon-long-arrow-right"></i></a>
                                        :this.state.totalPrice &&<a href="../checkout/" className="btn btn-outline-primary-2 "><span>Checkout</span><i className="icon-long-arrow-right"></i></a>}
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom sticky-header">
                <div className="container-fluid"> {/* container */}
                    <div style={{backgroundColor: "#000", display: "flex", width: "100%"}}>
                        <div className="header-left">
                            <div className="dropdown category-dropdown">
                                <Link to="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static" title="Browse Categories" >
                                    Know More
                                </Link>
                                <div className="dropdown-menu">
                                    <nav className="side-nav">
                                    {/* {this.state.category && */}
                                    <ul className="menu-vertical sf-arrows">
                                        <li className={window.location.pathname === '/trending_templates' ? 'active' :null}><a href={'/trending_templates'}>Trending</a></li> 
                                        <li className={window.location.pathname === '/hot_templates' ? 'active' :null}><a href={'/hot_templates'}>Hot</a></li> 
                                        {/* <li className={window.location.pathname === '/blogs' ? 'active' :null}><Link to={"/blogs"}>Blogs</Link></li> */}
                                        <li className={window.location.pathname === '/about' ? 'active' :null}><Link to={"/about"}>About Us</Link></li>
                                        <li className={window.location.pathname === '/contact' ? 'active' :null}><Link to={"/contact"}>Contact Us</Link></li>
                                    {/* {this.state.category.map( categories =>
                                        <li className="item-lead"><a  href={'/products_'+categories.id+'_'+categories.name} ><i className="icon-angle-right"></i>{categories.name}</a>
                                            {this.state.subcategory &&
                                            <ul>
                                                {this.state.subcategory.filter(subcategories => subcategories.main_cat == categories.id).map( subcategories =>
                                                    <li className="item-lead">
                                                        <a  href={'/products_'+subcategories.id+'_'+subcategories.name} style={{paddingLeft: "0rem",paddingRight:"0rem"}}><i className="icon-angle-right"></i>{subcategories.name}</a>
                                                    </li>
                                                   
                                                )}
                                            </ul>
                                            }
                                        </li>
                                    )} */}
                                    </ul>
                                    {/* } */}
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div >
                            <nav className="main-nav">
                                {this.state.category &&
                                <ul className="menu">
                                    <li style={{marginLleft: "0.5rem !important"}}></li>
                                    {/* <li className={window.location.pathname === '/' ? 'active' :null} style={{marginLleft: "0.5rem !important"}}>
                                        <Link to="/" style={{fontSize:"12px",padding:"1.55rem 1rem 1.55rem 1rem"}}>Home</Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to="" className="sf-with-ul">Templates</Link>
                                        <div className="megamenu megamenu-md">
                                            <div className="row no-gutters">
                                                <div className="col-md-8">
                                                    <div className="menu-col">
                                                    {this.state.category &&
                                                        <div className="row">
                                                            {this.state.category.map( category =>
                                                            <div className="col-md-4">
                                                                {category.main_cat == 0 &&
                                                                <div className="menu-title"><a  href={'/products_'+category.id+'_'+category.name} >{category.name}</a></div>
                                                                }
                                                            </div>
                                                            )}
                                                        </div>
                                                    }
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="banner banner-overlay">
                                                        <div className="banner banner-menu">
                                                            <img src="/assets/images/frontend_images/menu/banner-1.jpg" alt="Banner" />

                                                            <div className="banner-content banner-content-top">
                                                                <div className="banner-title text-black">Last <br/>Chance<br/><span><strong>Sale</strong></span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                    {this.state.category.map( categories =>
                                    
                                        <li className={window.location.pathname === '/products_'+categories.id+'_'+categories.name ? 'active' :null} style={{marginLleft: "0.5rem !important"}}><a  href={'/products_'+categories.id+'_'+categories.name} style={{fontSize:"12px",padding:"1.55rem 1rem 1.55rem 1rem"}}>{categories.name}</a>
                                           {this.state.subcategory &&
                                            <ul>
                                                {this.state.subcategory.filter(subcategories => subcategories.main_cat == categories.id).map( subcategories =>
                                                    <li className="item-lead">
                                                        <a  href={'/products_'+subcategories.id+'_'+subcategories.name} style={{paddingLeft: "0rem",paddingRight:"0rem"}}><i className="icon-angle-right"></i>{subcategories.name}</a>
                                                    </li>
                                                   
                                                )}
                                            </ul>
                                            }
                                        </li>
                                         
                                    )} 
                                    {/* <li className={window.location.pathname === '/hot_templates' ? 'active' :null}><a href={'/hot_templates'}>Hot</a></li> 
                                    <li className={window.location.pathname === '/blogs' ? 'active' :null}><Link to={"/blogs"}>Blogs</Link></li>
                                    <li className={window.location.pathname === '/about' ? 'active' :null}><Link to={"/about"}>About Us</Link></li>
                                    <li className={window.location.pathname === '/contact' ? 'active' :null}><Link to={"/contact"}>Contact Us</Link></li> */}
                                    
                                </ul>
                                }
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}
}

export default Navbar;