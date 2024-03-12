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

class ViewRates extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        this.getRates();
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
    async getRates() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_rates?token='+ tk);
        if(response.data.rates){
            this.setState({ rates: response.data.rates, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
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
                                    <h1>Currency Rates</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item">Currency Rates</li>
                                        {/* <li className="breadcrumb-item active">Rates</li> */}
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
                                    {this.state.rates &&
                                        <table id="example" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Category ID</th>
                                                    <th className="text-center">Country</th>
                                                    <th className="text-center">Rate</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.rates.filter(rate =>rate.id == 1 || rate.id == 2).map(
                                                (rate,index) =>
                                                <tr>
                                                    <td className="text-center">{index+1}</td>
                                                    <td className="text-center">{rate.country}</td>
                                                    <td className="text-center">{rate.rate}</td>
                                                    <td className="text-center">
                                                        <Link to={'/admin-edit-rate_'+rate.id} className="btn btn-success"><i className="fas fa-pencil-square-o" title="Edit"></i></Link>
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

export default ViewRates;