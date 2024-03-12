import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../../inc/Footer";
import Navbar from "../../inc/Navbar";
import Sidebar from "../../inc/Sidebar";
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
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/vendor_auth/view_order/`+params.id+`?token=`+ tk);
        if(response.data.orders){
            this.setState({ currency: response.data.currency, order: response.data.orders,final_total: response.data.final_total,templates:response.data.templates, isLoading: false});
            console.log('test',this.state.order.id)
            const Gst_amount = this.state.final_total-this.state.final_total*(100/(100+18));
            if(this.state.currency == "INR"){
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
                    DIRHAM_rate: res.data.DIRHAM_rate.rate,
                    isLoading: false});
                // this.setState({templateNumber : this.state.templates.length});
            }
            console.log('rate',this.state.currency )
            const INR_rate = this.state.INR_rate;
            const GBP_rate = this.state.USD_rate;
            const USD_rate = this.state.GBP_rate;
            const EURO_rate = this.state.EURO_rate;
            const DIRHAM_rate = this.state.DIRHAM_rate;
            
            if(this.state.order.currency === 'INR'){
                this.setState({exhangerate:INR_rate });
                this.setState({sign:'₹' });
            }else if(this.state.order.currency === 'USD'){
                this.setState({exhangerate:USD_rate });
                this.setState({sign:'$' });
            }else if(this.state.order.currency === 'GBP'){
                this.setState({exhangerate:GBP_rate });
                this.setState({sign:'£' });
            }else if(this.state.order.currency === 'EURO'){
                this.setState({exhangerate:EURO_rate });
                this.setState({sign:'€' });
            }else if(this.state.order.currency === 'DIRHAM'){
                this.setState({exhangerate:DIRHAM_rate });
                this.setState({sign:'.إ ' });
            }
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-template");
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
             orientation: 'fittopage',
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
                                <h1>Order Details</h1>
                              </div>
                              <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                  <li className="breadcrumb-item"><a href="/admin">Home</a></li>
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
                                       <i className="fas fa-globe" /> <b>Receipt Id #{this.state.order.id}</b>
                                       <img src="assets/images/frontend_images/l1.png" className="float-right mr-5" height="50px" />
                                      </h4>
                                    </div>
                                    {/* /.col */}
                                  </div>
                                  {/* info row */}
                                  <div className="row invoice-info">

                                  <div className="col-sm-5 invoice-col mt-4">
                                      From
                                      <address style={{textTransform:"capitalize"}}>
                                        <strong style={{textTransform:"capitalize"}}>Artaux</strong><br />
                                        <b>Email: </b>info@artaux.io<br />
                                        {/* <b>Address: </b>221b Baker Street, Pune<br /> */}
                                        {/* <b>Phone: </b>+91 9879879879<br />   */}
                                        <b>Order Id: </b>{this.state.order.id}<br />
                                      </address>
                                    </div>
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
                                                <th className="text-white bt-none">Uploaded By</th>
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
                                                <td className="bt-none">{templates.vendor_name}</td>
                                                <td className="bt-none">₹ {parseFloat(templates.product_price).toFixed(2)}</td>
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
                                    {/* accepted payments column */}
                                    <div className="col-7">

                                    </div>
                                    {/* /.col */}
                                    <div className="col-5">
                                      <div className="table-responsive">
                                        <table className="table">
                                          <tbody>
                                            <tr>
                                              <th className="bt-none">Your Share:</th>
                                              <td className="bt-none">{JSON.parse(localStorage.getItem('ve_user')).ratio}%</td>
                                            </tr>
                                            <tr>
                                              <th className="bt-none">Grand Total:</th>
                                              <td className="bt-none">₹ {(parseFloat(this.state.total/100*JSON.parse(localStorage.getItem('ve_user')).ratio)).toFixed(2)}</td>
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
                                        <i className="fas fa-download" /> Receipt
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