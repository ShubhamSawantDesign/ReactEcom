import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditCMSPage extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            main_cat: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getPage();
    }
    async getPage() {
        this.setState({ isLoading: true });
        const { match: { params } } = this.props;
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/edit_view_pages/${params.id}?token=`+ tk);
        if(response.data.pages){
            this.setState({
                 title: response.data.pages.title,
                 id: response.data.pages.id,
                 content: response.data.pages.content,
                 isLoading: false
                });
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-cms-pages");
        }
    }
   
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    addPages = async (e) => {
        e.preventDefault();
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const res = await axios.post('api/admin_auth/edit_pages?token='+ tk, this.state);
        if(res.data.status === 200){
        	Swal.fire({
        		position: 'center',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 8000
        	});
            this.props.history.push("../admin-view-cms-pages");
        }else if(res.data.error === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		type: "error",
        	});
        	this.props.history.push("../admin-add-cms-page");
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
                                    <h1>Edit CMS Page</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">CMS</li>
                                        <li className="breadcrumb-item active">Edit CMS Page</li>
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
                                        <form onSubmit={this.addPages.bind(this)} method="post">
                                            <div className="card-body">

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Title</label>
                                                    <input type="text" className="form-control" name="title" id="title" value={this.state.title}  placeholder="Enter page title" readOnly/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description" className="required"> Description</label>
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
                                                    {/* <textarea className="form-control" name="content" id="content" value={this.state.content} onChange={this.handleInput} rows="5" ></textarea> */}
                                                </div>
                                            </div>
                                            
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary ml-2"><i className="fa fa-check"></i> Edit CMS Page</button>
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

export default EditCMSPage;