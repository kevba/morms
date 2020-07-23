import React from "react";
import { IFormInputProps } from "./FormInput";
declare type ITextInputProps = IFormInputProps;
/**
 * PasswordInput wraps FormInput. Additional validators can be passed by using the `validators` prop.
 * It renders a button to either show or hide the password.
 *
 * @param {ITextInputProps} props
 * @returns {React.ReactElement}
 */
export declare const PasswordInput: (props: ITextInputProps) => React.ReactElement;
export {};
