/**
 * Created by jameslove on 13/10/2014.
 */

function EmailFormView(){
    'use strict';
    //create DOM elements
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.button = document.createElement('button');

    //set attributes on elements
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('placeholder', 'New email address');
    //
    this.button.setAttribute('type', 'submit');
    this.button.innerHTML('Add');
};


EmailFormView.prototype.render = function(){
    'use strict';
     //create form from tge declared elements
     this.form.appendChild(this.input);
     this.form.appendChild(this.button);
    //Append  form to body
    document.body.appendChild(this.form);
    //call to bindEvnts
    this.bindEvents();
};

EmailFormView.prototype.bindEvents = function(){
    'use strict';
    //cache this for use inside the event handlers
    var that = this;

    this.form.addEventListener('submit',function(e){

        e.preventDefault();
        //broadcast an event - passing across the email address added
        observer.publish('view.email-view.add',this.input.value);

    }, false);
   // define method to handle a publish event from the Model when a a new email address has been added

    observer.subscribe('model.email-address.add', function(){

            that.clearInputField();
    });

};

EmailFormView.prototype.clearField = function(){
    'use strict';
     this.input.value = '';
};

//CREATE A VIEW  FOR A LIST OF ALL EMAILS - WITH A REMOVE LINK ADJACENT TO EACH EMAIL ADDRESS

function EmailListView (){
    'use strict';
    this.list= document.createElement('ul');
    this.listItem = document.createElement('li');
    this.listItemText = document.createElement('span');
    this.listItemRemoveButton = document.createElement('button');
}

EmailListView.prototype.render = function(modelData){
    'use strict';
    var index = 0,
        length = modelData.length,
        email;
    //loop through email modelData containing list of all emails - create an li for each -  and append it to the ul

    for(;index < length ; index++){

        email= modelData[index];

        this.list.appendChild(this.createListItem (email));
    }
    //bind event handlers
    this.bindEvents();

};

EmailListView.prototype.createListItem = function(email) {
    'use strict';
    //clone existing elements first, as this is more efficient than creating new ones each time

    var listItem = this.listItem.cloneNode(false),
        listItemText =  this.listItemText.cloneNode(false),
        listItemRemoveButton =  this.listItemRemoveButton.cloneNode(true);
        //add a data-attribute  - 'data-email' to the li and populate wtoh the email address the li containes
        listItem.setAttribute("data-email", email);
        listItemRemoveButton.setAttribute("data-email", email);


};

EmailListView.prototype.bindEvents =  function(){
    'use strict';
    var that = this;
    //create an event delegate on the list - to handle clicks on the button within the list item itself
    this.list.addEventListener("click", function(evt) {
        if (evt.target && evt.target.tagName === "BUTTON") {

            // When the <button> is clicked, broadcast a system-wide event which will be
            // picked up by the Controller. Pass the email address associated with the
            // <button> to the event
            observer.publish("view.email-view.remove", evt.target.getAttribute("data-email"));
        }
    }, false);
    // Listen for the event fired by the Model indicating that a new email address has
    // been added, and execute the addEmail() method
    observer.subscribe("model.email-address.added", function(email) {
        that.addEmail(email);
    });

    // Listen for the event fired by the Model indicating that an email address has been
    // removed, and execute the removeEmail() method
    observer.subscribe("model.email-address.removed", function(email) {
        that.removeEmail(email);
    });
};

EmailListView.prototype.removeEmail = function(mail){
    'use strict';
    var listItems = this.list.getElementsByTagName("li"),
        index = 0,
        length = listItems.length;

    // Loop through all the list items, locating the one representing the provided email
    // address, and removing it once found
    for (; index < length; index++) {
        if (listItems[index].getAttribute("data-email") === mail) {
            this.list.removeChild(listItems[index]);

            // Once we've removed the email address, stop the for loop from executing
            break;
        }
    }
};


// Define a generic View which can contain child Views. When its render() method is called, it
// calls the render() methods of its child Views in turn, passing along any Model data
// provided upon instantiation
function EmailView(views) {
    this.views = views || [];
}

EmailView.prototype = {

    // All Views need to have a render() method - in the case of this generic View, it simply
    // executes the render() method of each of its child Views
    render: function(modelData) {
        var index = 0,
            length = this.views.length;

        // Loop through the child views, executing their render() methods, passing along any
        // Model data provided upon instantiation
        for (; index < length; index++) {
            this.views[index].render(modelData);
        }
    }
};