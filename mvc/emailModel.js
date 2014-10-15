
//constructor with prototype
function EmailModel(data,observer){
  'use strict';
  //create a storage array for the email addresses
  this.emailAddresses = data || [];
    this.observer = observer;
}

/*
 *
 *
 *
 *
 */
EmailModel.prototype.add = function(email) {
    'use strict';
    this.emailAddresses.unshift(email);

    //create broadcast event indicating that a new email address has been added and pass the new email address to all objects
    //listening for the   event

    this.observer.publish('model.email-address.added', email);
};
/*
 *
 *
 *
 *
 */
EmailModel.prototype.remove = function(email) {
    'use strict';
    var index = 0,
        length = this.emailAddresses.length;

    for (; index < length; index++) {

        if (this.emailAddresses[index] === email) {

            this.emailAddresses.splice(index, 1);

            // broadcast deletion event and pass across the email address that was delted to object listening for a remove event

            this.observer.publish('model.email-address.remove', email);

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
    return this.emailAddresses;

};

