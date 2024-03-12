import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class AddCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            main_cat: '0',
        }
    }
    componentDidMount() {
        this.getcategories();
    }
    async getcategories() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_main_category?token='+ tk);
        if(response.data.category){
            this.setState({ category: response.data.category, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.setState({ isLoading: false });
            this.props.history.push("../admin-add-category");
        }
    }
    state = {
        name: '',
       main_cat: 0,
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    addCategory = async (e) => {
        e.preventDefault();
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        this.setState({ isLoading: true });
        const res = await axios.post('api/admin_auth/add_category?token='+ tk, this.state);
        if(res.data.status === 200){
        	Swal.fire({
        		 position: 'center',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 8000
        	});
            this.setState({ isLoading: false });
            this.props.history.push("../admin-view-categories");
        }else if(res.data.error === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		type: "error",
        	});
            this.setState({ isLoading: false });
        	this.props.history.push("../admin-add-category");
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
                                        <h1>Add Category</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item">Category</li>
                                            <li className="breadcrumb-item active">Add Category</li>
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
                                            <form method="post" onSubmit={this.addCategory.bind(this)}>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className="required">Category Title</label>
                                                        <input type="text" className="form-control" name="name" id="name" value={this.state.name} onChange={this.handleInput} placeholder="Enter category" required/>
                                                    </div>
                                                </div>

                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className="required">Category Level</label>
                                                        {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading categories...</h6> }
                                                        {this.state.category &&
                                                        <select className="form-control" name="main_cat" value={this.state.main_cat} onChange={(e) => {
                                                            console.log("selected value", e.target.value)
                                                            this.setState({ main_cat:e.target.value });
                                                        }}>
                                                            <option value="0">Main Category</option>
                                                            {this.state.category.map(
                                                            category =>
                                                            <option value={category.id}>{category.name}</option>
                                                            )}
                                                        </select>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-primary ml-2">{this.state.isLoading ? <img src="/assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> : <i className="fa fa-check"></i>} Add Category</button>
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

export default AddCategory;