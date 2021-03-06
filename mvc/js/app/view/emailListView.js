define(function(){
    'use strict';
    //CREATE A VIEW  FOR A LIST OF ALL EMAILS - WITH A REMOVE LINK ADJACENT TO EACH EMAIL ADDRESS
    function EmailListView (observer){
        'use strict';
        this.observer = observer;
        this.list = document.createElement('ul');
        this.listItem = document.createElement('li');
        this.listItemText = document.createElement('span');
        this.listItemRemoveButton = document.createElement('button');
    }
    /*
     *
     *
     *
     *
     */
     EmailListView.prototype.render = function (modelData) {

        var index = 0,
            length = modelData.length,
            email;
        //loop through email modelData containing list of all emails - create an li for each -  and append it to the ul
        console.log("this list" + this.list)
        for (; index < length; index++) {

            email = modelData[index];

            this.list.appendChild(this.createListItem(email));
        }

        document.body.appendChild(this.list);
        //bind event handlers
        this.bindEvents();

    };
    /*
     *
     *
     *
     *
     */
    EmailListView.prototype.createListItem = function (email) {

        //clone existing elements first, as this is more efficient than creating new ones each time

        var listItem = this.listItem.cloneNode(false),
            listItemText = this.listItemText.cloneNode(false),
            listItemRemoveButton = this.listItemRemoveButton.cloneNode(true);
        //add a data-attribute  - 'data-email' to the li and populate wtoh the email address the li containes
        listItem.setAttribute("data-email", email);
        listItemRemoveButton.setAttribute("data-email", email);
        listItemText.innerHTML = email;
        listItem.appendChild(listItemText).appendChild(listItemRemoveButton);

        return listItem;

    };
    /*
     *
     *
     *
     *
     */
    EmailListView.prototype.bindEvents = function () {

        var that = this;
        //create an event delegate on the list - to handle clicks on the button within the list item itself
        this.list.addEventListener("click", function (evt) {
            if (evt.target && evt.target.tagName === "BUTTON") {

                // When the <button> is clicked, broadcast a system-wide event which will be
                // picked up by the Controller. Pass the email address associated with the
                // <button> to the event
                that.observer.publish("view.email-view.remove", evt.target.getAttribute("data-email"));
            }
        }, false);
        // Listen for the event fired by the Model indicating that a new email address has
        // been added, and execute the addEmail() method
        this.observer.subscribe("model.email-address.added", function (email) {
            that.addEmail(email);
        });

        // Listen for the event fired by the Model indicating that an email address has been
        // removed, and execute the removeEmail() method
        this.observer.subscribe('model.email-address.remove', function (email) {
            that.removeEmail(email);
        });
    };

    EmailListView.prototype.addEmail = function (email) {


        this.list.insertBefore(this.createListItem(email), this.list.firstChild);

    };
    /*
     *
     *
     *
     *
     */
    EmailListView.prototype.removeEmail = function (mail) {

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

    return EmailListView;
});