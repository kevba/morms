export type validator = (value: any) => IValidationResult;

interface IValidationResult {
    valid: boolean;
    text: string;
}

// validate validates input over a set of given validators. It returns the return value of the
// validator as soon as the first validator fails.
export const validate = (input: string, validators: validator[]): IValidationResult => {
    for (let i = 0; i < validators.length; i++) {
        let validator = validators[i];
        let result = validator(input);

        // Stop as soon when the first validator failes
        if (!result.valid) {
            return result;
        }
    }

    return validResult();
};

export const required = (errorText?: string): validator => {
    let text = "This field is required";
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return invalidResult(text)
        }
        return validResult();
    };
};

export const integer = (errorText?: string): validator => {
    let text = 'Must be a whole number'
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if (!isNaN(value) && Number(value) % 1 === 0) {
            return validResult()
        }
        return invalidResult(text)
    }
}


export const float = (maxDecimals: number, errorText?: string): validator => {
    let regex = `^-?[0-9]+(.[0-9]{1,${maxDecimals}})?$`
    let text = `Must be a number with a maximum of ${maxDecimals} decimals`
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if ((value.toString()).match(regex)) {
            return validResult()
        }
        return invalidResult(text)
    }
}

export const base = (base: number, errorText?: string): validator => {
    let text = `Must be a base ${base} number`
    let regex = `^[0-${base - 1}]+$`
    if (errorText !== undefined) {
        text = errorText;
    }

    if (base > 10) {
        let endLetter = (base - 1).toString(base)
        regex = `^[0-9a-${endLetter}A-${endLetter.toUpperCase()}]+$`
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if (value.match(regex)) {
            return validResult()
        }
        return invalidResult(text)
    }
}

export const maxValue = (maxVal: number, errorText?: string): validator => {
    let text = `Must be smaller than ${maxVal}`
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if (parseInt(value, 10) > maxVal) {
            return invalidResult(text)
        }
        return validResult()
    }
}

export const minValue = (minVal: number, errorText?: string): validator => {
    let text = `Must be larger than ${minVal}`
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if (parseInt(value, 10) < minVal) {
            return invalidResult(text)
        }
        return validResult()
    }
}

export const macAddress = (errorText?: string): validator => {
    let pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    let text = 'Not a valid MAC address'
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if (!pattern.test(value)) {
            return invalidResult(text)
        }
        return validResult()
    }
}


export const ipAddress = (errorText?: string): validator => {
    let pattern = /^(?!.*\.$)((?!0\d)(1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    let text = "Not a valid IP address";
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if (!pattern.test(value)) {
            return invalidResult(text)
        }
        return validResult();
    };
};

export const minLength = (min: number, errorText?: string): validator => {
    let text = `Must at least be ${min} characters long`;
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if (value.toString().length < min) {
            return invalidResult(text)
        } 

        return validResult();
    }
}

export const maxLength = (max: number, errorText?: string): validator => {
    let text = `Must at most be ${max} characters long`;
    if (errorText !== undefined) {
        text = errorText;
    }

    return (value: any) => {
        if (emptyValue(value)) {
            return validResult()
        }
        if (value.toString().length > max) {
            return invalidResult(text)
        } 

        return validResult();
    }
}

const validResult = (): IValidationResult => {
    return {valid: true, text: ""};
}

const invalidResult = (text: string): IValidationResult => {
    return {valid: false, text: text};
}

const emptyValue = (value: any): boolean => {
    return (value === "" || value === undefined || value === null)
}