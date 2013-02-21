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
    var nudge, className, fontSize, containerClassName, inputs = [],

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
            this.getElements('input').getElements('textarea').createSickholder(inputs);
        },

        /*
         * Captures inputs on tagname, and adds them to the global
         * input if it contains a placeholder attribute.
         */
        getElements: function (tag) {
            var elements = document.getElementsByTagName(tag);
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].getAttribute('placeholder')) {
                    inputs.push(elements[i]);
                }
            }
            return this;
        },

        /*
         * Creates labels that will act as placeholder shim
         * and attachs the event handlers
         *
         * TODO: Add Method for detecting margin, and adjust
         *
         * @param: Array of elements needing placeholder text
         */
        createSickholder: function (elems) {
            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];
                var placeholderText         = elem.getAttribute('placeholder');
                var placeholderID           = elem.getAttribute('id');
                var inputWidth              = elem.offsetWidth;
                var placeholder             = document.createElement('label');
                var container               = document.createElement('div');

                // Generate the container Element with the classname
                container.className         = containerClassName;

                // Generate the placeholder shim and add attributes
                placeholder.innerHTML       = placeholderText;
                placeholder.className       = className;
                placeholder.setAttribute('for', placeholderID);

                // Style and position the element
                placeholder.style.cssText   += 'top:' + nudge.top + 'px;' +
                                               'left:' + nudge.left + 'px;' +
                                               'max-width:' + (inputWidth - nudge.left) + 'px;' +
                                               'font-size:' + fontSize + ';';

                // Insert our placeholder and inputs into a generated container
                // TODO: This could more than likely be just one method...
                this.insertInto(elem, container).insertAfter(elem, placeholder);

                // Attach the event handlers
                this.keyDownHandler(elem).keyUpHandler(elem).focusHandler(elem).blurHandler(elem);
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
            return this;
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
            return this;
        },

        /*
         * Handles the keydown interaction
         *
         * TODO: This only handles keyboard input. Need mouse click
         *       handling as well (pasting)
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
            return this;
        },

        /*
         * Handles the keyup interaction
         *
         * TODO: This only handles keyboard input. Need mouse click
         *       as well (cutting).
         *
         *  @param: Array of elements needing keyup handles
         */
        keyUpHandler: function (elem) {
            elem.onkeyup = function () {
                if (elem.value === '') {
                    elem.nextSibling.style.display = "block";
                }
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
         * @param: The object, the event, the function callback
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