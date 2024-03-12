import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
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
import ModalImage from "react-modal-image";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class ViewContributors extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }

    componentDidMount() {
        this.getContributors();
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

    async getContributors() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_contributors?token='+ tk);
        if(response.data.contributors){
            this.setState({ contributors: response.data.contributors,accounts: response.data.account, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-contributors");
        }
    }

    async updateStatus() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/update_contributor?token='+ tk);
        if(response.data.contributors){
            this.setState({ contributors: response.data.contributors, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-contributors");
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
                                    <h1>Contributors</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Contributors</li>
                                        {/* <li className="breadcrumb-item active"> Contributors</li> */}
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
                                        <div className="card-body" style={{overflow:"auto"}}>
                                            {this.state.isLoading && <h6><i class="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                            {this.state.contributors &&
                                            <table id="example" className="table table-bordered table-striped" >
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Contributer ID</th>
                                                        <th className="text-center">Name</th>
                                                        <th className="text-center">Username</th>
                                                        <th className="text-center">Photo ID</th>
                                                        {/* <th className="text-center">Email</th> */}
                                                        {/* <th className="text-center">Profession</th> */}
                                                        <th className="text-center">Status</th>
                                                        <th className="text-center">Contributer ratio</th>
                                                        {/* <th className="text-center">Nationality</th> */}
                                                        <th className="text-center">Registered On</th>
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.contributors.map(
                                                    (contributors, index) =>
                                                    <tr key={index}>
                                                        <td className="text-center">{contributors.id}</td>
                                                        <td className="text-center">{contributors.name}</td>
                                                        <td className="text-center">{contributors.username}</td>
                                                        {contributors.photo_image != '' ?
                                                            <td className="text-center">
                                                                <ModalImage
                                                                    small={"https://data.artaux.io/images/photo_id/"+contributors.photo_image}
                                                                    large={"https://data.artaux.io/images/photo_id/"+contributors.photo_image}
                                                                    />
                                                                {/* {contributors.photo_image} */}
                                                            </td>
                                                        :contributors.photo_file != '' ?<td className="text-center"><a href={'https://data.artaux.io/images/photo_id/'+contributors.photo_file} download>View document</a></td>
                                                        :<td></td>}
                                                        {/* <td className="text-center"><a href={"mailto:"+contributors.email}>{contributors.email}</a></td> */}
                                                        {/* <td className="text-center">{contributors.profession} </td> */}
                                                        <td className="text-center">
                                                            {/* <form onChange={this.updateStatus.bind(this)} method="post">
                                                                <label class="switch">
                                                                    <input type="checkbox" checked={this.state.checked} onChange={this.handleCheck} value="1" />
                                                                    <span class="slider round"></span>
                                                                </label>
                                                            </form> */}
                                                            {contributors.status == 0 &&
                                                                   <font style={{color:'red'}}>Inactive</font>
                                                            }
                                                            {contributors.status == 1 &&
                                                                  <font className="text-center" style={{color:'green'}}>Active</font>
                                                            }
                                                        </td>
                                                        <td className="text-center">{contributors.ratio}%</td>
                                                        {/* <td className="text-center">{contributors.nationality}</td> */}
                                                        <td className="text-center">{(new Date(contributors.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                        <td className='text-center'>
                                                            <a href={'admin-contributor_edit_'+contributors.id} className="btn btn-success btn-sm ml-1 m-1" title="Contributoe Edit"><i className="fas fa-pencil-square-o" title="Edit"></i></a>
                                                            <a href={'admin-view-contributor-orders/'+contributors.id} className="btn btn-success btn-sm ml-1 m-1 " title="Orders"><i className="fas fa-truck-moving"></i></a>
                                                            <a href={'admin-view-contributor-templates/'+contributors.id} className="btn btn-success btn-sm ml-1 m-1" title="User Digital Assets"><i className="fas fa-file-archive"></i></a>
                                                            <Popup trigger={<a href="#" className="btn btn-success btn-sm ml-1 m-1"><i className="fas fa-money-bill-wave"></i></a>} modal>
                                                                <div>
                                                                    <h3 className="text-center">Account Details</h3>
                                                                    <hr></hr>
                                                                    {this.state.accounts.filter(account => account.vendor_id == contributors.id).map( account =>
                                                                    <>
                                                                    {contributors.nationality === 'Indian' ? 
                                                                    <div className="row">
                                                                        {account.upi_id === '' || account.upi_id === null || account.upi_id === 'undefined'?
                                                                        <div className="col-md-8">
                                                                            <p><b>Benificiery Name :</b> {account.name}</p><br/>
                                                                            <p><b>Account No :</b> {account.acc_no}</p><br/>
                                                                            <p><b>Bank Name :</b> {account.bank_name}</p><br/>
                                                                            <p><b>Bank Branch :</b> {account.branch}</p><br/>
                                                                            <p><b>IFSC Code :</b> {account.ifsc}</p><br/>
                                                                        </div>
                                                                        :
                                                                        <div className="col-md-8">
                                                                            <p><b>UPI ID:</b> {account.upi_id}</p><br/>
                                                                        </div>
                                                                        }
                                                                    </div>
                                                                    :
                                                                    <div className="row">
                                                                        <div className="col-md-8">
                                                                            <p><b>Paypal Email ID:</b> {account.email}</p><br/>
                                                                        </div>
                                                                    </div>
                                                                    }
                                                                    </>
                                                                    )}
                                                                </div>
                                                                
                                                            </Popup>
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

export default ViewContributors;