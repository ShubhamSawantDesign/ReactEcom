import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class EditFileExtension extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getExtension();
    }

    async getExtension() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_edit_file_extension/${params.id}?token=`+ tk);
        if(response.data.extension){
            this.setState({
                name: response.data.extension.name,
                id: response.data.extension.id,
                isLoading: false});
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    editFileExtension = async (e) => {
        e.preventDefault();
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const res = await axios.post(`api/admin_auth/edit_file_extension/${params.id}?token=`+ tk, this.state);
        if(res.data.status === 200){
        	Swal.fire({
        		 position: 'center',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 8000
        	});
            this.setState({ isLoading: false });
            // this.props.history.go(0);
        }else if(res.data.error === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		type: "error",
        	});
            this.setState({ isLoading: false });
        	// this.props.history.push("../admin-add-category");
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
                                        <h1>Edit File Extension</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item">File Extension</li>
                                            <li className="breadcrumb-item active">Edit File Extension</li>
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
                                            <form method="post" onSubmit={this.editFileExtension.bind(this)}>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className="required">File Extension</label>
                                                        <input type="text" className="form-control" name="name" id="name" value={this.state.name} onChange={this.handleInput} placeholder="Enter File Extension Name" required/>
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-primary ml-2">{this.state.isLoading ? <img src="/assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> : <i className="fa fa-check"></i>} Edit File Extension</button>
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

export default EditFileExtension;