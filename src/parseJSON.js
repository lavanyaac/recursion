// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
//pseudocode
//
var parseJSON = function(json) {
	console.log('json input', json, json.length)
	var index, charAtIndex = '';
	while(charAtIndex !== undefined){
		next();
		return value(charAtIndex)
	}

  	function value(char){
  		switch(char){
  			case(" "):
  				break;
			case('"'):
				return checkString();
			case('f'):
			case('t'):
				return checkBoolean();
			case('n'):
				return checkNull();
			case('{'):
				return checkObject();
				break;
			case('['):
				return checkArray();
				break;
			default:
				if(charAtIndex === '-' || (charAtIndex >= 0 && charAtIndex <= 9)){
					return checkNumber();
				}else{
					console.log("Error: unknown character type: ",charAtIndex)
				}
		}
  	}

	function next(){
		index !== undefined ? index++ : index = 0;
		charAtIndex = json[index];
		//console.log(index, charAtIndex)
		if(charAtIndex === " "){
			next();
		}
	}

	function prev(){
		index !== undefined ? index-- : index = 0;
		charAtIndex = json[index];
	}

	function checkString(){
		var result = ''
		var endOfString = false
		while(charAtIndex !== undefined){
			next();
			if(charAtIndex === '"'){
				endOfString = true;
				break;
			}	
			result += charAtIndex
		}
		if(!endOfString){
			// bthrow 'syntax error'
		}
		return result;
	}

	function checkBoolean(){
		var result = "";
		var limit = (charAtIndex === 't')  ? 4 : 5 ;
		for(var i = 0; i < limit; i++){
			result += charAtIndex;
			next();
		}
		if(result === 'true'){
			return true;
		}else if(result === 'false'){
			return false;
		}else{
			//error
		}
	}

	function checkNull(){
		var result = "";
		for(var i = 0; i < 4; i++ ){
			result += charAtIndex;
			next();
		}
		if(result === 'null'){
			return null;
		}else{
			//error
		}
	}

	function checkNumber(){
		var result = charAtIndex;
		var foundDot = false;
		var charAfterDotIsNum = false;

		while(charAtIndex !== undefined && charAtIndex.match('[-.0-9]')){
			next();
			if(charAtIndex === '.' || (charAtIndex >= 0 && charAtIndex <= 9)){
				if(foundDot && !charAfterDotIsNum){
					if(!charAtIndex.match('[0-9]')){
						console.log("should throw an error");
						return;
					}else{
						charAfterDotIsNum = true;
					}
				}
				if(charAtIndex === '.'){
					if(foundDot){
						console.log("should throw an error");
						return;
					}
					foundDot = true;
				}
				if(charAtIndex === '-' && result.length > 1){
					throw new Error("unknown character: ",charAtIndex)
				}
				result += charAtIndex;
			}
		}
		if(foundDot && !charAfterDotIsNum){
			error("No number found after dot")
			return;
		}
		if(charAtIndex !== undefined){
			prev();
		}
		return Number(result);
	}

	function checkArray(){
		var result = [];
		next();
		while(charAtIndex !== undefined  &&  charAtIndex !== ']'){
			result.push(value(charAtIndex))
			next();
			if(charAtIndex === ','){
				next();
			}
		}
		if(charAtIndex === undefined){
			prev();
		}
		if(charAtIndex !== ']'){
			error("Syntaxerror");
		}
		return result;
	}

	function checkObject(){
		var result = {};
		next();
		while(charAtIndex !== undefined && charAtIndex !== '}'){
			var val = value(charAtIndex);
			next();
			if(charAtIndex === ',' || charAtIndex === '}'){
				result[key] = val;
			} 
			if(charAtIndex === ':'){
				key = val;
			}
			next();
		}
		//prev();

		if(charAtIndex === undefined){
			prev();
		}
		if(charAtIndex !== '}'){
			throw new Error("Syntaxerror")
		}
		return result;
	}
};



// a = JSON.stringify("acvb")
// console.log('stringify', a.split(''))
// b = JSON.parse(a)
// console.log(b)


// inp = JSON.stringify("acvb")
// out = parseJSON(inp)
// console.log(out, typeof out)

// inp = JSON.stringify(false)
// console.log(inp)
// out = parseJSON(inp)
// console.log(out, typeof out)

// inp = JSON.stringify(null)
// console.log(inp)
// out = parseJSON(inp)
// console.log(out, typeof out)

// inp = JSON.stringify(Math.sqrt(5))
// console.log(inp)
// out = parseJSON("0.00011999999999999999")
// console.log(out, typeof out)

// inp = JSON.stringify([-23.45, "tyyu", [4,5,[6,7],7,8]])
// console.log(inp)
// out = parseJSON(inp)
// console.log("output........", out, typeof out)

inp = JSON.stringify({})
console.log("input .....",inp)
out = parseJSON('{"foo":true}')
console.log("output........", out, typeof out)
console.log("Expected output........", JSON.parse(inp))

// subout = out[7];
// console.log(typeof subout)



