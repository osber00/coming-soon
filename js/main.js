
jQuery.noConflict()(function($) {

	'use strict'; 
  
	 var isMobile = {
		Android: function() {
		  return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
		  return navigator.userAgent.match(/BlackBerry/i);
		},
		iPhone: function() {
		  return navigator.userAgent.match(/iPhone/i);
		},
		iPad: function() {
		  return navigator.userAgent.match(/iPad/i);
		},
		iPod: function() {
		  return navigator.userAgent.match(/iPod/i);
		},
		iOS: function() {
		  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
		  return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
		  return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
		  return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	  };
  
	  mt_page_loader();
      mt_image_background();
      //mt_video_background();
	  mt_contact_form();

/* ================================= */
/* :::::::: 1. Page Loader ::::::::: */
/* ================================= */

function mt_page_loader() {
    $(".loader-icon").delay(500).fadeOut();
    $(".page-loader").delay(700).fadeOut("slow");
	} 

	setTimeout(function() {
    $("header .mouse").delay(1500).css({display: 'none'}).fadeIn(1500);
    $("header .logo img").delay(1200).css({display: 'none'}).fadeIn(1200);
    $("header p").delay(1200).css({display: 'none'}).fadeIn(1200);
    $("header h1").delay(1200).css({display: 'none'}).fadeIn(1200);
    $("header .countdown").delay(1200).css({display: 'none'}).fadeIn(1200);
	});


/* ================================= */
/* ::::::::: 2. Backstretch :::::::: */
/* ================================= */

function mt_image_background() {

    /* Active Single Image Background  */  
      
    $(".image-box").backstretch("images/background2.jpg");
    
    // ==== SLIDESHOW BACKGROUND ====
    // Set URLs to background images inside the array
    // Each image must be on its own line, inbetween speech marks (" ") and with a comma at the end of the line
    // Add / remove images by changing the number of lines below
    // Variable fade = transition speed for fade animation, in milliseconds
    // Variable duration = time each slide is shown for, in milliseconds
              
    
     /* ↓ Remove comments if you want to use the slideshow  ↓  */ 
    
     /*$(".image-box").backstretch([
            "images/background1.jpg", 
            "images/background2.jpg", 
            "images/background3.jpg", 
            "images/background4.jpg"
        ],{duration: 3000, fade: 750}); */                              
} 

/* ================================= */
/* :::::: 3. Video Background :::::: */
/* ================================= */


function mt_video_background() {

    var myPlayer;

    var options = {
        // The path to the image used as background for the player if autoplay
        mobileFallbackImage: "images/youtube-poster.png",
        // Image used as fallback on mobile devices
        coverImage: "images/youtube-poster.png",
        playOnlyIfVisible  : false
    };

    myPlayer = jQuery("#video").YTPlayer(options);

}

/* ================================= */
/* :::::::::: 5. Countdown ::::::::: */
/* ================================= */

// To change date, simply edit: var endDate = "Dec 01, 2023 20:39:00";



/* ================================= */
/* :::::::: 6. Ajax mailchimp :::::: */
/* ================================= */



/* ================================= */
/* :::::::: 7. Contact form :::::::: */
/* ================================= */

function mt_contact_form() {

    $('#submit').on("click", function() {
        // validate and process form here 
        $("#ajax-contact-form").validate({

            rules: {

                name: {
                    required: true,
                },

                email: {
                    required: true,
                    email: true,
                },

                msg: {
                    required: true,
                },
            },

            messages: {

                name: {
                    required: "<i class='fa fa-exclamation-triangle name'></i>",
                },

                email: {
                    required: "<i class='fa fa-exclamation-triangle email'></i>",
                    email: "<i class='fa fa-exclamation-triangle email'></i>",
                },

                msg: {
                    required: "<i class='fa fa-exclamation-triangle message'></i>",
                },

            },

            // JQuery's awesome submit handler.
            submitHandler: function(form) {

                // Create variables from the form
                var name = $('input#name').val();
                var email = $('input#email').val();
                var msg = $('textarea#msg').val();

                // Create variables that will be sent in a URL string to contact.php
                var dataString = '&name=' + name + '&email=' + email + '&msg=' + msg;

                $.ajax({
                    type: "POST",
                    url: "php/contact.php",
                    data: dataString,
                    success: function(data) {
                        if (data === 'OK') {
                            var result = '<div class="notification_ok"><i class="fa fa-check"></i> Your email was sent. Thanks!</div>';
                            $("#ajax-contact-form").find('input[type=text], input[type=email], textarea').val("");
              
                          } else {
                            result = data;
                          }
                          $('#note').html(result).fadeIn();
                          setTimeout(function () {
                            $('#note').html(result).fadeOut();
                          }, 4000);
                    }

                });
                return false;
            }
        });
    });
}

});