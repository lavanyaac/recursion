// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
//pseudocode
//
var parseJSON = function(json) {
    var json = json.trim();
    var index = 0;
    var char = json[index];

    return value();

    function error(msg) {
        throw new SyntaxError(msg);
    }

    function value() {
        switch (char) {

            case ("\""):
                return checkString();
            case ("t"):
            case ("f"):
                return checkBoolean();
            case ("n"):
                return checkNull();
            case ("{"):
                return checkObject();
            case ("["):
                return checkArray();
            default:
                if (char === '-' || (char >= 0 && char <= 9)) {
                    return checkNumber();
                } else {
                    error("Unknown char: \"" + char + "\" , at index: " + index);
                }
        }
    }

    function next() {
        index++;
        char = json[index];

        return char;
    }

    function ignoreWhiteSpace() {
        while (char && " \t\n\r".includes(char)) {
            next();
        }
    }

    function checkBoolean() {
        var result = "";
        limit = (char === "t") ? 4 : 5;
        for (var i = 0; i < limit; i++) {
            result += char;
            next();
        }
        if (result === "true") {
            return true
        };
        if (result === "false") {
            return false
        };
        error("Bad Boolean: " + result);
    }

    function checkNull() {
        var result = "";
        for (var i = 0; i < 4; i++) {
            result += char;
            next();
        }
        if (result === "null") {
            return null
        };
        error("Bad Null object: " + result);
    }

    function checkString() {
        //console.log("inside string")
        var escapeRef = {
            "\\": "\\",
            "\"": "\"",
            "t": "\t",
            "r": "\r",
            "b": "\b",
            "n": "\n",
            "f": "\f"
        }
        var result = "";
        next();

        while (char) {
            if (char === "\"") {
                next();
                return result;
            }
            if (char === "\\") {
                next();
                if (escapeRef[char]) {
                    result += escapeRef[char];
                }
            } else {
                result += char;
            }
            next();
        }
        error("Bad String - Missing quotation marks")
    }

    function getNumbers() {
        var result = "";
        while (char >= 0 && char <= 9) {
            result += char;
            next();
        }
        return result;
    }

    function checkNumber() {
        var result = "";
        if (char === "-") {
            result += char;
            next();
        }
        var numString = getNumbers();
        numString !== "" ? result += numString : error("Bad Number");

        if (char === ".") {
            result += char;
            next();
            numString = getNumbers();
            numString !== "" ? result += numString : error("Bad Number - No number after decimal point");
        }
        result = Number(result);
        return isNaN(result) ? error("Bad Number") : result;
    }

    function checkArray() {
        var result = [];
        next();

        while (char) {
            ignoreWhiteSpace();
            if (char === "]") {
                next();
                return result;
            }
            result.push(value());
            ignoreWhiteSpace();
            if (char === "," || char === "]") {
                if (char === ",") {
                    next();
                }
            } else {
                error("Bad Array - Missing comma or Bracket");
            }
        }
        error("Bad Array - Missing Bracket");
    }

    function checkObject() {
        var result = {};
        var key;
        next();

        while (char) {
            ignoreWhiteSpace();
            if (char === "}") {
                next();
                return result;
            }
            ignoreWhiteSpace();
            key = value();
            ignoreWhiteSpace();
            char === ":" ? (next(), ignoreWhiteSpace(), result[key] = value()) : error("Bad Object - Missing colon");
            ignoreWhiteSpace();
            if (char === "," || char === "}") {
                if (char === ",") { next(); }
            } else {
                error("Bad Object - Missing comma or Bracket");
            }
        }
        error("Bad Object - Missing Bracket");
    }

}
