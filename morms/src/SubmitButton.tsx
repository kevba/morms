import React, {useContext, useState} from "react";

import {Button, ButtonProps} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import {makeStyles} from "@material-ui/core/styles";

import {SubmitContext} from "./Form";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.error.main,
    },
}));

interface ISubmitButton extends ButtonProps {
    noErrorText?: boolean;
    children?: React.ReactNode;
}

/**
 * IPInput wraps FormInput and validates IP addresses. Additional validators can be passed by using the `validators` prop.
 *
 * @param {IIPInputProps} props
 * @returns {React.ReactElement}
 */
export function SubmitButton(props: ISubmitButton): React.ReactElement {
    const {children, noErrorText} = props;

    const classes = useStyles();

    const {isValid, onClick} = useContext(SubmitContext);
    const [showError, setShowError] = useState(false);

    const handleOnClick = () => {
        onClick();

        if (isValid) {
            setShowError(false);
            return;
        }

        setShowError(true);
    };

    const renderErrorText = (): React.ReactElement => {
        if (noErrorText !== undefined && noErrorText) {
            return <React.Fragment />;

        }
        if (!showError) {
            return <React.Fragment />;
        }
        return <Typography className={classes.root}>{"Not all fields are filled in correctly"}</Typography>;
    };

    return (
        <React.Fragment>
            {renderErrorText()}
            <Button {...props} onClick={handleOnClick}>
                {children}
            </Button>
        </React.Fragment>
    );
}
