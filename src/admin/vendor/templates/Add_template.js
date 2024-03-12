import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../../inc/Footer";
import Navbar from "../../inc/Navbar";
import Sidebar from "../../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
// @ts-ignore
// import { TagInput } from 'reactjs-tag-input';
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import $ from 'jquery';
import ReactTooltip from 'react-tooltip';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class Add_template extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            cat_id: 0,
            currency: '',
            price: '',
            file_type: '',
            image: {name:null},
            zip:{name:null},
            desc: '',
            add_desc: '',
            youtube: '',
            tags:[],
        }
    }

    componentDidMount() {

        if(JSON.parse(localStorage.getItem('ve_user')).ratio === "0"){
            this.props.history.push("/admin");
        }
        this.getcategories();
    }

    async catChange(id) {
        this.setState({ isLoading: true });
        const response = await axios.get('api/vendor_auth/chk_id/'+id);
        if(response.data.status == 200){
            $(".dis-n").show();
        }else{
            $(".dis-n").hide();
        }
    }

    async getcategories() {
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        const response = await axios.get('api/vendor_auth/view_category?token='+ tk);
        if(response.data.category){
            this.setState({ category: response.data.category,subcategory: response.data.subcategory,extensions: response.data.extension, isLoading: false});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-add-category");
        }
    }

  
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});   
    }

    addTemplate = async (e) => {
        e.preventDefault();
        this.setState({addLoading: true });
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        console.log('image1',this.state.image);
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('zip', this.state.zip);
        formData.append('tags', this.state.tags);
        formData.append('currency', this.state.currency);
        formData.append('price', this.state.price);
        formData.append('title', this.state.title);
        formData.append('cat_id', this.state.cat_id);
        formData.append('file_type', this.state.file_type);
        formData.append('vendor_id', JSON.parse(localStorage.getItem('ve_user')).id);
        formData.append('desc', this.state.desc);
        formData.append('youtube', this.state.youtube);
        formData.append('add_desc', this.state.add_desc);
       fetch('https://data.artaux.io/api/vendor_auth/add_template?token='+ tk,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        }).then((res)=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Digital asset added successfully.',
                showConfirmButton: false,
                timer: 8000
            });
            this.setState({addLoading: false });
            this.props.history.push("/admin-contributer_view_template");
        }).catch((error)=>{
            Swal.fire({
                title: "Failed!",
                text: 'Digital asset not added.',
                type: "error",
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
                                    <h1>Add Digital Assets</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Digital Assets</li>
                                        <li className="breadcrumb-item active">Add Digital Assets</li>
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
                                        <form onSubmit={this.addTemplate.bind(this)} method="post" encType="multipart/form-data" id="template_form">
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="level" className="required">Category</label>
                                                    {this.state.category &&
                                                    <select class="custom-select rounded-0" id="cat_id" required name="cat_id" value={this.state.cat_id}
                                                            onChange={(e) => {
                                                                this.setState({ cat_id:e.target.value });
                                                                this.catChange(e.target.value);
                                                            }}>
                                                            <option value="">Select category</option>
                                                            {this.state.category.filter(categories => categories.main_cat == 0).map(categories =>
                                                            <>
                                                                <option  disabled style={{fontWeight:"700"}}>{categories.name}</option>
                                                                {this.state.subcategory.filter(subcategories => subcategories.main_cat == categories.id).map(
                                                                subcategories =>
                                                                    <option value={subcategories.id}>-- {subcategories.name}</option>
                                                                )}
                                                            </>
                                                            )}
                                                           
                                                    </select>
                                                }
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Title</label>
                                                    <input type="text" className="form-control" id="title" name="title" required value={this.state.title} onChange={this.handleInput} placeholder="Enter digital asset title" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="level" className="required">File Extension <i className="fa fa-info-circle" data-tip data-for="fileTip"></i></label>
                                                    {this.state.extensions &&
                                                        <select class="custom-select rounded-0" id="file_type" name="file_type" required value={this.state.file_type}
                                                                onChange={(e) => {
                                                                    this.setState({ file_type:e.target.value });
                                                                }}>
                                                            <option value="">Select Extension</option>
                                                            {this.state.extensions.map(
                                                             extension =>
                                                             <option value={extension.name}>{extension.name}</option>
                                                             )}
                                                        </select>
                                                    }
                                                     <ReactTooltip id="fileTip" place="right" effect="solid">
                                                     If the correct file extension of your Digital Asset is not listed below, please select “Other”.<br></br> We will check the file extension from the zip file and add it while uploading the Digital Asset.
                                                </ReactTooltip>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile" className="required">Cover Image </label> <p style={{fontSize:"12px"}}>(Note: Image size will be maximum 300kb and resolution will be 500px * 500px)</p>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="cover-image" name="image" required onChange={(e) => {
                                                                this.setState({ image:e.target.files[0] });
                                                            }} accept=".jpg,.png,.jpeg" />
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">{this.state.image.name}</label>
                                                        </div>
                                                    </div>
                                                    <p id="cover-image-error-message"></p>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile" className="required">Zip File <i className="fa fa-info-circle" data-tip data-for="zipTip"></i></label> <p style={{fontSize:"12px"}}>(Note: Zip file size will be 15MB)</p>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="zip-file-upload" required name="zip"  onChange={(e) => {
                                                                this.setState({ zip:e.target.files[0] });
                                                            }} accept=".zip,.rar,.7zip" />
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">{this.state.zip.name}</label>
                                                        </div>
                                                    </div>
                                                    <ReactTooltip id="zipTip" place="right" effect="solid">
                                                    Make sure to attach a copy of the end user license agreement in your zip file
                                                </ReactTooltip>
                                                <p id="error_zip_file"></p>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description"> Description <i className="fa fa-info-circle" data-tip data-for="descTip"></i></label><p style={{fontSize:"12px"}}>(Note: You can enter max 10000 characters)</p>
                                                    <CKEditor
                                                        editor={ ClassicEditor }
                                                        data={this.state.desc}
                                                        onReady={ editor => {
                                                            // You can store the "editor" and use when it is needed.
                                                            console.log( 'Editor is ready to use!', editor );
                                                        } }
                                                        onChange={ ( event, editor ) => {
                                                            const data = editor.getData();
                                                            this.setState({desc: data});
                                                            console.log( data  );
                                                        } }
                                                    />
                                                <ReactTooltip id="descTip" place="right" effect="solid">
                                                     Well described products have much higher chances of convincing customers to make a purchase.
                                                </ReactTooltip>
                                                    {/* <textarea className="form-control" name="desc" value={this.state.desc} onChange={this.handleInput} rows="3" placeholder="Enter description" ></textarea> */}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description"> Compatibility</label><p style={{fontSize:"12px"}}>(Note: You can enter max 10000 characters)</p>
                                                    <CKEditor
                                                        editor={ ClassicEditor }
                                                        data={this.state.add_desc}
                                                        onReady={ editor => {
                                                            // You can store the "editor" and use when it is needed.
                                                            console.log( 'Editor is ready to use!', editor );
                                                        } }
                                                        onChange={ ( event, editor ) => {
                                                            const data = editor.getData();
                                                            this.setState({add_desc: data});
                                                            console.log( data  );
                                                        } }
                                                    />
                                                    {/* <textarea className="form-control"  name="add_desc" rows="3" value={this.state.add_desc} onChange={this.handleInput} placeholder=""></textarea> */}
                                                </div>

                                               
                                                <div className="form-group dis-n" style={{display:"none"}}>
                                                    <label htmlFor="exampleInputEmail1">Youtube Link</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">https://www.youtube.com/embed/</span>
                                                        </div>
                                                        <input type="text" className="form-control" id="youtube" name="youtube" value={this.state.youtube} onChange={this.handleInput} placeholder="Enter Youtube code" />
                                                    </div>
                                                    
                                                </div>

                                                <div className="form-group">
                                                    <label className="required">Currency</label>
                                                        <select class="custom-select rounded-0" id="currency" name="currency" required 
                                                                onChange={(e) => {
                                                                    // console.log('test',this.state.currency);
                                                                    this.setState({ currency:e.target.value });
                                                                   
                                                                }}>
                                                            <option value="">Select Currency</option>
                                                            <option value="INR">INR</option>
                                                            <option value="USD">USD</option>
                                                        </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="required">Suggested Price</label>
                                                    <input type="text" className="form-control" id="price" name="price" required value={this.state.price} onChange={this.handleInput} placeholder="Enter Suggested Price" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description"> Tags <i className="fa fa-info-circle" data-tip data-for="tagTip"></i></label>
                                                    <p style={{fontSize:"12px"}}>(Note: You can add upto 5 tags)</p>
                                                    <ReactTagInput 
                                                        tags={this.state.tags} 
                                                        maxTags='5'
                                                        removeOnBackspace= 'true'
                                                        onChange={(newTags) => this.setState({tags:newTags})}
                                                        />
                                                <ReactTooltip id="tagTip" place="right" effect="solid">
                                                    Tags help the platform show your products to all relevant searches
                                                </ReactTooltip>
                                                </div>

                                            </div>
                                            
                                            <div className="card-footer">
                                                <small style={{fontSize:"12px"}}>Note: If the zip file doesn't appear under Uploaded Assets section, after you have completed the addition of your asset, please check your internet connection and try adding again.</small><br /><br />
                                                <button type="submit" id="button-add-asset" className="btn btn-primary ml-2">{this.state.addLoading ? <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> :<i className="fa fa-check"></i>} Add Digital Assets</button>
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

export default Add_template;