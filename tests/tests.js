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

    QUnit.test('RCE.Utils.getArrayObjectIndex', function(assert){

        var _object = {'name': 'Bar'};
        var _array;

        _array = [_object, {'name': 'Foo'}, {'name': 'Baz'}];
        assert.equal(RCE.Utils.getArrayObjectIndex(_array, _object), 0);

        _array = [{'name': 'Foo'}, _object, {'name': 'Baz'}];
        assert.equal(RCE.Utils.getArrayObjectIndex(_array, _object), 1);

        _array = [{'name': 'Foo'}, {'name': 'Baz'}, _object];
        assert.equal(RCE.Utils.getArrayObjectIndex(_array, _object), 2);

    });

    QUnit.test('RCE.Utils.moveArrayObject', function(assert){

        var _object = {'name': 'Bar'};
        var _array;

        _array = [{'name': 'Foo'}, _object, {'name': 'Baz'}];
        _array = RCE.Utils.moveArrayObject(_array, _object, -1);

        assert.equal(_array[0].name, 'Bar');
        assert.equal(_array[1].name, 'Foo');
        assert.equal(_array[2].name, 'Baz');

        _array = [{'name': 'Foo'}, _object, {'name': 'Baz'}];
        _array = RCE.Utils.moveArrayObject(_array, _object, 1);

        assert.equal(_array[0].name, 'Foo');
        assert.equal(_array[1].name, 'Baz');
        assert.equal(_array[2].name, 'Bar');

    });

})();