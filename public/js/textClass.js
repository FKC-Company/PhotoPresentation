'use strict';

export default class TextClass {
	constructor(data)  {
		this.marqueeData = data.marquee;
		this.descriptionData = data.description;
		this.setDisplay();
	}

	setDisplay()  {
		$("marquee").text(this.marqueeData);
		$("#descriptionTxt").text(this.descriptionData);
	}
}
