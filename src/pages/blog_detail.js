import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import moment from "moment";


class About extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        this.getBlog();
       
    }

    async getBlog() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        const response = await axios.get(`api/auth/view_blog/${params.id}`);
        if(response.data.blog){
            this.setState({
                 image: response.data.blog.image, 
                 content: response.data.blog.content,
                 title: response.data.blog.title,
                 created_at: response.data.blog.created_at,
                 author: response.data.blog.author,
                 isLoading: false});
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
                <div className="page-content">
                    <figure className="entry-media">
                    <img src={"https://data.artaux.io/images/blog/"+this.state.image} style={{maxHeight:"500px"}} alt="image desc" />
                    </figure>{/* End .entry-media */}
                    <div className="container">
                    <article className="entry single-entry entry-fullwidth">
                        <div className="row">
                        <div className="col-lg-11">
                            <div className="entry-body">
                            <div className="entry-meta">
                                <span className="entry-author">
                                by <span>{this.state.author}</span>
                                </span>
                                <span className="meta-separator">|</span>
                                <span>{moment(this.state.created_at).format("DD MMM YYYY")}</span>
                            </div>{/* End .entry-meta */}
                            <h2 className="entry-title entry-title-big" style={{textTransform:"capitalize",cursor: "context-menu"}}>
                                {this.state.title}
                            </h2>{/* End .entry-title */}
                            <div className="entry-content editor-content">
                                <p>{this.state.content}</p>
                            </div>{/* End .entry-content */}
                            <div className="entry-footer row no-gutters">
                                <div className="col">
                                {/* <div className="entry-tags">
                                    <span>Tags:</span> <a href="#">photography</a> <a href="#">style</a>
                                </div> */}
                                </div>{/* End .col */}
                            </div>{/* End .entry-footer row no-gutters */}
                            </div>{/* End .entry-body */}
                        </div>{/* End .col-lg-11 */}
                        <div className="col-lg-1 order-lg-first mb-2 mb-lg-0">
                            <div className="sticky-content" style={{}}>
                            <div className="social-icons social-icons-colored social-icons-vertical">
                                <span className="social-label">SHARE:</span>
                                <a href="#" className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f" /></a>
                                <a href="#" className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter" /></a>
                                <a href="#" className="social-icon social-pinterest" title="Pinterest" target="_blank"><i className="icon-pinterest" /></a>
                                <a href="#" className="social-icon social-linkedin" title="Linkedin" target="_blank"><i className="icon-linkedin" /></a>
                            </div>{/* End .soial-icons */}
                            </div>{/* End .sticky-content */}
                        </div>{/* End .col-lg-1 */}
                        </div>{/* End .row */}
                    </article>{/* End .entry */}

                    </div>{/* End .container */}
                </div>{/* End .page-content */}
                </main>

                <Footer />
            </div>
        )
    }
}

export default About;