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

class ViewUsers extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }
    componentDidMount() {
        this.getUsers();
         //initialize datatable
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


    
    async getUsers() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_users?token='+ tk);
        if(response.data.users){
            this.setState({ users: response.data.users, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            // this.props.history.push("../admin-view-users");
        }
    }

    async changeStatus(id,status){
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        // console.log('id',status);
        this.setState({id:id});
        this.setState({status:status});
        const formData = new FormData();
        formData.append('id', id);
        formData.append('status', status);
        const response = await axios.post('api/admin_auth/change_user_status?token='+ tk,formData);
        if(response.data.status){
            Swal.fire({
        		position: 'center',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500,
        		title: "Success!",
        		text: response.data.message,
        	});
            this.props.history.push("admin-view-users");
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-new-template");
        }
    }

    async deleteUsers(id){
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
                const formData = new FormData();
                formData.append('id', id);
                const response = await axios.post('api/admin_auth/delete_users?token='+ tk,formData);
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
                                        <h1>Users</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            {/* <li className="breadcrumb-item active">Users</li> */}
                                            <li className="breadcrumb-item active">Users</li>
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
                                            {this.state.users  &&
                                                <table id="example" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center" style={{backgroundImage:"none !important"}}>ID</th>
                                                            <th className="text-center">Name</th>
                                                            <th className="text-center">Email</th>
                                                            <th className="text-center">Profession</th>
                                                            <th className="text-center">Status</th>
                                                            <th className="text-center">Reg. On</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.users.map(
                                                        (user, index) =>
                                                        <tr key={index+1}>
                                                            <td className="text-center">{user.id}</td>
                                                            <td className="text-center">{user.name}</td>
                                                            <td className="text-center">{user.email}</td>
                                                            <td className="text-center">{user.profession}</td>
                                                            <td className="text-center">
                                                                <label class="switch">
                                                                  <input type="checkbox"  value={this.state.status} onClick={(e) => {
                                                                this.changeStatus(user.id,user.status_value);
                                                            }} defaultChecked={user.active} />
                                                                  <span class="slider round"></span>
                                                                </label>
                                                            </td>
                                                            <td>{(new Date(user.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                            <td className="text-center">
                                                                <Link to={'/admin-view-user_orders/'+user.id} className="btn btn-success btn-sm ml-1" title="User Orders"><i className="fas fa-bell"></i></Link>
                                                                <Link onClick={this.deleteUsers.bind(this,user.id)} className="btn btn-danger ml-2"><i className="fas fa-trash" title="Delete" style={{fontSize:'12px !important'}}></i></Link>
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

export default ViewUsers;