import React from "react";

import {ipAddress} from "./validators";

import {FormInput, IFormInputProps} from "./FormInput";

type IIPInputProps = IFormInputProps;

/**
 * IPInput wraps FormInput and validates IP addresses. Additional validators can be passed by using the `validators` prop.
 *
 * @param {IIPInputProps} props
 * @returns {React.ReactElement}
 */
export function IPInput(props: IIPInputProps) {
    const {validators, ...otherProps} = props;
    const allValidators = [ipAddress(), ...(validators || [])];
    return <FormInput {...otherProps} validators={allValidators} />;
};
