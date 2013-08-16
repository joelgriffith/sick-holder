#Sick Holder!
Sick holder is a shim to support browser that don't have 'placeholder' capabilites. 

Unlike other shims this library:

1. Doesn't add text into the input field (helps in validation).
2. Doesn't require any additional markup, short of the placeholder attribute needing to be present.
3. Is stylable and customizable (including positioning and padding) and includes stylesheets.
4. Reacts like native placeholder fields (inserting values hide the placeholder, focus and blur handling as well).
5. Doesn't require any library to function, 100% standalone.

##Demo
[Click here to see a demo](https://github.com/joelgriffith/sick-holder.git "Sickholder Demo")

##Requirements
None! Sickholder does it's own feature detection and doesn't need jQuery!

##Support
Works clear back to IE5, and is regularly tested in IE7. If you have issues in another browser, let me know.

##Usage
Include sickholder.js and sickholder.css in your site, and add this script to your DOM ready file (parameters are optional):

    sickHolder.init({
        nudgeTop : 5,                                   // Nudges the sickholder from the top
        nudgeLeft : 5,                                  // Nudges the sickholder from the left
        fontSize : 12,                                  // Adjusts the font size (or set it in the stylesheet)
        className : 'sick-holder'                       // Change the sickholder label class-name (warning, this will break styling!)
        containerClassName : 'sick-holder-container'    // Change the sickholder container class name (warning, this will break styling!)
    });

##How it works
Instead of inserting text into an input that acts as a placeholder (which is awful when doing any sort of validating or sanitizing), sickholder works by wrapping the input in an element (a div for now) and positioning a label over the input absolutely. The container element then 'steals' the positioning attributes of the input. That way all your input position styles still work, and the sickholder gets put where it needs to without much fuss. You can always use the nudge properties if it doesn't get placed exactly where you want it.

Since sickholders are label elements (with 'for' attributes), clicking on them will automatically select the input box. This helps maintain the standard interaction of clicking on an input and having it get selected. 

##Known Issues
Currently, when sickholders are clicked on in IE7 their inputs don't focus. This will be worked out soon.
If sickholders are appearing above inputs, you NEED to include the sick-holder stylesheet since it DOES do some important layout operations.

##Upcoming
A method to redraw the sickholders since they don't auto-update.

##License
MIT. Just use it!