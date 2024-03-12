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
    }

    async getOrders() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_order/`+params.id+`?token=`+ tk);
        if(response.data.orders){
            this.setState({ order: response.data.orders,currency:response.data.orders.currency,vendors: response.data.vendors,final_total: response.data.final_total,templates:response.data.templates, isLoading: false});
            // const Gst_amount = this.state.final_total-this.state.final_total*(100/(100+18));
            const Gst_amount = 0;
            if(this.state.order.currency == "INR"){
              const total = this.state.final_total - Gst_amount
              this.setState({ gst_amount: Gst_amount,total:total});
            }else{
              const total = this.state.final_total
              this.setState({ gst_amount: Gst_amount,total:total});
            }
            const res = await axios.get(`/api/auth/get_rates`);
            if(res.data){
                this.setState({ 
                    INR_rate: res.data.INR_rate.rate,
                    USD_rate: res.data.USD_rate.rate,
                    GBP_rate: res.data.GBP_rate.rate,
                    EURO_rate: res.data.EURO_rate.rate,
                    isLoading: false});
            }
            const INR_rate = this.state.INR_rate;
            const GBP_rate = this.state.USD_rate;
            const USD_rate = this.state.GBP_rate;
            const EURO_rate = this.state.EURO_rate;
            console.log('test',this.state.order.currency)
            if(this.state.currency == 'INR'){
                this.setState({exhangerate:INR_rate });
                this.setState({sign:'₹' });
            }else if(this.state.currency == 'USD'){
                this.setState({exhangerate:USD_rate });
                this.setState({sign:'$' });
            }else if(this.state.currency == 'GBP'){
                this.setState({exhangerate:GBP_rate });
                this.setState({sign:'£' });
            }else if(this.state.currency == 'EURO'){
                this.setState({exhangerate:EURO_rate });
                this.setState({sign:'€' });
            }
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

    downloadPage = async (e) => {
        let page = document.getElementById('print');

        html2PDF(page, {
          jsPDF: {
            unit: 'px',
            format: 'a4',
             orientation: 'landscape',
          },
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },

          html2canvas: {
            scale: 2,
            scrollX: 210,
            scrollY: -window.scrollY,
            dpi: 144,
            width:1500,
          },
          imageType: 'image/jpeg',
          output: 'Invoice.pdf'
        });
    }


    render(){
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
                                <h1>Invoice Details</h1>
                              </div>
                              <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                                  <li className="breadcrumb-item active">Invoice Details</li>
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
                                       <i className="fas fa-globe" /> <b>Invoice Id #{this.state.order.invoice_id}</b>
                                        <img src="assets/images/frontend_images/l1.png" className="float-right mr-5" height="50px"/>
                                      </h4>
                                    </div>
                                    {/* /.col */}
                                  </div>
                                  {/* info row */}
                                  <div className="row invoice-info">

                                    <div className="col-sm-5 invoice-col mt-4">
                                      From
                                      <address style={{textTransform:"capitalize"}}>
                                        <strong style={{textTransform:"capitalize"}}>Artaux</strong><br /></address>
                                        <b>Email: </b> info@artaux.io <br/>
                                        {/* <b>Address: </b>221b Baker Street, Pune<br />
                                        <b>Phone: </b>+91 9879879879<br />   */}
                                    </div>
                                    <div className="col-sm-5 invoice-col mt-4">
                                      For
                                      <address style={{textTransform:"capitalize"}}>
                                        <strong style={{textTransform:"capitalize"}}>{this.state.order.name}</strong><br />
                                        <b>Email: </b>{this.state.order.user_email}<br />
                                        <b>Country: </b>{this.state.order.country}<br />
                                        <b>State: </b>{this.state.order.state} 
                                        <b>City: </b>{this.state.order.city}
                                        
                                      </address>
                                    </div>
                                    <div className="col-sm-4 invoice-col mt-5">
                                      <address>
                                        <b>Order Id: </b>{this.state.order.id}<br />
                                        <b>Currency: </b>{this.state.order.currency}<br />
                                        <b>Date: </b>{this.state.order.updated_at}<br />
                                      </address>
                                    </div>
                                   
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
                                            <thead style={{background:"black"}}>
                                              <tr>
                                                <th className="text-white bt-none">Number</th>
                                                <th className="text-white bt-none">Digital Assets Name</th>
                                                <th className="text-white">Quantity</th>
                                                {/*<th>Description</th>*/}
                                                <th className="text-white bt-none">Subtotal</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.templates.map(
                                            (templates, index) =>
                                              <tr key={index}>
                                                <td className="bt-none">{index+1}</td>
                                                <td className="bt-none">{templates.product_name}</td>
                                                <td className="bt-none">1</td>
                                                <td className="bt-none">{this.state.sign} {parseFloat(templates.product_price /this.state.exhangerate).toFixed(2)}</td>
                                              </tr>
                                             )}
                                            </tbody>
                                          </table>
                                        }
                                    </div>
                                    {/* /.col */}
                                  </div>
                                  <hr></hr>
                                  {/* /.row */}
                                  <div className="row">
                                    {/* accepted payments column*/} 
                                    <div className="col-8">

                                    </div>
                                    {/* /.col */}
                                    <div className="col-4">
                                      <div className="table-responsive">
                                        <table className="table">
                                          <tbody>
                                            <tr>
                                              <th className="bt-none" style={{width: '50%'}}>Subtotal:</th>
                                              <td className="bt-none">{this.state.sign} {parseFloat(this.state.total/this.state.exhangerate).toFixed(2)}</td>
                                            </tr>
                                            {this.state.order.currency == 'INR' &&
                                              <tr>
                                              {this.state.order.state != 'maharashtra' ?
                                                <th className="bt-none">GST(0%):</th>
                                              :null}
                                             {this.state.order.state != 'maharashtra' ?
                                                <td className="bt-none">{this.state.sign} {parseFloat(this.state.gst_amount/this.state.exhangerate).toFixed(2)}</td>
                                              :null}
                                              {this.state.order.state == 'maharashtra' ?
                                                <th className="bt-none">CGST(0%):</th>
                                              :null}
                                             {this.state.order.state == 'maharashtra' ?
                                                <td className="bt-none">{this.state.sign} {parseFloat((this.state.gst_amount/2)/this.state.exhangerate).toFixed(2)}</td>
                                              :null}
                                              </tr>
                                            }
                                            {this.state.order.currency == 'INR' &&
                                            <tr>
                                            {this.state.order.state == 'maharashtra' ?
                                              <th className="bt-none" style={{width: '50%'}}>SGST(0%):</th>
                                              :null}
                                              {this.state.order.state == 'maharashtra' ?
                                              <td className="bt-none">{this.state.sign} {parseFloat((this.state.gst_amount/2)/this.state.exhangerate).toFixed(2)}</td>
                                              :null}
                                            </tr>
                                            }

                                            <tr>
                                              <th className="bt-none">Grand Total:</th>
                                              <td className="bt-none">{this.state.sign} {parseFloat(this.state.final_total/this.state.exhangerate).toFixed(2)}</td>
                                            </tr>
                                          </tbody></table>
                                      </div>
                                    </div>
                                    {/* /.col */}
                                  </div>
                                  {/* /.row */}
                                  {/* this row will not appear when printing */}
                                  <div className="row no-print">
                                    <div className="col-12">
                                      {/* <button type="button" className="btn btn-primary float-right" onClick={this.downloadPage} style={{marginRight: '5px'}}>
                                        <i className="fas fa-download" /> Invoice
                                      </button> */}
                                    </div>
                                  </div>
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