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