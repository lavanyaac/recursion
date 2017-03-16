// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(className) {
  var elementsList = [];
  getElementsByClassHelper(document.body, className)
  return elementsList;

  function getElementsByClassHelper(obj, className){
  	var classList = obj.classList;
	if(classList !== undefined && classList.length !== 0 ){
		if(classList.contains(className)){
			elementsList.push(obj);
		}
	}

  	var childElements = obj.childNodes;
  	if(childElements.length === 0){
  		return;
  	}

  	for(var everyObject of childElements){
  		getElementsByClassHelper(everyObject, className);
  	}
  }  
};
