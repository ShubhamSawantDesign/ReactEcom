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

class View_orders extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }

    componentDidMount() {
        this.getOrders();
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

    async getOrders() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        const response = await axios.get('api/vendor_auth/view_orders?token='+ tk);
        if(response.data.orders){
            this.setState({ orders: response.data.orders,templates:response.data.templates, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-template");
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
                                        <h1>Unsettled Orders</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">Orders</li>
                                            <li className="breadcrumb-item active">Unsettled Orders</li>
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
                                                {this.state.orders  &&
                                                <table id="example" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">Order ID</th>
                                                            <th className="text-center">Purchased On</th>
                                                            <th className="text-center">Product Name</th>
                                                            <th className="text-center">Product ID</th>
                                                            <th className="text-center">Amount</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.orders.map(
                                                            (order, index) =>
                                                        <tr key={index}>
                                                            <td className="text-center">{order.id}</td>
                                                            <td className="text-center">{(new Date(order.updated_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                            <td className="text-center">{order.product_name}</td>
                                                            <td className="text-center">{order.product_id}</td>
                                                            <td className="text-center">₹{parseFloat(order.final_price/100*JSON.parse(localStorage.getItem('ve_user')).ratio).toFixed(2)}</td>
                                                            
                                                            <td className="text-center">
                                                                <Link to={"/admin-contributer_view_order_"+order.id} className="btn btn-info btn-sm"><i className="fas fa-eye"></i></Link>
                                                                
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

export default View_orders;