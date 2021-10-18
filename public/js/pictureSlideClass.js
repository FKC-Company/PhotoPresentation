'use strict';
var mySwiper;

export default class PictureSlideClass  {
	constructor(data)  {
		this.mainPicPath = data.mainPicPath;
		this.filesObjects = data.filesObjects;
		
		this.setDisplay();
		this.eventHandle();
	}

	setDisplay()  {
		$("#slideBox").html("");
		this.filesObjects.map(function(item, i)  {
			if(item.fileType === "picture")  {
				$("#slideBox").append(
					'<div class="swiper-slide" type="picture">'+
						'<div class="contentBody" style="width:100%">'+
							'<img src="'+ item.thumbnailPath +'" data-src="'+ item.path +'" realContentType="picture" alt="" />'+
						'</div>'+
					'</div>'
				);
			}
			else {
				$("#slideBox").append(	
					'<div class="swiper-slide" type="video">'+
						'<div class="contentBody" style="position:relative;">'+
							'<img src="'+ item.thumbnailPath +'" data-src="'+ item.path +'" realContentType="video" alt="" />'+
							'<div id="videoPlayBtn">'+
								'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">'+
									'<path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>'+
								'</svg>'+
							'<div>'+
						'</div>'+
					'</div>'
				);
			}
		});

		$(".pictureTop img").attr("src", "data/"+this.mainPicPath);

		if(mySwiper != null)  {
			mySwiper.destroy();
		}

		mySwiper = new Swiper(".swiper-container", {
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: "auto",
			coverflowEffect: {
				rotate: 20,
				stretch: 0,
				depth: 350,
				modifier: 1,
				slideShadows: true
			},
			pagination: {
				el: ".swiper-pagination"
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			autoplay: {
				delay: 2000,
			},
			waitForTransition:false
		});
	}

	eventHandle()  {
		const fullImgPopup = document.querySelector(".modal1");
		const previews = document.querySelectorAll(".contentBody img");
		const fullImg = document.querySelector(".full-img");
		const fullVideo = document.querySelector(".full-video");
		const imgText = document.querySelector(".caption");
		const images = document.querySelectorAll("img");
		const imageOption = {};

		let obsevrer = new IntersectionObserver((entries, obsevrer) => {
			entries.forEach(entry => {
				if(!entry.isIntersecting) return;
				const image = entry.target;
				const newURL = image.getAttribute("data-src");
				image.src = newURL;
				obsevrer.unobserve(image);
			});
		},imageOption);

		var list = [];
		images.forEach((image,i) => {
			if(!image.hasAttribute("data-src")) return;
			if(image.getAttribute("realContentType") === "video") return;

			// let aaurl = image.getAttribute("data-src");

			// 	var img = new Image();
			// 	img.onload = img.onerror = img.onabort = function() {
			// 		 var index = list.indexOf(this);
			// 		 if (index !== -1) {
			// 			  // remove image from the array once it's loaded
			// 			  // for memory consumption reasons
			// 			  list.splice(index, 1);
			// 		 }
			// 	}
			// 	list.push(img);
			// 	img.src = aaurl;

			// 	console.log(img)

			obsevrer.observe(image);
		}); 

		previews.forEach(preview => {
			preview.addEventListener("click", () => {
				fullImgPopup.classList.add("open");
				fullImg.classList.add("open");
				fullVideo.classList.add("open");
			});
		});

		fullImgPopup.addEventListener("click", (e) => {
			if(e.target.classList.contains("modal1")) {
				fullImgPopup.classList.remove("open");
				fullImg.classList.remove("open");
				fullVideo.classList.remove("open");
				mySwiper.autoplay.start();
			}
		});

		window.addEventListener('keydown', (e) => {
			if(e.keyCode === 27)  {
				fullImgPopup.click();
			}
		});

		$("#videoPlayBtn").click(function()  {
			$("img", $(this).parent()).click();
		});

		mySwiper.on('click', function()  {
			$('swiper-navigation-color .swiper-slide').removeClass('swiper-slide-active');
			$(this.clickedSlide).addClass('swiper-slide-active');
			let type = $(this.clickedSlide).attr("type");
			let originaURL = $(".contentBody img", this.clickedSlide).attr("data-src");

			if(type === "picture")  {
				$(".full-video").hide();
				$(".full-img").attr("src", originaURL).show();
			}
			else if(type === "video")  {
				$(".full-img").hide();
				$(".full-video").attr("src", originaURL).show();
			}

			mySwiper.update();
			mySwiper.autoplay.stop();
		});

		$('#videoModel').on('shown.bs.modal', function (event) {
			$('#video-1')[0].play();
			mySwiper.autoplay.stop();
		});
 
		$('#videoModel').on('hidden.bs.modal', function (event) {
			$('#video-1')[0].pause();
			mySwiper.autoplay.start();
		});

		$('#pictureModal').on('hidden.bs.modal', function()  {
			mySwiper.autoplay.start();
		});

	}
}

$("#nextBtnSlide").on("click", function()  {
	$(".swiper-button-next").click();
	let activeSlide = $("#slideBox .swiper-slide-active");
	let slideActiveType = activeSlide.attr("type");
	let nextPath = $(".contentBody img", activeSlide).attr("data-src");

	if(slideActiveType === "video")  {
		$(".modal1 .full-img").hide();
		$(".modal1 .full-video").show().attr("src", nextPath);
	}
	else {
		$(".modal1 .full-video").hide();
		$(".full-img.open").show().attr("src", nextPath);
	}
	
});

$("#prevBtnSlide").on("click", function()  {
	$(".swiper-button-prev").click();
	let activeSlide = $("#slideBox .swiper-slide-active");
	let slideActiveType = activeSlide.attr("type");
	let prevPath = $(".contentBody img", activeSlide).attr("data-src");

	if(slideActiveType === "video")  {
		$(".modal1 .full-img").hide();
		$(".modal1 .full-video").show().attr("src", prevPath);
		
	}
	else {
		$(".modal1 .full-video").hide();
		$(".full-img.open").show().attr("src", prevPath);
	}
	
});
