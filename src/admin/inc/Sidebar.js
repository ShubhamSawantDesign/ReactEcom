import React from "react";
import {Link, withRouter} from "react-router-dom";
import ReactTooltip from 'react-tooltip';

class Sidebar extends React.Component {
render(){
    return(
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="/admin" className="brand-link">
                    <img src="/assets/images/frontend_images/l3.png" alt="Artaux" className="brand-image" />
                    <span className="brand-text font-weight-light" style={{visibility:'hidden'}}><b>ARTAUX</b></span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        {/* <img src="/assets/images/backend_images/user.png" className="img-circle elevation-2" alt="User Image" /> */}
                        <i class="fa fa-user-circle-o" style={{color:"white",fontSize:"30px"}}></i>
                    </div>
                    <div className="info">
                    {localStorage.getItem('sa_user') ?
                    <a href={'/admin'} className="d-block" style={{textTransform:"capitalize"}}>{JSON.parse(localStorage.getItem('sa_user')).name}</a>
                        :null}
                    
                    {localStorage.getItem('ve_user') ?
                    <a href={'/admin'} className="d-block" style={{textTransform:"capitalize"}}>{JSON.parse(localStorage.getItem('ve_user')).username}</a>
                        :null}
                    </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library */}
                        <li className="nav-item">
                            <a href="/admin" className={window.location.pathname === '/admin' ? 'nav-link active' : 'nav-link'} data-tip data-for="registerTip">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p> Dashboard</p>

                            </a>
                            <ReactTooltip id="registerTip" place="right" effect="solid">
                                    Track the sales of your digital assets on this dashboard.
                            </ReactTooltip>
                        </li>
                        {/* contributer side nav */}
                        {localStorage.getItem('ve_user') ?
                        <li className={window.location.pathname === '/admin-contributer_add_template' || window.location.pathname === '/admin-contributer_view_template' || window.location.pathname === '/admin-contributer_view_approve_template' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <Link to="#" className="nav-link"><i className="nav-icon fas fa-file-archive" />
                                <p> Digital Assets
                                <i className="fas fa-angle-left right" /> 
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                {JSON.parse(localStorage.getItem('ve_user')).ratio !== "0" && JSON.parse(localStorage.getItem('ve_user')).status !== "0" &&
                                <li className="nav-item">
                                <a data-tip data-for="adddTip" href={'/admin-contributer_add_template'}  className={window.location.pathname === '/admin-contributer_add_template' ? 'nav-link active' :'nav-link'} ><i className="far fa-copy nav-icon" />
                                    <p>Add Digital Assets</p>
                                </a>
                                <ReactTooltip id="adddTip" place="right" effect="solid">
                                    The files uploaded should be editable for customers to modify.
                                </ReactTooltip>
                                </li>
                                }
                                <li className="nav-item">
                                <a href={'/admin-contributer_view_template'} className={window.location.pathname === '/admin-contributer_view_template' ? 'nav-link active' :'nav-link'} ><i className="far fa-folder nav-icon" />
                                    <p>Uploaded Digital Assets</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a data-tip data-for="approveTip" href={'/admin-contributer_view_approve_template'} className={window.location.pathname === '/admin-contributer_view_approve_template' ? 'nav-link active' :'nav-link'} ><i className="far fa-folder nav-icon" />
                                    <p>Approved Digital Assets</p>
                                </a>
                                <ReactTooltip id="approveTip" place="right" effect="solid">
                                    Assets approved by the platform appear here.
                                </ReactTooltip>
                                </li>
                            </ul>
                        </li>
                        :null}

                        {localStorage.getItem('ve_user') ?
                        <li className={window.location.pathname === '/admin-contributer_view_orders'  || window.location.pathname === '/admin-contributer_view_paid_orders' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <Link to="#" className="nav-link"><i className="nav-icon fas fa-file-archive" />
                                <p> Orders
                                <i className="fas fa-angle-left right" /> 
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <a data-tip data-for="unsettledTip" href={'/admin-contributer_view_orders'} className={window.location.pathname === '/admin-contributer_view_orders' ? 'nav-link active' :'nav-link'} ><i className="far fa-copy nav-icon" />
                                    <p>Unsettled Orders</p>
                                </a>
                                <ReactTooltip id="unsettledTip" place="right" effect="solid">
                                Royalties from the orders listed here are scheduled for settlement.
                                </ReactTooltip>
                                </li>
                                <li className="nav-item">
                                <a data-tip data-for="settledTip" href={'/admin-contributer_view_paid_orders'} className={window.location.pathname === '/admin-contributer_view_paid_orders' ? 'nav-link active' :'nav-link'} ><i className="far fa-folder nav-icon" />
                                    <p>Settled Orders</p>
                                </a>
                                <ReactTooltip id="settledTip" place="right" effect="solid">
                                Royalties from the orders listed here have been transferred to you.
                                </ReactTooltip>
                                </li>
                            </ul>
                        </li>
                        :null}

                        {localStorage.getItem('ve_user') ?
                        <li className={window.location.pathname === '/admin-contributer_purchase_report' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <Link to="#" className="nav-link"><i className="nav-icon fas fa-file-archive" />
                                <p> Reports
                                <i className="fas fa-angle-left right" /> 
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                {/*<li className="nav-item">
                                <Link to={'admin-contributer_add_template'} className="nav-link"><i className="far fa-copy nav-icon" />
                                    <p>Add Templates</p>
                                </Link>
                                </li>*/}
                                <li className="nav-item">
                                <a data-tip data-for="purchaseTip" href={'/admin-contributer_purchase_report'} className={window.location.pathname === '/admin-contributer_purchase_report' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Purchase Reports</p>
                                </a>
                                <ReactTooltip id="purchaseTip" place="right" effect="solid">
                                View a summary of the sales of your digital assets.
                                </ReactTooltip>
                                </li>
                            </ul>
                        </li>
                        :null}

                        {localStorage.getItem('ve_user') ?
                        <li className={window.location.pathname === '/admin-contributer_purchase_report' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <Link to="#" className="nav-link"><i className="nav-icon fas fa-file-archive" />
                                <p> End User Agreement
                                <i className="fas fa-angle-left right" /> 
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <a data-tip data-for="downloadTip"  href={'https://data.artaux.io/images/EULA_Artaux.pdf'} download className="nav-link"><i className="far fa-copy nav-icon" />
                                    <p>Download Agreement</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href={"/cms-page/license"} target="_blank" className="nav-link"><i className="far fa-folder nav-icon" />
                                    <p>View Agreement</p>
                                </a>
                                <ReactTooltip id="downloadTip" place="right" effect="solid">
                                We recommend all contributors to attach a copy of this agreement in the zip file along with their respective assets
                                </ReactTooltip>
                                </li>
                            </ul>
                        </li>
                        :null}

                        {localStorage.getItem('ve_user') ?
                        <li className="nav-item">
                            {JSON.parse(localStorage.getItem('ve_user')).ratio != 0 &&
                                
                                <a data-tip data-for="accountTip" href="/admin-contributer_bank_account" className={window.location.pathname === '/admin-contributer_bank_account' ? 'nav-link active' : 'nav-link'}>
                                    <i className="nav-icon fas fa-money-bill-wave" />
                                    <p> Bank Account Details</p>
                                </a>
                                
                            }
                            <ReactTooltip id="accountTip" place="right" effect="solid">
                                View and update your bank details.
                            </ReactTooltip>
                        </li>
                        :null}
                        {/* admin side nav */}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-add-banner' || window.location.pathname === '/admin-view-banners' || window.location.pathname === '/admin-view-mid-section-banners' || window.location.pathname === '/admin-view-collection-banners' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <a href="javascript:void" className="nav-link">
                                <i className="nav-icon far fa-image" />
                                <p> Banners
                                    <i className="fas fa-angle-left right" />
                                    {/* <span className="badge badge-info right">4</span> */}
                                </p>    
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <a href="/admin-add-banner" className={window.location.pathname === '/admin-add-banner' ? 'nav-link active' :'nav-link'} ><i className="far fa-copy nav-icon" />
                                    <p>Add Banner</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-banners" className={window.location.pathname === '/admin-view-banners' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Banners</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-mid-section-banners" className={window.location.pathname === '/admin-view-mid-section-banners' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Mid-Section Banners</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-collection-banners" className={window.location.pathname === '/admin-view-collection-banners' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Collection Banners</p>
                                </a>
                                </li>
                            </ul>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-add-file_extension' || window.location.pathname === '/admin-view-file_extension' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <a href="javascript:void" className="nav-link">
                                <i className="nav-icon far fa-image" />
                                <p> File Extension
                                    <i className="fas fa-angle-left right" />
                                    {/* <span className="badge badge-info right">4</span> */}
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <a href="/admin-add-file_extension" className={window.location.pathname === '/admin-add-file_extension' ? 'nav-link active' :'nav-link'}><i className="far fa-copy nav-icon" />
                                    <p>Add File Extension</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-file_extension" className={window.location.pathname === '/admin-view-file_extension' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View File Extensions</p>
                                </a>
                                </li>
                            </ul>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-add-category' || window.location.pathname === '/admin-view-categories' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <a href="#" className="nav-link"><i className="nav-icon fas fa-list-alt" />
                                <p> Categories
                                <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <a href="/admin-add-category" className={window.location.pathname === '/admin-add-category' ? 'nav-link active' :'nav-link'}><i className="far fa-copy nav-icon" />
                                    <p>Add Category</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-categories" className={window.location.pathname === '/admin-view-categories' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Categories</p>
                                </a>
                                </li>
                            </ul>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-new-template' || window.location.pathname === '/admin-view-template' || window.location.pathname === '/admin-view-delete_request' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <Link to="#" className="nav-link"><i className="nav-icon fas fa-file-archive" />
                                <p> Digital Assets
                                <i className="fas fa-angle-left right" />
                                 {/* <span className="badge badge-info right">46</span> */}
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                {/* <li className="nav-item">
                                <Link to="/admin-add-template" className="nav-link"><i className="far fa-copy nav-icon" />
                                    <p>Add Templates</p>
                                </Link>
                                </li> */}
                                <li className="nav-item">
                                <a href="/admin-new-template" className={window.location.pathname === '/admin-new-template' ? 'nav-link active' :'nav-link'}><i className="far fa-copy nav-icon" />
                                    <p>Approve & Update</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-template" className={window.location.pathname === '/admin-view-template' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Digital Assets</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-delete_request" className={window.location.pathname === '/admin-view-delete_request' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>Digital Assets Delete Requests </p>
                                </a>
                                </li>
                            </ul>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-view-orders' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <Link to="#" className="nav-link"><i className="nav-icon fas fa-bell" />
                                <p> Orders
                                <i className="fas fa-angle-left right" />
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <a href="/admin-view-orders" className={window.location.pathname === '/admin-view-orders' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Orders</p>
                                </a>
                                </li>
                            </ul>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-view-users'? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <a href="#" className="nav-link"><i className="nav-icon fas fa-users" />
                                <p> Users
                                <i className="fas fa-angle-left right" /> 
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <a href="/admin-view-users" className={window.location.pathname === '/admin-view-users' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Users</p>
                                </a>
                                </li>
                            </ul>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-new-contributors' || window.location.pathname === '/admin-view-contributors' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <a href="#" className="nav-link"><i className="nav-icon fas fa-user-plus" />
                                <p> Contributors
                                <i className="fas fa-angle-left right" /> 
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                <a href="/admin-new-contributors" className={window.location.pathname === '/admin-new-contributors' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>New Contributors</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-contributors" className={window.location.pathname === '/admin-view-contributors' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Contributors</p>
                                </a>
                                </li>
                                
                            </ul>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-add-blog' || window.location.pathname === '/admin-view-blog' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <a href="#" className="nav-link"><i className="nav-icon fa fa-sticky-note" />
                                <p> Blogs <i className="fas fa-angle-left right" /> </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item"><a href={"/admin-add-blog"} className={window.location.pathname === '/admin-add-blog' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" /><p>Add Blog</p></a></li>
                                <li className="nav-item"><a href={"/admin-view-blog"} className={window.location.pathname === '/admin-view-blog' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" /><p>View Blogs</p></a></li>
                            </ul>
                        </li>
                        :null}

                        {localStorage.getItem('sa_user') ?
                        <li className="nav-item">
                            <a href="/admin-view-user-search" className={window.location.pathname === '/admin-view-user-search' ? 'nav-link active' :'nav-link'}><i className="nav-icon fas fa-search" />
                                <p> User Searches</p>
                            </a>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className="nav-item">
                            <a href="/admin-view-rates" className={window.location.pathname === '/admin-view-rates' ? 'nav-link active' :'nav-link'}><i className="nav-icon fas fa-wallet" />
                                <p> Change Currency Rates</p>
                            </a>
                        </li>
                        :null}
                        
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-add-cms-page' || window.location.pathname === '/admin-view-cms-pages' || window.location.pathname === '/admin-view-newsletter' || window.location.pathname === '/admin-view-enquiries' || window.location.pathname === '/admin-view-about' || window.location.pathname === '/admin-view-contact' ? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <a href="#" className="nav-link"><i className="nav-icon fas fa-copy" />
                                <p> CMS Pages
                                <i className="fas fa-angle-left right" />
                                {/* <span className="badge badge-info right">6</span> */}
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                {/* <li className="nav-item">
                                <Link to="/admin-add-cms-page" className={window.location.pathname === '/admin-add-cms-page' ? 'nav-link active' :'nav-link'}><i className="far fa-copy nav-icon" />
                                    <p>Add CMS Page</p>
                                </Link>
                                </li> */}
                                <li className="nav-item">
                                <a href="/admin-view-cms-pages" className={window.location.pathname === '/admin-view-cms-pages' ? 'nav-link active' :'nav-link'}><i className="far fa-copy nav-icon" />
                                    <p>View CMS Pages</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-about" className={window.location.pathname === '/admin-view-about' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View About</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-contact" className={window.location.pathname === '/admin-view-contact' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Contact</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-enquiries" className={window.location.pathname === '/admin-view-enquiries' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Enquiries</p>
                                </a>
                                </li>
                                <li className="nav-item">
                                <a href="/admin-view-newsletter" className={window.location.pathname === '/admin-view-newsletter' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Newsletter</p>
                                </a>
                                </li>
                            </ul>
                        </li>
                        :null}
                        {localStorage.getItem('sa_user') ?
                        <li className={window.location.pathname === '/admin-template_purchase_report'? 'nav-item menu-is-opening menu-open' : 'nav-item'}>
                            <Link to="#" className="nav-link"><i className="nav-icon fas fa-file-archive" />
                                <p> Reports
                                <i className="fas fa-angle-left right" /> 
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                {/*<li className="nav-item">
                                <Link to={'admin-contributer_add_template'} className="nav-link"><i className="far fa-copy nav-icon" />
                                    <p>Add Templates</p>
                                </Link>
                                </li>*/}
                                <li className="nav-item">
                                <a href={'/admin-template_purchase_report'} className={window.location.pathname === '/admin-template_purchase_report' ? 'nav-link active' :'nav-link'}><i className="far fa-folder nav-icon" />
                                    <p>View Purchase Reports</p>
                                </a>
                                </li>
                            </ul>
                        </li>
                        :null}

                        {/* {localStorage.getItem('sa_user') ?
                        <li className="nav-item">
                            <Link to="/admin-view-enquiries" className="nav-link"><i className="nav-icon fas fa-question" />
                                <p> Enquiries/Feedbacks</p>
                            </Link>
                        </li>
                        :null} */}
                       </ul>
                    </nav>
                </div>
            </aside>

        </>
    )
}
}

export default Sidebar;