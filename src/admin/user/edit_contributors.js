import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'jquery-validation';
import { useParams, useHistory } from 'react-router-dom';

class Edit_contributors extends React.Component {
    
    constructor() {
        super();
        this.state = {
            name:'',
            email:'',
            mobile:'',
            profession:'',
            ratio:'',
            status:'',
            newstatus:'',
        }
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        this.getContributor();
        $(document).ready(function(){

			$("#template_form").validate({
				rules:{
					name:{
						required:true,
						maxlength: 50,
					},
					username:{
						required:true,
					},
					email:{
						required:true,
						email: true,
					},
					mobile:{
						required:true,
					},
					nationality:{
						required:true,
					},
					ratio:{
						required:true,
					},
					profession:{
						required:true,
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
					mobile:{
						required:"Please enter mobile no",
					},
					nationality:{
						required:"Please enter nationality",
					},
					ratio:{
						required:"Please enter ratio",
					},
					profession:{
						required:"Please confirm profession",
					}
				}
			});
		});
    }

    async getContributor() {
        const { match: { params } } = this.props;
        // console.log('id',params.id)
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/edit_new_contributors/${params.id}?token=`+ tk);
        if(response.data.contributor){
            this.setState({
                contributor: response.data.contributor,
                id: response.data.contributor.id,
                name: response.data.contributor.name,
                email: response.data.contributor.email,
                mobile: response.data.contributor.mobile,
                status: response.data.contributor.status,
                ratio: response.data.contributor.ratio,
                profession: response.data.contributor.profession,
                username: response.data.contributor.username,
                nationality: response.data.contributor.nationality,
                isLoading: false});
            if(this.state.status == 1){
                    this.setState({active:'checked'});
                }else{
                    this.setState({active:''});
                }
                
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

    addTemplate = async (e) => {
        const { match: { params } } = this.props;
        // console.log('data233',this.state.status)
        e.preventDefault();
        if(this.state.ratio == 0 || this.state.ratio == '' || this.state.ratio == 'undefine'){
            Swal.fire({
                position: 'center',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
        		title: "Failed!",
        		text: 'Please update contributor ratio.',
            });
        }else{
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        console.log('image1',this.state.image);
        const formData = new FormData();
        formData.append('id', this.state.id);
        formData.append('ratio', this.state.ratio);
        formData.append('status', this.state.newstatus);
       fetch('https://data.artaux.io/api/admin_auth/edit_contributor?token='+ tk,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        }).then((res)=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
        		title: "Success!",
        		text: 'Contributor edited successfully.!',
            });
            this.setState({ isLoading: false });
            this.props.history.push(`../admin-contributor_edit_${params.id}`);
        }).catch((error)=>{
            Swal.fire({
                title: "Failed!",
                text: 'contributor ratio not set.',
                type: "error",
            });
            this.setState({ isLoading: false });
            this.props.history.push(`../admin-contributor_edit_${params.id}`);
        })
    }
}

render(){
    
    return(
        <>
            <Navbar />
            <Sidebar />

                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Update Contributor</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Contributors</li>
                                        <li className="breadcrumb-item active">Update Contributor</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card card-primary">
                                        <form onSubmit={this.addTemplate.bind(this)} method="post" encType="multipart/form-data" id="template_form">
                                            <div className="card-body">

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Name</label>
                                                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInput}  required readonly/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Username</label>
                                                    <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleInput}  required readonly disabled/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Email</label>
                                                    <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInput}  required readonly/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Mobile number</label>
                                                    <input type="text" className="form-control" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleInput}  required readonly/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Profession</label>
                                                    <input type="text" className="form-control" id="profession" name="profession" value={this.state.profession} onChange={this.handleInput}  required readonly/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Nationality</label>
                                                    <input type="text" className="form-control" id="nationality" name="nationality" value={this.state.nationality} onChange={this.handleInput}  required readonly disabled/>
                                                </div>


                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Contributor share</label>
                                                    <input type="text" className="form-control" id="ratio" name="ratio" value={this.state.ratio} onChange={this.handleInput} placeholder="Enter contributor ratio" required />
                                                </div>

                                                <div className="form-group">
                                                
                                                <label htmlFor="exampleInputEmail1" className="required">Status</label><br></br>
                                                    <label class="switch">
                                                        <input type="checkbox" value={this.state.status} onClick={(e) => {
                                                                this.setState({ newstatus:e.target.checked });
                                                            }} defaultChecked={this.state.active} />
                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                               
                                            </div>
                                            
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary ml-2">{this.state.isLoading ? <i className="fa fa-spinner fa-spin"></i> :<i className="fa fa-check"></i>} Update Contributor</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

           <Footer />
        </>
    )
}
}

export default Edit_contributors;