import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer";
import axios from "axios";
import $ from 'jquery';
import 'jquery-validation';
import Swal from 'sweetalert2';
import { bind } from "file-loader";

class Login extends React.Component {
	state = {
        name: '',
        email : '',
        mobile : '',
        profession : '',
        username : '',
        nationality : '',
        photo_id_image :{name:''},
        photo_id_file : '',
        password: '',
        password_confirmation: '',
        countryCode: '',
    }


 onFileChangeHandler = (e) =>{
	
}

    handleInput = (e) => {

		
		$("#contributorRegForm").validate({

			rules:{
				name:{
					required:true,
				},
				email:{
					required:true,
					email: true,
				},
				mobile:{
					required:true,
					number: true,
					minlength:10,
					maxlength:10,
				},
				profession:{
					required:true,
				},
				username:{
					required:true,
					maxlength:20,
					minlength:4,
				},
				nationality:{
					required:true,
				},
				photo_id_image:{
					required:true,
					extension: "jpg|jpeg|png",
					fileSize: 0,
					
					//Working function...L
				},
				password:{
					required:true,
					minlength:6
				},
				confirm_password:{
					required:true,
					equalTo: "#password",
				}
			},
			messages:{
				name:{ 
					required:"Please enter name",
				},
				email:{ 
					required: "Please enter email. ",
					email: "Please enter valid email. ",
				},
				mobile:{
					required:"Please enter mobile number. ",
					number: 'only enter number',
					min:'Please enter 10 digit number',
					max:'Please enter 10 digit number',
				},
				username:{
					required:"Please enter username",
					minlength:"Please enter minimum 4 characters",
					maxlength:"Please enter maximum 20 characters",
				},
				nationality:{
					required:"Please enter nationality",
				},
				profession:{
					required:"Please enter profession",
				},
				photo_id_image:{
					required:'Please upload file',
					photo_id_image: 'Please Maintain file size and file format',
				},
				password:{
					required:"Please enter password",
					minlength: "Your password must be atleast 6 characters long"
				},
				confirm_password:{
					required:"Please confirm password",
					equalTo: "Please enter the same password"
				}
			}
		});
        this.setState({[e.target.name]: e.target.value});
    }

	handleEmailInput = async (e) => {
		this.setState({[e.target.name]: e.target.value});
		const res = await axios.post("api/vendor_auth/email-chk", this.state);
		if(res.data.status === 401){
        	Swal.fire({
        		title:res.data.message,
        		// text: res.data.message,
        		icon: "error",
        	});
        }
        
    }

	handleUsernameInput = async (e) => {
		this.setState({[e.target.name]: e.target.value});
		const res = await axios.post("api/vendor_auth/username-chk", this.state);
		if(res.data.status === 401){
        	Swal.fire({
        		title: res.data.message,
        		// text: res.data.message,
        		icon: "error",
        	});
        }
        
    }

    addUser = async (e) => {
		e.preventDefault();
		console.log('test',this.state.photo_id_image);
		this.setState({ isLoading: true });
        // console.log('image1',this.state.image);
        const formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('mobile', this.state.mobile);
        formData.append('name', this.state.name);
        formData.append('nationality', this.state.nationality);
        formData.append('country_code', this.state.countryCode);
        formData.append('password', this.state.password);
        formData.append('password_confirmation', this.state.password_confirmation);
        formData.append('photo_id_file', this.state.photo_id_file);
        formData.append('photo_id_image', this.state.photo_id_image);
        formData.append('profession', this.state.profession);
        formData.append('username', this.state.username);

		this.setState({ LoginisLoading: true });
        const res = await axios.post("api/vendor_auth/register", formData);
		if(res.data.status == 200){
			Swal.fire({
				title:  res.data.message,
				showDenyButton: false,
				showCancelButton: false,
				confirmButtonText: `Ok`,
				icon: "success",
				// denyButtonText: ``,
			  }).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					this.setState({ isLoading: false });
					// this.props.history.push("/admin-contributer_login");
					window.location.href="/admin-contributer_login";
				} else if (result.isDenied) {
				  Swal.fire('Changes are not saved', '', 'info')
				}
			  })		
		}else{
		Swal.fire({
			title: "Failed!",
			text: res.data.message,
			type: "error",
		});
        }
        

}

    render(){
        if(localStorage.getItem('items')){
            this.props.history.push("../");
        }
        return(
            <div>
                <Navbar />



                <main className="main">
			        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
			            <div className="container-fluid">
			                <ol className="breadcrumb">
			                    <li className="breadcrumb-item"><a href="index.php"><i className="fa fa-home"></i> Home</a></li>
			                    <li className="breadcrumb-item active" aria-current="page">Contributor Register</li>
			                </ol>
			            </div>
			        </nav>

					<div className="login-page bg-image pt-8 pb-8 pt-md-2 pb-md-2 pt-lg-17 pb-lg-17" style={{background: "#fff"}}>
			        	<div className="container-fluid">
			                <div className="row d-flex justify-content-center">
			                    <div className="col-md-6">
			                        <div className="form-box">
			                            <div className="form-tab">
			                                <ul className="nav nav-pills nav-fill">
			                                    <li className="nav-item">
			                                        <p>Become Contributor to Artaux</p>
			                                        <a className="nav-link active" href="#register-2">Sign up to Artaux</a>
			                                    </li>
			                                </ul>

			                                <div className="tab-content">
			                                    <div className="tab-pane fade show active" id="register-2" role="tabpanel" aria-labelledby="register-tab-2">
			                                        <form onSubmit={this.addUser} method="post" id="contributorRegForm" encType="multipart/form-data">
			                                            <div className="form-group">
			                                                <label htmlFor="name" className="field-required">Name</label>
			                                                <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInput} placeholder="Please enter name" required />
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="email" className="field-required">Email</label>
			                                                <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInput} onBlur={this.handleEmailInput} placeholder="Please enter email" required />
			                                            </div>

														<div className="form-group">
			                                                <label htmlFor="username" className="field-required">Username</label>
			                                                <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleInput} onBlur={this.handleUsernameInput} placeholder="Please enter username" />
			                                            </div>

														<div className="form-group">
			                                                <label htmlFor="nationality" className="field-required">Nationality</label>
															<select class="form-control" id="nationality" name="nationality" required 
																	onChange={(e) => {
																		// console.log('test',this.state.currency);
																		this.setState({ nationality:e.target.value });
																	
																	}}>
																<option value="">Select nationality</option>
																{/* <option value="Indian">India</option> */}
																<option value="Afganistan">Afghanistan</option>
																<option value="Albania">Albania</option>
																<option value="Algeria">Algeria</option>
																<option value="American Samoa">American Samoa</option>
																<option value="Andorra">Andorra</option>
																<option value="Angola">Angola</option>
																<option value="Anguilla">Anguilla</option>
																<option value="Antigua & Barbuda">Antigua & Barbuda</option>
																<option value="Argentina">Argentina</option>
																<option value="Armenia">Armenia</option>
																<option value="Aruba">Aruba</option>
																<option value="Australia">Australia</option>
																<option value="Austria">Austria</option>
																<option value="Azerbaijan">Azerbaijan</option>
																<option value="Bahamas">Bahamas</option>
																<option value="Bahrain">Bahrain</option>
																<option value="Bangladesh">Bangladesh</option>
																<option value="Barbados">Barbados</option>
																<option value="Belarus">Belarus</option>
																<option value="Belgium">Belgium</option>
																<option value="Belize">Belize</option>
																<option value="Benin">Benin</option>
																<option value="Bermuda">Bermuda</option>
																<option value="Bhutan">Bhutan</option>
																<option value="Bolivia">Bolivia</option>
																<option value="Bonaire">Bonaire</option>
																<option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
																<option value="Botswana">Botswana</option>
																<option value="Brazil">Brazil</option>
																<option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
																<option value="Brunei">Brunei</option>
																<option value="Bulgaria">Bulgaria</option>
																<option value="Burkina Faso">Burkina Faso</option>
																<option value="Burundi">Burundi</option>
																<option value="Cambodia">Cambodia</option>
																<option value="Cameroon">Cameroon</option>
																<option value="Canada">Canada</option>
																<option value="Canary Islands">Canary Islands</option>
																<option value="Cape Verde">Cape Verde</option>
																<option value="Cayman Islands">Cayman Islands</option>
																<option value="Central African Republic">Central African Republic</option>
																<option value="Chad">Chad</option>
																<option value="Channel Islands">Channel Islands</option>
																<option value="Chile">Chile</option>
																<option value="China">China</option>
																<option value="Christmas Island">Christmas Island</option>
																<option value="Cocos Island">Cocos Island</option>
																<option value="Colombia">Colombia</option>
																<option value="Comoros">Comoros</option>
																<option value="Congo">Congo</option>
																<option value="Cook Islands">Cook Islands</option>
																<option value="Costa Rica">Costa Rica</option>
																<option value="Cote DIvoire">Cote DIvoire</option>
																<option value="Croatia">Croatia</option>
																<option value="Cuba">Cuba</option>
																<option value="Curaco">Curacao</option>
																<option value="Cyprus">Cyprus</option>
																<option value="Czech Republic">Czech Republic</option>
																<option value="Denmark">Denmark</option>
																<option value="Djibouti">Djibouti</option>
																<option value="Dominica">Dominica</option>
																<option value="Dominican Republic">Dominican Republic</option>
																<option value="East Timor">East Timor</option>
																<option value="Ecuador">Ecuador</option>
																<option value="Egypt">Egypt</option>
																<option value="El Salvador">El Salvador</option>
																<option value="Equatorial Guinea">Equatorial Guinea</option>
																<option value="Eritrea">Eritrea</option>
																<option value="Estonia">Estonia</option>
																<option value="Ethiopia">Ethiopia</option>
																<option value="Falkland Islands">Falkland Islands</option>
																<option value="Faroe Islands">Faroe Islands</option>
																<option value="Fiji">Fiji</option>
																<option value="Finland">Finland</option>
																<option value="France">France</option>
																<option value="French Guiana">French Guiana</option>
																<option value="French Polynesia">French Polynesia</option>
																<option value="French Southern Ter">French Southern Ter</option>
																<option value="Gabon">Gabon</option>
																<option value="Gambia">Gambia</option>
																<option value="Georgia">Georgia</option>
																<option value="Germany">Germany</option>
																<option value="Ghana">Ghana</option>
																<option value="Gibraltar">Gibraltar</option>
																<option value="Great Britain">Great Britain</option>
																<option value="Greece">Greece</option>
																<option value="Greenland">Greenland</option>
																<option value="Grenada">Grenada</option>
																<option value="Guadeloupe">Guadeloupe</option>
																<option value="Guam">Guam</option>
																<option value="Guatemala">Guatemala</option>
																<option value="Guinea">Guinea</option>
																<option value="Guyana">Guyana</option>
																<option value="Haiti">Haiti</option>
																<option value="Hawaii">Hawaii</option>
																<option value="Honduras">Honduras</option>
																<option value="Hong Kong">Hong Kong</option>
																<option value="Hungary">Hungary</option>
																<option value="Iceland">Iceland</option>
																<option value="Indonesia">Indonesia</option>
																<option value="Indian">India</option>
																<option value="Iran">Iran</option>
																<option value="Iraq">Iraq</option>
																<option value="Ireland">Ireland</option>
																<option value="Isle of Man">Isle of Man</option>
																<option value="Israel">Israel</option>
																<option value="Italy">Italy</option>
																<option value="Jamaica">Jamaica</option>
																<option value="Japan">Japan</option>
																<option value="Jordan">Jordan</option>
																<option value="Kazakhstan">Kazakhstan</option>
																<option value="Kenya">Kenya</option>
																<option value="Kiribati">Kiribati</option>
																<option value="Korea North">Korea North</option>
																<option value="Korea Sout">Korea South</option>
																<option value="Kuwait">Kuwait</option>
																<option value="Kyrgyzstan">Kyrgyzstan</option>
																<option value="Laos">Laos</option>
																<option value="Latvia">Latvia</option>
																<option value="Lebanon">Lebanon</option>
																<option value="Lesotho">Lesotho</option>
																<option value="Liberia">Liberia</option>
																<option value="Libya">Libya</option>
																<option value="Liechtenstein">Liechtenstein</option>
																<option value="Lithuania">Lithuania</option>
																<option value="Luxembourg">Luxembourg</option>
																<option value="Macau">Macau</option>
																<option value="Macedonia">Macedonia</option>
																<option value="Madagascar">Madagascar</option>
																<option value="Malaysia">Malaysia</option>
																<option value="Malawi">Malawi</option>
																<option value="Maldives">Maldives</option>
																<option value="Mali">Mali</option>
																<option value="Malta">Malta</option>
																<option value="Marshall Islands">Marshall Islands</option>
																<option value="Martinique">Martinique</option>
																<option value="Mauritania">Mauritania</option>
																<option value="Mauritius">Mauritius</option>
																<option value="Mayotte">Mayotte</option>
																<option value="Mexico">Mexico</option>
																<option value="Midway Islands">Midway Islands</option>
																<option value="Moldova">Moldova</option>
																<option value="Monaco">Monaco</option>
																<option value="Mongolia">Mongolia</option>
																<option value="Montserrat">Montserrat</option>
																<option value="Morocco">Morocco</option>
																<option value="Mozambique">Mozambique</option>
																<option value="Myanmar">Myanmar</option>
																<option value="Nambia">Nambia</option>
																<option value="Nauru">Nauru</option>
																<option value="Nepal">Nepal</option>
																<option value="Netherland Antilles">Netherland Antilles</option>
																<option value="Netherlands">Netherlands (Holland, Europe)</option>
																<option value="Nevis">Nevis</option>
																<option value="New Caledonia">New Caledonia</option>
																<option value="New Zealand">New Zealand</option>
																<option value="Nicaragua">Nicaragua</option>
																<option value="Niger">Niger</option>
																<option value="Nigeria">Nigeria</option>
																<option value="Niue">Niue</option>
																<option value="Norfolk Island">Norfolk Island</option>
																<option value="Norway">Norway</option>
																<option value="Oman">Oman</option>
																<option value="Pakistan">Pakistan</option>
																<option value="Palau Island">Palau Island</option>
																<option value="Palestine">Palestine</option>
																<option value="Panama">Panama</option>
																<option value="Papua New Guinea">Papua New Guinea</option>
																<option value="Paraguay">Paraguay</option>
																<option value="Peru">Peru</option>
																<option value="Phillipines">Philippines</option>
																<option value="Pitcairn Island">Pitcairn Island</option>
																<option value="Poland">Poland</option>
																<option value="Portugal">Portugal</option>
																<option value="Puerto Rico">Puerto Rico</option>
																<option value="Qatar">Qatar</option>
																<option value="Republic of Montenegro">Republic of Montenegro</option>
																<option value="Republic of Serbia">Republic of Serbia</option>
																<option value="Reunion">Reunion</option>
																<option value="Romania">Romania</option>
																<option value="Russia">Russia</option>
																<option value="Rwanda">Rwanda</option>
																<option value="St Barthelemy">St Barthelemy</option>
																<option value="St Eustatius">St Eustatius</option>
																<option value="St Helena">St Helena</option>
																<option value="St Kitts-Nevis">St Kitts-Nevis</option>
																<option value="St Lucia">St Lucia</option>
																<option value="St Maarten">St Maarten</option>
																<option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
																<option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
																<option value="Saipan">Saipan</option>
																<option value="Samoa">Samoa</option>
																<option value="Samoa American">Samoa American</option>
																<option value="San Marino">San Marino</option>
																<option value="Sao Tome & Principe">Sao Tome & Principe</option>
																<option value="Saudi Arabia">Saudi Arabia</option>
																<option value="Senegal">Senegal</option>
																<option value="Seychelles">Seychelles</option>
																<option value="Sierra Leone">Sierra Leone</option>
																<option value="Singapore">Singapore</option>
																<option value="Slovakia">Slovakia</option>
																<option value="Slovenia">Slovenia</option>
																<option value="Solomon Islands">Solomon Islands</option>
																<option value="Somalia">Somalia</option>
																<option value="South Africa">South Africa</option>
																<option value="Spain">Spain</option>
																<option value="Sri Lanka">Sri Lanka</option>
																<option value="Sudan">Sudan</option>
																<option value="Suriname">Suriname</option>
																<option value="Swaziland">Swaziland</option>
																<option value="Sweden">Sweden</option>
																<option value="Switzerland">Switzerland</option>
																<option value="Syria">Syria</option>
																<option value="Tahiti">Tahiti</option>
																<option value="Taiwan">Taiwan</option>
																<option value="Tajikistan">Tajikistan</option>
																<option value="Tanzania">Tanzania</option>
																<option value="Thailand">Thailand</option>
																<option value="Togo">Togo</option>
																<option value="Tokelau">Tokelau</option>
																<option value="Tonga">Tonga</option>
																<option value="Trinidad & Tobago">Trinidad & Tobago</option>
																<option value="Tunisia">Tunisia</option>
																<option value="Turkey">Turkey</option>
																<option value="Turkmenistan">Turkmenistan</option>
																<option value="Turks & Caicos Is">Turks & Caicos Is</option>
																<option value="Tuvalu">Tuvalu</option>
																<option value="Uganda">Uganda</option>
																<option value="United Kingdom">United Kingdom</option>
																<option value="Ukraine">Ukraine</option>
																<option value="United Arab Erimates">United Arab Emirates</option>
																<option value="United States of America">United States of America</option>
																<option value="Uraguay">Uruguay</option>
																<option value="Uzbekistan">Uzbekistan</option>
																<option value="Vanuatu">Vanuatu</option>
																<option value="Vatican City State">Vatican City State</option>
																<option value="Venezuela">Venezuela</option>
																<option value="Vietnam">Vietnam</option>
																<option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
																<option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
																<option value="Wake Island">Wake Island</option>
																<option value="Wallis & Futana Is">Wallis & Futana Is</option>
																<option value="Yemen">Yemen</option>
																<option value="Zaire">Zaire</option>
																<option value="Zambia">Zambia</option>
																<option value="Zimbabwe">Zimbabwe</option>
															</select>
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="email" className="field-required">Mobile</label>
															<div className="row">
																<select class="form-control col-md-3" name="countryCode" id="" onChange={(e) => {
																		// console.log('test',this.state.currency);
																		this.setState({ countryCode:e.target.value });
																	
																	}}>
																	{/* <option value="44" Selected>India (+91)</option> */}
																	<optgroup label="Select country">
																		<option value="213">Algeria (+213)</option>
																		<option value="376">Andorra (+376)</option>
																		<option value="244">Angola (+244)</option>
																		<option value="1264">Anguilla (+1264)</option>
																		<option value="1268">Antigua &amp; Barbuda (+1268)</option>
																		<option value="54">Argentina (+54)</option>
																		<option value="374">Armenia (+374)</option>
																		<option value="297">Aruba (+297)</option>
																		<option value="61">Australia (+61)</option>
																		<option value="43">Austria (+43)</option>
																		<option value="994">Azerbaijan (+994)</option>
																		<option value="1242">Bahamas (+1242)</option>
																		<option value="973">Bahrain (+973)</option>
																		<option value="880">Bangladesh (+880)</option>
																		<option value="1246">Barbados (+1246)</option>
																		<option value="375">Belarus (+375)</option>
																		<option value="32">Belgium (+32)</option>
																		<option value="501">Belize (+501)</option>
																		<option value="229">Benin (+229)</option>
																		<option value="1441">Bermuda (+1441)</option>
																		<option value="975">Bhutan (+975)</option>
																		<option value="591">Bolivia (+591)</option>
																		<option value="387">Bosnia Herzegovina (+387)</option>
																		<option value="267">Botswana (+267)</option>
																		<option value="55">Brazil (+55)</option>
																		<option value="673">Brunei (+673)</option>
																		<option value="359">Bulgaria (+359)</option>
																		<option value="226">Burkina Faso (+226)</option>
																		<option value="257">Burundi (+257)</option>
																		<option value="855">Cambodia (+855)</option>
																		<option value="237">Cameroon (+237)</option>
																		<option value="1">Canada (+1)</option>
																		<option value="238">Cape Verde Islands (+238)</option>
																		<option value="1345">Cayman Islands (+1345)</option>
																		<option value="236">Central African Republic (+236)</option>
																		<option value="56">Chile (+56)</option>
																		<option value="86">China (+86)</option>
																		<option value="57">Colombia (+57)</option>
																		<option value="269">Comoros (+269)</option>
																		<option value="242">Congo (+242)</option>
																		<option value="682">Cook Islands (+682)</option>
																		<option value="506">Costa Rica (+506)</option>
																		<option value="385">Croatia (+385)</option>
																		<option value="53">Cuba (+53)</option>
																		<option value="90392">Cyprus North (+90392)</option>
																		<option value="357">Cyprus South (+357)</option>
																		<option value="42">Czech Republic (+42)</option>
																		<option value="45">Denmark (+45)</option>
																		<option value="253">Djibouti (+253)</option>
																		<option value="1809">Dominica (+1809)</option>
																		<option value="1809">Dominican Republic (+1809)</option>
																		<option value="593">Ecuador (+593)</option>
																		<option value="20">Egypt (+20)</option>
																		<option value="503">El Salvador (+503)</option>
																		<option value="240">Equatorial Guinea (+240)</option>
																		<option value="291">Eritrea (+291)</option>
																		<option value="372">Estonia (+372)</option>
																		<option value="251">Ethiopia (+251)</option>
																		<option value="500">Falkland Islands (+500)</option>
																		<option value="298">Faroe Islands (+298)</option>
																		<option value="679">Fiji (+679)</option>
																		<option value="358">Finland (+358)</option>
																		<option value="33">France (+33)</option>
																		<option value="594">French Guiana (+594)</option>
																		<option value="689">French Polynesia (+689)</option>
																		<option value="241">Gabon (+241)</option>
																		<option value="220">Gambia (+220)</option>
																		<option value="7880">Georgia (+7880)</option>
																		<option value="49">Germany (+49)</option>
																		<option value="233">Ghana (+233)</option>
																		<option value="350">Gibraltar (+350)</option>
																		<option value="30">Greece (+30)</option>
																		<option value="299">Greenland (+299)</option>
																		<option value="1473">Grenada (+1473)</option>
																		<option value="590">Guadeloupe (+590)</option>
																		<option value="671">Guam (+671)</option>
																		<option value="502">Guatemala (+502)</option>
																		<option value="224">Guinea (+224)</option>
																		<option value="245">Guinea - Bissau (+245)</option>
																		<option value="592">Guyana (+592)</option>
																		<option value="509">Haiti (+509)</option>
																		<option value="504">Honduras (+504)</option>
																		<option value="852">Hong Kong (+852)</option>
																		<option value="36">Hungary (+36)</option>
																		<option value="354">Iceland (+354)</option>
																		<option value="91">India (+91)</option>
																		<option value="62">Indonesia (+62)</option>
																		<option value="98">Iran (+98)</option>
																		<option value="964">Iraq (+964)</option>
																		<option value="353">Ireland (+353)</option>
																		<option value="972">Israel (+972)</option>
																		<option value="39">Italy (+39)</option>
																		<option value="1876">Jamaica (+1876)</option>
																		<option value="81">Japan (+81)</option>
																		<option value="962">Jordan (+962)</option>
																		<option value="7">Kazakhstan (+7)</option>
																		<option value="254">Kenya (+254)</option>
																		<option value="686">Kiribati (+686)</option>
																		<option value="850">Korea North (+850)</option>
																		<option value="82">Korea South (+82)</option>
																		<option value="965">Kuwait (+965)</option>
																		<option value="996">Kyrgyzstan (+996)</option>
																		<option value="856">Laos (+856)</option>
																		<option value="371">Latvia (+371)</option>
																		<option value="961">Lebanon (+961)</option>
																		<option value="266">Lesotho (+266)</option>
																		<option value="231">Liberia (+231)</option>
																		<option value="218">Libya (+218)</option>
																		<option value="417">Liechtenstein (+417)</option>
																		<option value="370">Lithuania (+370)</option>
																		<option value="352">Luxembourg (+352)</option>
																		<option value="853">Macao (+853)</option>
																		<option value="389">Macedonia (+389)</option>
																		<option value="261">Madagascar (+261)</option>
																		<option value="265">Malawi (+265)</option>
																		<option value="60">Malaysia (+60)</option>
																		<option value="960">Maldives (+960)</option>
																		<option value="223">Mali (+223)</option>
																		<option value="356">Malta (+356)</option>
																		<option value="692">Marshall Islands (+692)</option>
																		<option value="596">Martinique (+596)</option>
																		<option value="222">Mauritania (+222)</option>
																		<option value="269">Mayotte (+269)</option>
																		<option value="52">Mexico (+52)</option>
																		<option value="691">Micronesia (+691)</option>
																		<option value="373">Moldova (+373)</option>
																		<option value="377">Monaco (+377)</option>
																		<option value="976">Mongolia (+976)</option>
																		<option value="1664">Montserrat (+1664)</option>
																		<option value="212">Morocco (+212)</option>
																		<option value="258">Mozambique (+258)</option>
																		<option value="95">Myanmar (+95)</option>
																		<option value="264">Namibia (+264)</option>
																		<option value="674">Nauru (+674)</option>
																		<option value="977">Nepal (+977)</option>
																		<option value="31">Netherlands (+31)</option>
																		<option value="687">New Caledonia (+687)</option>
																		<option value="64">New Zealand (+64)</option>
																		<option value="505">Nicaragua (+505)</option>
																		<option value="227">Niger (+227)</option>
																		<option value="234">Nigeria (+234)</option>
																		<option value="683">Niue (+683)</option>
																		<option value="672">Norfolk Islands (+672)</option>
																		<option value="670">Northern Marianas (+670)</option>
																		<option value="47">Norway (+47)</option>
																		<option value="968">Oman (+968)</option>
																		<option value="680">Palau (+680)</option>
																		<option value="507">Panama (+507)</option>
																		<option value="675">Papua New Guinea (+675)</option>
																		<option value="595">Paraguay (+595)</option>
																		<option value="51">Peru (+51)</option>
																		<option value="63">Philippines (+63)</option>
																		<option value="48">Poland (+48)</option>
																		<option value="351">Portugal (+351)</option>
																		<option value="1787">Puerto Rico (+1787)</option>
																		<option value="974">Qatar (+974)</option>
																		<option value="262">Reunion (+262)</option>
																		<option value="40">Romania (+40)</option>
																		<option value="7">Russia (+7)</option>
																		<option value="250">Rwanda (+250)</option>
																		<option value="378">San Marino (+378)</option>
																		<option value="239">Sao Tome &amp; Principe (+239)</option>
																		<option value="966">Saudi Arabia (+966)</option>
																		<option value="221">Senegal (+221)</option>
																		<option value="381">Serbia (+381)</option>
																		<option value="248">Seychelles (+248)</option>
																		<option value="232">Sierra Leone (+232)</option>
																		<option value="65">Singapore (+65)</option>
																		<option value="421">Slovak Republic (+421)</option>
																		<option value="386">Slovenia (+386)</option>
																		<option value="677">Solomon Islands (+677)</option>
																		<option value="252">Somalia (+252)</option>
																		<option value="27">South Africa (+27)</option>
																		<option value="34">Spain (+34)</option>
																		<option value="94">Sri Lanka (+94)</option>
																		<option value="290">St. Helena (+290)</option>
																		<option value="1869">St. Kitts (+1869)</option>
																		<option value="1758">St. Lucia (+1758)</option>
																		<option value="249">Sudan (+249)</option>
																		<option value="597">Suriname (+597)</option>
																		<option value="268">Swaziland (+268)</option>
																		<option value="46">Sweden (+46)</option>
																		<option value="41">Switzerland (+41)</option>
																		<option value="963">Syria (+963)</option>
																		<option value="886">Taiwan (+886)</option>
																		<option value="7">Tajikstan (+7)</option>
																		<option value="66">Thailand (+66)</option>
																		<option value="228">Togo (+228)</option>
																		<option value="676">Tonga (+676)</option>
																		<option value="1868">Trinidad &amp; Tobago (+1868)</option>
																		<option value="216">Tunisia (+216)</option>
																		<option value="90">Turkey (+90)</option>
																		<option value="7">Turkmenistan (+7)</option>
																		<option value="993">Turkmenistan (+993)</option>
																		<option value="1649">Turks &amp; Caicos Islands (+1649)</option>
																		<option value="688">Tuvalu (+688)</option>
																		<option value="256">Uganda (+256)</option>
																		
																		<option value="380">Ukraine (+380)</option>
																		<option value="971">United Arab Emirates (+971)</option>
																		<option value="598">Uruguay (+598)</option>
																		
																		<option value="7">Uzbekistan (+7)</option>
																		<option value="678">Vanuatu (+678)</option>
																		<option value="379">Vatican City (+379)</option>
																		<option value="58">Venezuela (+58)</option>
																		<option value="84">Vietnam (+84)</option>
																		<option value="84">Virgin Islands - British (+1284)</option>
																		<option value="84">Virgin Islands - US (+1340)</option>
																		<option value="681">Wallis &amp; Futuna (+681)</option>
																		<option value="969">Yemen (North)(+969)</option>
																		<option value="967">Yemen (South)(+967)</option>
																		<option value="260">Zambia (+260)</option>
																		<option value="263">Zimbabwe (+263)</option>
																	</optgroup>
																</select>
																<input type="text" className="form-control col-md-9" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleInput} placeholder="Please enter mobile" required />
															</div>
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="profession" className="field-required">Profession</label>
			                                                <input type="text" className="form-control" id="profession" name="profession" value={this.state.profession} onChange={this.handleInput} placeholder="Please enter your profession" required />
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="profession" className="field-required">Goverment Photo Id Image</label>
			                                                <input type="file" className="form-control" id="photo_id_image" name="photo_id_image" onChange={(e) => {
                                                                // console.log('image',e.target.files[0])
																this.setState({ photo_id_image:e.target.files[0] });
                                                            }} placeholder="Please enter your profession" accept=".jpg,.png,.jpeg" />
															<p id="file-error-message" ></p>
			                                            </div>

														{/* <label>Or</label> */}

			                                            {/* <div className="form-group">
			                                                <label htmlFor="profession" className="field-required">Goverment Photo Id File</label>
			                                                <input type="file" className="form-control" id="photo_id_file" name="photo_id_file" onChange={(e) => {
                                                                this.setState({ photo_id_file:e.target.files[0] });
                                                            }} accept="application/pdf" placeholder="Please enter your profession" />
			                                            </div> */}

			                                            <div className="form-group">
			                                                <label htmlFor="password" className="field-required">Password</label>
			                                                <input type="password" className="form-control" name="password" id="password" value={this.state.password} onChange={this.handleInput} placeholder="Please enter password" required />
			                                            </div>

			                                            <div className="form-group">
			                                                <label htmlFor="confirm-password" className="field-required">Confirm Password</label>
			                                                <input type="password" equalto="#password" className="form-control" id="password_confirmation" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleInput} placeholder="Please confirm password" required />
			                                            </div>

			                                            <div className="form-footer row d-flex justify-content-center">
			                                                <button type="submit" id="submit-button" className="btn btn-outline-primary-2 btn-block">
			                                                    <span><i className="fa fa-pencil"></i> SIGN UP {this.state.isLoading && <img src="assets/images/frontend_images/ajax-loader.gif" alt="loading...." style={{height:'15px',float: 'left'}}/> }</span>
			                                              
			                                                </button>
			                                            </div>
			                                        </form>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>

			                    <div className="col-md-6">
			                        <img src="assets/images/frontend_images/user-reg.jpg" />
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

export default Login;
