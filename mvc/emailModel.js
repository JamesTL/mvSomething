
//constructor with prototype
function EmailModel(data){
  'use strict';
  //create a storage array for the email addresses
  this.emailAdresses = data || [];
}
/*
 *
 *
 *
 *
 */
EmailModel.prototype.add = function(email) {
    'use strict';
    this.emailAdresses.unshift(email);

    //create broadcast event indicating that a new email address has been added and pass the new email address to all objects
    //listening for the   event

    observer.publish('model.email-address.added', email);
};
/*
 *
 *
 *
 *
 */
EmailModel.prototype.remove = function() {
    'use strict';
    var index = 0,
        length = this.emailAddresses.length;

    for (; index < length; index++) {

        if (this.emailAddresses[index] === email) {

            this.emailAdresses.splice(index, 1);

            // broadcast deletion event and pass across the email address that was delted to object listening for a remove event

            observer.publish('model.email-address.remove', email)

            break;
         }
    }
};
/*
 *
 *
 *
 *
 */
EmailModel.prototype.getAll = function() {
    'use strict';
    return this.emailAdresses;

};

