import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";
import { Range, getTrackBackground } from "react-range";

const STEP = 100;
const MIN = 0;
const MAX = 10000;

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
            exhangerate:'',
            price_range: [0],
            file_type: 0,
            cat_name:0,
            discount:0
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getTemplates();
        this.getchangeCurrency();
        this.getcategories();
        this.getfileType();
    }

    async getcategories() {
        this.setState({ isLoading: true });
        const response = await axios.get('/api/auth/get_categories');
        if(response.data.category){
            this.setState({ category: response.data.category, isLoading: false});
        }
    }

    async getfileType() {
        this.setState({ isLoading: true });
        const response = await axios.get('/api/auth/view_file_types');
        if(response.data.filetype){
            this.setState({ filetype: response.data.filetype, isLoading: false});
        }
    }
    
    async getTemplates() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/filter_templates/${params.category}/${params.file_type}/${params.discount}/${params.range}`);
        if(response.data.templates){
            this.setState({ 
                templates: response.data.templates,
                 isLoading: false});
                 if(response.data.category){
                    this.setState({category_name: response.data.category.name});
                 }else{
                    this.setState({category_name: 0});
                 }
            this.setState({templateNumber : this.state.templates.length,cat_name:params.category,file_type:params.file_type,discount:params.discount,price_range: [params.range]});
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
        const { match: { params } } = this.props;
        return(
            <div>
                <Navbar />

                <main className="main">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"></li>
                            </ol>
                        </div>
                    </nav>

                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="toolbox">
                                 <div className="toolbox-left">
                                    <Link to="#" className="sidebar-toggler btn btn-shadow btn-outline-primary"><i className="icon-bars"></i>Filters</Link>
                                </div> 

                                <div className="toolbox-center">
                                    <div className="toolbox-info">
                                        {/* You searched for <span></span> */}
                                    </div>
                                </div>

                                {/* <div className="toolbox-right">
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
                                </div> */}
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

                                                {/* <div className="product-action-vertical">
                                                    <Link to="javascript:void" className="btn-product-icon btn-wishlist btn-expandable"><span>Add to Wishlist</span></Link>
                                                </div> */}
 
                                                
                                            </figure>

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <Link to="#">{templates.file_type}</Link>
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
                                <h4>There is no templates present in this filters.</h4>
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
                                        {/* <Link to="#" className="sidebar-filter-clear">Clean All</Link> */}
                                    </div>
                                        <div className="widget widget-collapsible">
                                            <h3 className="widget-title">
                                                <Link data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
                                                    Category
                                                </Link>
                                            </h3>

                                            <div className="collapse show" id="widget-1">
                                                <div className="widget-body">
                                                {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                                {this.state.category  && 
                                                    <div className="filter-items filter-items-count">
                                                        {this.state.category.map(
                                                        (categories) =>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="cat_name" id="cat_name"  value={categories.id} defaultChecked={categories.name === this.state.category_name}  onChange={(e) => {
                                                                    // console.log('cat_name',e.target.value);
                                                                this.setState({ cat_name:e.target.value });
                                                            }} className="custom-control-input" id={"cat-"+categories.id+""} />
                                                                <label className="custom-control-label" for={"cat-"+categories.id+""}>{categories.name}</label>
                                                            </div>
                                                            {/* <span className="item-count">3</span> */}
                                                        </div>
                                                        )}
                                                    </div>
                                                }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="widget widget-collapsible">
                                            <h3 className="widget-title">
                                                <Link data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
                                                    File Extension
                                                </Link>
                                            </h3>

                                            <div className="collapse show" id="widget-1">
                                                <div className="widget-body">
                                                {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                                {this.state.filetype  && 
                                                    <div className="filter-items filter-items-count">
                                                        {this.state.filetype.map(
                                                        (filetypes) =>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="file_type" value={filetypes.file_type} defaultChecked={params.file_type === filetypes.file_type} onChange={(e) => {
                                                                this.setState({ file_type:e.target.value });
                                                            }} className="custom-control-input" id={"cat-"+filetypes.file_type+""} />
                                                                <label className="custom-control-label" for={"cat-"+filetypes.file_type+""}>{filetypes.file_type}</label>
                                                            </div>
                                                        </div>
                                                        )}
                                                    </div>
                                                }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="widget widget-collapsible">
                                            <h3 className="widget-title">
                                                <Link data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1">
                                                    Discount
                                                </Link>
                                            </h3>

                                            <div className="collapse show" id="widget-1">
                                                <div className="widget-body">
                                                    <div className="filter-items filter-items-count">
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="discount" value='20' defaultChecked={params.discount === '20' ? "checked" :null} onChange={(e) => {
                                                                this.setState({ discount:e.target.value });
                                                            }} className="custom-control-input" id={"discount-1"} />
                                                                <label className="custom-control-label" for={"discount-1"}>{"0% - 20% "}</label>
                                                            </div>
                                                        </div>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="discount" value='40'  defaultChecked={params.discount === '40' ? 'checked':null} onChange={(e) => {
                                                                this.setState({ discount:e.target.value });
                                                            }} className="custom-control-input" id={"discount-2"} />
                                                                <label className="custom-control-label" for={"discount-2"}>{"20% - 40% "}</label>
                                                            </div>
                                                        </div>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="discount" value='60'  defaultChecked={params.discount === '60' ? 'checked':null} onChange={(e) => {
                                                                this.setState({ discount:e.target.value });
                                                            }} className="custom-control-input" id={"discount-3"} />
                                                                <label className="custom-control-label" for={"cdiscountat-3"}>{"40% - 60% "}</label>
                                                            </div>
                                                        </div>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="discount" value='80'  defaultChecked={params.discount === '80' ? 'checked':null} onChange={(e) => {
                                                                this.setState({ discount:e.target.value });
                                                            }} className="custom-control-input" id={"discount-4"} />
                                                                <label className="custom-control-label" for={"discount-4"}>{"60% - 80%"}</label>
                                                            </div>
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
                                                        <span id="filter-price-range"> {this.state.sign}{parseFloat(0).toFixed(0) } - {this.state.sign}{parseFloat(MAX/this.state.exhangerate).toFixed(0) }</span>
                                                    </div>
                                                    <Range
                                                        values={this.state.price_range}
                                                        step={STEP}
                                                        min={MIN}
                                                        max={MAX}
                                                        onChange={(price_range) => this.setState({ price_range })}
                                                        renderTrack={({ props, children }) => (
                                                            <div
                                                            onMouseDown={props.onMouseDown}
                                                            onTouchStart={props.onTouchStart}
                                                            style={{
                                                                ...props.style,
                                                                height: "36px",
                                                                display: "flex",
                                                                width: "100%"
                                                            }}
                                                            >
                                                            <div
                                                                ref={props.ref}
                                                                style={{
                                                                height: "5px",
                                                                width: "100%",
                                                                borderRadius: "4px",
                                                                background: getTrackBackground({
                                                                    values: this.state.price_range,
                                                                    colors: ["#000", "#ccc"],
                                                                    min: MIN,
                                                                    max: MAX
                                                                }),
                                                                alignSelf: "center"
                                                                }}
                                                            >
                                                                {children}
                                                            </div>
                                                            </div>
                                                        )}
                                                        renderThumb={({ props, isDragged }) => (
                                                            <div
                                                            {...props}
                                                            style={{
                                                                ...props.style,
                                                                height: "15px",
                                                                width: "15px",
                                                                borderRadius: "4px",
                                                                backgroundColor: "#FFF",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                boxShadow: "0px 1px 6px #AAA"
                                                            }}
                                                            >
                                                            <div
                                                                style={{
                                                                height: "3px",
                                                                width: "3px",
                                                                backgroundColor: isDragged ? "#000" : "#CCC"
                                                                }}
                                                            />
                                                            </div>
                                                        )}
                                                        />
                                                        <output style={{ marginTop: "0px" }} id="output">
                                                            {this.state.sign}{parseFloat(this.state.price_range[0]/this.state.exhangerate).toFixed(0) }
                                                            </output>

                                                            <div class="text-center"><a type="submit" class="btn btn-primary btn-shadow" href={"/filter_products/"+this.state.cat_name+"/"+this.state.file_type+"/"+this.state.discount+"/"+this.state.price_range}>Filter <i class="icon-long-arrow-right"></i></a></div>
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

export default Filter;