if(typeof RCE === 'undefined') var RCE = {};

RCE.Column = (function(){

    var Column = function(widget){
        this.widget = widget;
    };

    Column.prototype.widget = null;

    return Column;

})();
if(typeof RCE === 'undefined') var RCE = {};

RCE.Editor = (function(){

    var Editor = function(){
    };

    Editor.prototype.rows = [];

    Editor.prototype.config = {};

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

    return Editor;

})();
if(typeof RCE === 'undefined') var RCE = {};

RCE.Row = (function(){

    var Row = function(){
    };

    Row.prototype.columns = [];

    return Row;

})();
if(typeof RCE === 'undefined') var RCE = {};

RCE.Widget = (function(){

    var Widget = function(){

    };

    /**
     * @param {object} context
     * @return {object} single jQuery element containing a preview
     */
    Widget.prototype.createPreview = function(context)
    {

    };

    /**
     * @param {object} context
     * @return {object} single jQuery element containing an editor for the widget context
     */
    Widget.prototype.createEditor = function(context)
    {

    };

    return Widget;

})();