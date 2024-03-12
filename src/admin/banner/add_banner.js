import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class AddBanner extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            url: '',
            status: null,
            image: {name:null},
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    addBanner = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('title', this.state.title);
        formData.append('url', this.state.url);
        formData.append('status', this.state.status);
        console.table(formData);
        fetch('https://data.artaux.io/api/admin_auth/add_banner?token='+ tk,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        }).then((res)=>{
            Swal.fire({
                 position: 'center',
                icon: 'success',
                title: 'Banner add successfully',
                showConfirmButton: false,
                timer: 8000
            });
            this.setState({ isLoading: false });
            this.props.history.push("../admin-view-banners");
        }).catch((error)=>{
            Swal.fire({
                title: "Failed!",
                text: 'Banner not added.',
                type: "error",
            });
            this.setState({ isLoading: false });
            this.props.history.push("../admin-add-banner");
        })
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
                                    <h1>Add Banner</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item">Banner</li>
                                        <li className="breadcrumb-item active">Add Banner</li>
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
                                        <form onSubmit={this.addBanner.bind(this)} method="post" encType="multipart/form-data" id="addBanner" name="addBanner">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="title" className="required">Title</label>
                                                    <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleInput} className="form-control" placeholder="Enter banner title" required/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="image" className="required">Image</label> <p style={{fontSize:"12px"}}>(Note: Banner size will be maximum 400KB and resolution will be 1350px * 500px)</p>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input type="file" name="image" className="custom-file-input" id="image-banner-upload" onChange={(e) => { this.setState({ image:e.target.files[0] }); }} required/>
                                                            <label className="custom-file-label" htmlFor="image">{this.state.image.name}</label>
                                                        </div>
                                                    </div>
                                                    <p id="error_banner_image"></p>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="url" className="required">URL</label>
                                                    <input type="url" name="url" className="form-control" value={this.state.url} onChange={this.handleInput} id="url" placeholder="Enter URL"/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="status" className=""> Enable </label><br/>
                                                    <label className="switch">
                                                        <input type="checkbox" name="status" value='1' onClick={this.handleInput} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary ml-2" id="add-banner"> {this.state.isLoading ? <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> : <i className="fa fa-check"></i>} Add Banner</button>
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

export default AddBanner;