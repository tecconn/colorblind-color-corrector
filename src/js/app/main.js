function AssertError(assertion, message) {
	this.name = assertion;
	this.message = message || ''; //TODO Complete this
	this.stack = (new Error()).stack;
}

/**
 * Collection of assertion helpers
 *
 * @constructor
 */
function Assert() {

}

/**
 * Asserts that the object must not be null
 * @param obj {*} Object to check if null
 * @param message {string=} Text to appear in error if object is null
 */
Assert.notNull = function(obj, message) {
	if (obj === null)
		throw new Error("Object must not be null!");
};


/**
 * Performs a deep copy on an {@link Array}
 *
 * @param arr {Array} Array to make a deep copy of
 * @return {Array} Deep copy of the input array
 */
Array.deepCopy = function(arr) {
	var output = [];
	if (arr) {
		if (Array.isArray(arr[0])) {
			for (var i = 0; i < arr.length; i++)
				output.push(Array.deepCopy(arr[i]));
		}
		else {
			for (i = 0; i < arr.length; i++)
				output.push(arr[i]);
		}
	}
	return output;
};

/**
 * Defines a Linear Matrix
 *
 * @constructor
 */
function Matrix() {
	this.values = arguments;
}

/**
 * Multiplies this {@link Matrix} by another matrix {@link Matrix}
 *
 * @param matrix {Matrix} Matrix to multiply against this matrix
 * @return {Matrix} This Matrix after the multiplication
 */
Matrix.prototype.multiply = function (matrix) {
	var _thisRows = this.values.length;
	var _thisColumns = this.values[0].length;
	var matrixColumns = matrix.values[0].length;
	var matrixRows = matrix.values.length;
	if (_thisColumns !== matrixRows)
		throw new Error("The number of columns in A must match the number of rows in B");
	var _thisDuplicate = Array.deepCopy(this.values);
	this.values = new Array(_thisRows);  // initialize array of rows
	for (var r = 0; r < _thisRows; ++r) {
		this.values[r] = new Array(matrixColumns); // initialize the current row
		for (var c = 0; c < matrixColumns; ++c) {
			this.values[r][c] = 0;             // initialize the current cell
			for (var i = 0; i < _thisColumns; ++i) {
				this.values[r][c] += _thisDuplicate[r][i] * matrix.values[i][c];
			}
		}
	}
	return this;
};

/**
 * Subtracts a {@link Matrix} from this {@link Matrix}
 *
 * @param matrix {Matrix} Matrix to subtract from this Matrix
 * @return {Matrix} This Matrix after the subtraction
 */
Matrix.prototype.subtract += function(matrix) {
	var _thisRows = this.values.length;
	var _thisColumns = this.values[0].length;
	var matrixColumns = matrix.values[0].length;
	var matrixRows = matrix.values.length;
	if (_thisColumns !== matrixColumns && _thisRows !== matrixRows)
		throw new Error("The number of rows and columns in A must match the number of rows and columns in B");
	for (var i = 0; i < matrixRows; i++) {
		for (var o = 0; o < matrixColumns; o++) {
			this.values[i][o] += matrix[i][o];
		}
	}
	return this;
};

/**
 * Adds a {@link Matrix} to this {@link Matrix}
 *
 * @param matrix {Matrix} Matrix to add to this Matrix
 * @return {Matrix} This Matrix after the addition
 */
Matrix.prototype.add = function(matrix) {
	var _thisRows = this.values.length;
	var _thisColumns = this.values[0].length;
	var matrixColumns = matrix.values[0].length;
	var matrixRows = matrix.values.length;
	if (_thisColumns !== matrixColumns && _thisRows !== matrixRows)
		throw new Error("The number of rows and columns in A must match the number of rows and columns in B");
	for (var i = 0; i < matrixRows; i++) {
		for (var o = 0; o < matrixColumns; o++) {
			this.values[i][o] += matrix[i][o];
		}
	}
	return this;
};


/**
 * Defines an RGBA Color
 *
 * @param red {number=} Red channel of the color (where r belongs to all Z and 0 >= r <= 255)
 * @param green {number=} Green channel of the color (where g belongs to all Z and 0 >= g <= 255)
 * @param blue {number=} Blue channel of the color (where b belongs to all Z and 0 >= b <= 255)
 * @param alpha {number=} Alpha channel of the color (opacity where a belongs to all Q and 0 >= a <= 1)
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
	rgba += (this.blue ? this.blue : 0);
	if (this.alpha !== 1)
		rgba += "," + (this.alpha ? this.alpha : 0);
	return rgba + ")";
};

/**
 * Changes the brightness of the {@link Color} based on the magnitude provided
 *
 * @param factor {Matrix|number} Factor to change the brightness of the {@link Color}
 * @param color {Color} Color to change the brightness of
 * @return {Color} Color with a brightness modified by a factor
 */
Color.modifyBrightness = function (factor, color) {
	var colorMatrix = new Matrix(color.red, color.green, color.blue);
	if (!(factor instanceof Matrix))
		factor = new Matrix([factor, factor, factor]);
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
 * Enum that defines types of Colorblindnesses
 *
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
	this._colorShift = Color.modifyBrightness(2, this._colorShift);
	this.element.style.color = this._colorShift.getRgba();
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

