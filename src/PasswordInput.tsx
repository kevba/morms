import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, {useState} from "react";

import {FormInput, IFormInputProps} from "./FormInput";

type ITextInputProps = IFormInputProps;

/**
 * PasswordInput wraps FormInput. Additional validators can be passed by using the `validators` prop.
 * It renders a button to either show or hide the password.
 *
 * @param {ITextInputProps} props
 * @returns {React.ReactElement}
 */
export const PasswordInput = (props: ITextInputProps): React.ReactElement => {
    const [show, setShow] = useState(false);

    return (
        <FormInput
            {...props}
            type={show ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShow(!show)}>
                            {show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};
