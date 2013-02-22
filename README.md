#Sick Holder!
Sick holder is a shim to support browser that don't have 'placeholder' capabilites. Unlike other libraries, this shim attempts to EXACTLY replicate native placholder behaviour, including focus, blur, and on-key-press events.

##Requirements
Modernizr. Without it you WILL get duplicate placeholder text in modern browsers!

##Support
Clear back to IE7, possibly even 6 but haven't tested.

##Usage
Include sickholder.js or sickholder.min.js in your HTML as well as the sickholder.css. See index.html for an example.

###Usage
For usage without jQuery, simply initiate the object and pass it the optional configuraton parameters:

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