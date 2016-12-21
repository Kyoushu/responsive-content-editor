if(typeof RCE === 'undefined') var RCE = {};

RCE.Column = (function(){

    var Column = function(widget){
        if(typeof widget === 'undefined') widget = null;
        this.widget = widget;
        this.spans = {};
    };

    /**
     * @type {null|RCE.Widget}
     */
    Column.prototype.widget = null;

    /**
     * @type {null|Object.<string, number>}
     */
    Column.prototype.spans = null;

    /**
     * @type {null|RCE.Row}
     */
    Column.prototype.row = null;

    /**
     * @returns {Object.<string, *>}
     */
    Column.prototype.getState = function()
    {
        var state = {'widget': null, 'spans': this.spans};

        if(this.widget){
            state.widget = this.widget.getState();
        }

        return state;
    };

    /**
     * @param {string} name
     * @param {number} span
     */
    Column.prototype.setSpan = function(name, span)
    {
        this.spans[name] = span;
    };

    /**
     * @param {Object.<string, *>} state
     */
    Column.prototype.setState = function(state)
    {
        this.spans = state.spans;

        if(state.widget){
            var widget = this.row.editor.createWidget(state.widget.name);
            widget.setState(state.widget);
            this.widget = widget;
        }
    };

    return Column;

})();
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

        this.config = $.extend({}, defaults, state.config);
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
     */
    Editor.prototype.moveRowUp = function(row)
    {
        this.rows = RCE.Utils.moveArrayObject(this.rows, row, -1);
    };

    /**
     * @param {RCE.Row} row
     */
    Editor.prototype.moveRowDown = function(row)
    {
        this.rows = RCE.Utils.moveArrayObject(this.rows, row, 1);
    };

    return Editor;

})();
if(typeof RCE === 'undefined') var RCE = {};

RCE.Row = (function(){

    var Row = function(){
    };

    /**
     * @type {null|RCE.Editor}
     */
    Row.prototype.editor = null;

    /**
     * @type {Array.<RCE.Column>}
     */
    Row.prototype.columns = [];

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
        var row = this;

        this.columns = [];

        $.each(state.columns, function(index, columnState){
            var column = new RCE.Column();
            row.addColumn(column);
            column.setState(columnState);
        });
    };

    /**
     * @param {RCE.Column} column
     */
    Row.prototype.addColumn = function(column)
    {
        this.columns.push(column);

        // Set new columns to full grid width
        column.setSpan('small', this.editor.config.grid_columns);
        column.setSpan('medium', this.editor.config.grid_columns);
        column.setSpan('large', this.editor.config.grid_columns);

        column.row = this;
    };

    /**
     * @param {RCE.Column} column
     */
    Row.prototype.moveColumnLeft = function(column)
    {
        this.rows = RCE.Utils.moveArrayObject(this.columns, column, -1);
    };

    /**
     * @param {RCE.Column} column
     */
    Row.prototype.moveColumnRight = function(column)
    {
        this.rows = RCE.Utils.moveArrayObject(this.columns, column, 1);
    };

    return Row;

})();
if(typeof RCE === 'undefined') var RCE = {};

RCE.Utils = (function(){

    /**
     * @returns {string}
     */
    function createUUID()
    {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
     * @param {Object} _object
     * @returns {string}
     */
    function getObjectUUID(_object)
    {
        if(typeof _object._UUID === 'undefined'){
            _object._UUID = createUUID();
        }
        return _object._UUID;
    }

    /**
     * @param {Array} _array
     * @param {Object} _object
     * @returns {*}
     */
    function getArrayObjectIndex(_array, _object)
    {
        var matchedIndex = null;
        var UUID = getObjectUUID(_object);
        $.each(_array, function(index, otherObject){
            if(getObjectUUID(otherObject) === UUID){
                matchedIndex = index;
                return false;
            }
        });
        if(matchedIndex === null) throw 'object not found in array';
        return matchedIndex;
    }

    /**
     * @param {Array} _array
     * @param {Object} _object
     * @param {number} direction
     * @todo
     */
    function moveArrayObject(_array, _object, direction)
    {
        direction = parseInt(direction);
        if(direction === 0) return _array;

        if(direction < -1) direction = -1;
        if(direction > 1) direction = 1;

        var oldIndex = getArrayObjectIndex(_array, _object);
        var newIndex = oldIndex + direction;

        if(typeof _array[newIndex] === 'undefined') return _array;

        _array[oldIndex] = _array[newIndex];
        _array[newIndex] = _object;

        return _array;
    }

    return {
        'getObjectUUID': getObjectUUID,
        'createUUID': createUUID,
        'getArrayObjectIndex': getArrayObjectIndex,
        'moveArrayObject': moveArrayObject
    }

})();
if(typeof RCE === 'undefined') var RCE = {};

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
        this.name = state.name;
        this.context = state.context;
    };

    return Widget;

})();