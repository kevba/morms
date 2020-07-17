import React, {useState, useContext, useEffect} from "react";

import TextField, {StandardTextFieldProps} from "@material-ui/core/TextField";

import {validate, validator} from "./validators";

import {ValidationDispatch, ValidateOnBlurDispatch} from "./Form"

export interface IFormInputProps extends StandardTextFieldProps {
    label: string;
    value: string;
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
export function FormInput(props: IFormInputProps) {
    const {validators, value, label, ...inputProps} = props;
    const [helperText, setHelperText] = useState<string>("");

    const {validations, onValidate} = useContext(ValidationDispatch);
    const onBlur = useContext(ValidateOnBlurDispatch);

    const validateValue = (value: string) => {
        let result = validate(value, validators || []);

        setHelperText(result.text);

        if (onValidate !== undefined) {
            onValidate(props.label, result.valid);
        }
    };

    const shouldShowValidationError = () => {
        if (validations[props.label] === undefined) {
            return false;
        }
        
        return validations[props.label].showError && helperText !== "";
    };

    const handleOnChange = (event: any) => {
        if (props.onChange !== undefined) {
            props.onChange(event);
        }

        validateValue(event.target.value);
    };

    const handleOnBlur = (event: any) => {
        if (props.onBlur !== undefined) {
            props.onBlur(event);
        }

        onBlur(props.label)
    }

    useEffect(() => {
        validateValue(value)
    }, [])

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
};
