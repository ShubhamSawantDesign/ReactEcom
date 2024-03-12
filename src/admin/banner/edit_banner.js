import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";

class EditBanner extends React.Component {
    constructor() {
        super();
        this.state = {
            title: null,
            url: null,
            status: '',
            newstatus: false,
            image: null,
            currentimage: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getBanner();
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    async getBanner() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/edit_view_banner/${params.id}?token=`+ tk);
        if(response.data.banners){
            this.setState({
                title: response.data.banners.title,
                id: response.data.banners.id,
                url: response.data.banners.url,
                image: response.data.banners.image,
                status: response.data.banners.status,
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
            this.setState({ isLoading: false });
            this.props.history.push("../admin-view-banners");
        }
    }

    editBanner = async (e) => {
        const { match: { params } } = this.props;
        e.preventDefault();
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const formData = new FormData();
        formData.append('id', this.state.id);
        formData.append('image', this.state.currentimage);
        formData.append('title', this.state.title);
        formData.append('url', this.state.url);
        if(this.state.id == 3 ||this.state.id == 4 || this.state.id == 5 || this.state.id == 6 ||this.state.id == 14 ||this.state.id == 15 ||this.state.id == 16 ||this.state.id == 17) {
        formData.append('status',1);
        }else{
            formData.append('status',this.state.newstatus);
        }
        fetch('https://data.artaux.io/api/admin_auth/edit_banner?token='+ tk,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        }).then((res)=>{
            Swal.fire({
                title:  'Banner Edited Successfully',
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
                    this.setState({ isLoading: false });
                    window.location.href="/admin/edit-banner/"+params.id;
                } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
                }
              })
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
                                    <h1>Edit Banner</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item">Banner</li>
                                        <li className="breadcrumb-item active">Edit Banner</li>
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
                                        <form onSubmit={this.editBanner.bind(this)} method="post" encType="multipart/form-data">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="title" className="required">Title</label>
                                                    <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleInput} className="form-control" placeholder="Enter banner title" required/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="image" className="required">Image</label>
                                                    {this.state.id == 14 || this.state.id == 15 ?
                                                    <p style={{fontSize:"12px"}}>
                                                         (Note: Banner size will be maximum 300kb and resolution will be 376px * 531px)
                                                    </p>
                                                    :null}
                                                    {this.state.id == 16 ||this.state.id == 17 ?
                                                    <p style={{fontSize:"12px"}}>
                                                         (Note: Banner size will be maximum 300kb and resolution will be 376px * 260px)
                                                    </p>
                                                    :null}
                                                    {this.state.id == 3 ?
                                                    <p style={{fontSize:"12px"}}>
                                                         (Note: Banner size will be maximum 300kb and resolution will be 624px * 380px)
                                                    </p>
                                                    :null}
                                                    {this.state.id == 4 ?
                                                    <p style={{fontSize:"12px"}}>
                                                         (Note: Banner size will be maximum 300kb and resolution will be 337px * 422px)
                                                    </p>
                                                    :null}
                                                    {this.state.id == 5 || this.state.id == 6 ?
                                                    <p style={{fontSize:"12px"}}>
                                                         (Note: Banner size will be maximum 300kb and resolution will be 337* 200px)
                                                    </p>
                                                    :null}
                                                    {this.state.id == 3 ||this.state.id == 4 || this.state.id == 5 || this.state.id == 6 ||this.state.id == 14 ||this.state.id == 15 ||this.state.id == 16 ||this.state.id == 17 ?
                                                    <p style={{fontSize:"12px"}}></p>
                                                    :<p style={{fontSize:"12px"}}>
                                                    (Note: Banner size will be maximum 400kb and resolution will be 1350px * 500px)
                                                </p>}
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input type="file" name="currentimage" className="custom-file-input" id="image-banner-upload" onChange={(e) => {
                                                                this.setState({ currentimage:e.target.files[0] });
                                                            }}/>
                                                            <label className="custom-file-label" htmlFor="image">{this.state.currentimage.name}</label>
                                                        </div>
                                                    </div>
                                                    <img className="cover-image mt-2" src={'https://data.artaux.io/images/banner/'+this.state.image } alt="" />
                                                    <p id="error_banner_image"></p>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="url" className="required">URL</label>
                                                    <input type="url" name="url" className="form-control" value={this.state.url} onChange={this.handleInput} id="url" placeholder="Enter URL" />
                                                </div>
                                                {this.state.id == 3 ||this.state.id == 4 || this.state.id == 5 || this.state.id == 6 ||this.state.id == 14 ||this.state.id == 15 ||this.state.id == 16 ||this.state.id == 17 ?
                                                <div></div>
                                                :<div className="form-group">
                                                
                                                    <label htmlFor="exampleInputEmail1" className="required">Status</label><br></br>
                                                    <label class="switch">
                                                        <input type="checkbox" value={this.state.status} onClick={(e) => {
                                                                this.setState({ newstatus:e.target.checked });
                                                            }} defaultChecked={this.state.active} />
                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                                }
                                            </div>

                                            <div className="card-footer">
                                                <button type="submit" id="add-banner" className="btn btn-primary ml-2">{this.state.isLoading ? <img src="/assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> : <i className="fa fa-check"></i>} Update Banner </button>
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

export default EditBanner;