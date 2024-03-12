import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Redirect } from 'react-router';

import Home from "./Home";
import Products from "./pages/Products";
import Filter from "./pages/Filter";
import Trending from "./pages/trending";
import Hot from "./pages/hot";
import Product from "./pages/Product";
import Search from "./pages/search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./user/Login";
import Register from "./user/Register";
import ContributorRegister from "./user/ContributorRegister";
import ForgotPassword from "./user/ForgotPassword";
import ForgotVendorPassword from "./user/ForgotVendorPassword";
import dashboard from "./user/dashboard";
import createPosts from "./user/createPosts";
import EditPosts from "./user/EditPosts";
import Cart from "./user/Cart";
import Account from "./user/Account";
import Accounts from "./user/Account";
import Checkout from "./user/Checkout";
import Faq from "./user/Faq";
import Wishlist from "./user/Wishlist";
import Error from "./pages/Error";
import Page404 from "./pages/404";
import CmsPage from "./pages/cms";
import Policies from "./pages/policies";

import Blogs from "./pages/blogs";
import BlogsDetail from "./pages/blog_detail";

import AdminLogin from "./admin/Login";
import AdminHome from "./admin/Home";
// import Addtemplate from "./admin/templates/Add_template";
import Viewtemplate from "./admin/templates/View_template";
import Newtemplate from "./admin/templates/New_template";
import EditTemplate from "./admin/templates/Edit_template";

//ADMIN------------------------------------------------------------------------------------------------------

//admin banner
import AddBanner from "./admin/banner/add_banner";
import EditBanner from "./admin/banner/edit_banner";
import ViewBanners from "./admin/banner/view_banners";
import ViewCollectionBanners from "./admin/banner/view_collection_banner";
import ViewMidSectionBanners from "./admin/banner/view_mid_section_banner";

//admin category
import AddCategory from "./admin/category/add_category";
import EditCategory from "./admin/category/edit_category";
import ViewCategories from "./admin/category/view_categories";

//admin category
import AddBlog from "./admin/blogs/add_blog";
import EditBlog from "./admin/blogs/edit_blog";
import ViewAdminBlog from "./admin/blogs/view_blog";

//admin orders
import ViewOrders from "./admin/order/view_orders";
import ViewContributorsOrders from "./admin/order/view_contributor_orders";
import ViewOrder from "./admin/order/order";
import ViewInvoice from "./admin/order/Invoice";
import ViewUsers from "./admin/user/view_users";
import ViewUserOrders from "./admin/user/user_orders";

//Add and view contributors
import NewContributors from "./admin/user/new_contributors";
import EditContributors from "./admin/user/edit_contributors";
import ViewContributors from "./admin/user/view_contributors";
import ViewContributorTemplates from "./admin/templates/view_contributor_templates";
import ViewDeleteRequest from "./admin/templates/view_delete_request";

import ViewUserSearches from "./admin/templates/user_searches";
//CMS admin
import AddCMSPage from "./admin/cms/add_cms_page";
import ViewCMSPages from "./admin/cms/cms_pages";
import EditCMSPages from "./admin/cms/edit_cms_page";
import ViewAbout from "./admin/cms/view_about";
import ViewContact from "./admin/cms/view_contact";
import EditContact from "./admin/cms/edit_contact_details";
import ViewEnquiries from "./admin/cms/view_enquiries";
import ViewNewsletter from "./admin/cms/view_newsletter_email";

//file extension admin
import AddFileExtension from "./admin/file_extension/add_file_extension";
import EditFileExtension from "./admin/file_extension/edit_file_extension";
import ViewFileExtension from "./admin/file_extension/view_file_extension";

//edit rates admin
import EditRate from "./admin/rates/edit_rate";
import ViewRate from "./admin/rates/view_rate";

//admin profile
import ChangePassword from "./admin/user/change_password";
import AdminProfile from "./admin/user/my_profile";

//CONTRIBUTOR---------------------------------------------------------------------------------------------------------------------------------

import ContributerLogin from "./admin/vendor/Login";
import ContributerAddTemplate from "./admin/vendor/templates/Add_template";
import ContributerViewTemplate from "./admin/vendor/templates/View_template";
import ContributerViewApproveTemplate from "./admin/vendor/templates/View_approve_template";
import ContributerEditTemplate from "./admin/vendor/templates/Edit_template";

import ContributerViewOrders from "./admin/vendor/orders/View_orders";
import ContributerViewPaidOrders from "./admin/vendor/orders/Paid_orders";
import ContributerViewOrder from "./admin/vendor/orders/Order";

import PurchaseReport from "./admin/vendor/reports/purchaseReport";
import templatepurchasereport from "./admin/reports/template_purchase_report";

import ContributerChangePassword from "./admin/vendor/user/change_password";
import ContributerProfile from "./admin/vendor/user/my_profile";
import AccountDetails from "./admin/vendor/user/account_details";


class Routes extends React.Component{
    render(){
        return (
            <>
                <Router >
                    <>
                        <Switch>

                            <Route path="/" exact component={Home} />
                            <Route path="/about/" exact component={About} />
                            <Route path="/blogs/" exact component={Blogs} />
                            <Route path="/blogs_detail/:id" exact component={BlogsDetail} />
                            <Route path="/contact/" exact component={Contact} />
                            <Route path="/product_:id" exact component={Product} />
                            <Route path="/products_:id" exact component={Products} />
                            <Route path="/filter_products/:category/:file_type/:discount/:range" exact component={Filter} />
                            <Route path="/trending_templates" exact component={Trending} />
                            <Route path="/hot_templates" exact component={Hot} />
                            <Route path="/search/:keyword/:file_type" exact component={Search} />
                            <Route path="/user-login/" exact component={Login} />
                            <Route path="/user-register/" exact component={Register} />
                            <Route path="/contributor-register/" exact component={ContributorRegister} />
                            <Route path="/forgot-password/" exact component={ForgotPassword} />
                            <Route path="/forgot-password-vendor/" exact component={ForgotVendorPassword}/>
                            {/* Code to be added */}
                            <Route path="/forgot-password/:type" exact component={ForgotPassword} />
                            <Route path="/dashboard" exact component={dashboard} />
                            <Route path="/addPosts" exact component={createPosts} />
                            <Route path="/edit/:id" exact component={EditPosts} />
                            <Route path="/cart/" exact component={Cart} />
                            <Route path="/account/" exact component={Account} />
                            <Route path="/account/:tab" exact component={Accounts} />
                            <Route path="/checkout/" exact component={Checkout} />
                            <Route path="/faq/" exact component={Faq} />
                            <Route path="/wishlist/" exact component={Wishlist} />
                            <Route path="/404/" exact component={Error} />
                            <Route path="/cms-page/:name" exact component={CmsPage} />
                            <Route path="/policies" exact component={Policies} />

                            <Route path="/admin-login/" exact component={AdminLogin} />
                            <Route path="/admin/" exact component={AdminHome} />
                            {/* <Route path="/admin-add-template/" exact component={Addtemplate} /> */}
                            <Route path="/admin-view-template" exact component={Viewtemplate} />
                            <Route path="/admin-view-template/:fromdate/:todate" exact component={Viewtemplate} />
                            <Route path="/admin-new-template/:fromdate/:todate" exact component={Newtemplate} />
                            <Route path="/admin-new-template/" exact component={Newtemplate} />
                            <Route path="/admin-edit_template_:id" exact component={EditTemplate} />
                            <Route path="/admin-add-banner/" exact component={AddBanner} />
                            <Route path="/admin/edit-banner/:id" exact component={EditBanner} />
                            <Route path="/admin-view-banners/" exact component={ViewBanners} />
                            <Route path="/admin-view-collection-banners/" exact component={ViewCollectionBanners} />
                            <Route path="/admin-view-mid-section-banners/" exact component={ViewMidSectionBanners} />
                            <Route path="/admin-add-category/" exact component={AddCategory} />
                            <Route path="/admin-edit-category_:id" exact component={EditCategory} />
                            <Route path="/admin-view-categories/" exact component={ViewCategories} />
                            <Route path="/admin-view-orders/" exact component={ViewOrders} />
                            <Route path="/admin-view-user_orders/:id" exact component={ViewUserOrders} />
                            <Route path="/admin-view-orders/:fromdate/:todate" exact component={ViewOrders} />
                            <Route path="/admin-view-contributor-orders/:id" exact component={ViewContributorsOrders} />
                            <Route path="/admin-view-contributor-orders/:id/:fromdate/:todate" exact component={ViewContributorsOrders} />
                            <Route path="/admin-view_order_:id" exact component={ViewOrder} />
                            <Route path="/admin-view_invoice_:id" exact component={ViewInvoice} />
                            <Route path="/admin-view-users/" exact component={ViewUsers} />
                            <Route path="/admin-new-contributors/" exact component={NewContributors} />
                            <Route path="/admin-contributor_edit_:id/" exact component={EditContributors} />
                            <Route path="/admin-view-contributors/" exact component={ViewContributors} />
                            <Route path="/admin-view-contributor-templates/:id" exact component={ViewContributorTemplates} />
                            <Route path="/admin-view-delete_request" exact component={ViewDeleteRequest} />
                            
                            <Route path="/admin-view-user-search/" exact component={ViewUserSearches} />
                            <Route path="/admin-add-cms-page/" exact component={AddCMSPage} />
                            <Route path="/admin-edit_cms_page_:id/" exact component={EditCMSPages} />
                            <Route path="/admin-view-cms-pages/" exact component={ViewCMSPages} />
                            <Route path="/admin-view-about/" exact component={ViewAbout} />
                            <Route path="/admin-view-contact/" exact component={ViewContact} />
                            <Route path="/admin-edit-contact-details/:id" exact component={EditContact} />
                            <Route path="/admin-view-enquiries/" exact component={ViewEnquiries} />
                            <Route path="/admin-view-newsletter/" exact component={ViewNewsletter} />
                            <Route path="/admin-change-password/" exact component={ChangePassword} />
                            <Route path="/admin-profile/" exact component={AdminProfile} />

                            <Route path="/admin-add-file_extension/" exact component={AddFileExtension} />
                            <Route path="/admin-view-file_extension/" exact component={ViewFileExtension} />
                            <Route path="/admin-edit-file_extension_:id" exact component={EditFileExtension} />

                            <Route path="/admin-view-rates/" exact component={ViewRate} />
                            <Route path="/admin-edit-rate_:id" exact component={EditRate} />

                            <Route path="/admin-add-blog/" exact component={AddBlog} />
                            <Route path="/admin-view-blog/" exact component={ViewAdminBlog} />
                            <Route path="/admin-edit-blog_:id" exact component={EditBlog} />

                            <Route path="/admin-contributer_login/" exact component={ContributerLogin} />
                            <Route path="/admin-contributer_add_template/" exact component={ContributerAddTemplate} />
                            <Route path="/admin-contributer_view_template/" exact component={ContributerViewTemplate} />
                            <Route path="/admin-contributer_view_approve_template/" exact component={ContributerViewApproveTemplate} />
                            <Route path="/admin-contributer_edit_template_:id" exact component={ContributerEditTemplate} />

                            <Route path="/admin-contributer_view_orders" exact component={ContributerViewOrders} />
                            <Route path="/admin-contributer_view_paid_orders" exact component={ContributerViewPaidOrders} />
                            <Route path="/admin-contributer_view_order_:id" exact component={ContributerViewOrder} />

                            <Route path="/admin-contributer_purchase_report" exact component={PurchaseReport} />
                            <Route path="/admin-contributer_purchase_report/:fromdate/:todate" exact component={PurchaseReport} />
                            <Route path="/admin-template_purchase_report" exact component={templatepurchasereport} />
                            <Route path="/admin-template_purchase_report/:fromdate/:todate" exact component={templatepurchasereport} />

                            <Route path="/admin-contributer_change-password/" exact component={ContributerChangePassword} />
                            <Route path="/admin-contributer_profile/" exact component={ContributerProfile} />
                            <Route path="/admin-contributer_bank_account/" exact component={AccountDetails} />
                            <Route component={Error} />
                        </Switch>
                    </>
                </Router>
            </>
            );
        }
}

export default Routes;