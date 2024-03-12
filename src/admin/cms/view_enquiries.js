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

class ViewEnquiries extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.getEnquiry();
        $(document).ready(function () {
            setTimeout(function () {
              $('#example').DataTable(
                {
                  pagingType: 'full_numbers',
                  pageLength: 5,
                  processing: true,
                  dom: 'Bfrtip',
                  buttons: ['copy', 'csv', 'print'
                  ]
                }
              );
            },
              1000
            );
          });
    }

    async getEnquiry() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_enquiry?token='+ tk);
        if(response.data.enquiries){
            this.setState({ enquiries: response.data.enquiries, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.setState({ isLoading: false });
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
                                        <h1>Enquiries</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">Enquiries</li>
                                            {/* <li className="breadcrumb-item active">View Enquiries</li> */}
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
                                            {this.state.enquiries &&
                                                <table id="example" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Subject</th>
                                                            <th>Message</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.enquiries.map(
                                                    (enquiry,index) =>
                                                        <tr>
                                                            <td>{index+1}</td>
                                                            <td>{enquiry.name}</td>
                                                            <td>{enquiry.email}</td>
                                                            <td>{enquiry.phone}</td>
                                                            <td style={{maxWidth:"200px"}}>{enquiry.subject}</td>
                                                            <td style={{maxWidth:"200px"}}>{enquiry.message}</td>
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

export default ViewEnquiries;