import React from "react";
import { StandardTextFieldProps } from "@material-ui/core/TextField";
import { validator } from "./validators";
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
export declare function FormInput(props: IFormInputProps): React.ReactElement;
