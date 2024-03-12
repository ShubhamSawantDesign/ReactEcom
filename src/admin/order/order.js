import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";
import html2PDF from 'jspdf-html2canvas';

class View_orders extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
            order:''
        }
    }

    componentDidMount() {
        this.getOrders();
        this.getchangeCurrency();
    }

    async getOrders() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_order/`+params.id+`?token=`+ tk);
        if(response.data.orders){
            this.setState({ order: response.data.orders,vendors: response.data.vendors,final_total: response.data.final_total,templates:response.data.templates, isLoading: false});
            console.log('test',this.state.final_total)
            // const Gst_amount = this.state.final_total-this.state.final_total*(100/(100+18));
            const Gst_amount = 0;
            if(this.state.order.currency == "INR"){
              const total = this.state.final_total - Gst_amount
              this.setState({ gst_amount: Gst_amount,total:total});
            }else{
              const total = this.state.final_total
              this.setState({ gst_amount: Gst_amount,total:total});
            }
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }
    }
    async getchangeCurrency() {
        const response = await axios.get(`/api/auth/get_rates`);
        if(response.data){
            this.setState({ 
                INR_rate: response.data.INR_rate.rate,
                USD_rate: response.data.USD_rate.rate,
                GBP_rate: response.data.GBP_rate.rate,
                EURO_rate: response.data.EURO_rate.rate,
                DIRHAM_rate: response.data.DIRHAM_rate.rate,
                isLoading: false});
            // this.setState({templateNumber : this.state.templates.length});
        }
        // console.log('rate',this.state.INR_rate)
        const INR_rate = this.state.INR_rate;
        const GBP_rate = this.state.USD_rate;
        const USD_rate = this.state.GBP_rate;
        const EURO_rate = this.state.EURO_rate;
        const DIRHAM_rate = this.state.DIRHAM_rate;
        if(this.state.order.currency == 'INR'){
            this.setState({exhangerate:INR_rate });
            this.setState({sign:'₹' });
        }else if(this.state.order.currency == 'USD'){
            this.setState({exhangerate:USD_rate });
            this.setState({sign:'$' });
        }else if(this.state.order.currency == 'GBP'){
            this.setState({exhangerate:GBP_rate });
            this.setState({sign:'£' });
        }else if(this.state.order.currency == 'EURO'){
            this.setState({exhangerate:EURO_rate });
            this.setState({sign:'€' });
        }else if(this.state.order.currency == 'DIRHAM'){
            this.setState({exhangerate:DIRHAM_rate });
            this.setState({sign:'.إ ' });
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});   
    }

    downloadPage = async (e) => {
        let page = document.getElementById('print');

        html2PDF(page, {
          jsPDF: {
            unit: 'px',
            format: 'a4',
          },
          imageQuality: 1,
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          html2canvas: {
            scrollX: 200,
            scrollY: -window.scrollY,
          },
          imageType: 'image/jpeg',
          output: './generate.pdf'
        });
    }


    render(){
      const { match: { params } } = this.props;
        return(
             <>
                <Navbar />
                <Sidebar />
                 <div className="content-wrapper"  style={{minHeight: '1602px'}}>
                        {/* Content Header (Page header) */}
                        <section className="content-header">
                          <div className="container-fluid">
                            <div className="row mb-2">
                              <div className="col-sm-6">
                                <h1>Order Details</h1>
                              </div>
                              <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                                  <li className="breadcrumb-item active">Order Details</li>
                                </ol>
                              </div>
                            </div>
                          </div>{/* /.container-fluid */}
                        </section>
                        <section className="content" id="print">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-12">
                                {/*<div className="callout callout-info">
                                  <h5><i className="fas fa-info" /> Note:</h5>
                                  This page has been enhanced for printing. Click the print button at the bottom of the invoice to test.
                                </div>*/}
                                {/* Main content */}
                                <div className="invoice p-3 mb-3">
                                  {/* title row */}
                                  <div className="row">
                                    <div className="col-12">
                                      <h4>
                                       <i className="fas fa-globe" /> <b>Order Id #{this.state.order.id}</b>
                                       <small className="float-right">
                                          <div className="row no-print">
                                            <div className="col-12">
                                              <Link to={'/admin-view_invoice_'+params.id} className="btn btn-primary float-right" style={{marginRight: '5px'}}>
                                                <i className="fas fa-eye" />View Invoice
                                              </Link>
                                            </div>
                                          </div>
                                        </small><br/><br/>
                                        <small className="float-right">Date: {this.state.order.updated_at}</small>
                                        
                                      </h4>
                                    </div>
                                    {/* /.col */}
                                  </div>
                                  {/* info row */}
                                  <div className="row invoice-info">

                                    <div className="col-sm-4 invoice-col">
                                      User Details
                                      <address>
                                        <strong>{this.state.order.name}</strong><br />
                                        <b>Currency: </b>{this.state.order.currency}<br />
                                        <b>Date: </b>{this.state.order.updated_at}<br />
                                        <b>Email: </b>{this.state.order.user_email}<br/>
                                        <b>Payment Id: </b>{this.state.order.payment_id}<br/>
                                        <b>Payment Method: </b>{this.state.order.payment_method}
                                      </address>
                                    </div>
                                    {/*
                                    <div className="col-sm-4 invoice-col">
                                      To
                                      <address>
                                        <strong>John Doe</strong><br />
                                        795 Folsom Ave, Suite 600<br />
                                        San Francisco, CA 94107<br />
                                        Phone: (555) 539-1037<br />
                                        Email: john.doe@example.com
                                      </address>
                                    </div>
                                    */}
                                    {/* 
                                    <div className="col-sm-4 invoice-col">
                                      <br />
                                      <b>Order ID:</b> 4F3S8J<br />
                                      <b>Payment Due:</b> 2/22/2014<br />
                                      <b>Account:</b> 968-34567
                                    </div>
                                    */}
                                    {/* /.col */}
                                  </div>
                                  {/* /.row */}
                                  {/* Table row */}
                                  <div className="row">
                                    <div className="col-12 table-responsive">
                                    {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                        {this.state.templates  &&
                                          <table className="table table-striped">
                                            <thead>
                                              <tr>
                                                <th>Number</th>
                                                <th>Digital Assets Name</th>
                                                {/* <th>Uploaded By</th> */}
                                                {/*<th>Description</th>*/}
                                                <th>Subtotal</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.templates.map(
                                            (templates, index) =>
                                              <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{templates.product_name}</td>
                                                {/* <td>{templates.vendor_name}</td> */}
                                                <td>₹ {templates.product_price}</td>
                                              </tr>
                                             )}
                                            </tbody>
                                          </table>
                                        }
                                    </div>
                                    {/* /.col */}
                                  </div>
                                  {/* /.row */}
                                  <div className="row">
                                    {/* accepted payments column*/} 
                                    <div className="col-8">
                                      <div className="table-responsive">
                                        {this.state.vendors  &&
                                        <table className="table">
                                          <thead>
                                            <tr>
                                              <th style={{width: '50%'}}>Contributor Userame:</th>
                                              <td>Total Amount</td>
                                              <td>Ratio</td>
                                              <td>Final Amount</td>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {this.state.vendors.map(
                                            (vendor, index) =>
                                            <tr key={index}>
                                              <th>{vendor.username}</th>
                                              <td>₹ {vendor.final_price}</td>
                                              <td>{vendor.ratio}%</td>
                                              <td>₹ {(vendor.final_price/100*vendor.ratio).toFixed(2)}</td>
                                            </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      }
                                      </div>
                                    </div>
                                    {/* /.col */}
                                    <div className="col-4">
                                      <div className="table-responsive">
                                        <table className="table">
                                          <tbody>
                                            <tr>
                                              <th style={{width: '50%'}}>Subtotal:</th>
                                              <td>₹{parseFloat(this.state.total).toFixed(2)}</td>
                                            </tr>
                                            {this.state.order.currency == 'INR' &&
                                              <tr>
                                              {this.state.order.state != 'maharashtra' ?
                                                <th>GST(0%):</th>
                                              :null}
                                             {this.state.order.state != 'maharashtra' ?
                                                <td>₹ {parseFloat(this.state.gst_amount).toFixed(2)}</td>
                                              :null}
                                              {this.state.order.state == 'maharashtra' ?
                                                <th>CGST(0%):</th>
                                              :null}
                                             {this.state.order.state == 'maharashtra' ?
                                                <td>₹ {parseFloat(this.state.gst_amount/2).toFixed(2)}</td>
                                              :null}
                                              </tr>
                                            }
                                            {this.state.order.currency == 'INR' &&
                                            <tr>
                                            {this.state.order.state == 'maharashtra' ?
                                              <th style={{width: '50%'}}>SGST(0%):</th>
                                              :null}
                                              {this.state.order.state == 'maharashtra' ?
                                              <td>₹{parseFloat(this.state.gst_amount/2).toFixed(2)}</td>
                                              :null}
                                            </tr>
                                            }

                                            <tr>
                                              <th>Grand Total:</th>
                                              <td>₹ {parseFloat(this.state.final_total).toFixed(2)}</td>
                                            </tr>
                                          </tbody></table>
                                      </div>
                                    </div>
                                    {/* /.col */}
                                  </div>
                                  {/* /.row */}
                                  {/* this row will not appear when printing */}
                                  
                                </div>
                                {/* /.invoice */}
                              </div>{/* /.col */}
                            </div>{/* /.row */}
                          </div>{/* /.container-fluid */}
                        </section>
                        {/* /.content */}
                      </div>

                <Footer />
            </>
        )
    }
}

export default View_orders;