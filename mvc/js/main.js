/**
 * Created by jameslove on 15/10/2014.
 */

requirejs.config({

   baseUrl:'js',
   paths:{
       utils:'utils',
       view: 'app/view/',
       model:'app/model/',
       controller:'app/controller'
     }
});

requirejs(['utils/observer','model/emailModel','view/emailFormView','view/emailListView','view/EmailView','controller/emailController'],
    function(Observer,EmailModel,EmailFormView,EmailListView,EmailView,EmailController){
    'use strict';
//create an observer
    var observer = new Observer();

//create a new instance of  EmailModel - well pass in array of emails as data
    var emailModel = new  EmailModel([
            "denodell@me.com",
            "denodell@gmail.com",
            "den.odell@akqa.com"
        ],observer),

// create instances of our form View and list View "classes"
        emailFormView = new EmailFormView(observer),
        emailListView = new EmailListView(observer),

// Combine together the form and list Views as children of a single View object
        emailView = new EmailView([emailFormView, emailListView]),

// Create an instance of our email system Controller, passing it the Model instance and   the View to use.
// Note that the Controller does not need to be aware whether the View contains a single View or multiple, combined Views, as it does here - this is an example of the composite pattern in action

        emailController = new EmailController(emailModel, emailView,observer);

// Finally, initialize the Controller which gets the data from the Model and passes it to the render() method of the View, which, in turn, connects up the user interface to the system-wide events, bringing the whole application together
    emailController.initalise();
});

