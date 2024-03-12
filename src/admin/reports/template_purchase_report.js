import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";
import html2PDF from 'jspdf-html2canvas';
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

class purchaseReport extends React.Component {
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
            this.getFilterOrders();
        }else{
            this.getOrders();
        }
        
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

    async getOrders() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/purchase_report?token='+ tk);
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

    async getFilterOrders() {
        this.setState({ isLoading: true });
        const { match: { params } } = this.props;
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/purchase_filter_report/${params.fromdate}/${params.todate}?token=`+ tk);
        if(response.data.orders){
            this.setState({ orders: response.data.orders,templates:response.data.templates,fromdate:params.fromdate,todate:params.todate, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-template");
        }
    }

    downloadPage = async (e) => {
        let page = document.getElementById('print');

        html2PDF(page, {
          jsPDF: {
            unit: 'px',
            format: 'a4',
             orientation: 'landscape',
          },

          html2canvas: {
            scale: 2,
            scrollX: 210,
            scrollY: window.scrollY,
            dpi: 144,
            width:1500,
          },
          imageType: 'image/jpeg',
          output: 'purchase_report.pdf'
        });
    }

    render(){
        return(
             <>
                <Navbar />
                <Sidebar />
                    <div className="content-wrapper" id="print">
                        <section className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6"> 
                                        <h1>Purchase Reports</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">Reports</li>
                                            <li className="breadcrumb-item active">Purchase Reports</li>
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
                                                    <a href={'/admin-template_purchase_report/'+this.state.fromdate+'/'+this.state.todate} type="submit" className="btn btn-primary ml-2"><i className="fa fa-check"></i> submit</a>
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
                                            {/* <div className="row no-print">
                                                <div className="col-12">
                                                  <button type="button" className="btn btn-primary float-right" onClick={this.downloadPage} style={{marginRight: '5px'}}>
                                                    <i className="fas fa-download" /> Download
                                                  </button>
                                                </div>
                                              </div> */}
                                            {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                                {this.state.orders  &&
                                                <table id="example" className="table table-bordered table-striped table-responsive">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">Pur. Date</th>
                                                            <th className="text-center">Tmp. Name</th>
                                                            <th className="text-center">Order Id</th>
                                                            <th className="text-center">Selling Price</th>
                                                            <th className="text-center">User Id</th>
                                                            <th className="text-center">Con. Id</th>
                                                            <th className="text-center">GST(18%)</th>
                                                            <th className="text-center">Applied Discount</th>
                                                            <th className="text-center">Billing Amount</th>
                                                            <th className="text-center">Con. Share Amount</th>
                                                            <th className="text-center">Artaux Share Amount</th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.orders.map(
                                                            (order, index) =>
                                                        <tr key={index}>
                                                            <td className="text-center">{(new Date(order.updated_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                            <td className="text-center">{order.template_name}</td>
                                                            <td className="text-center">{order.order_id}</td>
                                                            <td className="text-center">₹{parseFloat(order.product_price).toFixed(2)}</td>
                                                            <td className="text-center">{order.user_id}</td>
                                                            <td className="text-center">{order.vendor_id}</td>
                                                            <td className="text-center">₹{parseFloat(order.gst_price).toFixed(2)}</td>
                                                            <td className="text-center">{order.discount}%</td>
                                                            <td className="text-center">₹{parseFloat(order.price).toFixed(2)}</td>
                                                            <td className="text-center">₹{parseFloat(order.product_price/100*order.vendor_share).toFixed(2)}</td>
                                                            <td className="text-center">₹{parseFloat(order.product_price - parseFloat(order.product_price/100*order.vendor_share).toFixed(2)).toFixed(2)}</td>
                                                            
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

export default purchaseReport;