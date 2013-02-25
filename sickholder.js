/*
 *  Sick Holder v1.0
 *
 *  Joel Griffith
 *  mrskitch@gmail.com
 *  @mrskitch
 */
window.app = window.app || {};
window.app.Sickholder = (function () {

    "use strict";

    // Some scoped variables, and arrays
    var nudge, className, containerClassName, fontSize, inputs = [],

    // The application Object
    Sickholder = {

        /*
         * Instantiater, handles function calling and config
         */
        init: function (config) {

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
         * TODO: Add Method for detecting margin, and adjust
         *
         * @param: Array of elements needing placeholder text
         */
        createSickholder: function (inputs) {
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i],
                    sickholder              = document.createElement('label'),
                    container               = document.createElement('aside');

                // Generate the container Element with the classname
                container.className         = containerClassName;

                // Generate the sickholder shim and add attributes
                sickholder.innerHTML       = input.getAttribute('placeholder');
                sickholder.className       = className;
                sickholder.setAttribute('for', input.getAttribute('id'));

                // Style and position the element, setting boundaries
                sickholder.style.cssText   += 'top:' + nudge.top + 'px;' +
                                              'left:' + nudge.left + 'px;' +
                                              'max-width:' + (input.offsetWidth - nudge.left) + 'px;' +
                                              'font-size:' + fontSize + ';';

                // Insert our sickholder and inputs into a generated container
                this.insertInto(input, container).insertAfter(input, sickholder);

                // Attach the event handlers
                this.keyDownHandler(input)
                    .focusHandler(input)
                    .cutHandler(input)
                    .pasteHandler(input)
                    .blurHandler(input);
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
         * TODO: Fold in the paste handler as well as 'input' since Opera
         * doesn't support paste/cut.
         *
         * @param: Element Object
         */
        cutHandler: function(elem) {
            this.addEvent(elem, 'cut', function(){
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
         * Handles the paste interaction (mouse), note to wait 1 millisecond
         * to see if form is empty or has content.
         *
         * @param: Element Object
         */
        pasteHandler: function(elem) {
            this.addEvent(elem, 'paste', function(){
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
         * Handles the keydown interaction, note to wait 1 millisecond
         * to see if form is empty or has content.
         *
         * @param: Element Object
         */
        keyDownHandler: function (elem) {
            elem.onkeydown = function () {
                setTimeout(function(){
                    if( elem.value === ''){
                        elem.nextSibling.style.display = 'block';
                    } else {
                        elem.nextSibling.style.display = 'none';
                    }
                }, 1);
            };
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
         * Helper method for attaching events
         *
         * TODO: Add support for passing multiple handelers
         *
         * @param: The element, the event, the function callback
         */
        addEvent: function(obj, type, fn) {
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
        }
    };
    return Sickholder;
})();