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