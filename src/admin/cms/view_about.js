import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class ViewAbout extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
            title1: '',
            title2: '',
             content1: '',
             content2: '',
             image_title1: '',
             image_title2: '',
             image_title3: '',
             aboutImage1: '',
             aboutImage2: '',
             aboutImage3: '',
        }
    }
    
    componentDidMount() {
        this.getAbout();
    }

    async getAbout() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get('api/admin_auth/view_about?token='+ tk);
        console.table(response);
        if(response.data.about){
            this.setState({
                title1: response.data.about.title1,
                title2: response.data.about.title2,
                 content1: response.data.about.content1,
                 content2: response.data.about.content2,
                 image_title1: response.data.about.image_content1,
                 image_title2: response.data.about.image_content2,
                 image_title3: response.data.about.image_content3,
                 aboutImage1: response.data.about.image1,
                 aboutImage2: response.data.about.image2,
                 aboutImage3: response.data.about.image3,
                  isLoading: false});
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});   
    }

    editAbout = async (e) => {
        e.preventDefault();
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const formData = new FormData();
        formData.append('image1', this.state.image1);
        formData.append('image2', this.state.image2);
        formData.append('image3', this.state.image3);
        formData.append('image_title1', this.state.image_title1);
        formData.append('image_title2', this.state.image_title2);
        formData.append('image_title3', this.state.image_title3);
        formData.append('title1', this.state.title1);
        formData.append('title2', this.state.title2);
        formData.append('content1', this.state.content1);
        formData.append('content2', this.state.content2);
       fetch('https://data.artaux.io/api/admin_auth/edit_about?token='+ tk,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        }).then((response)=>{
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
        }).catch((response)=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'About updated Successfully',
                showConfirmButton: false,
                timer: 8000
            });
            // this.props.history.push("../admin-contributer_view_template");
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
                                        <h1>About Us</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item active">About</li>
                                            <li className="breadcrumb-item active">About Us</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card card-primary">
                                        <form onSubmit={this.editAbout.bind(this)} method="post">
                                            <div className="card-body">

                                                <div className="form-group">
                                                    <label htmlFor="description" className="required">First Title</label>
                                                    <input type="text" className="form-control" name="title1"  value={this.state.title1} onChange={this.handleInput} rows="5" placeholder="Enter description" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description" className="required">Second Title</label>
                                                    <input type="text" className="form-control" name="title2"  value={this.state.title2} onChange={this.handleInput} rows="5" placeholder="Enter description" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description" className="required">first Description</label>
                                                    <textarea className="form-control" name="content1"  value={this.state.content1} onChange={this.handleInput} rows="5" placeholder="Enter description" ></textarea>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description" className="required">Second Description</label>
                                                    <textarea className="form-control" name="content2"  value={this.state.content2} onChange={this.handleInput} rows="5" placeholder="Enter description" ></textarea>
                                                </div>


                                                <div className="form-group">
                                                    <label htmlFor="description" className="required">First Image Title</label>
                                                    <input type="text" className="form-control" name="image_title1"  value={this.state.image_title1} onChange={this.handleInput} rows="5" placeholder="Enter Image Title" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description" className="required">Second Image Title</label>
                                                    <input type="text" className="form-control" name="image_title2"  value={this.state.image_title2} onChange={this.handleInput} rows="5" placeholder="Enter Image Title" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description" className="required">Third Image Title</label>
                                                    <input type="text" className="form-control" name="image_title3"  value={this.state.image_title3} onChange={this.handleInput} rows="5" placeholder="Enter Image Title" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">First Image</label><br/>
                                                    <input type="file" className="form-control" name="image1" id="image" onChange={(e) => {
                                                                this.setState({ image1:e.target.files[0] });
                                                            }} /><br/>
                                                    <img src={"https://data.artaux.io/images/about/"+this.state.aboutImage1} style={{height:'100px',width:'100px'}}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Second Image</label><br/>
                                                    <input type="file" className="form-control" name="image2" id="image" onChange={(e) => {
                                                                this.setState({ image2:e.target.files[0] });
                                                            }} /><br/>
                                                    <img src={"https://data.artaux.io/images/about/"+this.state.aboutImage2} style={{height:'100px',width:'100px'}}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Third Image</label><br/>
                                                    <input type="file" className="form-control" name="image3" id="image" onChange={(e) => {
                                                                this.setState({ image3:e.target.files[0] });
                                                            }} /><br/>
                                                    <img src={"https://data.artaux.io/images/about/"+this.state.aboutImage3} style={{height:'100px',width:'100px'}}/>
                                                </div>
                                                
                                            </div>
                                            
                                            <div className="card-footer">
                                                {/* <button type="reset" className="btn btn-primary"> Reset</button> */}
                                                <button type="submit" className="btn btn-primary ml-2"><i className="fa fa-check"></i> Update About</button>
                                            </div>
                                        </form>
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

export default ViewAbout;