type validatableValue = string | number | undefined | null;
type emptyValue = undefined | null | "";

export type validator = (value: validatableValue) => IValidationResult;

interface IValidationResult {
    valid: boolean;
    text: string;
}

// validate validates input over a set of given validators. It returns the return value of the
// validator as soon as the first validator fails.
export const validate = (input: string, validators: validator[]): IValidationResult => {
    for (let i = 0; i < validators.length; i++) {
        const validator = validators[i];
        const result = validator(input);

        // Stop as soon when the first validator failes
        if (!result.valid) {
            return result;
        }
    }

    return validResult();
};

/**
 *  required returns a validator that will return a valid result when the value is
 *  not empty. An empty value is `null`, `undefined or `""` (an empty string).
 * 
 * @param {string} errorText Optional string containing the message that will be returned when the value is not valid. If this is not provided a default will be used.
 * @returns {validator}
 */
export const required = (errorText?: string): validator => {
    let text = "This field is required";
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
        if (emptyValue(value)) {
            return invalidResult(text);
        }
        return validResult();
    };
};

/**
 * integer returns a validator that will return a valid result when the value is an integer.
 * 
 *  The provided value may be Number or a string. For example `123` and `"123"` are both considered valid.
 * 
 *  If an empty value is provided, the validator will also return a valid result.
 *  The required` validator can be used before this one if the value should not be empty.
 * 
 * @param {string} errorText Optional string containing the message that will be returned when the value is not valid. If this is not provided a default will be used.
 * @returns {validator}
 */
export const integer = (errorText?: string): validator => {
    let text = "Must be a whole number";
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
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

/**
 * float returns a validator that will return a valid result when the value is a valid float.
 * 
 *  The provided value may be Number or a string. Any whole number is also considered valid.
 *  For example `123.12`, `123` `"123.12"` and `"123"` are all considered valid. 
 * 
 *  If an empty value is provided, the validator will also return a valid result.
 *  The required` validator can be used before this one if the value should not be empty.
 * 
 * @param {number} maxDecimals maximum of decimals the number can have. By default there is no maximum.
 * @param {string} errorText Optional string containing the message that will be returned when the value is not valid. If this is not provided a default will be used.
 * @returns {validator}
 */
export const float = (maxDecimals?: number, errorText?: string): validator => {
    let regex = `^-?[0-9]+([\\.\\,][0-9]*)?$`;
    let text = `Must be a number`;

    if (maxDecimals !== undefined) {
        regex = `^-?[0-9]+(.[0-9]{1,${maxDecimals}})?$`;
        text = `Must be a number with a maximum of ${maxDecimals} decimals`;
    }

    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
        if (emptyValue(value)) {
            return validResult();
        }

        if (value.toString().match(regex)) {
            return validResult();
        }
        return invalidResult(text);
    };
};

/**
 * base returns a validator that will return a valid result when the value is a certain base, such as base16 (hexadecimal) or base2 (binary).
 * 
 *  The provided value may be number or a string. For example if the value is `FF` and the base is 16 the result will be valid.
 *  Prefixing the value with `0x` or `0b` is not supported and will result in an invalid result.
 * 
 *  If an empty value is provided, the validator will also return a valid result.
 *  The required` validator can be used before this one if the value should not be empty.
 * 
 * @param {number} base The base the value must be in, for example 2 for binary and 16 for hexadecimal.
 * @param {string} errorText Optional string containing the message that will be returned when the value is not valid. If this is not provided a default will be used.
 * @returns {validator}
 */
export const base = (base: number, errorText?: string): validator => {
    let text = `Must be a base ${base} number`;
    let regex = `^[0-${base - 1}]+$`;
    if (errorText !== undefined) {
        text = errorText;
    }

    if (base > 10) {
        const endLetter = (base - 1).toString(base);
        regex = `^[0-9a-${endLetter}A-${endLetter.toUpperCase()}]+$`;
    }

    return (value: validatableValue) => {
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

export const greaterThan = (maxVal: number, errorText?: string): validator => {
    let text = `Must be smaller than ${maxVal}`;
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
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

export const lesserThan = (minVal: number, errorText?: string): validator => {
    let text = `Must be larger than ${minVal}`;
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
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

export const macAddress = (errorText?: string): validator => {
    const pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    let text = "Not a valid MAC address";
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
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

export const ipAddress = (errorText?: string): validator => {
    const pattern = /^(?!.*\.$)((?!0\d)(1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    let text = "Not a valid IP address";
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
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

export const minLength = (min: number, errorText?: string): validator => {
    let text = `Must at least be ${min} characters long`;
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
        if (emptyValue(value)) {
            return validResult();
        }
        if (value.toString().length < min) {
            return invalidResult(text);
        }

        return validResult();
    };
};

export const maxLength = (max: number, errorText?: string): validator => {
    let text = `Must at most be ${max} characters long`;
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: validatableValue) => {
        if (emptyValue(value)) {
            return validResult();
        }
        if (value.toString().length > max) {
            return invalidResult(text);
        }

        return validResult();
    };
};

const validResult = (): IValidationResult => {
    return {valid: true, text: ""};
};

const invalidResult = (text: string): IValidationResult => {
    return {valid: false, text: text};
};

const emptyValue = (value: validatableValue): value is emptyValue => {
    return value === "" || value === undefined || value === null;
};
