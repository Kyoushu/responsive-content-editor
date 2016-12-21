(function(){

    var inputElement = $('#responsive-content');
    var editor;
    var widget;

    QUnit.test('find input element', function(assert){
        assert.ok(inputElement.length === 1);
    });

    QUnit.test('initialise editor', function(assert){
        editor = new RCE.Editor(inputElement, {
            'grid_columns': 16
        });
        assert.ok(true);
    });

    QUnit.test('initial editor state', function(assert){

        var state = editor.getState();

        assert.deepEqual(
            {
                "config": {
                    "grid_columns": 16
                },
                "rows": []
            },
            state
        );

    });

    QUnit.test('register widget', function(assert){

        var widget = new RCE.Widget();

        widget.name = 'foo_widget';





    });

})();