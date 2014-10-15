/**
 * Created by jameslove on 13/10/2014.
 */
function EmailController(model,view,observer){
    'use strict';
    this.model = model;
    this.view = view;
    this.observer = observer;
}
/*
 *
 *
 *
 *
 */
EmailController.prototype.initalise = function(){
     'use strict';

    var modelData = this.model.getAll();
    this.view.render(modelData);
    this.bindEvents();
};
/*
 *
 *
 *
 *
 */
EmailController.prototype.bindEvents = function(){

   'use strict';
    var that = this;

    //view indicates that a new email address has been added via the user - call the  add email method

    this.observer.subscribe('view.email-view.add',function(email){

       that.addEmail(email);
    });
    //when the view indicates that anemail address has been removed via the user -  call the remove email method

    this.observer.subscribe('view.email-view.remove',function(email){

         that.removeEmail(email);
    });
};
/*
 *
 *
 *
 *
 */
EmailController.prototype.addEmail = function(email){
    'use strict';
    this.model.add(email);
};
/*
 *
 *
 *
 *
 */
EmailController.prototype.removeEmail = function(email){
    'use strict';
    this.model.remove(email);
};