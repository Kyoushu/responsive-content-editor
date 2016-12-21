RCE.Views.EditorView = (function(){

    /**
     * @param {Object|undefined} context
     * @constructor
     */
    var EditorView = function(context)
    {
        RCE.Views.View.call(this,arguments); // Extend base view
    };

    /**
     * @return {jQuery}
     */
    EditorView.prototype.render = function()
    {
        /** @var {RCE.Editor} editor */
        var editor = this.context;

        var container = $('<div>').addClass('rce-editor');

        var rowsContainer = $('<div>').addClass('rce-editor--rows');
        container.append(rowsContainer);

        return container;

    };

    return EditorView;

})();