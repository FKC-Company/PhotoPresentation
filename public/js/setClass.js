'use strict';

import PictureSlideClass from './pictureSlideClass.js';
import TextClass from './textClass.js';

export default class SetClass {
	constructor()  {
		this.data = null;

      postData('/set', {  eventId: eventId })
      .then(data => { 
         let resData = JSON.parse(data.resSet);
         this.data = resData;
         this.setDisplay();
         this.eventHandle();
      });
	}

	setDisplay()  {
		if(this.data.length == 0)  {
			$("#setList").html("no set data");
			return;
		}

		$("#setList").html("");
      		this.data.map(function(item, i)  {
			$("#setList").append(
				'<a setFolderName="'+ item.folder_name +'" setYearSt="'+ item.set_ystr +'"  setYearEd="'+ item.set_yend +'" class="list-group-item list-group-item-action flex-column align-items-start">'+
					'<div id="setTitle" class="d-flex w-100 justify-content-between">'+
						'<h5 class="mb-1">'+ item.set_title +'</h5>'+
					'</div>'+
					'<p class="mb-1" style="white-space: pre-wrap;">'+ item.set_body +'</p>'+
				'</a>'
        	);
      });
	}

	eventHandle()  {
		$("#setList a").on("click", function()  {
			$("#disabler").show();
			$("#setList a").removeClass("setActive");
			$(this).addClass("setActive");
			let setFolderName = $(this).attr("setFolderName");
			let setYearSt = $(this).attr("setYearSt");
			let setYearEd = $(this).attr("setYearEd");
			$("#titleSetYear").html(setYearSt+" - "+setYearEd);

			postData('/files', {
				eventId: eventId,
				setFolderName : setFolderName 
			}).then(data => {

				// let aaa = 'data:image/jpeg;base64,' + data.thumbImg;
				// $("body").prepend("<img  src="+ aaa +" />");

				// console.log(data);

            let filesObjects = JSON.parse(data.filesObjects);
            new PictureSlideClass({
				mainPicPath: data.mainPicPath,
				filesObjects: filesObjects,
				proPic: data.proPic
			});

            new TextClass({
					marquee: data.marqueeTxt,
					description: data.descriptionTxt
				});

				//Tur zuur -------------------
				let setTitle = $("#setTitle h5", this).text();
				$("#setTitle_Desk").text(setTitle);

				$("#disabler").hide();

			});

		});

		$("#setList a:first").click();
	}
}