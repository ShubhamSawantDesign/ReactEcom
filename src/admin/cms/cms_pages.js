import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class ViewCMSPages extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }
    componentDidMount() {
        this.getPages();
    }
    async getPages() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_pages?token='+ tk);
        if(response.data.pages){
            this.setState({ pages: response.data.pages, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-cms-pages");
        }
    }

    async deletePages(id){
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        this.setState({id:id});
        console.log('id',this.state.id);
        const response = await axios.post('api/admin_auth/delete_pages?token='+ tk,this.state);
        if(response.data.status){
            Swal.fire({
        		title: "Success!",
        		text: response.data.message,
        		type: "success",
        	});
            // this.getPages();
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-cms-pages");
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
                                        <h1>CMS Pages</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">CMS</li>
                                            <li className="breadcrumb-item active">CMS Pages</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                            {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                                {this.state.pages &&
                                                <table id="example1" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">ID</th>
                                                            <th className="text-center">Title</th>
                                                            {/* <th className="text-center">Description</th> */}
                                                            <th className="text-center">Created On</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.pages.map(
                                                        page =>
                                                        <tr max->
                                                            <td className="text-center">{page.id}</td>
                                                            <td className="text-center">{page.title}</td>
                                                            {/* <td style={{Height:"400px",overflowX:"scroll",overflowY:"scroll"}} dangerouslySetInnerHTML={{ __html: page.content}}></td> */}
                                                            {/* <td className="text-success">Active</td> */}
                                                            <td className="text-center">{(new Date(page.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                            <td className="text-center">
                                                            <Link to={'/admin-edit_cms_page_'+page.id} className="btn btn-success btn-sm"><i className="fas fa-pencil-square-o" title="Edit"></i></Link>
                                                                    {/* <Link to={'/admin-view-cms-pages'} className="btn btn-danger ml-2"   onClick={(e) => {
                                                                this.setState({ id:page.id })
                                                           
                                                            } }><i className="fas fa-trash" title="Delete" onClick={(e) => this.deletePages(page.id)} style={{fontSize:'12px !important'}}></i></Link> */}
                                                            </td>
                                                        </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            }
                                            </div>
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

export default ViewCMSPages;