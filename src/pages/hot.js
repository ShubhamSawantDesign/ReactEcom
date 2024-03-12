import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import { template } from "@babel/core";
import { Range, getTrackBackground } from "react-range";
import ReactPaginate from 'react-paginate';

const STEP = 100;
const MIN = 0;
const MAX = 10000;

class Hot extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
            exhangerate:'',
            price_range: [0],
            file_type: 0,
            cat_name:0,
            discount:0,
            offset: 0,
            data: [],
            perPage: 12,
            currentPage: 0
        }
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
  
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getTemplates()
        });
  
    };

    componentDidMount() {
        const { match: { params } } = this.props;
        this.gethotdata();
    }

    async gethotdata() {
        this.setState({ isLoading: true });
        const response = await axios.get('/api/auth/hot_data');
        if(response.data.status = 200){
            this.setState({ 
                category: response.data.category,
                filetype: response.data.filetype,
                templates: response.data.templates.slice(this.state.offset, this.state.offset + this.state.perPage),
                pageCount: Math.ceil(response.data.templates.length / this.state.perPage),
                INR_rate: response.data.INR_rate.rate,
                USD_rate: response.data.USD_rate.rate,
                GBP_rate: response.data.GBP_rate.rate,
                EURO_rate: response.data.EURO_rate.rate,
                DIRHAM_rate: response.data.DIRHAM_rate.rate,
                 isLoading: false});
                 if(this.state.pageCount > 0){
                    this.setState({Prev : "prev",Next: "next"});
                 }else{
                    this.setState({Prev : "",Next: ""});
                 }
                 this.setState({templateNumber : this.state.templates.length});
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
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            // this.props.history.push("../admin-view-template");
        }
    }


    render(){
        // this.getTemplates();
        return(
            <div>
                <Navbar />

                <main className="main">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Hot Digital Assets</li>
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
                                        You searched for <span>Hot Digital Assets</span>
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
                                                <Link to={"../product_"+templates.id}>
                                                    <img src={"https://data.artaux.io/images/template/"+templates.image} alt="Product image" className="product-image" />
                                                </Link>

                                                {/* <div className="product-action-vertical">
                                                    <Link to="javascript:void" className="btn-product-icon btn-wishlist btn-expandable"><span>Add to Wishlist</span></Link>
                                                </div> */}

                                                
                                            </figure> 

                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <Link to="#">{templates.file_type}</Link><br></br>
                                                    
                                                </div>
                                                <h3 className="product-title"><Link to={"../product_"+templates.id}>{templates.title}</Link></h3>
                                                <Link to="#" style={{fontSize:"12px"}}>Product By: {templates.uploaded_by}</Link>
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

                            <ReactPaginate
                            previousLabel={this.state.Prev}
                            nextLabel={this.state.Next}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination justify-content-center"}
                            subContainerClassName={"pages pagination"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link page-link-prev"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link page-link-next"}
                            disabledClassName={"disabled"}
                            activeClassName={"active"}/> 

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
                                                                <input type="radio" name="cat_name" id="cat_name" value={categories.id}  onChange={(e) => {
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
                                                                <input type="radio" name="file_type" value={filetypes.file_type} onChange={(e) => {
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
                                                                <input type="radio" name="discount" value={20} onChange={(e) => {
                                                                this.setState({ discount:e.target.value });
                                                            }} className="custom-control-input" id={"discount-1"} />
                                                                <label className="custom-control-label" for={"discount-1"}>{"0% - 20% "}</label>
                                                            </div>
                                                        </div>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="discount" value={40} onChange={(e) => {
                                                                this.setState({ discount:e.target.value });
                                                            }} className="custom-control-input" id={"discount-2"} />
                                                                <label className="custom-control-label" for={"discount-2"}>{"20% - 40% "}</label>
                                                            </div>
                                                        </div>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="discount" value={60} onChange={(e) => {
                                                                this.setState({ discount:e.target.value });
                                                            }} className="custom-control-input" id={"discount-3"} />
                                                                <label className="custom-control-label" for={"discount-3"}>{"40% - 60% "}</label>
                                                            </div>
                                                        </div>
                                                        <div className="filter-item">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" name="discount" value={80} onChange={(e) => {
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

export default Hot;