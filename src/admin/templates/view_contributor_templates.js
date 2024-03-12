import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";
import { useParams, useHistory } from 'react-router-dom';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

class View_contributor_templates extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            cat_id: '',
            file_type: '',
            image: null,
            zip: null,
            desc: '',
            add_desc: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getContributorTemplates();
        $(document).ready(function () {
            setTimeout(function () {
              $('#example').DataTable(
                {
                  pagingType: 'full_numbers',
                  pageLength: 50,
                  processing: true,
                  dom: 'Bfrtip',
                  buttons: []
                }
              );
            },
              1000
            );
          });
        
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    async getContributorTemplates() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk = localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_contributor_templates/${params.id}?token=`+ tk);
        // if(response.data.templates){
            this.setState({ templates: response.data.templates, isLoading: false});
        // }
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
                                    <h1>View Contributor Digital Assets</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Digital Assets</li>
                                        <li className="breadcrumb-item active">View Digital Assets</li>
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
                                            {this.state.templates &&
                                            <table id="example" className="table table-bordered table-striped table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Title</th>
                                                        <th>Category</th>
                                                        <th>Extension</th>
                                                        <th>File</th>
                                                        <th>Image</th>
                                                        <th>Status</th>
                                                        <th>Created On</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.templates.length > 0 ? this.state.templates.map(
                                                    (templates, index) =>
                                                    <tr key={index}>
                                                        <td>{templates.id}</td>
                                                        <td>{templates.title}</td>
                                                        <td>{templates.category_name}</td>
                                                        <td>{templates.file_type}</td>
                                                        <td><a href={'https://data.artaux.io/images/template/'+templates.zip} download>View File</a></td>
                                                        <td><img className="cover-image" src={'https://data.artaux.io/images/template/'+templates.image } alt="" /></td>
                                                        {templates.status == 1 ?
                                                        <td className="text-success">Active</td>
                                                        :null}
                                                        {templates.status == 0 ?
                                                        <td className="text-danger">In-active</td>
                                                        :null}
                                                        <td>{(new Date(templates.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                        <td>
                                                            <a href={'/admin-contributer_edit_template_'+templates.id} className="btn btn-success btn-sm" style={{padding:'3px 9px !important'}}><i className="fas fa-pencil-square-o" title="Edit"></i></a>
                                                            <Link to={'/admin-contributer_view_template'} className="btn btn-danger ml-2" onClick={(e) => {
                                                            this.setState({ id:templates.id })
                                                        } }><i className="fas fa-trash" title="Delete" onClick={(e) => this.deleteTemplate(template.id)} style={{fontSize:'12px !important'}}></i></Link>
                                                        </td>
                                                    </tr>
                                                    ) : <td colspan="9"><h6>No data avaliable.</h6></td>}
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

export default View_contributor_templates;