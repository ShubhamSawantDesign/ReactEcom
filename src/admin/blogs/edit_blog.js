import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class AddBlog extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            image: {name:null},
            content: '',
        }
    }

    componentDidMount() {
        this.getBlog();
    }

    async getBlog() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/edit_view_blog/${params.id}?token=`+ tk);
        if(response.data.blog){
            this.setState({  
                title: response.data.blog.title,
                image1: response.data.blog.image,
                content: response.data.blog.content,
                id: response.data.blog.id,
                author: response.data.blog.author,
                 isLoading: false
                });
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.setState({ isLoading: false });
        }
}

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});   
    }

    EditBlog = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('author', this.state.author);
        formData.append('id', this.state.id);
       fetch('https://data.artaux.io/api/admin_auth/edit_blog?token='+ tk,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        }).then((res)=>{
            Swal.fire({
              position: 'center',
                icon: 'success',
                title: 'Blog add successfully',
                showConfirmButton: false,
                timer: 8000
            });
            this.setState({ isLoading: false });
            // this.props.history.push("../admin-contributer_view_template");
        }).catch((error)=>{
            Swal.fire({
                title: "Failed!",
                text: 'Template not added.',
                type: "error",
            });
            this.setState({ isLoading: false });
            // this.props.history.push("../admin-contributer_view_template");
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
                                    <h1>Add Blog</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Blogs</li>
                                        <li className="breadcrumb-item active">Add Blog</li>
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
                                        <form onSubmit={this.EditBlog.bind(this)} method="post" encType="multipart/form-data" id="template_form">
                                            <div className="card-body">


                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Title</label>
                                                    <input type="text" className="form-control" id="title" name="title" required value={this.state.title} onChange={this.handleInput} placeholder="Enter template title" />
                                                </div>


                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile" className="required">Image</label> <p style={{fontSize:"12px"}}>(Note: Blog image size will be 1350px * 500px)</p>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="image" name="image"  onChange={(e) => {
                                                            console.log('image',e.target.files[0])
                                                                this.setState({ image:e.target.files[0] });
                                                            }} accept="image/png, image/jpg, image/jpeg" />
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                                        </div>
                                                    </div>
                                                    <img className="cover-image mt-2" src={'https://data.artaux.io/images/blog/'+this.state.image1 } alt="" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Author name</label>
                                                    <input type="text" className="form-control" id="author" name="author" required value={this.state.author} onChange={this.handleInput} placeholder="Enter template title" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description" className="required"> Content</label>
                                                    <CKEditor
                                                        editor={ ClassicEditor }
                                                        data={this.state.content}
                                                        onReady={ editor => {
                                                            // You can store the "editor" and use when it is needed.
                                                            console.log( 'Editor is ready to use!', editor );
                                                        } }
                                                        onChange={ ( event, editor ) => {
                                                            const data = editor.getData();
                                                            this.setState({content: data});
                                                            console.log( data  );
                                                        } }
                                                    />
                                                    {/* <textarea className="form-control"  name="content" value={this.state.content} onChange={this.handleInput} rows="3" placeholder="Enter description" required></textarea> */}
                                                </div>

                                                {/* <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Tags</label>
                                                    <input type="text" className="form-control" id="tags" name="tags" value=.tags} onChange={this.handleInput} placeholder="Enter Tags " required />
                                                </div> */}

                                                {/*<div className="form-group">
                                                    <label htmlFor="description" className="required"> Add Tags</label>
                                                    <input className="form-control input-tags" id="tags" name="tags" data-role="tagsinput" value=.tags} onChange={this.handleInput} placeholder="Add Tags" />
                                                </div>*/}

                                            </div>
                                            
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary ml-2">{this.state.isLoading ? <img src="/assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> : <i className="fa fa-check"></i>} Edit Blog</button>
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

    
export default AddBlog;