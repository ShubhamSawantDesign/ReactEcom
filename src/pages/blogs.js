import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import moment from "moment";
import ReactPaginate from 'react-paginate';

class About extends React.Component {
    constructor() {
        super();
        this.state = {
            offset: 0,
            data: [],
            perPage: 6,
            currentPage: 0
        }
        this.handlePageClick = this
          .handlePageClick
          .bind(this);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
  
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getBlogs()
        });
  
    };
    componentDidMount() {
        this.getBlogs();
       
    }

    async getBlogs() {
        this.setState({ isLoading: true });
        const response = await axios.get('api/auth/view_blogs');
        if(response.data.blog){
            const blogs = 
            this.setState({ blogs: response.data.blog.slice(this.state.offset, this.state.offset + this.state.perPage), isLoading: false, pageCount: Math.ceil(response.data.blog.length / this.state.perPage),});    
        }else if(response.data.error === 401){
            Swal.fire({
                title: "Failed!",
                text: response.data.message,
                type: "error",
            });
            this.setState({ isLoading: false });
        }
}
    render(){
        return(
            <div>
                <Navbar />

                <main className="main">
			        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
			            <div className="container-fluid">
			                <ol className="breadcrumb">
			                    <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
			                    <li className="breadcrumb-item active" aria-current="page">Blogs</li>
			                </ol>
			            </div>
			        </nav>
			        {/* <div className="page-header text-center" style={{backgroundImage: 'url("assets/images/frontend_images/page-header-bg.jpg")'}}>
                        <div className="container">
                            <h1 className="page-title">Blogs</h1>
                        </div>
                    </div> */}

                    <div className="page-content mt-5">
                        <div className="container">
                        {/* <nav className="blog-nav">
                            <ul className="menu-cat entry-filter justify-content-center">
                            <li className="active"><a href="#" data-filter="*">All Blog Posts<span>8</span></a></li>
                            <li><a href="#" data-filter=".lifestyle">Lifestyle<span>3</span></a></li>
                            <li><a href="#" data-filter=".shopping">Shopping<span>1</span></a></li>
                            <li><a href="#" data-filter=".fashion">Fashion<span>2</span></a></li>
                            <li><a href="#" data-filter=".travel">Travel<span>3</span></a></li>
                            <li><a href="#" data-filter=".hobbies">Hobbies<span>2</span></a></li>
                            </ul>
                        </nav> */}
                        {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                            {this.state.blogs &&
                        <div className="entry-container max-col-4" data-layout="fitRows" >
                         {this.state.blogs.map(
                            (blog,index) =>
                            <div className="entry-item col-sm-6 col-md-4 col-lg-4">
                                <article className="entry entry-grid text-center">
                                    <figure className="entry-media">
                                    <Link to={'/blogs_detail/'+blog.id}>
                                        <img src={'https://data.artaux.io/images/blog/'+blog.image} alt="image desc" />
                                    </Link>
                                    </figure>{/* End .entry-media */}
                                    <div className="entry-body">
                                    <div className="entry-meta">
                                        <span><i className="fa fa-calendar"></i> {moment(blog.created_at).format("DD MMM YYYY")}</span>
                                        <span className="meta-separator">|</span>
                                        <span><i className="fa fa-user-o"></i> By- {blog.author}</span>
                                    </div>{/* End .entry-meta */}
                                    <h2 className="entry-title">
                                        <Link style={{textTransform:"capitalize",cursor: "context-menu"}}>{blog.title}</Link>
                                    </h2>{/* End .entry-title */}
                                    <div className="entry-content">
                                        <p className="text-center text-justify">{`${blog.content.substring(0, 100)}...`}</p>
                                        <Link to={'/blogs_detail/'+blog.id} className="read-more">Continue Reading</Link>
                                    </div>
                                    </div>
                                </article>
                            </div>
                            )}
                            
                        </div>
                        }
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
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
                        </div>{/* End .container */}
                    </div>
                </main>

                <Footer />
            </div>
        )
    }
}

export default About;