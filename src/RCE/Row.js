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
        column.row = this;
    };

    /**
     * @param {RCE.Column} column
     * @todo
     */
    Row.prototype.moveColumnLeft = function(column)
    {
    };

    /**
     * @param {RCE.Column} column
     * @todo
     */
    Row.prototype.moveColumnRight = function(column)
    {
    };

    return Row;

})();