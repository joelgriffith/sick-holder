#Sick Holder!
Sick holder is a shim to support browser that don't have 'placeholder' capabilites. Unlike other libraries, this shim attempts to EXACTLY replicate native placholder behaviour, including focus, blur, and on-key-press events.

##Requirements
Modernizr. Without it you WILL get duplicate placeholder text in modern browsers!

##Usage
Include sickholder.js or jquery.sickholder.js in your HTML as well as the sickholder.css. See index.html for an example.

###Native JavaScript Usage
For usage without jQuery, simply initiate the object with this:

    app.SickHolder.init();


###jQuery Usage
For jQuery, attach the .sickholder() method to a jQuery select:
    
    $('input').sickholder();

##The Future
Updates will be coming soon, and will include more support as well as config options (padding and the like).
