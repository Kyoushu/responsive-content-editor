RCE.Utils = (function(){

    /**
     * @returns {string}
     */
    function createUUID()
    {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
     * @param {Object} _object
     * @returns {string}
     */
    function getObjectUUID(_object)
    {
        if(typeof _object._UUID === 'undefined'){
            _object._UUID = createUUID();
        }
        return _object._UUID;
    }

    /**
     * @param {Array} _array
     * @param {Object} _object
     * @returns {*}
     */
    function getArrayObjectIndex(_array, _object)
    {
        var matchedIndex = null;
        var UUID = getObjectUUID(_object);
        $.each(_array, function(index, otherObject){
            if(getObjectUUID(otherObject) === UUID){
                matchedIndex = index;
                return false;
            }
        });
        if(matchedIndex === null) throw 'object not found in array';
        return matchedIndex;
    }

    /**
     * @param {Array} _array
     * @param {Object} _object
     * @param {number} direction
     */
    function moveArrayObject(_array, _object, direction)
    {
        direction = parseInt(direction);
        if(direction === 0) return _array;

        if(direction < -1) direction = -1;
        if(direction > 1) direction = 1;

        var oldIndex = getArrayObjectIndex(_array, _object);
        var newIndex = oldIndex + direction;

        if(typeof _array[newIndex] === 'undefined') return _array;

        _array[oldIndex] = _array[newIndex];
        _array[newIndex] = _object;

        return _array;
    }

    return {
        'getObjectUUID': getObjectUUID,
        'createUUID': createUUID,
        'getArrayObjectIndex': getArrayObjectIndex,
        'moveArrayObject': moveArrayObject
    }

})();