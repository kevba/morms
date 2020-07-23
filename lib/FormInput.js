var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { validate } from "./validators";
import { ValidationDispatch, ValidateOnBlurDispatch } from "./Form";
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
export function FormInput(props) {
    var validators = props.validators, value = props.value, label = props.label, inputProps = __rest(props, ["validators", "value", "label"]);
    var _a = useState(""), helperText = _a[0], setHelperText = _a[1];
    var _b = useContext(ValidationDispatch), validations = _b.validations, onValidate = _b.onValidate;
    var onBlur = useContext(ValidateOnBlurDispatch);
    var validateValue = function (value) {
        var result = validate(value, validators || []);
        setHelperText(result.text);
        if (onValidate !== undefined) {
            onValidate(props.label, result.valid);
        }
    };
    var shouldShowValidationError = function () {
        if (validations[props.label] === undefined) {
            return false;
        }
        return validations[props.label].showError && helperText !== "";
    };
    var handleOnChange = function (event) {
        if (props.onChange !== undefined) {
            props.onChange(event);
        }
        validateValue(event.target.value);
    };
    var handleOnBlur = function (event) {
        if (props.onBlur !== undefined) {
            props.onBlur(event);
        }
        onBlur(props.label);
    };
    useEffect(function () {
        validateValue(value);
    }, []);
    return (React.createElement(TextField, __assign({}, inputProps, { value: value, label: label, onChange: handleOnChange, onBlur: handleOnBlur, helperText: shouldShowValidationError() && helperText, fullWidth: true, margin: "normal", InputLabelProps: { shrink: true }, error: shouldShowValidationError() })));
}
