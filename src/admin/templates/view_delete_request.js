import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";
import { useParams, useHistory } from 'react-router-dom';
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

class View_contributor_templates extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            cat_id: '',
            file_type: '',
            image: null,
            zip: null,
            desc: '',
            add_desc: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getTemplates();
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

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    async getTemplates() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk = localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_delete_request_templates?token=`+ tk);
        // if(response.data.templates){
            this.setState({ templates: response.data.templates, isLoading: false});
        // }
    }

    async acceptRequest(id){
        await Swal.fire({
          title: 'Are you sure?',
          
          icon: 'warning',
          showConfirmButton: true,
          showCancelButton: false,
          showDenyButton:false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, accept it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
              var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
              const formData = new FormData();
              console.log('test',id);
              formData.append('id', id);
              const response = await axios.post('api/admin_auth/accept_request?token='+ tk,formData);
              if(response.data.status){
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: response.data.message,
                      showConfirmButton: false,
                      timer: 8000
                  });
                  // this.getTemplates();
                  this.props.history.go(0);
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

    async cancelRequest(id){
        await Swal.fire({
          title: 'Are you sure?',
          
          icon: 'warning',
          showConfirmButton: true,
          showCancelButton: false,
          showDenyButton:false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, cancel it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log('test',id);
              var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
              const formData = new FormData();
              formData.append('id', id);
              const response = await axios.post('api/admin_auth/delete_request?token='+ tk,formData);
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
                                    <h1>Digital Assets Delete Requests</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Digital Assets</li>
                                        <li className="breadcrumb-item active">Digital Assets Delete Requests</li>
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
                                            {this.state.templates &&
                                            <table id="example" className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Title</th>
                                                        <th>Category</th>
                                                        <th>Extension</th>
                                                        <th>File</th>
                                                        <th>Image</th>
                                                        <th>Reason</th>
                                                        <th>Created On</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.templates.length > 0 ? this.state.templates.map(
                                                    (templates, index) =>
                                                    <tr key={index}>
                                                        <td>{templates.id}</td>
                                                        <td>{templates.title}</td>
                                                        <td>{templates.category_name}</td>
                                                        <td>{templates.file_type}</td>
                                                        <td><a href={'https://data.artaux.io/images/template/'+templates.zip} download>View File</a></td>
                                                        <td><img className="cover-image" src={'https://data.artaux.io/images/template/'+templates.image } alt="" /></td>
                                                        <td >{templates.reason}</td>
                                                        
                                                        <td>{(new Date(templates.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                        <td>
                                                        <Link to={'/admin-view-delete_request'} className="btn btn-success ml-2" onClick={(e) => {
                                                            this.setState({ id:templates.id })
                                                        } }><i className="fas fa-check-circle" title="Accept delete request" onClick={(e) => this.acceptRequest(templates.id)} style={{fontSize:'12px !important'}}></i></Link>
                                                            <Link to={'/admin-view-delete_request'} className="btn btn-danger ml-2" onClick={(e) => {
                                                            this.setState({ id:templates.id })
                                                        } }><i className="fa fa-window-close" title="Reject delete request" onClick={(e) => this.cancelRequest(templates.id)} style={{fontSize:'12px !important'}}></i></Link>
                                                        </td>
                                                    </tr>
                                                    ) : <td colspan="9"><h6>No data avaliable.</h6></td>}
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

export default View_contributor_templates;