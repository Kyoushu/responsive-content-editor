if(typeof RCE === 'undefined') var RCE = {};

RCE.Column = (function(){

    var Column = function(widget){
        this.widget = widget;
    };

    Column.prototype.widget = null;

    /**
     * @returns {object}
     */
    Column.prototype.getState = function()
    {
        var state = {'widget': null};

        if(this.widget){
            state.widget = this.widget.getState();
        }

        return state;
    };

    /**
     * @param {state} state
     */
    Column.prototype.setState = function(state)
    {
        // @todo
    };

    return Column;

})();
if(typeof RCE === 'undefined') var RCE = {};

RCE.Editor = (function(){

    var Editor = function(){
    };

    Editor.prototype.rows = [];

    Editor.prototype.config = {};

    /**
     * @returns {object}
     */
    Editor.prototype.getState = function(){

        var state = {
            'config': this.config,
            'rows': []
        };

        $.each(this.rows, function(index, row){
            state.rows.push(row.getState());
        });

        return state;

    };

    /**
     * @param {object} state
     */
    Editor.prototype.setState = function(state)
    {
        // @todo
    };

    // @todo register widget
    // @todo create widget instance (name, context)

    return Editor;

})();
if(typeof RCE === 'undefined') var RCE = {};

RCE.Row = (function(){

    var Row = function(){
    };

    /**
     * @returns {object}
     */
    Row.prototype.getState = function()
    {
        var state = {'columns': []};

        $.each(this.columns, function(index, column){
            state.columns.push(column.getState());
        });

        return state;
    };

    /**
     * @param {object} state
     */
    Row.prototype.setState = function(state)
    {
        // @todo
    };

    Row.prototype.columns = [];

    return Row;

})();
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