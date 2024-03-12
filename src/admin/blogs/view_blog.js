import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
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

class ViewBlog extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.getBlogs();
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

    async getBlogs() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_blogs?token='+ tk);
        if(response.data.blog){
            this.setState({ blogs: response.data.blog, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.setState({ isLoading: false });
        }
}

async deleteBlog(id){
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
            const response = await axios.post('api/admin_auth/delete_blog?token='+ tk,formData);
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
                                    <h1>Blogs</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        {/* <li className="breadcrumb-item">Blogs</li> */}
                                        <li className="breadcrumb-item active">Blogs</li>
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
                                    {this.state.blogs &&
                                        <table id="example" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Number</th>
                                                    <th className="text-center">Blog Title</th>
                                                    <th className="text-center">Author Name </th>
                                                    <th className="text-center">Blog Image </th>
                                                    <th className="text-center"> Created At </th>
                                                    <th className="text-center"> Action </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.blogs.map(
                                                (blog,index) =>
                                                <tr>
                                                    <td className="text-center">{index+1}</td>
                                                    <td className="text-center" style={{maxWidth:"200px"}}>{blog.title}</td>
                                                    <td className="text-center">{blog.author}</td>
                                                    <td className="text-center"><img className="cover-image" src={'https://data.artaux.io/images/blog/'+blog.image }/></td>
                                                    <td className="text-center">{(new Date(blog.created_at)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                                    <td className="text-center">
                                                        <Link to={'/admin-edit-blog_'+blog.id} className="btn btn-success"><i className="fas fa-pencil-square-o" title="Edit"></i></Link>
                                                        <Link className="btn btn-danger ml-2" onClick={this.deleteBlog.bind(this,blog.id)} ><i className="fas fa-trash" title="Delete" ></i></Link>
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
    
export default ViewBlog;