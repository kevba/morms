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
import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { SubmitContext } from "./Form";
var useStyles = makeStyles(function (theme) { return ({
    root: {
        color: theme.palette.error.main,
    },
}); });
/**
 * IPInput wraps FormInput and validates IP addresses. Additional validators can be passed by using the `validators` prop.
 *
 * @param {IIPInputProps} props
 * @returns {React.ReactElement}
 */
export function SubmitButton(props) {
    var children = props.children;
    var classes = useStyles();
    var _a = useContext(SubmitContext), isValid = _a.isValid, onClick = _a.onClick;
    var _b = useState(false), showError = _b[0], setShowError = _b[1];
    var handleOnClick = function () {
        onClick();
        if (isValid) {
            setShowError(false);
            return;
        }
        setShowError(true);
    };
    var renderErrorText = function () {
        if (!showError) {
            return React.createElement(React.Fragment, null);
        }
        return React.createElement(Typography, { className: classes.root }, "Not all fields are filled in correctly");
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, __assign({}, props, { onClick: handleOnClick }), children),
        renderErrorText()));
}
