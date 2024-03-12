import React from "react";
import {Link, withRouter} from "react-router-dom";
import Footer from "../inc/Footer";
import Navbar from "../inc/Navbar";
import Sidebar from "../inc/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';

class EditRate extends React.Component {
    constructor() {
        super();
        this.state = {
            exchange_rate: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getRate();
    }

    async getRate() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const response = await axios.get(`api/admin_auth/view_edit_rate/${params.id}?token=`+ tk);
        if(response.data.rates){
            this.setState({
                rate: response.data.rates.rate,
                country: response.data.rates.country,
                id: response.data.rates.id,
                isLoading: false});
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    EditRate = async (e) => {
        e.preventDefault();
        const { match: { params } } = this.props;
        var tk= localStorage.getItem('sa_token').replace(/['"]+/g, '');
        const res = await axios.post(`api/admin_auth/edit_rate/${params.id}?token=`+ tk, this.state);
        if(res.data.status === 200){
        	Swal.fire({
        		 position: 'center',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 8000
        	});
            this.props.history.push('/admin-view-rates');
        }else if(res.data.error === 401){
        	Swal.fire({
        		title: "Failed!",
        		text: res.data.message,
        		type: "error",
        	});
        	// this.props.history.push("../admin-add-category");
        }
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
                                        <h1>Edit Exchange Rates</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="admin/"><i className="fa fa-home"></i> Home</a></li>
                                            <li className="breadcrumb-item">Exchange Rates</li>
                                            <li className="breadcrumb-item active">Edit Exchange Rates</li>
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
                                            <form method="post" onSubmit={this.EditRate.bind(this)}>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className="required">Country</label>
                                                        <input type="text" className="form-control" name="country" id="country" value={this.state.country} onChange={this.handleInput} placeholder="Enter File Extension Name" readOnly disabled/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1" className="required">Exchange Rate</label>
                                                        <input type="text" className="form-control" name="rate" id="rate" value={this.state.rate} onChange={this.handleInput} placeholder="Enter File Extension Name" required/>
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-primary ml-2"><i className="fa fa-check"></i> Update Exchange Rates</button>
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

export default EditRate;