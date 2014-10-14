
//constructor with prototype
function EmailModel(){
  'use strict';
  //create a storage array for the email addresses
  this.emailAdresses = data || [];
}


EmailModel.prototype = {

    // add a new email address to the emailAddresses array
    add:function(email){
        'use strict';
        this.emailAdresses.unshift(email);

        //create broad event indicating that a new email address has been added and pass the new email address to all objects
        //listening for an add  event

        observer.publish('model.email-address.added', email)

    },
    //allow removal of an email from the emailAddresses array
    remove: function(email){
        'use strict';
        var index= 0,
            length = this.emailAddresses.length;

        for (;index < length ; index++){

             if(this.emailAddresses[index] === email){

                 this.emailAdresses.splice(index,1);

                 // broadcast deletion event and pass across the email address that was delted to object listening for a remove event

                 observer.publish('model.email-address.remove', email)

                 break;

             }
        }
    },
    //return the complete list of  all emails i.e. return the emailAddresses array
    getAll:function(){
        'use strict';
        return this.emailAdresses;
    }
};