/**
 * Created by jameslove on 16/10/2014.
 */

define(function(){
     'use strict';

    // Define a generic View which can contain child Views. When its render() method is called, it calls the render() methods of its child Views in turn, passing along any Model data provided upon instantiation
    function EmailView(views) {

        this.views = views || [];
    }

    /*
     *
     *
     *
     *
     */
    EmailView.prototype.render = function (modelData) {
        var index = 0,
            length = this.views.length;

        // Loop through the child views, executing their render() methods, passing along any
        // Model data provided upon instantiation
        for (; index < length; index++) {
            this.views[index].render(modelData);
        }
    };
    return EmailView;
});



