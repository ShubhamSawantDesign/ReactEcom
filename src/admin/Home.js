import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import Chart from 'react-apexcharts'


class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            options: {
                chart: {
                  id: 'apexchart-example'
                },
                xaxis: {
                  categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec']
                }
              },
              series: [{
                name: 'Total Digital Assets sold',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
              },
              {
                name: 'Total Orders',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
              }],
            options1: {
                chart: {
                  id: 'apexchart-example'
                },
                xaxis: {
                  categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec']
                }
              },
              series1: [{
                name: 'Total Contributors Register',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
              },
              {
                name: 'Total Contributors Register',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
              },
            ],
            vendor_chart: {
                chart: {
                  id: 'apexchart-example'
                },
                xaxis: {
                  categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec']
                }
              },
              vendor_chart_data: [{
                name: 'Total Digital Assets Purchase',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
              },
              {
                name: 'Total Orders',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
              },
            ],
            vendor_sale_chart: {
                chart: {
                  id: 'apexchart-example'
                },
                xaxis: {
                  categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec']
                }
              },
              vendor_sale_chart_data: [{
                name: 'Total Sale',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
              }]
        }
    }

    componentDidMount() {
        if(localStorage.getItem('ve_user')){
            this.getTemplatesPurchase();
            this.getTotalSale();
            this.getstatus();
        }
        if(localStorage.getItem('sa_user')){
        this.getTemplatesSold();
        this.getContributors();
        }
    }

    async getstatus() {
        this.setState({ isLoading: true });
        const id = JSON.parse(localStorage.getItem('ve_user')).id;
        const response = await axios.get(`/api/auth/getstatus/`+id);
        if(response.data.status == 200){
            this.setState({ total_sale: response.data.total_sale,total_order: response.data.total_order,total_templates: response.data.total_templates, isLoading: false});
        }
        
    }

    async getTemplatesSold() {
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/get_sold_templates`);
        if(response.data.status == 200){

            this.setState({ series:[{ name:'Total Digital Assets  Purchase',data:JSON.parse(JSON.stringify(response.data.userArr))},{
                name: 'Total Orders',
                data: JSON.parse(JSON.stringify(response.data.orderArr))
              }] ,templatescnt:response.data.templatescnt,orderscnt:response.data.orderscnt, isLoading: false});
        }
        // console.log('name',this.state.series);
        
    }


    async getContributors() {
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/total_vendor_count`);
        if(response.data.status == 200){

            this.setState({ series1:[{ name:'Total Users Register',data:JSON.parse(JSON.stringify(response.data.userArr))},{
                name: 'Total Contributors Register',
                data: JSON.parse(JSON.stringify(response.data.vendorArr))
              }] ,vendorscnt:response.data.vendorscnt,usersscnt:response.data.usersscnt, isLoading: false});
        }
        // console.log('name',this.state.series);
        
    }

    
    async getTemplatesPurchase() {
        this.setState({ isLoading: true });
        const id = JSON.parse(localStorage.getItem('ve_user')).id;
        const response = await axios.get(`/api/auth/getVendorTemplatesPurchase/`+id);
        if(response.data.status == 200){

            this.setState({ vendor_chart_data:[{ name:'Total Digital Assets Purchase',data:JSON.parse(JSON.stringify(response.data.templateArr))},{
                name: 'Total Orders',
                data: JSON.parse(JSON.stringify(response.data.orderArr))
              }] , isLoading: false});
        }
        // console.log('name',this.state.series);
        
    }

    async getTotalSale() {
        this.setState({ isLoading: true });
        const id = JSON.parse(localStorage.getItem('ve_user')).id;
        const response = await axios.get(`/api/auth/vendor_total_sale/`+id);
        if(response.data.status == 200){
            this.setState({ vendor_sale_chart_data:[{ name:'Total Sale',data:JSON.parse(JSON.stringify(response.data.saleArr))}] , isLoading: false});
        }
        
    }

    render(){
        if(!localStorage.getItem('sa_user') && !localStorage.getItem('ve_user')){
			this.props.history.push("../admin-login");
		}
        return (
            <>
                <Navbar />
                <Sidebar />

                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Dashboard</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {localStorage.getItem('sa_user') &&
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>{this.state.orderscnt}</h3>
                                            <p>Total Orders</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-bag" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-warning">
                                        <div className="inner">
                                            <h3>{this.state.usersscnt}</h3>
                                            <p>User Registrations</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-person-add" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>{this.state.vendorscnt}</h3>
                                            <p>Contributor Registrations</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-stats-bars" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-danger">
                                        <div className="inner">
                                            <h3>{this.state.templatescnt}</h3>
                                            <p>Total Digital Assets</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-pie-graph" />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div>
                                    <h5>&nbsp;&nbsp;&nbsp;Purchased Digital Assets & Orders Chart</h5>
                                    <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
                                </div>
                                <div>
                                    <h5>&nbsp;&nbsp;&nbsp;Contributors & Users Chart</h5>
                                    <Chart options={this.state.options1} series={this.state.series1} type="area" width={500} height={320} />
                                </div>
                            </div>
                        </div>
                    </section>
                    }
                    {localStorage.getItem('ve_user') &&
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                {JSON.parse(localStorage.getItem('ve_user')).ratio === "0" &&
                                <div className="col-md-12">
                                    <div className="callout callout-danger">
                                        <h5>Your profile is under review and will be approved shortly</h5>
                                        <p>Once your profile has been approved you can start uploading your products on the website. You will receive an email when your profile has been approved. You would need to login again to start uploading your products onto the website.</p>
                                    </div>
                                </div>
                                }
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-danger">
                                        <div className="inner">
                                            <h3>{JSON.parse(localStorage.getItem('ve_user')).ratio}%</h3>
                                            <p style={{paddingTop: "20px",marginTop:"0px"}}>Your Commission Percentage</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-pie-graph" />
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>{this.state.total_order}</h3>
                                            <p style={{paddingTop: "20px",marginTop:"0px"}}>Total Orders</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-bag" />
                                        </div>
                                        {/*<a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>*/}
                                    </div>
                                </div>
                                
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-warning">
                                        <div className="inner text-white">
                                            <h3>{this.state.total_templates}</h3>
                                            <p style={{paddingTop: "20px",marginTop:"0px"}}>Total Digital Assets</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-person-add" />
                                        </div>
                                        {/*<a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>*/}
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>₹{parseFloat(this.state.total_sale).toFixed(2)}</h3>
                                            <p style={{paddingTop: "20px",marginTop:"0px"}}>Net Royalty Earned</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-stats-bars" />
                                        </div>
                                        {/*<a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>*/}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div>
                                    <h5>&nbsp;&nbsp;&nbsp;Purchased Digital Assets & Orders Chart</h5>
                                    <Chart options={this.state.vendor_chart} series={this.state.vendor_chart_data} type="bar" width={500} height={320} />
                                </div>
                                <div>
                                    <h5>&nbsp;&nbsp;&nbsp;Total Sale</h5>
                                    <Chart options={this.state.vendor_sale_chart} series={this.state.vendor_sale_chart_data} type="area" width={500} height={320} />
                                </div>
                            </div>
                        </div>
                    </section>
                    }
                </div>

                <Footer />
            </>
        );
    }
}

export default Home;
