// Load/Check app global space
window.app = window.app || {};

app.sickholder = (function(){

	// Some 'global' functions & variables
	var padding, inputs, className, fontSize, position = {};

	// Application Object
	var sickholder = {

		/*
		 *	Instantiater, handles function calling and config
		 */
		init: function(config){
			
			// Load config options or use defaults
			config = config || {};
			padding = {
				top : config.paddingTop || 0,
				left : config.paddingLeft || 0
			};
			className = config.className || 'sick-holder-placeholder';
			fontSize = config.fontSize || '';

			// Get inputs, generate placeholders
			inputs = this.getElements();
			this.createPlaceHolder(inputs);
		},

		/*
		 * Captures all inputs/textareas by attribute
		 * TODO: Clean this up so it doesn't scan EVERY node
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
		 * TODO: Clean this up a bit, not DRY enough
		 *
		 * @param: Array of elements needing placeholder text
		 */
		createPlaceHolder: function(elems){
			for(var i = 0; i < elems.length; i++){
				var placeholderText = elems[i].getAttribute('placeholder');
				var placeholderID = elems[i].getAttribute('id');
				var label = document.createElement('label');
				var container = document.createElement('div');
				
				// Generate the container and labels
				container.className = 'sick-holder-container';
				label.innerHTML = placeholderText;
				label.className = className;
				label.setAttribute('for', placeholderID);
				label.style.top = padding.top + 'px';
				label.style.left = padding.left + 'px';
				label.style.fontSize = fontSize;
				this.insertInto(elems[i], container);
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
		 */
		focusHandler: function(elem){

			// For modern browsers
			if( document.addEventListener ){
				elem.addEventListener("focus", function(e) {
					this.nextSibling.className = className + ' focus';
			    });

			// Legacy browsers    
			} else {
				elem.attachEvent("focus", function(e) {
					this.nextSibling.className = className + ' focus';
			    });
			}
			return elem;
		},

		/*
		 * Handles the blur interaction
		 *
		 * @param: Element needing blur handles 
		 */
		blurHandler: function(elem){
			
			// For modern browsers
			if( document.addEventListener ){
				elem.addEventListener("blur", function(e) {
					this.nextSibling.className = className;
			    });

			// Legacy browsers
			} else {
				elem.attachEvent("blur", function(e) {
					this.nextSibling.className = className;
			    });
			}
			return elem;
		},

		/*
		 * Handles the keydown interaction
		 * 
		 * @param: Array of elements needing keydown handles
		 */
		keyDownHandler: function(elem){
			elem.onkeydown = function(e){
				if( e == undefined ){ e = window.event } // For Legacy browsers
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
		 */
		keyUpHandler: function(elem){
			elem.onkeyup = function(e){
				if( e == undefined ){ e = window.event } // For Legacy browsers
				var key = e.keyCode;
				if( elem.value == '' ){
					elem.nextSibling.style.display = "block";
				}
			}
			return elem;
		},

		/*
		 * Helper method to insert dom siblings
		 *
		 * @param: The element to add after, the element being added
		 */
		insertAfter: function(referenceNode, newNode) {
		    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		},

		/*
		 * Helper method to insert dom element into another
		 *
		 * @param: The element to insert into, the element being inserted
		 */
		insertInto: function(referenceNode, newNode) {
		    this.insertAfter(referenceNode, newNode);
		    newNode.appendChild(referenceNode);
		}
	}
	return sickholder;
})();