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