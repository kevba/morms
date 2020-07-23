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
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import { FormInput } from "./FormInput";
/**
 * PasswordInput wraps FormInput. Additional validators can be passed by using the `validators` prop.
 * It renders a button to either show or hide the password.
 *
 * @param {ITextInputProps} props
 * @returns {React.ReactElement}
 */
export var PasswordInput = function (props) {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement(FormInput, __assign({}, props, { type: show ? "text" : "password", InputProps: {
            endAdornment: (React.createElement(InputAdornment, { position: "end" },
                React.createElement(IconButton, { onClick: function () { return setShow(!show); } }, show ? React.createElement(Visibility, null) : React.createElement(VisibilityOff, null)))),
        } })));
};
