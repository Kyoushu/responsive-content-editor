RCE.Widget = (function(){

    /**
     * @param {object|undefined} context
     * @constructor
     */
    var Widget = function(context)
    {
        if(typeof context === 'undefined') context = {};
        this.context = context;
    };

    /**
     * @type {null|string}
     */
    Widget.prototype.name = null;

    /**
     * Name to be shown in widget selector when configuring a column
     *
     * @type {null|string}
     */
    Widget.prototype.humanName = null;

    /**
     * @type {null|object}
     */
    Widget.prototype.context = null;

    /**
     * @return {object} single jQuery element containing a preview
     */
    Widget.prototype.renderPreviewElement = function()
    {
        // @todo
    };

    /**
     * @return {object} single jQuery element containing an editor for the widget context
     */
    Widget.prototype.renderContextEditorElement = function()
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
        this.name = state.name;
        this.context = state.context;
    };

    return Widget;

})();