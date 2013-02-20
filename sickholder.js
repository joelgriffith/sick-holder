// Load/Check app global space
window.app = window.app || {};

window.app.sickholder = (function () {

    "use strict";

    // Some 'global' functions, variables, and arrays
    var padding, className, fontSize, containerClassName, inputs = [],

    // Application Object
    sickholder = {

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
            this.createPlaceHolder(inputs);
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
         *
         * @param: Array of elements needing placeholder text
         */
        createPlaceHolder: function (elems) {
            for (var i = 0; i < elems.length; i++) {
                var placeholderText = elems[i].getAttribute('placeholder');
                var placeholderID = elems[i].getAttribute('id');
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
                placeholder.style.fontSize = fontSize;

                // Insert our placeholder and inputs into a container
                this.insertInto(elems[i], container);
                this.insertAfter(elems[i], placeholder);

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
        focusHandler: function (elem) {

            // For modern browsers
            if (document.addEventListener) {
                elem.addEventListener("focus", function () {
                    this.nextSibling.className = className + ' focus';
                });

                // Legacy browsers
            } else {
                elem.attachEvent("focus", function () {
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
        blurHandler: function (elem) {

            // For modern browsers
            if (document.addEventListener) {
                elem.addEventListener("blur", function () {
                    this.nextSibling.className = className;
                });

                // Legacy browsers
            } else {
                elem.attachEvent("blur", function () {
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
        keyDownHandler: function (elem) {
            elem.onkeydown = function (e) {
                if (e === undefined) {
                    e = window.event;
                } // For Legacy browsers
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
        }
    };
    return sickholder;
})();