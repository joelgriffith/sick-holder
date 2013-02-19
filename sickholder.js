// Load/Check app global space
window.app = window.app || {};

app.SickHolder = (function(){

	// Some 'global' functions & variables
	var inputs, className = 'sick-holder';

	// Application Object
	var SickHolder = {

		/*
		 *	Instantiater, handles function calling and config
		 *
		 */
		init: function(config){
			config = config || {}; // TODO: Add config options
			inputs = this.getElements();
			this.createPlaceHolder(inputs);
		},

		/*
		 * Captures all inputs/textareas by attribute
		 *
		 * @return: Array of elements with placeholder attributes
		 */
		getElements: function(){
			var matchingElements = [];
		  	var allElements = document.getElementsByTagName('*');
		  	for (var i = 0; i < allElements.length; i++){
		    	if (allElements[i].getAttribute('placeholder')){
		      		matchingElements.push(allElements[i]);
		    	}
		  }
		  return matchingElements;
		},

		/*
		 * Creates labels that will act as placeholder shim
		 * and attachs the event handlers
		 *
		 * @param: Array of elements needing placeholder text
		 */
		createPlaceHolder: function(elems){
			for(var i = 0; i < elems.length; i++){
				var placeholderText = elems[i].getAttribute('placeholder');
				var location = this.getElementPosition(elems[i]);
				var label = document.createElement('label');
				
				// Generate the labels
				label.innerHTML = placeholderText;
				label.classList.add(className);
				label.style.top = location.top + 'px';
				label.style.left = location.left + 'px';
				this.insertAfter(elems[i], label);

				// Attach the event handlers
				this.keyDownHandler(elems[i]);
				this.keyUpHandler(elems[i]);
				this.focusHandler(elems[i]);
				this.blurHandler(elems[i]);
			}
		},

		/*
		 * Handles the focus interaction
		 *
		 * @param: Element needing focus 
		 *
		 */
		focusHandler: function(elem){
			elem.addEventListener("focus", function(e) {
				this.nextSibling.classList.add('focus');
				return elem;
		    });
		},

		/*
		 * Handles the blur interaction
		 *
		 * @param: Element needing blur handles 
		 *
		 */
		blurHandler: function(elem){
			elem.addEventListener("blur", function(e) {
				this.nextSibling.classList.remove('focus');
				return elem;
		    });
		},

		/*
		 * Handles the keydown interaction
		 *
		 * @param: Array of elements needing keydown handles 
		 *
		 */
		keyDownHandler: function(elem){
			elem.onkeydown = function(e){
				var key = e.keyCode;
				if( !/[^A-Za-z0-9 ]/.test(String.fromCharCode(key)) ){
					elem.nextSibling.style.display = "none";
				}
			}
			return elem;
		},

		/*
		 * Handles the keyup interaction
		 *
		 * @param: Array of elements needing keyup handles 
		 *
		 */
		keyUpHandler: function(elem){
			elem.onkeyup = function(e){
				var key = e.keyCode;
				if( elem.value == '' ){
					elem.nextSibling.style.display = "block";
				}
			}
			return elem;
		},

		/*
		 * Method to get element position
		 *
		 * @return: Object with element coordination
		 */
		getElementPosition: function(elem){
			var position = {};
			position.top = elem.offsetTop;
			position.left = elem.offsetLeft;
			return position;
		},

		/*
		 * Helper method to insert dom siblings
		 *
		 * @param: The element to add after, the element being added
		 */
		insertAfter: function(referenceNode, newNode) {
		    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
	}
	return SickHolder;
})();