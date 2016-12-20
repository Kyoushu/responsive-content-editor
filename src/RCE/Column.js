if(typeof RCE === 'undefined') var RCE = {};

RCE.Column = (function(){

    var Column = function(widget){
        this.widget = widget;
    };

    Column.prototype.widget = null;

    return Column;

})();