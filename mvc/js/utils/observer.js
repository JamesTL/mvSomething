/**
 * Created by jameslove on 14/10/2014.
 */
// Define an object containing global publish(), subscribe(), and unsubscribe() methods to  implement the observer pattern

define(function(){

    'use strict';
    function  Observer (){

       //to hold registered events together with callbacks if necessary
       this.events = {};
    }
    /*
     *
     *
     *
     *
     */

    Observer.prototype.subscribe = function(eventname, callback){


        //create an array entry for new events - by checking event names' existance in the events array
        if(!this.events.hasOwnProperty(eventname)){

            this.events[eventname] = [];
        }

        //add call back function to the eventname array in the events array
        this.events[eventname].push(callback);

    };
    /*
     *
     *
     *
     *
     */
    Observer.prototype.unsubscribe = function(eventname, callback){


        var index = 0,
            length = 0;
        ///iterate and remove the eventame array if found
        if(this.events.hasOwnProperty(eventname)) {
            length = this.events[eventname].length;

            for (; index < length; index++) {

                if( this.events[eventname][index] === callback){
                    //splice will remove  a single item  at specified index value)
                    this.events[eventname].splice(index,1);
                    break;
                }
            }
        }
    };
    /*
     *
     *
     *
     *
     */
    Observer.prototype.publish = function(eventname){


        //will be passing in data to this function as extra argument(s)- therefore will have to  store it in a variable

        var data = Array.prototype.slice.call(arguments,1),
            index = 0,
            length = 0;
        //find array eletnts that match the eventmane
        if(this.events.hasOwnProperty(eventname)){

            length = this.events[eventname].length;

            // for each eventname  - iterate over nested array which holds the  the callback  functions  registered to this event

            for(;index < length ;index++){
                //invoke the callback function - use apply method to send 'this' context and data passed when event was broadcast
                this.events[eventname][index].apply(this,data);
            }
        }
    };

    return Observer;
 });

