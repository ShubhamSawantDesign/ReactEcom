import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
        const response = await axios.get('api/auth/policies');
        if(response.data.page){
            this.setState({  
                pages: response.data.page,
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
			                    <li className="breadcrumb-item">Our Policies</li>
			                    {/* <li className="breadcrumb-item active" aria-current="page">{this.state.title}</li> */}
			                </ol>
			            </div>
			        </nav>
			        <div className="page-content">
                        <div className="container-fluid">
                        {this.state.pages &&
                        <Tabs className="row">
                            <div className="col-md-12">
                            <TabList >
                            
                            {this.state.pages.map( page =>
                                <Tab>{page.title}</Tab>
                            )}
                                {/* <Tab>Compatibility</Tab> */}
                           
                            {/* <Tab>Review</Tab> */}
                            </TabList>
                            </div>
                            <div className="col-md-12">
                            {this.state.pages.map( page =>
                            <TabPanel className="tab-pane fade show active" id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                                <div className="product-desc-content">
                                <h4 className="title">{page.title}</h4>
                                <div dangerouslySetInnerHTML={{ __html: page.content}}></div>
                                </div>
                            </TabPanel>
                            )}
                            <TabPanel>
                                <div className="product-desc-content">
                                        <p>test2</p>  
                                </div>
                            </TabPanel>
                            </div>
                        </Tabs>
                        }
                        </div>
                    </div>

                </main>

                <Footer />
            </div>
        )
    }
}

export default CmsPage;