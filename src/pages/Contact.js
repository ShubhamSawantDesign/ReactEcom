import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import $ from 'jquery';
import 'jquery-validation';
import Swal from 'sweetalert2';
 

class Contact extends React.Component {
	state = {
        name: '',
        email : '',
        mobile : '',
        subject : '',
        message: '',
        phone: '',
    }

	componentDidMount() {
		$(document).ready(function(){


			$.validator.addMethod("alphanumeric", function(value, element) {
				return this.optional(element) || /^[a-z ]+$/i.test(value);
			}, "Please enter characters only");
		
			$("#contact").validate({
				rules:{
					name:{
						required:true,
						maxlength: 50,
						alphanumeric:true,
					},
					email:{
						required:true,
						email: true,
					},
					phone:{
						required:true,
						minlength:11,
						maxlength:11,
						number:true
					},
					subject:{
						required:true,
						maxlength: 200,
					},
					message:{
						required:true,
						maxlength: 500,
					}
				},
				messages:{
					name:{ 
						required:"Please enter name",
						maxlength: "Please enter max 50 characters"
					},
					email:{ 
						required: "Please enter email. ",
						email: "Please enter valid email. ",
					},
					phone:{
						required:"Please enter phone number",
						minlength: "Your phone number must be atleast 11",
						maxlength:"Your phone number must be atleast 11",
						number:"Please enter valid number"
					},
					subject:{
						required:"Please enter subject",
						maxlength: "Please enter max 200 characters"
					},
					message:{
						required:"Please enter message",
						maxlength: "Please enter max 500 characters"
					},
				}
			});
		});
	}

	handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

	addEnquiry = async (e) => {
        e.preventDefault();
        const res = await axios.post("api/auth/enquiry", this.state);
        if(res.data.status === 200){
        	Swal.fire({
        		title: "Success!",
        		text: res.data.message,
        		icon: "success",
        	});
        }else if(res.data.status === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		icon: "error",
        	});
        }
    }


    render(){
        return(
            <div>
                <Navbar />

                <main className="main">
			        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
			            <div className="container-fluid">
			                <ol className="breadcrumb">
			                    <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
			                    <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
			                </ol>
			            </div>
			        </nav>
			        <div className="container-fluid">
			        	<div className="page-header page-header-big text-center" style={{backgroundImage: 'url("assets/images/frontend_images/final_contact_us_banner.jpg")'}}>
			    			<h1 className="page-title">Contact Us<span className="text-black-50">keep in touch with us</span></h1>
			        	</div>
			        </div>

			        <div className="page-content pb-0">
			            <div className="container-fluid">
			            	<div className="row">
			            		<div className="col-lg-4 mb-2 mb-lg-0">
			            			<h2 className="title mb-1">Contact Information</h2>
			            			{/* <p className="mb-3">Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p> */}
			            			<div className="row">
			            				<div className="col-sm-7">
			            					<div className="contact-info">
			            						{/* <h3>The Office</h3> */}

			            						<ul className="contact-list">
			            							<li>
			            								<i className="icon-phone"></i>
			            								<a href="tel:91 9372389474">+91 9372389474</a>
			            							</li>
			            							<li>
			            								<i className="icon-envelope"></i>
			            								<a href="mailto:support@artaux.io">support@artaux.io</a>
			            							</li>
			            						</ul>
			            					</div>
			            				</div>

			            				{/* <div className="col-sm-5">
			            					<div className="contact-info">
			            						<h3>The Office</h3>

			            						<ul className="contact-list">
			            							<li>
			            								<i className="icon-clock-o"></i>
			                							<span className="text-dark">Monday-Saturday</span> <br/>11am-7pm ET
			                						</li>
			            							<li>
			            								<i className="icon-calendar"></i>
			            								<span className="text-dark">Sunday</span> <br/>11am-6pm ET
			            							</li>
			            						</ul>
			            					</div>
			            				</div> */}
			            			</div>
			            		</div>
			            		<div className="col-lg-8">
			            			<h2 className="title mb-1">Got Any Questions?</h2>
			            			<p className="mb-2">Use the form below to get in touch with us</p>

			            			<form onSubmit={this.addEnquiry.bind(this)} method="post" className="contact-form mb-3" id="contact">
			            				<div className="row">
			            					<div className="col-sm-6">
			                                    <label for="cname" className="sr-only">Name</label>
			            						<input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInput} placeholder="Name *" required />
			            					</div>

			            					<div className="col-sm-6">
			                                    <label for="cemail" className="sr-only">Email</label>
			            						<input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Email *" required />
			            					</div>
			            				</div>

			            				<div className="row">
			            					<div className="col-sm-6">
			                                    <label for="cphone" className="sr-only">Phone</label>
			            						<input type="tel" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleInput} placeholder="Phone *" />
			            					</div>

			            					<div className="col-sm-6">
			                                    <label for="csubject" className="sr-only">Subject</label>
			            						<input type="text" className="form-control" id="subject" name="subject" value={this.state.subject} onChange={this.handleInput} placeholder="Subject *" />
			            					</div>
			            				</div>
										<div className="row ml-0 mr-0">
											<label for="cmessage" className="sr-only">Message</label>
											<textarea className="form-control" cols="30" rows="4" id="message" name="message" value={this.state.message} onChange={this.handleInput} required placeholder="Message *"></textarea>
										</div>
			            				<button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
			            					<span>SUBMIT</span>
			        						<i className="icon-long-arrow-right"></i>
			            				</button>
			            			</form>
			            		</div>
			            	</div>

			            	{/* <hr className="mt-4 mb-5" /> */}

			            	{/* <div className="stores mb-4 mb-lg-5">
			                	<h2 className="title text-center mb-3">Our Stores</h2>

			                	<div className="row">
			                		<div className="col-lg-6">
			                			<div className="store">
			                				<div className="row">
			                					<div className="col-sm-5 col-xl-6">
			                						<figure className="store-media mb-2 mb-lg-0">
			                							<img src="assets/images/frontend_images/stores/img-1.jpg" alt="image" />
			                						</figure>
			                					</div>
			                					<div className="col-sm-7 col-xl-6">
			                						<div className="store-content">
			                							<h3 className="store-title">Wall Street Plaza</h3>
			                							<address>88 Pine St, New York, NY 10005, USA</address>
			                							<div><a href="tel:#">+1 987-876-6543</a></div>

			                							<h4 className="store-subtitle">Store Hours:</h4>
			            								<div>Monday - Saturday 11am to 7pm</div>
			            								<div>Sunday 11am to 6pm</div>

			            								<a href="#" className="btn btn-link" target="_blank"><span>View Map</span><i className="icon-long-arrow-right"></i></a>
			                						</div>
			                					</div>
			                				</div>
			                			</div>
			                		</div>

			                		<div className="col-lg-6">
			                			<div className="store">
			                				<div className="row">
			                					<div className="col-sm-5 col-xl-6">
			                						<figure className="store-media mb-2 mb-lg-0">
			                							<img src="assets/images/frontend_images/stores/img-2.jpg" alt="image" />
			                						</figure>
			                					</div>

			                					<div className="col-sm-7 col-xl-6">
			                						<div className="store-content">
			                							<h3 className="store-title">One New York Plaza</h3>
			                							<address>88 Pine St, New York, NY 10005, USA</address>
			                							<div><a href="tel:#">+1 987-876-6543</a></div>

			                							<h4 className="store-subtitle">Store Hours:</h4>
														<div>Monday - Friday 9am to 8pm</div>
														<div>Saturday - 9am to 2pm</div>
														<div>Sunday - Closed</div>

			            								<a href="#" className="btn btn-link" target="_blank"><span>View Map</span><i className="icon-long-arrow-right"></i></a>
			                						</div>
			                					</div>
			                				</div>
			                			</div>
			                		</div>
			                	</div>
			            	</div>
			             */}
						</div>
			        </div>
			    </main> 

                <Footer />
            </div>
        )
    }
}

export default Contact;