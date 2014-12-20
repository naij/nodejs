function generateIterator(array) {
    var nextIndex = 0;

    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {value: undefined, done: true};
       }
    }
}

var it = generateIterator(['a', 'b']);

var arr = ['a', 'b'];
for(var [index,element] of arr.entries()) {
    console.log(index + '. ' + element);
}