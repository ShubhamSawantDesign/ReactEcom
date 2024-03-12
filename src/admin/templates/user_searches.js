import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
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
import axios from "axios";
import Swal from 'sweetalert2';

class ViewUserSearches extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }
    componentDidMount() {
        this.getSearches();
         //initialize datatable
    $(document).ready(function () {
        setTimeout(function () {
          $('#example').DataTable(
            {
              pagingType: 'full_numbers',
              pageLength: 50,
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
    async getSearches() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_user_search?token='+ tk);
        if(response.data.search){
            this.setState({ searches: response.data.search, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-users");
        }
    }

    async deleteAll(id){
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
              const response = await axios.post('api/admin_auth/delete_user_search?token='+ tk);
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
                                        <h1>User Searches</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">User Searches</li>
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
                                                <div style={{float:"right"}}>
                                                 <Link to={'/admin-view-user-search'} className="btn btn-danger" onClick={this.deleteAll.bind(this)}><i className="fas fa-trash" title="Clear All"></i> Clear All</Link>
                                                </div>
                                            {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                            {this.state.searches  &&
                                                <table id="example" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">Id</th>
                                                            <th className="text-center">Keyword</th>
                                                            <th className="text-center">Times Searched</th>
                                                            <th className="text-center">Searched On</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.searches.map(
                                                        (search, index) =>
                                                        <tr>
                                                            <td className="text-center">{index+1}</td>
                                                            <td className="text-center">{search.keyword}</td>
                                                            <td className="text-center">{search.count}</td>
                                                            <td className="text-center">{search.created_at}</td>
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

export default ViewUserSearches;