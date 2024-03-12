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

class View_template extends React.Component {
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
            this.getfilterTemplates();
        }else{
        this.getTemplates();
        }
        $(document).ready(function () {
            setTimeout(function () {
              $('#example').DataTable(
                {
                  pagingType: 'full_numbers',
                  pageLength: 10,
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
    
    async getfilterTemplates() {
        this.setState({ isLoading: true });
        const { match: { params } } = this.props;
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_filter_template/${params.fromdate}/${params.todate}?token=`+ tk);
        if(response.data.templates){
            this.setState({ templates: response.data.templates, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-template");
        }
    }
    
    async getTemplates() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_template?token='+ tk);
        if(response.data.templates){
            this.setState({ templates: response.data.templates, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-template");
        }
    }

    async deleteTemplate(id){
        await Swal.fire({
            title: 'Are you sure?',
            
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: false,
            showDenyButton:false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
                console.log('id',id);
                const templateId = id;
                // const formData = new FormData();
                // formData.append('id', templateId);
                const response = await axios.post(`api/admin_auth/delete_template/${templateId}?token=`+ tk,);
                if(response.data.status){
                    Swal.fire({
                        title: response.data.message,
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
                }else if(response.data.error === 401){
                    Swal.fire({
                        title: "Failed!",
                        text: response.data.message,
                        type: "error",
                    });
                    // this.props.history.push("../admin-contributer_view_template");
                }
        }
      })
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
                                        <h1>Active Digital Assets</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">Digital Assets</li>
                                            <li className="breadcrumb-item active">Active Digital Assets</li>
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
                                                    <a href={'/admin-view-template/'+this.state.fromdate+'/'+this.state.todate} type="submit" className="btn btn-primary ml-2"><i className="fa fa-check"></i> submit</a>
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
                                            {this.state.templates  &&
                                                <table id="example" className="table table-bordered table-striped" style={{overflow:'scroll'}}>
                                                
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">ID</th>
                                                            <th className="text-center">Product By</th>
                                                            <th className="text-center">Title</th>
                                                            <th className="text-center">Category</th>
                                                            <th className="text-center">Extension</th>
                                                            {/* <th className="text-center">Price</th> */}
                                                            <th className="text-center">File</th>
                                                            <th className="text-center">Image</th>
                                                            <th className="text-center">Created On</th>
                                                            <th className="text-center">Status</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                    
                                                        {this.state.templates.map(
                                                            (templates, index) =>
                                                            <tr key={index}>
                                                                <td className="text-center">{templates.id}</td>
                                                                <td className="text-center">{templates.vendor_name}</td>
                                                                <td className="text-center">{templates.title}</td>
                                                                <td className="text-center">{templates.category_name}</td>
                                                                <td className="text-center">{templates.file_type}</td>
                                                                
                                                                <td className="text-center"><a href={'https://data.artaux.io/images/template/'+templates.zip} download>View</a></td>
                                                                <td className="text-center"><img className="cover-image" src={'https://data.artaux.io/images/template/'+templates.image }/></td>
                                                                <td className="text-center">{(new Date(templates.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                                {templates.status == 1 &&
                                                                <td className="text-center" style={{color:'green'}}>Active</td>
                                                                }
                                                                {templates.status == 2 &&
                                                                <td className="text-center" style={{color:'green'}}>Under Review</td>
                                                                }
                                                                <td className="text-center">
                                                                    <Link to={'/admin-edit_template_'+templates.id} className="btn btn-success btn-sm"><i className="fas fa-pencil-square-o" title="Edit"></i></Link>
                                                                    {templates.id &&
                                                                    <Link to={'/admin-view-template'} className="btn btn-danger ml-2"  onClick={(e) => this.deleteTemplate(templates.id)}><i className="fas fa-trash" title="Delete"  style={{fontSize:'12px !important'}}></i></Link>
                                                                    }
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

export default View_template;