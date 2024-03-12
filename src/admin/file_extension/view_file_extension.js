import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
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

class ViewExtension extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        this.getExtension();
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
    async getExtension() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_file_extension?token='+ tk);
        if(response.data.extension){
            this.setState({ extensions: response.data.extension, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            // this.props.history.push("../admin-add-category");
        }
    }

    async deleteExtension(id){
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const formData = new FormData();
        formData.append('id', id);
        const response = await axios.post('api/admin_auth/delete_file_extension?token='+ tk,formData);
        if(response.data.status === 200){
            Swal.fire({
                title: response.data.message,
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
                    this.props.history.go(0);
                } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
                }
              })
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-categories");
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
                                    <h1>File Extensions</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        {/* <li className="breadcrumb-item">File Extension</li> */}
                                        <li className="breadcrumb-item active">File Extensions</li>
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
                                    {this.state.extensions &&
                                        <table id="example" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Number</th>
                                                    <th className="text-center">Extension</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.extensions.map(
                                                (extension,index) =>
                                                <tr>
                                                    <td className="text-center">{index+1}</td>
                                                    <td className="text-center">{extension.name}</td>
                                                    <td className="text-center">
                                                        <Link to={'/admin-edit-file_extension_'+extension.id} className="btn btn-success"><i className="fas fa-pencil-square-o" title="Edit"></i></Link>
                                                        <Link onClick={this.deleteExtension.bind(this,extension.id)} className="btn btn-danger ml-2"><i className="fas fa-trash" title="Delete" style={{fontSize:'12px !important'}}></i></Link>
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

export default ViewExtension;