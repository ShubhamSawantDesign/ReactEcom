import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../../inc/Footer";
import Navbar from "../../inc/Navbar";
import Sidebar from "../../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";
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

class View_template extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }
    componentDidMount() {
        this.getTemplates();
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
    async getTemplates() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        const response = await axios.get('api/vendor_auth/view_approve_template?token='+ tk);
        if(response.data.templates){
            this.setState({ templates: response.data.templates, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-contributer_view_template");
        }
    }

    async deleteTemplate(){
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        console.log('id',this.state);

        Swal.fire({
            title: 'Submit your reason for deletion',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
                this.setState({ reason: login });
                const response = await axios.post('api/vendor_auth/delete_template_request?token='+ tk,this.state);
                if(response.data.status === 200){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 8000
                    });
                    this.props.history.go(0);
                }else if(response.data.status === 401){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 8000
                    });
                    // this.props.history.push("../admin-contributer_view_template");
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
           
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
                                        <h1>Approved Digital Assets</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">Digital Assets</li>
                                            <li className="breadcrumb-item active">Approved Digital Assets</li>
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
                                            {this.state.isLoading && <h4>Loading...</h4> }
                                                {this.state.templates &&
                                                <table id="example" className="table table-bordered table-striped" style={{overflow:'scroll'}}>
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">ID</th>
                                                            <th className="text-center">Title</th>
                                                            <th className="text-center">Category</th>
                                                            <th className="text-center">Extension</th>
                                                            <th className="text-center">File</th>
                                                            <th className="text-center">Image</th>
                                                            <th className="text-center">Status</th>
                                                            <th className="text-center">Created On</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.templates.map(
                                                        (templates, index) =>
                                                        <tr key={index}>
                                                            <td className="text-center">{templates.id}</td>
                                                            <td className="text-center">{templates.title}</td>
                                                            <td className="text-center">{templates.category_name}</td>
                                                            <td className="text-center">{templates.file_type}</td>
                                                            <td className="text-center"><a href={'https://data.artaux.io/images/template/'+templates.zip} download>View document</a></td>
                                                            <td className="text-center"><img className="cover-image" src={'https://data.artaux.io/images/template/'+templates.image }/></td>
                                                            {templates.status == 0 &&
                                                            <td className="text-center" style={{color:'red'}}>Inactive</td>
                                                            }
                                                            {templates.status == 1 &&
                                                            <td className="text-center" style={{color:'green'}}>Active</td>
                                                            }
                                                            {templates.status == 2 &&
                                                            <td className="text-center" style={{color:'green'}}>Under Review</td>
                                                            }
                                                            <td className="text-center">{(new Date(templates.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                            <td className="text-center">
                                                                <a href={'/admin-contributer_edit_template_'+templates.id} className="btn btn-success btn-sm" style={{padding:'3px 9px !important'}}><i className="fas fa-pencil-square-o" title="Edit"></i></a>
                                                                {/* <a href={'/admin-contributer_delete_request_'+templates.id} className="btn btn-success btn-sm" style={{padding:'3px 9px !important'}}><i className="fas fa-trash" title="Delete"></i></a> */}
                                                                <Link to={'/admin-contributer_view_approve_template'} className="btn btn-danger ml-2"   onClick={(e) => {
                                                                this.setState({ id:templates.id })
                                                            } }><i className="fas fa-trash" title="Delete" onClick={(e) => this.deleteTemplate(template.id)} style={{fontSize:'12px !important'}}></i></Link>
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

export default View_template;