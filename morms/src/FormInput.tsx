import React, {useState, useContext, useEffect} from "react";

import TextField, {StandardTextFieldProps} from "@material-ui/core/TextField";

import {validate, validator} from "./validators";

import {ValidationDispatch, ValidateOnBlurDispatch} from "./Form";

export interface IFormInputProps extends StandardTextFieldProps {
    label: string;
    value: string;
    showAllValidationErrors?: boolean;
    validators?: validator[];
}

/**
 * FormInput is a wrapper around amterial-ui's TextField. It is meant to be used as a child in Form components.
 *
 * The most useful feature of a FormInput is to pass validators using the `validators` prop. These validators will be executed whenever the value changes.
 * Often it is better to create a new components which wraps the FormInput instead of using FormInput in a form directly.
 * Examples of such components can be found in `src/component/form/*`.
 *
 * FormInput can handle validation of the value, and can display a message when the field is not valid.
 * A FormInput can be used without a form, although it is not recommended, since it will casue a lot of boilerplating to handle the validation.
 *
 * @param {IFormInputProps} props
 * @returns {React.ReactElement}
 */
export function FormInput({label, value, validators, ...inputProps}: IFormInputProps): React.ReactElement {
    const [helperText, setHelperText] = useState<string>("");

    const {validations, onValidate} = useContext(ValidationDispatch);
    const onBlur = useContext(ValidateOnBlurDispatch);

    const validateValue = (value: string) => {
        const result = validate(value, validators || []);
        let text = ""
        let isValid = true
    
        isValid = result.valid
        text = result.text
                
        setHelperText(text);
        if (onValidate !== undefined) {
            onValidate(label, isValid);
        }
    };

    const shouldShowValidationError = () => {
        if (validations[label] === undefined) {
            return false;
        }

        return validations[label].showError && helperText !== "";
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (inputProps.onChange !== undefined) {
            inputProps.onChange(event);
        }

        validateValue(event.target.value);
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (inputProps.onBlur !== undefined) {
            inputProps.onBlur(event);
        }

        onBlur(label);
    };

    useEffect(() => {
        validateValue(value);
    }, []);

    return (
        <TextField
            {...inputProps}
            value={value}
            label={label}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            helperText={shouldShowValidationError() && helperText}
            fullWidth={true}
            margin="normal"
            InputLabelProps={{shrink: true}}
            error={shouldShowValidationError()}
        />
    );
}
