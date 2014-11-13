function _js_debug(data) {
    var str = _js_dataToString(data,0);
    _debug(str);
}

function _js_dataToString(data,level) {
    var k;
    
    level++;
    var str = '';
    var padding = '';
    var i;
    for (i = 1; i < level * 5; i++) {
        padding += ' ';
    }
    if (typeof(data) == 'object') {
        for (k in data) {
            str += padding + k + ':' + _js_dataToString(data[k], level) + "\n";
        }
    } else {
        str = data;
    }
    return str;
}

function _debug(str) {
    if (window.console && console.log) {
        console.log(str);
    } else {


    }
}