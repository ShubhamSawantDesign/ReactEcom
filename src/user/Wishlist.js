import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
 
import Swal from 'sweetalert2';

class Wishlist extends React.Component {
    
    constructor() {
        super();
        this.state = {
            data: [],
            id:'',
        }
    }

    componentDidMount() {
        if(!localStorage.getItem('user') ){
            Swal.fire({
        		title: "Login First!",
        		text: "You need to login first to open wishlist",
        		type: "error",
        	});
            window.location.href="/user-login";
        }
        this.getWishlist();
        this.getchangeCurrency();
    }
    
    async getWishlist() {
        const email = JSON.parse(localStorage.getItem('user')).email;
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/get_wishlist/${email}`);
        if(response.data.cart){
            this.setState({ 
                cart: response.data.cart,
                totalPrice: response.data.total_price,
                cartId: response.data.cart.id,
                cartVendorId: response.data.cart.vendor_id,
                cartPrice: response.data.cart.price,
                cartCount: response.data.cartCount,
                 isLoading: false});
                 this.setState({wishlistNumber : this.state.cart.length});
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
        }
    }

    async addToCart(id) {
        this.setState({ isLoading: true });
        const response = await axios.post(`/api/auth/wishlist_to_cart/${id}`);
        if(response.data.status == 200){
			Swal.fire({
        		title: "Success! product added to successfully.",
        		text: response.data.message,
        		type: "success",
        	});
			window.location.href="/wishlist";
        }else if(response.data.status === 423){
			Swal.fire({
				title: "Product Exist",
				text:response.data.message,
				type: "error",
			});
			this.setState({ isLoading: false });
        }
    }

    async wishlistRemove(id) {
        const email = JSON.parse(localStorage.getItem('user')).email;
        this.setState({ isLoading: true });
        const response = await axios.get(`/api/auth/delete_wishlist/${id}`);
        if(response.data.status == 200){
			Swal.fire({
        		title: "Success! You Deleted wishlist item successfully.",
        		text: response.data.message,
        		type: "success",
        	});
			window.location.href="/wishlist";
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
        // if(localStorage.getItem('items') === null){
        //     this.props.history.push("../user-login");
        // }
        return(
            <div>
                <Navbar />

                <main className="main">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">My Wishlist</li>
                            </ol>
                        </div>
                    </nav>

                    <div className="page-content">
                        <div className="cart">
                            <div className="container-fluid">
                                <div className="row justify-content-lg-center">
                                    <div className="col-lg-10">
                                    {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                                        {this.state.cart  &&
                                        <table className="table table-cart table-mobile">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    {/* <th>Price</th> */}
                                                    <th>Total</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.cart.map(
                                                (cart, index) =>
                                                <tr key={index++}>
                                                    <td className="product-col">
                                                        <div className="product">
                                                            <figure className="product-media">
                                                                <Link to={"../product_"+cart.product_id}>
                                                                    <img src={'https://data.artaux.io/images/template/'+cart.image } />
                                                                </Link>
                                                            </figure>

                                                            <h3 className="product-title">
                                                                <Link to={"../product_"+cart.product_id}>{cart.product_name}</Link>
                                                            </h3>
                                                        </div>
                                                    </td>
                                                    {/* <td className="price-col">$84.00</td> */}
                                                    <td className="total-col"> <span>{this.state.sign}</span> {parseFloat(cart.price /this.state.exhangerate).toFixed(2)}</td>
                                                    <td className="action-col">
														<button className="btn btn-block btn-outline-primary-2" onClick={this.addToCart.bind(this, cart.id)}><i className="icon-cart-plus"></i>Add to Cart</button>
													</td>
													<td className="remove-col"><button className="btn-remove" onClick={this.wishlistRemove.bind(this, cart.id)}><i className="icon-close"></i></button></td>
                                                </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    }
                                    {this.state.wishlistNumber <= 0  && 
                                        <div className="row">
                                        <h5>There is no templates present in wishlist.</h5>
                                        </div>
                                    }
                                        {/* <div className="cart-bottom">
                                            <div className="cart-discount">
                                                <form action="#">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" required placeholder="coupon code" />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-primary-2" type="submit"><i className="icon-long-arrow-right"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <a href="#" className="btn btn-outline-dark-2"><span>UPDATE CART</span><i className="icon-refresh"></i></a>
                                        </div> */}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        )
    }
}

export default Wishlist;