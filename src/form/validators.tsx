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

    return {valid: true, text: ""};
};

export const required = (): validator => {
    let text = "This field is required";

    return (value: string | null | undefined) => {
        if (value === "" || value === undefined || value === null) {
            return {valid: false, text: text};
        }
        return {valid: true, text: ""};
    };
};

export const integer = (): validator => {
    let text = 'Must be a whole number'

    return (value: any) => {
        if (!isNaN(value) && Number(value) % 1 === 0) {
            return { valid: true, text: '' }
        }
        return { valid: false, text: text }
    }
}


export const float = (maxDecimals: number): validator => {
    let regex = `^-?[0-9]+(.[0-9]{1,${maxDecimals}})?$`
    let text = `Must be a number with a maximum of ${maxDecimals} decimals`

    return (value: any) => {
        if ((value.toString()).match(regex)) {
            return { valid: true, text: '' }
        }
        return { valid: false, text: text }
    }
}

export const base = (base: number): validator => {
    let text = `Must be a base ${base} number`
    let regex = `^[0-${base - 1}]+$`

    if (base > 10) {
        let endLetter = (base - 1).toString(base)
        regex = `^[0-9a-${endLetter}A-${endLetter.toUpperCase()}]+$`
    }

    return (value: any) => {
        if (value.match(regex)) {
            return { valid: true, text: '' }
        }
        return { valid: false, text: text }
    }
}

export const maxValue = (maxVal: number): validator => {
    let text = `Must be smaller than ${maxVal}`

    return (value: any) => {
        if (parseInt(value, 10) > maxVal) {
            return { valid: false, text: text }
        }
        return { valid: true, text: '' }
    }
}

export const minValue = (minVal: number): validator => {
    let text = `Must be larger than ${minVal}`

    return (value: any) => {
        if (parseInt(value, 10) < minVal) {
            return { valid: false, text: text }
        }
        return { valid: true, text: '' }
    }
}

export const macAddress = (): validator => {
    let pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    let text = 'Not a valid MAC address'

    return (value: any) => {
        if (!pattern.test(value)) {
            return { valid: false, text: text }
        }
        return { valid: true, text: '' }
    }
}


export const ipAddress = (): validator => {
    let pattern = /^(?!.*\.$)((?!0\d)(1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    let text = "Not a valid IP address";

    return (value: any) => {
        if (!pattern.test(value)) {
            return {valid: false, text: text};
        }
        return {valid: true, text: ""};
    };
};

export const minLength = (min: number): validator => {
    let text = `Must at least be ${min} characters long`;

    return (value: any) => {
        if (value.toString().length < min) {
            return {valid: false, text: text};
        } 

        return {valid: true, text: ""};
    }
}

export const maxLength = (max: number): validator => {
    let text = `Must at most be ${max} characters long`;

    return (value: any) => {
        if (value.toString().length > max) {
            return {valid: false, text: text};
        } 

        return {valid: true, text: ""};
    }
}