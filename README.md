#Sick Holder!
Sick holder is a shim to support browser that don't have 'placeholder' capabilites. 

Unlike other shims this library doesn't:

1. Add text into the input field (helps in validation).
2. Doesn't require any additional markup, short of the placeholder attribute needing to be present.
3. Is stylable and customizable (including positioning and padding) and includes stylesheets.
4. Reacts like native placeholder fields (inserting values hide the placeholder, focus and blur handling as well).
5. Doesn't require any library to function, though modernizr is needed to prevent it from appearing in browsers that support placeholder.

##Requirements
Modernizr. Without it you WILL get duplicate placeholder text in modern browsers!

##Support
Clear back to IE7, possibly even 6 but haven't tested. All other vendors are supported.

##Usage
Include sickholder.js or sickholder.min.js in your HTML as well as the sickholder.css. See index.html for an example.

###Usage
Include this script in your DOM ready file (parameters are optional):

    app.SickHolder.init({
        nudgeTop : 5,                                   // Nudges the sickholder from the top
        nudgeLeft : 5,                                  // Nudges the sickholder from the left
        fontSize : 12,                                  // Adjusts the font size (or set it in the stylesheet)
        className : 'sick-holder'                       // Change the sickholder label class-name (warning, this will break styling!)
        containerClassName : 'sick-holder-container'    // Change the sickholder container class name (warning, this will break styling!)
    });

##Future
I plan on writing a jQuery plugin as well once I'm satisified with the native plugin.

##License
MIT. Just use it!