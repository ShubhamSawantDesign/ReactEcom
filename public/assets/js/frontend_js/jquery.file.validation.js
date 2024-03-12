/**
 * Created By:- Shubham Sawant
 * Dated:- 3/09/2021
 * YCS Techsoft PVT LTD...
The Above code are primarly return for file size validation 
To prevent server from carshing and using number of files 
This function is written in new Jquery Version 3.5
*/







jQuery(function() {
    var _URL = window.URL || window.webkitURL;
    maxDocumentFileSize = 15 * 1024 * 1024;
    maxCovImageFileSize = 300000;
    maxImageFileSize = 250000;
    maxBannerSize = 400000;
    var file, img;


/** */
$("#image-banner-upload").on("change", function() {
     bannerfilesize = this.files[0].size;
     var file, img;

     if(bannerfilesize > maxBannerSize)
     {
         document.getElementById("error_banner_image").style.color = "red";
         $("#error_banner_image").text("Banner size should not exceed 300KB ");
         document.getElementById("add-banner").disabled = true;
     }
     else
     {
                    $("#error_banner_image").text("");
                    document.getElementById("add-banner").disabled = false;
    }

     
});


    /** Scope Function */
    /** ZIP File Validation */

    $("#zip-file-upload").on("change", function() {
        zipfilesize = this.files[0].size;
        if (zipfilesize > maxDocumentFileSize) {
            
            document.getElementById("button-add-asset").disabled = true;
            document.getElementById("error_zip_file").style.color = "red";
            $('#error_zip_file').text("File size Should not exceed 15 MB");
        } else {
            document.getElementById("button-add-asset").disabled = false;
            ;
        }
    });

    /**End of scope function */
    /*Scope of Function*/




    /*Cover Image Validation */
    /** THe Expceted size is less than 300KB */
    $("#cover-image").on("change", function() {
        covImagefilesize = this.files[0].size;
        var file, img;

        if (covImagefilesize > maxCovImageFileSize) {
            /**
             * 
             * When File Size Exceed the limit 
             */
            
            document.getElementById("button-add-asset").disabled = true;
            document.getElementById("cover-image-error-message").style.color = "red";
            $('#cover-image-error-message').text("File size Should not exceed 300 KB");

        } else {

            //**Perfect File Size now lets check is width and height */


            if ((file = this.files[0])) {
                img = new Image();
                img.onload = function() {

                    var hieght = this.height;
                    var width = this.width;

                    if (width == 500.000 && hieght == 500.000) {

                        
                        document.getElementById("button-add-asset").disabled = false;
                        $('#cover-image-error-message').text("");
                        

                    } else {


                        document.getElementById("button-add-asset").disabled = true;
                        document.getElementById("cover-image-error-message").style.color = "red";
                        $('#cover-image-error-message').text("Image size should be 500 X 500 px");


                    }



                };
                img.onerror = function() {
                    alert("not a valid file: " + file.type);
                };
                img.src = _URL.createObjectURL(file);

            }
        }



    });




    /** */
    /*SCOEP OF FUNCTION*/
    /*
       The Contributer registration part start here
    */
    $("#photo_id_image").on("change", function() {
        filesize = this.files[0].size;


        if (filesize > maxImageFileSize) {

            document.getElementById("submit-button").disabled = true;
            document.getElementById("file-error-message").style.color = "red";
            $('#file-error-message').text("File size Should not exceed 250 KB");

        } else {

            document.getElementById("submit-button").disabled = false;
            $('#file-error-message').text("");

        }
    });
    /*
     Scope of function ends here
    */

});


/*
If file of appropriate size is not founded then
1.The Message will be displayed
2.The Proceed Button is disabled 

File of approprite size should be present 


*/


/** Scope 
 * The scope of this javascript file
 * used in registration page where user register with government photo id
 * used in asset adding module validating file size
 * 
 * 
 */