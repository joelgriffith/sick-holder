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

    // Some 'global' functions, variables, and arrays
    var padding, className, fontSize, containerClassName, inputs = [],

    // Application Object
    Sickholder = {

        /*
         * Instantiater, handles function calling and config
         */
        init: function (config) {

            // Load config options or use defaults
            config = config || {};
            className = config.className || 'sick-holder-placeholder';
            containerClassName = config.containerClassName || 'sick-holder-container';
            fontSize = config.fontSize || '';
            padding = {
                top: config.paddingTop || 0,
                left: config.paddingLeft || 0
            };

            // Get inputs, textareas, and generate placeholders
            this.getElements('input');
            this.getElements('textarea');
            this.createSickholder(inputs);
        },

        /*
         * Captures inputs on tagname, and adds them input global
         * if it contains a placeholder attribute.
         */
        getElements: function (tag) {
            var elements = document.getElementsByTagName(tag);
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].getAttribute('placeholder')) {
                    inputs.push(elements[i]);
                }
            }
        },

        /*
         * Creates labels that will act as placeholder shim
         * and attachs the event handlers
         *
         * TODO: Clean this up a bit, not DRY enough
         *       Add Method for detecting margin, and adjust
         *       Break down this function into other, smaller ones.
         *
         * @param: Array of elements needing placeholder text
         */
        createSickholder: function (elems) {
            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i]; // Easier to read
                var placeholderText = elem.getAttribute('placeholder');
                var placeholderID = elem.getAttribute('id');
                var inputWidth = elem.offsetWidth;
                var placeholder = document.createElement('label');
                var container = document.createElement('div');

                // Generate the container Element with the classname
                container.className = containerClassName;

                // Generate the placeholder shim
                placeholder.innerHTML = placeholderText;

                // Set classname and tags
                placeholder.className = className;
                placeholder.setAttribute('for', placeholderID);

                // Style and position the element
                placeholder.style.top = padding.top + 'px';
                placeholder.style.left = padding.left + 'px';
                placeholder.style.maxWidth = inputWidth - padding.left + 'px';
                placeholder.style.fontSize = fontSize;

                // Insert our placeholder and inputs into a container
                this.insertInto(elem, container);
                this.insertAfter(elem, placeholder);

                // Attach the event handlers
                this.keyDownHandler(elem);
                this.keyUpHandler(elem);
                this.focusHandler(elem);
                this.blurHandler(elem);
            }
        },

        /*
         * Handles the focus interaction
         *
         * @param: Element needing focus
         */
        focusHandler: function (elem) {
            this.addEvent(elem, "focus", function(){
                this.nextSibling.className = className + ' focus';
            });
            return elem;
        },

        /*
         * Handles the blur interaction
         *
         * @param: Element needing blur handles
         */
        blurHandler: function (elem) {
            this.addEvent(elem, "blur", function(){
                this.nextSibling.className = className;
            });
            return elem;
        },

        /*
         * Handles the keydown interaction
         *
         * @param: Array of elements needing keydown handles
         */
        keyDownHandler: function (elem) {
            elem.onkeydown = function (e) {
                e = (e === undefined) ? e = window.event : e; // For Legacy browsers
                var key = e.keyCode;
                if (!/[^A-Za-z0-9 ]/.test(String.fromCharCode(key))) {
                    elem.nextSibling.style.display = "none";
                }
            };
            return elem;
        },

        /*
         * Handles the keyup interaction
         *
         * @param: Array of elements needing keyup handles
         */
        keyUpHandler: function (elem) {
            elem.onkeyup = function () {
                if (elem.value === '') {
                    elem.nextSibling.style.display = "block";
                }
            };
            return elem;
        },

        /*
         * Helper method to insert dom siblings
         *
         * @param: The element to add after, the element being added
         */
        insertAfter: function (referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },

        /*
         * Helper method to insert dom element into another
         *
         * @param: The element to insert into, the element being inserted
         */
        insertInto: function (referenceNode, newNode) {
            this.insertAfter(referenceNode, newNode);
            newNode.appendChild(referenceNode);
        },

        /*
         * Helper method for attaching events
         *
         * @param: The object, the event, the function callback
         */
        addEvent: function( obj, type, fn ) {
            if (obj.addEventListener) {
                obj.addEventListener( type, fn, false );
            
            } else if (obj.attachEvent) {
                obj["e"+type+fn] = fn;
                obj[type+fn] = function() { obj["e"+type+fn]( window.event ); };
                obj.attachEvent( "on"+type, obj[type+fn] );
            
            }else {
                obj["on"+type] = obj["e"+type+fn];
            }
        }
    };
    return Sickholder;
})();