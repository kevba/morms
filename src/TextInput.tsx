import React from "react";

import {FormInput, IFormInputProps} from "./FormInput";

type ITextInputProps = IFormInputProps;

/**
 * PasswordInput wraps FormInput. Additional validators can be passed by using the `validators` prop.
 *
 * @param {ITextInputProps} props
 * @returns {React.ReactElement}
 */
export function TextInput(props: ITextInputProps): React.ReactElement {
    return <FormInput {...props} />;
}
