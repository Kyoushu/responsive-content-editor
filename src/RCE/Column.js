if(typeof RCE === 'undefined') var RCE = {};

RCE.Column = (function(){

    var Column = function(widget){
        if(typeof widget === 'undefined') widget = null;
        this.widget = widget;
    };

    /**
     * @type {null|RCE.Widget}
     */
    Column.prototype.widget = null;

    /**
     * @type {null|RCE.Row}
     */
    Column.prototype.row = null;

    /**
     * @returns {Object.<string, *>}
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
     * @param {Object.<string, *>} state
     */
    Column.prototype.setState = function(state)
    {
        if(state.widget){
            var widget = this.row.editor.createWidget(state.widget.name);
            widget.setState(state.widget);
            this.widget = widget;
        }
    };

    return Column;

})();