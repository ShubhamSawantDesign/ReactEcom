import React from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import {Link, withRouter} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel2';
import axios from "axios";
import Swal from 'sweetalert2';
import InstagramEmbed from 'react-instagram-embed';
import moment from 'moment';
import CookieConsent, { Cookies } from "react-cookie-consent";


const banner = {
    items: 1,
    nav: false,
    rewind: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dynamicHeight:false,
    height:"100px",
    responsive: {
        "0": {
            "items":1,
        },
        "480": {
            "items":1
        },
        "768": {
            "items":1,
            
        },
        "992": {
            "items":1
        },
        "1440": {
            "items":1
        }
    }
};

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

const instagram = {
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
            "items":4
        },
        "768": {
            "items":5
        },
        "992": {
            "items":6
        },
        "1440": {
            "items":7
        }
    }
};

class Routes extends React.Component{
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
            email:''
        }
    }

    async componentDidMount() {
        await this.getHomedata();
        if(localStorage.getItem('currency')){
        this.setState({currency:localStorage.getItem('currency')});
        }else{
            this.setState({currency:'INR'});
        }
    }
    
    async getHomedata() {
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/home_data`);
        if(response.data.status == 200){
            this.setState({ 
                banners: response.data.banners,
                mid_banner1: response.data.midbanners1.image,
                mid_banner1Link: response.data.midbanners1.url,
                mid_banner1Text: response.data.midbanners1.title,
                mid_banner2: response.data.midbanners2.image,
                mid_banner2Link: response.data.midbanners2.url,
                mid_banner2Text: response.data.midbanners2.title,
                mid_banner3: response.data.midbanners3.image,
                mid_banner3Link: response.data.midbanners3.url,
                mid_banner3Text: response.data.midbanners3.title,
                mid_banner4: response.data.midbanners4.image,
                mid_banner4Link: response.data.midbanners4.url,
                mid_banner4Text: response.data.midbanners4.title,
                banner1: response.data.banners1.image,
                banner1Link: response.data.banners1.url,
                banner1Text: response.data.banners1.title,
                banner2: response.data.banners2.image,
                banner2Link: response.data.banners2.url,
                banner2Text: response.data.banners2.title,
                banner3: response.data.banners3.image,
                banner3Link: response.data.banners3.url,
                banner3Text: response.data.banners3.title,
                banner4: response.data.banners4.image,
                banner4Link: response.data.banners4.url,
                banner4Text: response.data.banners4.title,
                trendingTemplates: response.data.templates,
                hotTemplates: response.data.hottemplates,
                blogs: response.data.blog,
                INR_rate: response.data.INR_rate.rate,
                USD_rate: response.data.USD_rate.rate,
                GBP_rate: response.data.GBP_rate.rate,
                EURO_rate: response.data.EURO_rate.rate,
                DIRHAM_rate: response.data.DIRHAM_rate.rate,
               isLoading: false});
               if(localStorage.getItem('currency') == 'INR'){
                this.setState({exhangerate:this.state.INR_rate });
                this.setState({sign:'₹' });
                }else if(localStorage.getItem('currency') == 'USD'){
                    this.setState({exhangerate:this.state.USD_rate });
                    this.setState({sign:'$' });
                }else if(localStorage.getItem('currency') == 'GBP'){
                    this.setState({exhangerate:this.state.GBP_rate });
                    this.setState({sign:'£' });
                }else if(localStorage.getItem('currency') == 'EURO'){
                    this.setState({exhangerate:this.state.EURO_rate});
                    this.setState({sign:'€' });
                }
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            // this.props.history.push("/");
        }
    }


    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    addSubEmails = async (e) => {
        e.preventDefault();
        this.setState({ isnewsLoading: true });
        const res = await axios.post("api/auth/sub_emails", this.state);
        if(res.data.status === 200){
        	Swal.fire({
        		title: "Success!",
        		text: res.data.message,
        		icon: "success",
        	});
            this.setState({ isnewsLoading: false });
        }else if(res.data.status === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		icon: "error",
        	});
            this.setState({ isnewsLoading: false });
        }
    }


    render(){
        
        return (
            <>
               <Navbar />

               <main className="main container-fluid bubble-bg">
                    <div className="intro-slider-container">
                    {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading Banners...</h6> }
                        {this.state.banners &&
                            <OwlCarousel options={banner} style={{height:"100px"}}>
                            {this.state.banners.map(
                                banner =>
                                <a href={banner.url} className="intro-slide cr-h" style={{backgroundImage: 'url('+'https://data.artaux.io/images/banner/'+banner.image+')'}} >
                                    <div className="container intro-content">
                                        {/* <h3 className="intro-subtitle">Bedroom Furniture</h3> 
                                        <h1 className="intro-title" style={{ color: "#000" }}>Be your <br/>Own Maker</h1>

                                        <Link to="products" className="btn btn-primary">
                                            <span >Explore More</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </Link> */}
                                    </div>
                                </a>
                            )} 
                            </OwlCarousel>
                        }
                    </div>

                    <div className="bestseller-products bg-light pt-3 pb-1 mt-5">
                        <div className="block">
                            <div className="block-wrapper ">
                                <div className="container-fluid">
                                    <div className="heading heading-flex">
                                        <div className="heading-left">
                                            <h2 className="title">Trending Digital Assets</h2>
                                        </div>

                                        {/*<div className="heading-right">
                                            <Link to="/products" className="title-link">View more <i className="icon-long-arrow-right"></i></Link>
                                        </div>*/}
                                    </div>
                                    {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading ...</h6> }
                                        {this.state.trendingTemplates &&
                                        <OwlCarousel options={templates} className="carousel-equal-height owl-simple">
                                        {this.state.trendingTemplates.map(
                                             templates =>
                                            <div className="product">
                                            {templates.discount != 0 ?
                                                <span className="product-label label-sale">{templates.discount}%</span>
                                                :null}
                                                <figure className="product-media">
                                                    <Link to={"../product_"+templates.id}>
                                                        <img src={"https://data.artaux.io/images/template/"+templates.image} alt="Product image" className="product-image" />
                                                    </Link>
                                                </figure>
                                                <div className="product-body">
                                                    <div className="product-cat">
                                                        <Link to="#">Product By: {templates.uploaded_by}</Link>
                                                    </div>
                                                    <h3 className="product-title"><Link to={"../product_"+templates.id}>{templates.title}</Link></h3>
                                                    <div className="product-price">
                                                        <span className="new-price"><span>{this.state.sign}</span> {parseFloat((templates.product_price /this.state.exhangerate)).toFixed(2)}</span>
                                                        {templates.discount != 0 ?
                                                        <span className="old-price"><span>{this.state.sign}</span> {parseFloat(templates.price /this.state.exhangerate).toFixed(2)}</span>
                                                        :null}
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                        </OwlCarousel>
                                        }
                                        <div className="text-center">
                                        <Link to={'/trending_templates'} className="btn btn-primary btn-shadow" >View More <i className="icon-long-arrow-right"></i></Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container categories pt-6  bubble-bg">
                        <div className="heading-center text-center">
                            <h2 className="title">Shop By Categories</h2>
                        </div>
                        {/* <h2 className="title-lg text-center mb-4">Shop by Categories</h2> */}
                        <div className="row">
                        <div className="col-6 col-lg-4">
                            <div className="banner banner-display banner-link-anim">
                            <a href={this.state.mid_banner1Link}>
                                <img src={"https://data.artaux.io/images/banner/"+this.state.mid_banner1} alt="Banner" className="im1-h"/>
                            </a>
                            <div className="banner-content banner-content-center">
                                <h3 className="banner-title text-white"><a href={this.state.mid_banner1Link}>{this.state.mid_banner1Text}</a></h3>{/* End .banner-title */}
                                {/* <a href="#" className="btn btn-outline-white banner-link">Shop Now<i className="icon-long-arrow-right" /></a> */}
                            </div>{/* End .banner-content */}
                            </div>{/* End .banner */}
                        </div>{/* End .col-sm-6 col-lg-3 */}
                        <div className="col-6 col-lg-4 order-lg-last">
                            <div className="banner banner-display banner-link-anim">
                            <a href={this.state.mid_banner2Link}>
                                <img src={"https://data.artaux.io/images/banner/"+this.state.mid_banner2} alt="Banner" className="im1-h"/>
                            </a>
                            <div className="banner-content banner-content-center">
                                <h3 className="banner-title text-white"><a href={this.state.mid_banner2Link}>{this.state.mid_banner2Text}</a></h3>{/* End .banner-title */}
                                {/* <a href="#" className="btn btn-outline-white banner-link">Shop Now<i className="icon-long-arrow-right" /></a> */}
                            </div>{/* End .banner-content */}
                            </div>{/* End .banner */}
                        </div>{/* End .col-sm-6 col-lg-3 */}
                        <div className="col-sm-12 col-lg-4 banners-sm">
                            <div className="row">
                            <div className="banner banner-display banner-link-anim col-lg-12 col-6">
                                <a href={this.state.mid_banner3Link}>
                                <img src={"https://data.artaux.io/images/banner/"+this.state.mid_banner3} alt="Banner" className="im2-h" />
                                </a>
                                <div className="banner-content banner-content-center">
                                <h3 className="banner-title text-white"><a href={this.state.mid_banner3Link}>{this.state.mid_banner3Text}</a></h3>{/* End .banner-title */}
                                {/* <a href="#" className="btn btn-outline-white banner-link">Shop Now<i className="icon-long-arrow-right" /></a> */}
                                </div>{/* End .banner-content */}
                            </div>{/* End .banner */}
                            <div className="banner banner-display banner-link-anim col-lg-12 col-6">
                                <a href={this.state.mid_banner4Link}>
                                <img src={"https://data.artaux.io/images/banner/"+this.state.mid_banner4} alt="Banner" className="im2-h"/>
                                </a>
                                <div className="banner-content banner-content-center">
                                <h3 className="banner-title text-white"><a href={this.state.mid_banner4Link}>{this.state.mid_banner4Text}</a></h3>{/* End .banner-title */}
                                {/* <a href="#" className="btn btn-outline-white banner-link">Shop Now<i className="icon-long-arrow-right" /></a> */}
                                </div>{/* End .banner-content */}
                            </div>{/* End .banner */}
                            </div>
                        </div>{/* End .col-sm-6 col-lg-3 */}
                        </div>{/* End .row */}
                    </div>

                    <div className="bestseller-products bg-light pt-5 pb-3 mb-3">
                        <div className="block">
                            <div className="block-wrapper ">
                                <div className="container-fluid">
                                    <div className="heading heading-flex">
                                        <div className="heading-left">
                                            <h2 className="title">Hot Digital Assets</h2>
                                        </div>

                                        {/*<div className="heading-right">
                                            <Link to="/products" className="title-link">View more <i className="icon-long-arrow-right"></i></Link>
                                        </div>*/}
                                    </div>
                                    {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                        {this.state.hotTemplates &&
                                        <OwlCarousel options={templates} className="carousel-equal-height owl-simple">
                                        {this.state.hotTemplates.map(
                                             templates =>
                                            <div className="product">
                                            {templates.discount != 0 ?
                                                <span className="product-label label-sale">{templates.discount}%</span>
                                                :null}
                                                <figure className="product-media">
                                                    <Link to={"../product_"+templates.id}>
                                                        <img src={"https://data.artaux.io/images/template/"+templates.image} alt="Product image" className="product-image" />
                                                    </Link>
                                                </figure>
                                                <div className="product-body">
                                                    <div className="product-cat">
                                                        <Link to="#">Product By: {templates.uploaded_by}</Link>
                                                    </div>
                                                    <h3 className="product-title"><Link to={"../product_"+templates.id}>{templates.title}</Link></h3>
                                                    <div className="product-price">
                                                        <span className="new-price"><span>{this.state.sign}</span> {parseFloat((templates.product_price /this.state.exhangerate)).toFixed(2)}</span>
                                                        {templates.discount != 0 ?
                                                        <span className="old-price"><span>{this.state.sign}</span> {parseFloat(templates.price /this.state.exhangerate).toFixed(2)}</span>
                                                        :null}
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                        </OwlCarousel>
                                        }
                                        <div className="text-center">
                                        <Link to={'/hot_templates'} className="btn btn-primary btn-shadow" >View More<i className="icon-long-arrow-right"></i></Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-2"></div>

                    <div className="banner-group mb-2  bubble-bg">
                        <div className="container-fluid pl-0 pr-0">
                            <div className="heading heading-flex">
                                <div className="heading-left ml-4">
                                    <h2 className="title">Discover Artaux Collections</h2>
                                </div>
                            </div>
                              <div className="intro-section">
                                    <div className="">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-6 dis_ar1">
                                                <div className="banner banner-big banner-overlay bn1-h" style={{height:'98%'}}>
                                                        <img src={"https://data.artaux.io/images/banner/"+this.state.banner1} alt=""/>

                                                     <div className="banner-content b1-align">
                                                        <h3 className="banner-title text-white"><a href={this.state.banner1Link} style={{color:'#000'}} class="b-text">{this.state.banner1Text}</a></h3>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-3">
                                                <div className="banner banner-overlay bn1-h" >
                                                        <img src={"https://data.artaux.io/images/banner/"+this.state.banner2} alt="Banner2" />

                                                    <div className="banner-content banner-content-stretch b2-align" style={{top: '91%'}}>
                                                        <h3 className="banner-title text-white pb-4"><a href={this.state.banner2Link} style={{color:'#000'}} class="b-text">{this.state.banner2Text} </a></h3>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-lg-3">
                                                <div className="banner banner-small banner-overlay bn2-h" >
                                                        <img src={"https://data.artaux.io/images/banner/"+this.state.banner3} alt="Banner3" />
                                                    <div className="banner-content b3-align" style={{left: "12rem"}}>
                                                        <h3 className="banner-title text-white"><a href={this.state.banner3Link} style={{color:'#000'}} class="b-text">{this.state.banner3Text}</a></h3>
                                                    </div>
                                                </div>

                                                <div className="banner banner-small banner-overlay bn2-h" >
                                                        <img src={"https://data.artaux.io/images/banner/"+this.state.banner4} alt="Banner4" />
                                                     <div className="banner-content b4-align">
                                                        <h3 className="banner-title text-white"><a href={this.state.banner4Link} style={{color:'#000'}} class="b-text">{this.state.banner4Text}</a></h3>
                                                     </div> 
                                                </div>
                                            </div>
                                        </div>

                                        {/*<div className="icon-boxes-container bg-transparent">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-sm-6 col-lg-3">
                                                        <div className="icon-box icon-box-side">
                                                            <span className="icon-box-icon">
                                                                <i className="icon-check-circle-o"></i>
                                                            </span>
                                                            <div className="icon-box-content">
                                                                <h3 className="icon-box-title">Easy To Use</h3>
                                                                <p>Easy to use and customizable templates</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6 col-lg-3">
                                                        <div className="icon-box icon-box-side">
                                                            <span className="icon-box-icon">
                                                                <i className="icon-angellist"></i>
                                                            </span>

                                                            <div className="icon-box-content">
                                                                <h3 className="icon-box-title">Beautiful Design</h3>
                                                                <p>Wow your audience with professional quality visuals</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6 col-lg-3">
                                                        <div className="icon-box icon-box-side">
                                                            <span className="icon-box-icon">
                                                                <i className="icon-thumbs-up"></i>
                                                            </span>

                                                            <div className="icon-box-content">
                                                                <h3 className="icon-box-title">Quality Support</h3>
                                                                <p>Quality support available upto 6 months</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6 col-lg-3">
                                                        <div className="icon-box icon-box-side">
                                                            <span className="icon-box-icon">
                                                                <i className="icon-think-peaks"></i>
                                                            </span>

                                                            <div className="icon-box-content">
                                                                <h3 className="icon-box-title">Increased Business Impact</h3>
                                                                <p>Get more insight from your data & accelerate business decisions</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/* <div className="container-fluid mt-4 bg-light">
                        <div className="container  bg-light">
                            <div className="heading heading-flex">
                                <div className="heading-left ml-4 mt-2">
                                    <h2 className="title">Artaux Blogs</h2>
                                </div>
                            </div>
                            {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                            {this.state.blogs &&
                            <div className="entry-container max-col-4" data-layout="fitRows" >
                                {this.state.blogs.map(
                                    (blog,index) =>
                                    <div className="entry-item col-sm-6 col-md-4 col-lg-4">
                                        <article className="entry entry-grid text-center">
                                            <figure className="entry-media">
                                            <Link to={'/blogs_detail/'+blog.id}>
                                                <img src={'https://data.artaux.io/images/blog/'+blog.image} alt="image desc" />
                                            </Link>
                                            </figure>
                                            <div className="entry-body">
                                            <div className="entry-meta">
                                                <span><i className="fa fa-calendar"></i> {moment(blog.created_at).format("DD MMM YYYY")}</span>
                                                <span className="meta-separator">|</span>
                                                <span><i className="fa fa-user-o"></i> By- {blog.author}</span>
                                            </div>
                                            <h2 className="entry-title">
                                                <Link style={{textTransform:"capitalize",cursor: "context-menu"}}>{blog.title}</Link>
                                            </h2>
                                            <div className="entry-content">
                                                <p className="text-center text-justify">{`${blog.content.substring(0, 100)}...`}</p>
                                                <Link to={'/blogs_detail/'+blog.id} className="read-more">Continue Reading</Link>
                                            </div>
                                            </div>
                                        </article>
                                    </div>
                                )}
                            </div>
                            }
                             <div className="text-center">
                            <Link to={'/blogs'} className="btn btn-primary btn-shadow" >View More Articles<i className="icon-long-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div> */}

                    {/* <InstagramEmbed
                    url='https://instagr.am/p/Zw9o4/'
                    clientAccessToken='123|456'
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                    /> */}
                    
            {/* <div className="heading heading-flex mt-5  bubble-bg">
                <div className="heading-left ml-4">
                    <h2 className="title">Instagram Feed</h2>
                </div>
            </div>
            <OwlCarousel options={instagram}>		    
				<div className="instagram-feed  bubble-bg">
                    <img src="/assets/images/frontend_images/demos/demo-5/instagram/1.jpg" style={{height:"200px"}} alt="img" />
                    <div className="instagram-feed-content">
                        <a href="#"><i className="icon-heart-o" />387</a>
                        <a href="#"><i className="icon-comments" />45</a>
                    </div>
                </div>
				<div className="instagram-feed  bubble-bg">
                    <img src="/assets/images/frontend_images/demos/demo-5/instagram/2.jpg" style={{height:"200px"}} alt="img" />
                    <div className="instagram-feed-content">
                        <a href="#"><i className="icon-heart-o" />387</a>
                        <a href="#"><i className="icon-comments" />45</a>
                    </div>
                </div>
				<div className="instagram-feed  bubble-bg">
                    <img src="/assets/images/frontend_images/demos/demo-5/instagram/3.jpg" style={{height:"200px"}} alt="img" />
                    <div className="instagram-feed-content">
                        <a href="#"><i className="icon-heart-o" />387</a>
                        <a href="#"><i className="icon-comments" />45</a>
                    </div>
                </div>
				<div className="instagram-feed  bubble-bg">
                    <img src="/assets/images/frontend_images/demos/demo-5/instagram/4.jpg" style={{height:"200px"}} alt="img" />
                    <div className="instagram-feed-content">
                        <a href="#"><i className="icon-heart-o" />387</a>
                        <a href="#"><i className="icon-comments" />45</a>
                    </div>
                </div>
				<div className="instagram-feed  bubble-bg">
                    <img src="/assets/images/frontend_images/demos/demo-5/instagram/5.jpg" style={{height:"200px"}} alt="img" />
                    <div className="instagram-feed-content">
                        <a href="#"><i className="icon-heart-o" />387</a>
                        <a href="#"><i className="icon-comments" />45</a>
                    </div>
                </div>	
				<div className="instagram-feed  bubble-bg">
                    <img src="/assets/images/frontend_images/demos/demo-5/instagram/6.jpg" style={{height:"200px"}} alt="img" />
                    <div className="instagram-feed-content">
                        <a href="#"><i className="icon-heart-o" />387</a>
                        <a href="#"><i className="icon-comments" />45</a>
                    </div>
                </div>	
				<div className="instagram-feed  bubble-bg">
                    <img src="/assets/images/frontend_images/demos/demo-5/instagram/1.jpg" style={{height:"200px"}} alt="img" />
                    <div className="instagram-feed-content">
                        <a href="#"><i className="icon-heart-o" />387</a>
                        <a href="#"><i className="icon-comments" />45</a>
                    </div>
                </div>	
          </OwlCarousel> */}

            <div className="cta-newsletter text-center pb-3 mt-3" style={{backgroundImage: 'url("assets/images/frontend_images/animation_artox.gif")', backgroundSize: 'cover'}}>
                <div className="container-fluid">
                    <span className="cta-icon"><i className="icon-envelope"></i></span>
                    <h3 className="title">Subscribe For Our Newsletter</h3>
                    <p className="title-desc" style={{ color: "#000" }}>Learn about new offers and get more deals by joining our newsletter</p>

                    <form onSubmit={this.addSubEmails.bind(this)} method="post">
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Enter your Email Address" aria-label="Email Adress" aria-describedby="newsletter-btn" name="email" value={this.state.email} onChange={this.handleInput} required />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="submit" id="newsletter-btn"><span>SUBSCRIBE</span>{this.state.isnewsLoading ? <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> :<i className="icon-long-arrow-right"></i>}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            </main>

            <CookieConsent
                location="bottom"
                buttonText="Accept"
                cookieName="ArtauxCookies"
                style={{ background: "#000" }}
                overlay="true"
                buttonStyle={{ background: "#9f66d3",color:'white', fontSize: "13px" }}
                expires={150}
                >
                <span style={{ fontSize: "16px" }}>This website uses cookies to enhance the user experience.</span>
                </CookieConsent>

               <Footer />
            </>
            );
        }
}

export default Routes;
