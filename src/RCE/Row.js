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