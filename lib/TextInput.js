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
import React from "react";
import { FormInput } from "./FormInput";
/**
 * PasswordInput wraps FormInput. Additional validators can be passed by using the `validators` prop.
 *
 * @param {ITextInputProps} props
 * @returns {React.ReactElement}
 */
export function TextInput(props) {
    return React.createElement(FormInput, __assign({}, props));
}
