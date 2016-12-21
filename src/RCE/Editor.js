if(typeof RCE === 'undefined') var RCE = {};

RCE.Editor = (function(){

    var defaults = {
        'grid_columns': 12
    };

    /**
     * @param {object} inputElement a single jQuery element for a form text input
     * @param {object} config
     * @constructor
     */
    var Editor = function(inputElement, config){

        if(typeof inputElement === 'undefined') throw 'No inputElement was provided';
        if(inputElement.length === 0) throw 'inputElement is empty';
        if(inputElement.length > 1) throw 'inputElement contains more than one element';

        if(typeof config === 'undefined') config = {};
        config = $.extend({}, defaults, config);
        this.config = config;

        this.widgets = {};

    };

    Editor.prototype.inputElement = null;
    Editor.prototype.config = null;

    /**
     * @type {Object.<string, RCE.Widget>}
     */
    Editor.prototype.widgets = null;

    /**
     * @type {Array.<RCE.Row>}
     */
    Editor.prototype.rows = [];

    /**
     * @returns {Object.<string, *>}
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
     * @param {Object.<string, *>} state
     */
    Editor.prototype.setState = function(state)
    {
        var editor = this;

        this.config = state.config;
        this.rows = [];

        $.each(state.rows, function(index, rowState){
            var row = new RCE.Row();
            editor.push(row);
            row.setState(rowState);
        });
    };

    /**
     * @todo
     */
    Editor.prototype.saveStateToInputElement = function()
    {
    };

    /**
     * @todo
     */
    Editor.prototype.loadStateFromInputElement = function()
    {
    };

    /**
     * @param {RCE.Widget} widget
     */
    Editor.prototype.registerWidget = function(widget)
    {
        this.widgets[widget.name] = widget;
    };

    /**
     * @param {string} name
     * @returns {RCE.Widget}
     * @throws error if named widget could not be found
     */
    Editor.prototype.findWidgetByName = function(name)
    {
        if(typeof this.widgets[name] === 'undefined') throw 'widget named ' + name + ' could not be found';
        return this.widgets[name];
    };

    /**
     * @param {string} name
     * @param {Object.<string, *>} context
     * @returns {RCE.Widget}
     */
    Editor.prototype.createWidget = function(name, context)
    {
        var widget = this.findWidgetByName(name);
        return new widget(context);
    };

    /**
     * @returns {RCE.Row}
     */
    Editor.prototype.createRow = function()
    {
        return new RCE.Row();
    };

    /**
     * @param {RCE.Row} row
     */
    Editor.prototype.addRow = function(row)
    {
        row.editor = this;
        this.rows.push(row);
    };

    /**
     * @param {RCE.Row} row
     * @todo
     */
    Editor.prototype.moveRowUp = function(row)
    {
    };

    /**
     * @param {RCE.Row} row
     * @todo
     */
    Editor.prototype.moveRowDown = function(row)
    {
    };

    return Editor;

})();