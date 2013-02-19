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
			config = config || {};
			inputs = this.getElements();
			this.focusHandler(inputs);
			this.createPlaceHolder(inputs);
		},

		/*
		 * Captures all inputs/textareas by attribute
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
		 * @param: Array of elements needing placeholder text
		 */
		createPlaceHolder: function(elems){
			for(var i= 0; i < elems.length; i++){
				var placeholderText = elems[i].getAttribute('placeholder');
				var location = this.getElementPosition(elems[i]);
				var label = document.createElement('label');
				label.innerHTML = placeholderText;
				this.insertAfter(elems[i], label);
			}
		},

		/*
		 * Handles the focus interaction
		 * @param: Array of elements needing focus 
		 *
		 */
		focusHandler: function(elems){
			for(var i = 0; i < elems.length; i++){
				elems[i].addEventListener("focus", function(e) {
			    }, false);
			}
		},

		/*
		 * Method to get element position
		 * @return: Object with element coordination
		 */
		getElementPosition: function(element){
			var position = {};
			position.top = element.offsetTop;
			position.left = element.offsetLeft;
			return position;
		},

		/*
		 * Helper method to insert dom siblings
		 * @param: The element to add after, the element being added
		 */
		insertAfter: function(referenceNode, newNode) {
		    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
	}
	return SickHolder;
})();