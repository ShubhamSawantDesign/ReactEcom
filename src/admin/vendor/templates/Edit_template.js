import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../../inc/Footer";
import Navbar from "../../inc/Navbar";
import Sidebar from "../../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { useParams, useHistory } from 'react-router-dom';
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import $ from 'jquery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class Edit_template extends React.Component {
    
    constructor() {
        super();
        this.state = {
            title: '',
            cat_id: '',
            file_type: '',
            image: '',
            zip: '',
            desc: '',
            add_desc: '',
            status: '',
            trending: '',
            price: '',
            discount: '',
            tags:[''],
            youtube:''
        }
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        this.getcategories();
        this.catChange(this.state.cat_id);
    }

    async getcategories() {
        const { match: { params } } = this.props;
                var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
                const response = await axios.get(`api/vendor_auth/edit_view_template/${params.id}?token=`+ tk);
                if(response.data.category){
                    this.setState({
                         category: response.data.category,
                         subcategory: response.data.subcategory,
                         extensions: response.data.extension,
                         title: response.data.templates.title,
                         cat_id: response.data.templates.category,
                         file_type: response.data.templates.file_type,
                         price: response.data.templates.sg_price,
                         currency: response.data.templates.currency,
                         currentimage: response.data.templates.image,
                         currentFile: response.data.templates.zip,
                         desc: response.data.templates.description,
                         add_desc: response.data.templates.add_desc,
                         youtube: response.data.templates.youtube,
                          isLoading: false});
                        if(response.data.templates.tags){
                            this.setState({tags: response.data.templates.tags.split(/[,]+/),});
                        }else{
                            this.setState({tags: [],});
                        }
                        
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

    async catChange(id) {
        this.setState({ isLoading: true });
        const response = await axios.get('api/vendor_auth/chk_id/'+id);
        if(response.data.status == 200){
            $(".dis-n").show();
        }else{
            $(".dis-n").hide();
        }
    }


    addTemplate = async (e) => {
        const { match: { params } } = this.props;
        console.log('data',this.state)
        e.preventDefault();
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('ve_token').replace(/['"]+/g, '');
        // console.log('image1',this.state.image);
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('id', params.id);
        formData.append('zip', this.state.zip);
        formData.append('title', this.state.title);
        formData.append('tags', this.state.tags);
        formData.append('cat_id', this.state.cat_id);
        formData.append('currency', this.state.currency);
        formData.append('youtube', this.state.youtube);
        formData.append('price', this.state.price);
        formData.append('file_type', this.state.file_type);
        formData.append('vendor_id', JSON.parse(localStorage.getItem('ve_user')).id);
        formData.append('desc', this.state.desc);
        formData.append('add_desc', this.state.add_desc);
       fetch('https://data.artaux.io/api/vendor_auth/edit_template?token='+ tk,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        }).then((res)=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Digital asset edited successfully',
                showConfirmButton: false,
                timer: 8000
            });
            this.props.history.push(`/admin-contributer_view_template`);
        }).catch((error)=>{
            Swal.fire({
                title: "Failed!",
                text: 'Digital asset not added.',
                type: "error",
            });
            this.props.history.push(`../admin-contributer_edit_template_${params.id}`);
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
                                    <h1>Update Digital Assets</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                        <li className="breadcrumb-item active">Digital Assets</li>
                                        <li className="breadcrumb-item active">Update Digital Assets</li>
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
                                                    <input type="text" className="form-control" id="title" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Enter template title" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="level" className="required">File Extension</label>
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
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile" className="required">Cover Image</label> <p style={{fontSize:"12px"}}>(Note: Cover image size will be maximum 300kb and resolution will be 505px * 505px)</p>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="cover-image" name="image" onChange={(e) => {
                                                            console.log('image',e.target.files[0])
                                                                this.setState({ image:e.target.files[0] });
                                                            }}  accept=".jpg,.png,.jpeg" />
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">{this.state.currentimage}</label>
                                                        </div>
                                                    </div><br></br>
                                                    <img src={'https://data.artaux.io/images/template/'+this.state.currentimage} height="100px" width="90px"></img>
                                                    <p id="cover-image-error-message"></p>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile" className="required">Zip File</label><p style={{fontSize:"12px"}}>(Note: Zip file size will be 15MB)</p>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="zip-file-upload"  name="zip"  onChange={(e) => {
                                                            console.log('zip',e.target.files[0])
                                                                this.setState({ zip:e.target.files[0] });
                                                            }} accept=".zip,.rar,.7zip" />
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">{this.state.currentFile}</label>
                                                        </div>
                                                    </div>
                                                    <p id="error_zip_file"></p>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description" className="required"> Description</label><p style={{fontSize:"12px"}}>(Note: You can enter max 10000 characters)</p>
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
                                                    {/* <textarea className="form-control"  name="desc" value={this.state.desc} onChange={this.handleInput} rows="5" placeholder="Enter description" >{this.state.desc}</textarea> */}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description" className="required"> Compatibility</label><p style={{fontSize:"12px"}}>(Note: You can enter max 10000 characters)</p>
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
                                                    {/* <textarea className="form-control"  name="add_desc" value={this.state.add_desc} onChange={this.handleInput}>{this.state.add_desc}</textarea> */}
                                                </div>

                                              
                                                {/* {this.state.youtube && */}
                                                <div className="form-group dis-n">
                                                    <label htmlFor="exampleInputEmail1">Youtube Link</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">https://www.youtube.com/embed/</span>
                                                        </div>
                                                        <input type="text" className="form-control" id="youtube" name="youtube" value={this.state.youtube} onChange={this.handleInput} placeholder="Enter Youtube Link" /><br></br>
                                                        <Popup trigger={<a href="#" className="btn btn-primary ml-2"><i className="fas fa-video-camera pt-2"></i></a>} modal>
                                                            <div>
                                                            <iframe width="100%" height="315" src={"https://www.youtube.com/embed/"+this.state.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                            </div>
                                                        </Popup>
                                                    </div>
                                                </div>
                                                {/* } */}

                                                <div className="form-group">
                                                    <label htmlFor="level" className="required">Currency</label>
                                                        <select class="custom-select rounded-0" id="currency" name="currency" required value={this.state.currency}
                                                                onChange={(e) => {
                                                                    this.setState({ currency:e.target.value });
                                                                }}>
                                                            <option value="INR">INR</option>
                                                            <option value="USD">USD</option>
                                                        </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Suggested Price</label>
                                                    <input type="text" className="form-control" id="price" name="price" required value={this.state.price} onChange={this.handleInput} placeholder="Enter Suggested Price" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="description" > Tags</label>
                                                    <p style={{fontSize:"12px"}}> (Note: You can add upto 5 tags)</p>
                                                    <ReactTagInput 
                                                        tags={this.state.tags} 
                                                        maxTags='5'
                                                        removeOnBackspace= 'true'
                                                        onChange={(newTags) => this.setState({tags:newTags})}
                                                        />
                                                </div>

                                               
                                            </div>
                                            
                                            <div className="card-footer">
                                                <button type="submit" id="button-add-asset" className="btn btn-primary ml-2">{this.state.isLoading ? <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px'}}/> :<i className="fa fa-check"></i>}  Update Digital Assets</button>
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

export default Edit_template;