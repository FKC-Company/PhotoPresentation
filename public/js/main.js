'use strict';

import SetClass from './setClass.js';

// var SetClass = require("./setClass");

var set = new SetClass();

var windowHeight =  window.outerHeight;
var windowWidth =  window.outerWidth;
var navbar = $(".navbar").height() + 15;

$(window).on("load", function()  {

	$("#proPicImg").attr("src", profilePicPath);

	$("#topRow").height(parseInt(windowHeight * 31 / 100));
	$("#bottomRow").height(parseInt(windowHeight * 59 / 100) - navbar);
});

$(".switchBtn input").on("click", function()  {
	if(!$(this).prop("checked")) {
		$("body").removeClass("lightMode")
		.addClass("darkMode");
	}
	else  {
		$("body").removeClass("darkMode")
		.addClass("lightMode");
	}	
});

$("#changeTheme").on("change", function()  {
	var mode = $(this).val();
	$("body").removeClass();

	switch (mode) {
		case "dark":
			$("body").addClass("darkMode");
			break;
		case "light":
			$("body").addClass("lightMode");
			break;
		case "yellow":
			$("body").addClass("yellowMode");
			break;
		default:
			$("body").addClass("darkMode");
			break;
	}
});


