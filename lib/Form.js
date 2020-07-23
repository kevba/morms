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
import React, { useReducer, useMemo } from "react";
var setValidation = function (fieldname, showError, isValid) {
    return {
        type: "set",
        payload: {
            showError: showError,
            isValid: isValid,
            fieldname: fieldname,
        },
    };
};
var enableShowError = function () {
    return {
        type: "enableAllShowError",
    };
};
var validationReducer = function (fields, action) {
    var _a;
    if (action.type === "set") {
        var newField = __assign(__assign({}, fields[action.payload.fieldname]), { showError: action.payload.showError, isValid: action.payload.isValid });
        var fieldname = action.payload.fieldname;
        return __assign(__assign({}, fields), (_a = {}, _a[fieldname] = newField, _a));
    }
    if (action.type === "enableAllShowError") {
        var newFields = {};
        for (var field in fields) {
            newFields[field] = __assign(__assign({}, fields[field]), { showError: true });
        }
        return newFields;
    }
    return fields;
};
var defaultValidation = {};
export var ValidateOnBlurDispatch = React.createContext(function () {
    return;
});
export var ValidationDispatch = React.createContext({
    validations: defaultValidation,
    onValidate: function () {
        return;
    },
});
export var SubmitContext = React.createContext({
    isValid: false,
    onClick: function () {
        return;
    },
});
export function Form(props) {
    var onSubmit = props.onSubmit, children = props.children;
    var _a = useReducer(validationReducer, defaultValidation), validations = _a[0], dispatch = _a[1];
    var isValid = useMemo(function () {
        for (var field in validations) {
            if (!validations[field].isValid) {
                return false;
            }
        }
        return true;
    }, [validations]);
    var onValidate = function (fieldname, valid) {
        // Never show the error while the user is typing, unless the error is already visible.
        var showError = false;
        if (validations[fieldname] !== undefined &&
            validations[fieldname].showError &&
            !validations[fieldname].isValid) {
            showError = true;
        }
        dispatch(setValidation(fieldname, showError, valid));
    };
    var handleOnBlurValidation = function (fieldname) {
        // Always show the error when the user is done typing, unless there are no errors.
        if (validations[fieldname] !== undefined) {
            if (!validations[fieldname].isValid) {
                dispatch(setValidation(fieldname, true, validations[fieldname].isValid));
            }
            else {
                dispatch(setValidation(fieldname, false, validations[fieldname].isValid));
            }
        }
    };
    var handleOnSubmit = function () {
        dispatch(enableShowError());
        if (onSubmit !== undefined && isValid) {
            onSubmit();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ValidationDispatch.Provider, { value: { validations: validations, onValidate: onValidate } },
            React.createElement(ValidateOnBlurDispatch.Provider, { value: handleOnBlurValidation },
                React.createElement(SubmitContext.Provider, { value: { isValid: isValid, onClick: handleOnSubmit } }, children)))));
}
