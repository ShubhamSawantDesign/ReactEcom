$(document).ready(function () {
    'use strict';

//	var owl = $('.owl-carousel');
	//console.log(owl);
	$('.owl-carousel').owlCarousel( {
		onInitialized: $('body').addClass('loaded')
	});

});

// function callback(event) {
// 	console.log("loaded");
// 	$("body").addClass("loaded");
// }

$("#show-pass").click(function() {
	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $($(this).attr("toggle"));
	if(input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

$("#showPass").click(function() {
	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $($(this).attr("pass"));
	if(input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

$("#showConfirmPass").click(function() {
	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $($(this).attr("toggle"));
	if(input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});
$(document).ready(function(){
	$("#loginForm").validate({
		rules:{
			email:{
				required:true,
				email: true,
			},
			password:{
				required:true,
			},
		},
		messages:{
			email:{ 
				required: "Please enter email. ",
				email: "Please enter valid email. ",
			},
			password:{ 
				required:"Please enter password. ",	
			},
		}
	});

	$("#registerForm").validate({
		rules:{
			name:{
				required:true,
			},
			email:{
				required:true,
				email: true,
			},
			password:{
				required:true,
				minlength:6
			},
			confirm_password:{
				required:true,
				equalTo: "#password"
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
				maxlength: 10,
				minlength: 10,
			},
			profession:{
				required:true,
			},
			password:{
				required:true,
				minlength:6
			},
			confirm_password:{
				required:true,
				equalTo: "#password"
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
				required: "Please enter mobile number. ",
			},
			profession:{
				required:"Please enter password",
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
});