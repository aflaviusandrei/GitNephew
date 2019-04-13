function isValid(element) {
    return element.name && element.value;
}

function formToJSON(input) {
    var data = {};

    for(var i = 0; i < input.length; i++) {
        var item = input.elements.item(i);
        if(isValid(item)) {
            data[item.name] = item.value;
        }
    }
    return data;
}