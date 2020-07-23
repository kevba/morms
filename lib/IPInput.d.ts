import React from "react";
import { IFormInputProps } from "./FormInput";
declare type IIPInputProps = IFormInputProps;
/**
 * IPInput wraps FormInput and validates IP addresses. Additional validators can be passed by using the `validators` prop.
 *
 * @param {IIPInputProps} props
 * @returns {React.ReactElement}
 */
export declare function IPInput(props: IIPInputProps): React.ReactElement;
export {};
