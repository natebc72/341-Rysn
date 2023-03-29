const validateInt = function(x){
    if(isNaN(parseInt(x))){
        return false;
    }
    return true;
}

const validateString = function(x){
    for(var i in x){
        if(x[i] == undefined){
            return false
        }
        else if(x[i].length === 0){
            return false;
        }
    }
    return true;
}

module.exports = {validateInt, validateString, validateEntries}