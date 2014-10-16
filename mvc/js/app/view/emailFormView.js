/**
 * Created by jameslove on 13/10/2014.
 */
define(function() {
    'use strict';
    function EmailFormView(observer) {

        //create DOM elements

        this.form = document.createElement('form');
        this.input = document.createElement('input');
        this.button = document.createElement('button');

        //set attributes on elements
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('placeholder', 'New email address');
        //
        this.button.setAttribute('type', 'submit');
        this.button.innerHTML = 'Add';
        this.observer = observer;
    }

    /*
     *
     *
     *
     *
     */
    EmailFormView.prototype.render = function () {

        //create form from tge declared elements

        this.form.appendChild(this.input);
        this.form.appendChild(this.button);

        //Append  form to body
        document.body.appendChild(this.form);
        //call to bindEvents
        this.bindEvents();
    };
    /*
     *
     *
     *
     *
     */
    EmailFormView.prototype.bindEvents = function () {

        //cache this for use inside the event handlers
        var that = this;

        this.form.addEventListener('submit', function (e) {

            e.preventDefault();
            //broadcast an event - passing across the email address added
            that.observer.publish('view.email-view.add', that.input.value);

        }, false);
        // define method to handle a publish event from the Model when a a new email address has been added

        this.observer.subscribe('model.email-address.add', function () {

            that.clearInputField();
        });

    };
    /*
     *
     *
     *
     *
     */
    EmailFormView.prototype.clearField = function () {

        this.input.value = '';
    };

    return EmailFormView;
});
