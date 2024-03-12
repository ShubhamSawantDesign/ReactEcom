import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import { Random  } from 'react-animated-text';
import Wave from 'react-wavify'
import OwlCarousel from 'react-owl-carousel2';
import axios from "axios";
import Swal from 'sweetalert2';
import '../about.css';

const about = {
    items: 3,
    nav: false,
    rewind: true,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 20,
    responsive: {
        "0": {
            "items":1
        },
        "480": {
            "items":1
        },
        "768": {
            "items":1
        },
        "992": {
            "items":3
        },
        "1440": {
            "items":3
        }
    }
};


class About extends React.Component {
	constructor() {
        super();
        this.state = {
            data: [],
            id:'',
            title1: '',
            title2: '',
             content1: '',
             content2: '',
             image_title1: '',
             image_title2: '',
             image_title3: '',
             aboutImage1: '',
             aboutImage2: '',
             aboutImage3: '',
        }
    }
    
    componentDidMount() {
        this.getAbout();
    }

    async getAbout() {
        this.setState({ isLoading: true });
        const response = await axios.get('api/auth/view_about');
        console.table(response);
        if(response.data.about){
            this.setState({
                title1: response.data.about.title1,
                title2: response.data.about.title2,
                 content1: response.data.about.content1,
                 content2: response.data.about.content2,
                 image_title1: response.data.about.image_content1,
                 image_title2: response.data.about.image_content2,
                 image_title3: response.data.about.image_content3,
                 aboutImage1: response.data.about.image1,
                 aboutImage2: response.data.about.image2,
                 aboutImage3: response.data.about.image3,
                  isLoading: false});
        }
    }

    render(){
        return(
            <div>
                <Navbar />

                <main className="main about-bg">
			        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
			            <div className="container-fluid">
			                <ol className="breadcrumb">
			                    <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
			                    <li className="breadcrumb-item active" aria-current="page">About us</li>
			                </ol>
			            </div>
			        </nav>
			        {/* <div className="container-fluid">
			        	<div className="page-header page-header-big text-center" style={{backgroundImage: 'url("assets/images/frontend_images/final_about_us_banner.jpg")'}}>
			    			<h1 className="page-title">About us<span className="text-black-50">Who we are</span></h1>
			        	</div>
			        </div> */}

					<div className="about-text text-center mt-3">
						<h1 className="title text-center mb-2 about-title">About Us</h1 >{/* End .title text-center mb-2 */}
						<h5 className="about-subtitle">We are here to empower art, Here to fuel your imagination </h5>
					</div>

			        <div className="page-content pb-0">
			            {/* <div className="container-fluid">
			                <div className="row">
			                    <div className="col-lg-6 mb-3 mb-lg-0">
			                        <h2 className="title">Our Vision</h2>
			                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. </p>
			                    </div>
			                    
			                    <div className="col-lg-6">
			                        <h2 className="title">Our Mission</h2>
			                        <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. <br/>Praesent elementum hendrerit tortor. Sed semper lorem at felis. </p>
			                    </div>
			                </div>

			                <div className="mb-5"></div>
			            </div> */}

			            <div className=" pt-6 " style={{backgroundImage:'assets/images/forntend_images/line.svg',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
			                <div className="container-fluid">
			                    <div className="row ">
			                        <div className="col-lg-5 mb-3 mb-lg-0 ">
			                            <h2 className="title text-center">{this.state.title1}</h2>
			                            {/* <p className="lead text-primary mb-3">Pellentesque odio nisi, euismod pharetra a ultricies <br/>in diam. Sed arcu. Cras consequat</p> */}
			                            <p className="mb-2 p-5 m-1 text-justify">{this.state.content1}</p>

			                            {/* <a href="blog.html" className="btn btn-sm btn-minwidth btn-outline-primary-2">
			                                <span>VIEW OUR NEWS</span>
			                                <i className="icon-long-arrow-right"></i>
			                            </a> */}
			                        </div>

			                        <div className="col-lg-7" >
			                            <div className="about-images about " style={{display:"none"}}>
										<OwlCarousel options={about} >
											<div className="col-md-12">
												<article className="entry entry-grid">
													<figure className="entry-media">
														<a href="single.html">
															<img src={"https://data.artaux.io/images/about/"+this.state.aboutImage1} alt="image desc"/>
														</a>
													</figure>

													<div className="entry-body text-center">
														<p className="entry-title">
															<p >{this.state.image_title1}</p>
														</p>
													</div>
												</article>
											</div>
											<div className="col-md-12">
												<article className="entry entry-grid">
													<figure className="entry-media">
														<a href="single.html">
															<img src={"https://data.artaux.io/images/about/"+this.state.aboutImage2} alt="image desc"/>
														</a>
													</figure>

													<div className="entry-body text-center">
														<p className="entry-title">
															<p>{this.state.image_title2}</p>
														</p>
													</div>
												</article>
											</div>
											<div className="col-md-12">
												<article className="entry entry-grid">
													<figure className="entry-media">
														<a href="single.html">
															<img src={"https://data.artaux.io/images/about/"+this.state.aboutImage3} alt="image desc"/>
														</a>
													</figure>

													<div className="entry-body text-center">
														<p className="entry-title">
															<p>{this.state.image_title3}</p>
														</p>
													</div>
												</article>
											</div>
										</OwlCarousel>
			                                {/* <img src="assets/images/frontend_images/about/img-2.jpg" alt="" className="about-img-front" />
			                                <img src="assets/images/frontend_images/about/img-2.jpg" alt="" className="about-img-back" /> */}
			                            </div>
			                        </div>
										
									<div className="col-lg-6 blob-bg  d-none d-lg-block">
									<h1  className="title mt-12" style={{marginLeft:'100px',fontSize:"55px",color:"black"}}><Random
										text="artaux"
										effect="stretch"
										effectChange={2.0}
										effectDuration={0.3}
										style={{fontSize:"20px"}} /></h1>
										{/* <img src="assets/images/frontend_images/l1.png" height="100px" className="animated bounce mt-3" style={{marginLeft:'100px'}}/> */}
									</div>
									<div className="col-lg-6">
										<div className="brands-text" style={{maxWidth:'initial'}}>
											<h2 className="title text-center">{this.state.title2}</h2>
											<p className="text-justify">{this.state.content2}</p>
										</div>
									</div>
								</div>
			                </div>
			            </div>

			            {/* <div className="container-fluid bubble-bg">
			                <div className="row">
			                    
			                    
							</div>

			                

						</div> */}

			            <div className="mb-2"></div>

					</div>
			    </main>

                <Footer />
            </div>
        )
    }
}

export default About;