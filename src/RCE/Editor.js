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