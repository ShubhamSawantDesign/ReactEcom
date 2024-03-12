import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';

class CmsPage extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        this.getPage();
    }

    async getPage() {
        const { match: { params } } = this.props;
        this.setState({ isLoading: true });
        const response = await axios.get(`api/auth/cms_page/${params.name}`);
        if(response.data.page){
            this.setState({  
                title: response.data.page.title,
                content: response.data.page.content,
                 isLoading: false});
        }else if(response.data.status === 401){
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
			                    <li className="breadcrumb-item">CMS Page</li>
			                    <li className="breadcrumb-item active" aria-current="page">{this.state.title}</li>
			                </ol>
			            </div>
			        </nav>
			        <div className="page-content">
                        <div className="container">
                        {this.state.isLoading && <h6><i className="fa fa-spinner fa-spin"></i> Loading...</h6> }
                            <h4 className="title">{this.state.title}</h4>
                            <div dangerouslySetInnerHTML={{ __html: this.state.content}}></div>

                       
                        </div>
                    </div>

                </main>

                <Footer />
            </div>
        )
    }
}

export default CmsPage;