#Sick Holder!
Sick holder is a shim to support browser that don't have 'placeholder' capabilites. 

Unlike other shims this library:

1. Doesn't add text into the input field (helps in validation).
2. Doesn't require any additional markup, short of the placeholder attribute needing to be present.
3. Is stylable and customizable (including positioning and padding) and includes stylesheets.
4. Reacts like native placeholder fields (inserting values hide the placeholder, focus and blur handling as well).
5. Doesn't require any library to function, 100% standalone.

##Requirements
Nothing, no longer needs support from modernizr as it does it's own feature detection.

##Support
Clear back to IE7, possibly even 6 but haven't tested. Most major vendors are supported.

##Usage
Include sickholder.js and sickholder.css in your site, and add this script to your DOM ready file (parameters are optional):

    sickHolder.init({
        nudgeTop : 5,                                   // Nudges the sickholder from the top
        nudgeLeft : 5,                                  // Nudges the sickholder from the left
        fontSize : 12,                                  // Adjusts the font size (or set it in the stylesheet)
        className : 'sick-holder'                       // Change the sickholder label class-name (warning, this will break styling!)
        containerClassName : 'sick-holder-container'    // Change the sickholder container class name (warning, this will break styling!)
    });

##License
MIT. Just use it!