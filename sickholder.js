/*
 *  Sick Holder v1.0
 *
 *  Joel Griffith
 *  mrskitch@gmail.com
 *  @mrskitch
 */
window.sickholder = (function () {

    "use strict";

    // Some scoped variables, and arrays
    var nudge, className, containerClassName, fontSize, inputs = [],

    // The application Object
    Sickholder = {

        /*
         * Instantiater, handles function calling and config
         */
        init: function (config) {

            // Check if placeholder is already supported
            if ( "placeholder" in document.createElement("input") ) { return true; }

            // Load config options or use defaults
            config              = config || {};
            className           = config.className || 'sick-holder-placeholder';
            containerClassName  = config.containerClassName || 'sick-holder-container';
            fontSize            = config.fontSize || '';
            nudge = {
                top: config.nudgeTop || 0,
                left: config.nudgeLeft || 0
            };

            // Get inputs, textareas, and generate placeholders
            this.getPlaceholderElements('input')
                .getPlaceholderElements('textarea')
                .createSickholder(inputs);
        },

        /*
         * Captures inputs by tagname, and adds them to the global
         * input if it contains a placeholder attribute.
         */
        getPlaceholderElements: function (tag) {
            var elements = document.getElementsByTagName(tag);
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].getAttribute('placeholder')) {
                    inputs.push(elements[i]);
                }
            }
            return this;
        },

        /*
         * Creates sickholders that will act as a placeholder
         * and attachs the event handlers
         *
         * This works by retrieving the input, getting its positioning
         * (margin, position, and top/left/right...), wrapping that in another element, applying
         * the positioning to the container, and inserting the sickholder into the
         * same container but positioned over the input.
         *
         * @param: Array of elements needing placeholder text
         */
        createSickholder: function (inputs) {
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i],
                    position = (this.getStyle(input, 'position') === 'absolute') ? 'absolute' : 'relative',
                    sickholder              = document.createElement('label'),
                    container               = document.createElement('div');

                // Generate the container Element with the classname and proper metrics
                container.className         = containerClassName;
                container.style.cssText     += 'margin:' + this.getStyle(input, 'margin') + ';' +
                                               'position:' + position + ';' +
                                               'float:' + this.getStyle(input, 'float') + ';' +
                                               'width:' + input.offsetWidth + 'px;' +
                                               'height:' + input.offsetHeight +  'px;' +
                                               'top:' + this.getStyle(input, 'top') + ';' +
                                               'left:' + this.getStyle(input, 'left') + ';' +
                                               'right:' + this.getStyle(input, 'right') + ';' +
                                               'bottom:' + this.getStyle(input, 'bottom') + ';';

                // Generate the sickholder shim, add attributes, and style
                sickholder.setAttribute('for', input.getAttribute('id'));
                sickholder.setAttribute('data-placeholder', 'sick-holder');
                sickholder.className       = className;
                sickholder.innerHTML       = input.getAttribute('placeholder');
                sickholder.style.cssText   += 'top:' + nudge.top + 'px;' +
                                              'left:' + nudge.left  + 'px;' +
                                              'max-width:' + (input.offsetWidth - nudge.left) + 'px;' +
                                              'font-size:' + fontSize + ';';

                // Remove any positioning from the input since the container now has them
                input.style.cssText = "margin:0; float: none; position: static;";

                // Insert our sickholder and inputs into a generated container
                this.insertInto(input, container)
                    .insertAfter(input, sickholder);

                // Attach the event handlers
                this.focusHandler(input)
                    .blurHandler(input)
                    .inputHandlers(input);
            }
        },

        /*
         * Handles the focus interaction
         *
         * @param: Element Object
         */
        focusHandler: function (elem) {
            this.addEvent(elem, "focus", function(){
                this.nextSibling.className = className + ' focus';
            });
            return this;
        },

        /*
         * Handles the blur interaction
         *
         * @param: Element Object
         */
        blurHandler: function (elem) {
            this.addEvent(elem, "blur", function(){
                this.nextSibling.className = className;
            });
            return this;
        },

        /*
         * Handles the cut interaction (mouse), note to wait 1 millisecond
         * to see if form is empty or has content.
         *
         * @param: Element Object
         */
        inputHandlers: function(elem) {
            var events = "cut,paste,input,keydown".split(',');
            this.addEvent(elem, events, function(){
                setTimeout(function(){
                    if( elem.value === '' ){
                        elem.nextSibling.style.display = 'block';
                    } else {
                        elem.nextSibling.style.display = 'none';
                    }
                },1);
            });
            return this;
        },

        /*
         * Helper method to insert dom siblings
         *
         * @param: The element to add after, the element being added
         */
        insertAfter: function (referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            return this;
        },

        /*
         * Helper method to insert dom element into another
         *
         * @param: The element to insert into, the element being inserted
         */
        insertInto: function (referenceNode, newNode) {
            this.insertAfter(referenceNode, newNode);
            newNode.appendChild(referenceNode);
            return this;
        },

        /*
         * Helper method to get element css styles
         *
         * @param: Element Object, Style attribute
         */
        getStyle: function (elem,styleProp) {
            var style;
            if (elem.currentStyle) {
                style = elem.currentStyle[styleProp];
            } else if (window.getComputedStyle) {
                style = document.defaultView.getComputedStyle(elem,null).getPropertyValue(styleProp);
            }
            return style;
        },

        /*
         * Helper method for attaching events
         *
         * @param: Element object, event string/array, callback
         */
        addEvent: function(obj, type, fn) {
            // Function to check event attachment and attach
            var addEvents = function(obj, type, fn) {
                // Modern browsers
                if (obj.addEventListener) {
                    obj.addEventListener( type, fn, false );
                
                // Older IE
                } else if (obj.attachEvent) {
                    obj["e"+type+fn] = fn;
                    obj[type+fn] = function() { obj["e"+type+fn]( window.event ); };
                    obj.attachEvent( "on"+type, obj[type+fn] );
                
                // Heaven help us
                }else {
                    obj["on"+type] = obj["e"+type+fn];
                }
            };

            // Check if array is passed, else assume string
            if( type instanceof Array ){
                for (var i = 0; i < type.length; i++){
                    addEvents(obj, type[i], fn);
                }
            } else {
                addEvents(obj, type, fn);
            }
            return this;
        }
    };
    return Sickholder;
})();