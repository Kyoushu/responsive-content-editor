RCE.Views.View = (function(){

    /**
     * @param {Object|undefined} context
     * @constructor
     */
    var View = function(context)
    {
        if(typeof context === 'undefined') context = {};
        this.context = context;
    };

    /**
     * @type {Object}
     */
    View.prototype.context = null;

    /**
     * @return {jQuery}
     */
    View.prototype.render = function()
    {
    };

    return View;

})();