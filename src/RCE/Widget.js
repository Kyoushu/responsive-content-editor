if(typeof RCE === 'undefined') var RCE = {};

RCE.Widget = (function(){

    var Widget = function(){

    };

    Widget.prototype.name = null;

    Widget.prototype.context = {};

    /**
     * @return {object} single jQuery element containing a preview
     */
    Widget.prototype.createPreview = function()
    {
        // @todo
    };

    /**
     * @return {object} single jQuery element containing an editor for the widget context
     */
    Widget.prototype.createEditor = function()
    {
        // @todo
    };

    /**
     * @returns {object}
     */
    Widget.prototype.getState = function()
    {
        return {'name': this.name, 'context': this.context};
    };

    /**
     * @param {object} state
     */
    Widget.prototype.setState = function(state)
    {
        // @todo
    };

    return Widget;

})();