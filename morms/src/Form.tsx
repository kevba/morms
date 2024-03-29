import React, {useReducer, useMemo} from "react";

interface IFormProps {
    children: React.ReactNode;
    onSubmit?: () => void;
}

interface IValidation {
    showError: boolean;
    isValid: boolean;
}

type SetAction = {type: "set"; payload: {showError: boolean; isValid: boolean; fieldname: string}};
const setValidation = (fieldname: string, showError: boolean, isValid: boolean): SetAction => {
    return {
        type: "set",
        payload: {
            showError,
            isValid,
            fieldname,
        },
    };
};

type EnableAllShowErrorAction = {type: "enableAllShowError"};
const enableShowError = (): EnableAllShowErrorAction => {
    return {
        type: "enableAllShowError",
    };
};

type Actions = SetAction | EnableAllShowErrorAction;
interface Validations {
    [key: string]: IValidation;
}

const validationReducer = (fields: Validations, action: Actions): Validations => {
    if (action.type === "set") {
        const newField = {
            ...fields[action.payload.fieldname],
            showError: action.payload.showError,
            isValid: action.payload.isValid,
        };

        const fieldname = action.payload.fieldname;
        return {...fields, [fieldname]: newField};
    }

    if (action.type === "enableAllShowError") {
        const newFields: Validations = {};

        for (const field in fields) {
            newFields[field] = {...fields[field], showError: true};
        }

        return newFields;
    }
    return fields;
};

const defaultValidation: Validations = {};

export const ValidateOnBlurDispatch = React.createContext<(fieldname: string) => void>(() => {
    return;
});

export const ValidationDispatch = React.createContext<{
    validations: Validations;
    onValidate: (fieldname: string, valid: boolean) => void;
}>({
    validations: defaultValidation,
    onValidate: () => {
        return;
    },
});

export const SubmitContext = React.createContext<{isValid: boolean; onClick: () => void}>({
    isValid: false,
    onClick: () => {
        return;
    },
});

export function Form(props: IFormProps): React.ReactElement {
    const {onSubmit, children} = props;
    const [validations, dispatch] = useReducer(validationReducer, defaultValidation);

    const isValid = useMemo((): boolean => {
        for (const field in validations) {
            if (!validations[field].isValid) {
                return false;
            }
        }
        return true;
    }, [validations]);

    const onValidate = (fieldname: string, valid: boolean) => {
        // Never show the error while the user is typing, unless the error is already visible.
        let showError = false;
        if (
            validations[fieldname] !== undefined &&
            validations[fieldname].showError &&
            !validations[fieldname].isValid
        ) {
            showError = true;
        }

        dispatch(setValidation(fieldname, showError, valid));
    };

    const handleOnBlurValidation = (fieldname: string) => {
        // Always show the error when the user is done typing, unless there are no errors.
        if (validations[fieldname] !== undefined) {
            if (!validations[fieldname].isValid) {
                dispatch(setValidation(fieldname, true, validations[fieldname].isValid));
            } else {
                dispatch(setValidation(fieldname, false, validations[fieldname].isValid));
            }
        }
    };

    const handleOnSubmit = () => {
        dispatch(enableShowError());

        if (onSubmit !== undefined && isValid) {
            onSubmit();
        }
    };

    return (
        <React.Fragment>
            <ValidationDispatch.Provider value={{validations, onValidate}}>
                <ValidateOnBlurDispatch.Provider value={handleOnBlurValidation}>
                    <SubmitContext.Provider value={{isValid: isValid, onClick: handleOnSubmit}}>
                        {children}
                    </SubmitContext.Provider>
                </ValidateOnBlurDispatch.Provider>
            </ValidationDispatch.Provider>
        </React.Fragment>
    );
}
