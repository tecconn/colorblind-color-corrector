function Matrix() {
	this.values = arguments;
}

Matrix.prototype.multiply = function (matrix) {
	var _thisRows = this.values.length;
	var _thisColumns = this.values[0].length;
	var matrixColumns = matrix.values[0].length;
	var multiple = new Array(_thisRows);  // initialize array of rows
	for (var r = 0; r < _thisRows; ++r) {
		multiple[r] = new Array(matrixColumns); // initialize the current row
		for (var c = 0; c < matrixColumns; ++c) {
			multiple[r][c] = 0;             // initialize the current cell
			for (var i = 0; i < _thisColumns; ++i) {
				multiple[r][c] += this.values[r][i] * matrix.values[i][c];
			}
		}
	}
	return multiple;
};

Matrix.prototype.subtract = function(matrix) {
	//TODO
};

Matrix.prototype.add = function(matrix) {
	//TODO
};


/**
 * Defines an RGBA Color
 *
 * @param red
 * @param green
 * @param blue
 * @param alpha
 * @constructor
 */
function Color(red, green, blue, alpha) {
	this.red = red || 0;
	this.green = green || 0;
	this.blue = blue || 0;
	this.alpha = alpha || 0;
}

/**
 * Gets the hexadecimal representation of a {@link Color}
 *
 * @return {string} Hexadecimal representation of a {@link Color}
 */
Color.prototype.getHexadecimal = function () {
	var hexadecimal = "#";
	hexadecimal += this.red ? this.red.toString(16) : "00";
	hexadecimal += this.green ? this.green.toString(16) : "00";
	hexadecimal += this.blue ? this.blue.toString(16) : "00";
	return hexadecimal;
};

/**
 * Gets the RGBA representation of a {@link Color}
 *
 * @return {string} RGBA representation of a {@link Color}
 */
Color.prototype.getRgba = function () {
	var rgba = "rgba(";
	rgba += (this.red ? this.red : 0) + ",";
	rgba += (this.green ? this.green : 0) + ",";
	rgba += (this.blue ? this.blue : 0) + ",";
	rgba += (this.alpha ? this.alpha : 0) + ")";
	return rgba;
};

Color.modifyBrightness = function (color, factor) {
	var colorMatrix = new Matrix(color.red, color.green, color.blue);
	if (factor < 0) {
		factor = 1 + factor;
		colorMatrix.multiply(factor);
	}
	else {
		var rgbMatrix = new Matrix(255, 255, 255);
		rgbMatrix.subtract(colorMatrix);
		rgbMatrix.multiply(factor);
		colorMatrix.add(rgbMatrix);
	}
	return Color.apply(colorMatrix);
};

/**
 * Enum that defines
 * @constructor
 */
function ColorblindnessType() {

}

/**
 * Gets an ENUM of all Colorblindness Types
 *
 * @return {{DEUTERANOPIA: string, PROTANOPIA: string, TRITANOPIA: string}}
 */
ColorblindnessType.getEnum = function () {
	return {
		DEUTERANOPIA: "DEUTERANOPIA",
		PROTANOPIA: "PROTANOPIA",
		TRITANOPIA: "TRITANOPIA"
	};
};

/**
 *  Performs color correction on an HTML Element
 *
 * @param element {Element,HTMLElement=} Element to modify
 * @param color {Color=} Color to correct to
 * @constructor
 */
function ColorCorrector(element, color) {
	this.element = element;
	this._colorShift = color || new Color();
}

/**
 * Performs color correction to the {@link #element} based on the {@link #color}
 */
ColorCorrector.prototype.correct = function () {
	this.element.style.color = this._colorShift.getHexadecimal();
};

/**
 *
 * @param element {Element,HTMLElement=} Element to modify
 * @param colorblindnessType {string=} Colorblindness type to perform corrections for
 * @constructor
 */
function ColorblindColorCorrector(element, colorblindnessType) {
	ColorCorrector.apply(this, [element]);
	this.colorblindnessType = colorblindnessType;
}

ColorblindColorCorrector.prototype.correct = function () {
	ColorCorrector.prototype.correct.call(this);
};

ColorblindColorCorrector.prototype = Object.create(ColorCorrector.prototype);
ColorblindColorCorrector.constructor = ColorblindColorCorrector;

/**
 * Main function to the Colorblindness Color Corrector
 *
 * @constructor
 */
function Main() {

	function handleDomLoaded() {
		var elementList = document.getElementsByTagName("*");
		for (var i = 0; i < elementList.length; i++) {
			var colorCorrector = new ColorCorrector(elementList[i]);
			colorCorrector.correct();
		}
	}

	function registerEventHandlers() {
		window.addEventListener("load", handleDomLoaded, false);
	}

	handleDomLoaded();
	registerEventHandlers();

}

new Main();

