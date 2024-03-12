import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
             exhangerate:'',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getTemplates();
        this.getchangeCurrency();
    }
    
    async getTemplates() {
        const { match: { params } } = this.props;
        this.setState({keyword:params.keyword,file_type:params.file_type,isLoading: true });
        const response = await axios.post('api/auth/search/'+params.keyword+'/'+params.file_type);
        if(response.data.templates){
            this.setState({ 
                templates: response.data.templates,
                 isLoading: false});
            this.setState({templateNumber : this.state.templates.length});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.props.history.push("../admin-view-template");
        }
    }


    async getchangeCurrency() {
        const response = await axios.get(`/api/auth/get_rates`);
         if(response.data){
            this.setState({ 
                INR_rate: response.data.INR_rate.rate,
                USD_rate: response.data.USD_rate.rate,
                GBP_rate: response.data.GBP_rate.rate,
                EURO_rate: response.data.EURO_rate.rate,
                DIRHAM_rate: response.data.DIRHAM_rate.rate,
                isLoading: false});
            // this.setState({templateNumber : this.state.templates.length});
        }

        const INR_rate = this.state.INR_rate;
        const GBP_rate = this.state.USD_rate;
        const USD_rate = this.state.GBP_rate;
        const EURO_rate = this.state.EURO_rate;
        const DIRHAM_rate = this.state.DIRHAM_rate;
        if(localStorage.getItem('currency') == 'INR'){
            this.setState({exhangerate:INR_rate });
            this.setState({sign:'₹' });
        }else if(localStorage.getItem('currency') == 'USD'){
            this.setState({exhangerate:USD_rate });
            this.setState({sign:'$' });
        }else if(localStorage.getItem('currency') == 'GBP'){
            this.setState({exhangerate:GBP_rate });
            this.setState({sign:'£' });
        }else if(localStorage.getItem('currency') == 'EURO'){
            this.setState({exhangerate:EURO_rate });
            this.setState({sign:'€' });
        }else if(localStorage.getItem('currency') == 'DIRHAM'){
            this.setState({exhangerate:DIRHAM_rate });
            this.setState({sign:'.إ ' });
        }
    }


    render(){
        // this.getTemplates();
        const { match: { params } } = this.props;
        return(
            <div>
                <Navbar />

                <main className="main">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{params.keyword}</li>
                            </ol>
                        </div>
                    </nav>

                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="toolbox">
                                {/* <div className="toolbox-left">
                                    <Link to="#" className="sidebar-toggler btn btn-shadow btn-outline-primary"><i className="icon-bars"></i>Filters</Link>
                                </div> */}

                                <div className="toolbox-center">
                                    <div className="toolbox-info">
                                        You searched for <span>{params.keyword}</span>
                                    </div>
                                </div>

                                <div className="toolbox-right">
                                    <div className="toolbox-sort">
                                        <label for="sortby">Sort by:</label>
                                        <div className="select-custom">
                                            <select name="sortby" id="sortby" className="form-control">
                                                <option value="popularity" selected="selected">Most Popular</option>
                                                <option value="rating">Most Rated</option>
                                                <option value="date">Date</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="products container">
                            {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                            {this.state.templates  && 
                                <div className="row d-flex">
                                {this.state.templates.map(
                                    (templates) =>
                                    <div className="col-6 col-md-3 col-lg-3 col-xl-3 col-xxl-2 col-sm-6 mt-4">
                                        <div className="product product-7 text-center">
                                            <figure className="product-media">
                                                {templates.discount != 0 ?
                                                <span className="product-label label-new">{templates.discount}%</span>
                                                :null}
                                                <Link to={"/product_"+templates.id}>
                                                    <img src={"https://data.artaux.io/images/template/"+templates.image} alt="Product image" className="product-image" />
                                                </Link>

                                                <div className="product-action-vertical">
                                                    <Link to="javascript:void" className="btn-product-icon btn-wishlist btn-expandable"><span>Add to Wishlist</span></Link>
                                                </div>

                                                
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <Link to={'./'}>{templates.file_type}</Link>
                                                </div>
                                                <h3 className="product-title"><Link to={"/product_"+templates.id}>{templates.title}</Link></h3>
                                                <div className="product-price">
                                                <span>{this.state.sign}</span> {parseFloat((templates.product_price /this.state.exhangerate)).toFixed(2)}
                                                {templates.discount != 0 ?
                                                <small className="ml-2 old-amt"> <span>{this.state.sign}</span> {parseFloat(templates.price /this.state.exhangerate).toFixed(2)}</small> 
                                                :null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )}  
                                   </div>
                            }
                            {this.state.templateNumber <= 0  && 
                                <div className="row">
                                <h4>There are no digital assets present in this category. </h4>
                                </div>
                            }
                            </div>

                            {/*<nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <Link className="page-link page-link-prev" to="#" aria-label="Previous" tabindex="-1" aria-disabled="true">
                                            <span aria-hidden="true"><i className="icon-long-arrow-left"></i></span>Prev
                                        </Link>
                                    </li>
                                    <li className="page-item active" aria-current="page"><Link className="page-link" href="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                                    <li className="page-item-total">of 6</li>
                                    <li className="page-item">
                                        <Link className="page-link page-link-next" to="#" aria-label="Next">
                                            Next <span aria-hidden="true"><i className="icon-long-arrow-right"></i></span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>*/}

                            <div className="sidebar-filter-overlay"></div>
                            <aside className="sidebar-shop sidebar-filter">
                                <div className="sidebar-filter-wrapper">
                                    <div className="widget widget-clean">
                                        <label><i className="icon-close"></i>Filters</label>
                                        <Link to="#" className="sidebar-filter-clear">Clean All</Link>
                                    </div>
                                    
                                    <div className="widget widget-collapsible">
                                        <h3 className="widget-title">
                                            <Link data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
                                                Category
                                            </Link>
                                        </h3>

                                        <div className="collapse show" id="widget-1">
                                            <div className="widget-body">
                                                <div className="filter-items filter-items-count">
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" checked id="cat-1" />
                                                            <label className="custom-control-label" for="cat-1">Excel</label>
                                                        </div>
                                                        <span className="item-count">3</span>
                                                    </div>

                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="cat-2" />
                                                            <label className="custom-control-label" for="cat-2">PPTX</label>
                                                        </div>
                                                        <span className="item-count">0</span>
                                                    </div>

                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="cat-3" />
                                                            <label className="custom-control-label" for="cat-3">Doc</label>
                                                        </div>
                                                        <span className="item-count">4</span>
                                                    </div>

                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="cat-4" />
                                                            <label className="custom-control-label" for="cat-4">PSD</label>
                                                        </div>
                                                        <span className="item-count">2</span>
                                                    </div>

                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="cat-5" />
                                                            <label className="custom-control-label" for="cat-5">CDR</label>
                                                        </div>
                                                        <span className="item-count">2</span>
                                                    </div>

                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="cat-6" />
                                                            <label className="custom-control-label" for="cat-6">AI</label>
                                                        </div>
                                                        <span className="item-count">1</span>
                                                    </div>

                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="cat-7" />
                                                            <label className="custom-control-label" for="cat-7">EPS</label>
                                                        </div>
                                                        <span className="item-count">1</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="widget widget-collapsible">
                                        <h3 className="widget-title">
                                            <Link data-toggle="collapse" to="#widget-5" role="button" aria-expanded="true" aria-controls="widget-5">
                                                Price
                                            </Link>
                                        </h3>

                                        <div className="collapse show" id="widget-5">
                                            <div className="widget-body">
                                                <div className="filter-price">
                                                    <div className="filter-price-text">
                                                        Price Range:
                                                        <span id="filter-price-range"></span>
                                                    </div>

                                                    <div id="price-slider"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        )
    }
}

export default Search;