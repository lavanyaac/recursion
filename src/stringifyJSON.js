// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var objType = typeof(obj);
  if(objType === 'function' || objType === 'undefined'){
  	return;
  }
  if(objType === 'string'){
  	return '"'+obj+'"';
  }
  if(objType === 'boolean' || objType === 'number'){
  	return obj["toString"]();
  }
  if(objType === 'object'){
  	if(Array.isArray(obj)){
  		return stringifyArray(obj);
  	}else{
  		return stringifyObject(obj);
  	}
  }  
};

function stringifyObject(input){
	var output = '{';
	if(input === null){
		return "null";
	}
	for(var key in input){
		var computed = stringifyJSON(input[key])
		if(computed){
			output += stringifyJSON(key) + ':' + computed + ',';
		}
	}
	output = (output === '{') ? '{}' : output.slice(0,-1) + '}'
	return output;
}

function stringifyArray(input){
	var output = '[';
	for(var val of input){
		var computed = stringifyJSON(val);
		if(computed){
			output += computed + ',';
		}
	}
	output = (output === '[') ? '[]' : output.slice(0,-1) + ']'
	return output;
}




