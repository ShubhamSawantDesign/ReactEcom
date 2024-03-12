import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";

class ViewMidSectionBanners extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }
    
    componentDidMount() {
        this.getMidBanners();
    }

    async getMidBanners() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_mid_section_banners?token='+ tk);
        if(response.data.banners){
            this.setState({ banners: response.data.banners, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-banners");
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
                                    <h1>Mid-Section Banners</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Banner</li>
                                        <li className="breadcrumb-item active">Mid-Section Banners</li>
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
                                        {this.state.banners &&
                                        <table id="example1" className="table table-bordered table-striped ">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Id</th>
                                                    <th className="text-center">Title</th>
                                                    <th className="text-center">Image</th>
                                                    <th className="text-center">URL</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Created On</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.banners.map(
                                                (banners, index) =>
                                                <tr key={index}>
                                                    <td className="text-center">{index+1}</td>
                                                    <td className="text-center" style={{maxWidth:"200px"}}>{banners.title}</td>
                                                    <td className="text-center"><img className="cover-image" src={'https://data.artaux.io/images/banner/'+banners.image }/></td>
                                                    <td className="text-center" style={{maxWidth:"200px"}}>{banners.url}</td>
                                                    {banners.status == 0 &&
                                                        <td className="text-center" style={{color:'red'}}>Inactive</td>
                                                    }{banners.status == 1 &&
                                                        <td className="text-center" style={{color:'green'}}>Active</td>
                                                    }
                                                    <td className="text-center">{(new Date(banners.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                    <td className="text-center">
                                                        <a href={'/admin/edit-banner/'+banners.id} className="btn btn-success"><i className="fas fa-pencil-square-o" title="Edit"></i></a>
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

export default ViewMidSectionBanners;