// validate validates input over a set of given validators. It returns the return value of the
// validator as soon as the first validator fails.
export var validate = function (input, validators) {
    for (var i = 0; i < validators.length; i++) {
        var validator = validators[i];
        var result = validator(input);
        // Stop as soon when the first validator failes
        if (!result.valid) {
            return result;
        }
    }
    return validResult();
};
export var required = function (errorText) {
    var text = "This field is required";
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return invalidResult(text);
        }
        return validResult();
    };
};
export var integer = function (errorText) {
    var text = "Must be a whole number";
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        value = Number(value);
        if (!isNaN(value) && value % 1 === 0) {
            return validResult();
        }
        return invalidResult(text);
    };
};
export var float = function (maxDecimals, errorText) {
    var regex = "^-?[0-9]+(.[0-9]{1," + maxDecimals + "})?$";
    var text = "Must be a number with a maximum of " + maxDecimals + " decimals";
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        if (value.toString().match(regex)) {
            return validResult();
        }
        return invalidResult(text);
    };
};
export var base = function (base, errorText) {
    var text = "Must be a base " + base + " number";
    var regex = "^[0-" + (base - 1) + "]+$";
    if (errorText !== undefined) {
        text = errorText;
    }
    if (base > 10) {
        var endLetter = (base - 1).toString(base);
        regex = "^[0-9a-" + endLetter + "A-" + endLetter.toUpperCase() + "]+$";
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        value = value.toString();
        if (value.match(regex)) {
            return validResult();
        }
        return invalidResult(text);
    };
};
export var maxValue = function (maxVal, errorText) {
    var text = "Must be smaller than " + maxVal;
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        value = value.toString();
        if (parseInt(value, 10) > maxVal) {
            return invalidResult(text);
        }
        return validResult();
    };
};
export var minValue = function (minVal, errorText) {
    var text = "Must be larger than " + minVal;
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        value = value.toString();
        if (parseInt(value, 10) < minVal) {
            return invalidResult(text);
        }
        return validResult();
    };
};
export var macAddress = function (errorText) {
    var pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    var text = "Not a valid MAC address";
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        value = value.toString();
        if (!pattern.test(value)) {
            return invalidResult(text);
        }
        return validResult();
    };
};
export var ipAddress = function (errorText) {
    var pattern = /^(?!.*\.$)((?!0\d)(1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    var text = "Not a valid IP address";
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        value = value.toString();
        if (!pattern.test(value)) {
            return invalidResult(text);
        }
        return validResult();
    };
};
export var minLength = function (min, errorText) {
    var text = "Must at least be " + min + " characters long";
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        if (value.toString().length < min) {
            return invalidResult(text);
        }
        return validResult();
    };
};
export var maxLength = function (max, errorText) {
    var text = "Must at most be " + max + " characters long";
    if (errorText !== undefined) {
        text = errorText;
    }
    return function (value) {
        if (emptyValue(value)) {
            return validResult();
        }
        if (value.toString().length > max) {
            return invalidResult(text);
        }
        return validResult();
    };
};
var validResult = function () {
    return { valid: true, text: "" };
};
var invalidResult = function (text) {
    return { valid: false, text: text };
};
var emptyValue = function (value) {
    return value === "" || value === undefined || value === null;
};
