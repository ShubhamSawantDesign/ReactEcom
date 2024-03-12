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

class ViewOrders extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if(params.fromdate){
            this.setState({ fromdate: params.fromdate,todate: params.todate});
            this.getFilterOrders();
        }else{
        this.getOrders();
        }
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

    async getFilterOrders() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_filter_orders/${params.fromdate}/${params.todate}?token=`+ tk);
        if(response.data.orders){
            this.setState({ orders: response.data.orders,templates:response.data.templates, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }
    }

    async getOrders() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_user_orders/${params.id}?token=`+ tk);
        if(response.data.orders){
            this.setState({ orders: response.data.orders,templates:response.data.templates, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    async changeStatus(id) {
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        this.setState({id:id});
        const res = await axios.post(`api/admin_auth/update_order_status/${id}?token=`+ tk,this.state);
        if(res.data.status === 200){
        	Swal.fire({
                title: res.data.message,
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
        }else if(res.data.error === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		type: "error",
        	});
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
                                        <h1>View Orders</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">Orders</li>
                                            <li className="breadcrumb-item active">View Orders</li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-primary">
                                            <div className="card-body row">
                                                <div className="form-group col-md-4">
                                                    <label for="exampleInputEmail1" className="required">From Date</label>
                                                    <input type="date" className="form-control" name="fromdate" id="fromdate" value={this.state.fromdate} onChange={(e) => {
                                                                    // console.log('cat_name',e.target.value);
                                                                this.setState({ fromdate:e.target.value });
                                                            }}  />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label for="exampleInputEmail1" className="required">To Date</label>
                                                    <input type="date" className="form-control" name="todate" id="todate" value={this.state.todate} onChange={(e) => {
                                                                    // console.log('cat_name',e.target.value);
                                                                this.setState({ todate:e.target.value });
                                                            }}  />
                                                </div>
                                                <div className="form-group col-md-4 mt-2"><br/>
                                                    <a href={'/admin-view-orders/'+this.state.fromdate+'/'+this.state.todate} type="submit" className="btn btn-primary ml-2"><i className="fa fa-check"></i> submit</a>
                                                </div>
                                            </div>
                                        </div>
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
                                                            <th>Order ID</th>
                                                            <th>Purchased On</th>
                                                            <th>User ID</th>
                                                            {/*<th>Templates</th>*/}
                                                            <th>Amount</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.orders.map(
                                                            (order, index) =>
                                                        <tr key={index}>
                                                            <td >{order.id}</td>
                                                            <td>{(new Date(order.updated_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                            <td>{order.user_id}</td>
                                                            <td>₹{parseFloat(order.grand_total).toFixed(2)}</td>
                                                            <td>
                                                                <Link to={"/admin-view_order_"+order.id} className="btn btn-info btn-sm"><i className="fas fa-eye"></i></Link>
                                                                
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

export default ViewOrders;