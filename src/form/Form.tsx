import React, {useReducer, useEffect} from 'react';

interface IFormProps {
    children: React.ReactNode
}

interface IValidation {
    showError: boolean;
    isValid: boolean;
}

type Action = {type: "set", payload: {showError: boolean, isValid: boolean, fieldname: string}}

const validationAction = (fieldname: string, showError: boolean, isValid: boolean): Action => {
    return {
        type: "set",
        payload: {
            showError,
            isValid,
            fieldname,
        }
    }
}  

interface Validations {
    [key: string]: IValidation
}

const validationReducer = (fields: Validations, action: Action): Validations => {
    if (action.type === "set") {
        let newField = {
            ...fields[action.payload.fieldname],
            showError: action.payload.showError,
            isValid: action.payload.isValid
        }
    
        let fieldname = action.payload.fieldname
        return {...fields, [fieldname]: newField}
    }

    return fields
}

const defaultValidation: Validations = {}

export const ValidateOnBlurDispatch = React.createContext<(fieldname: string) => void>(()=>{});
export const ValidationDispatch = React.createContext<{validations: Validations, onValidate: (fieldname: string, valid: boolean) => void}>({validations: defaultValidation, onValidate: ()=>{}});

export function Form(props: IFormProps) {
    const {children} = props

    const [validations, dispatch] = useReducer(validationReducer, defaultValidation)

    const onValidate = (fieldname: string, valid: boolean) => {
        console.log(validations[fieldname]);
        
        // Never show the error while the user is typing, unless the error is already visible
        let showError = false
        if (validations[fieldname] !== undefined && validations[fieldname].showError) {
            showError = true
        }

        dispatch(validationAction(fieldname, showError, valid))
    }

    const handleOnBlurValidation = (fieldname: string) => {
        console.log(fieldname)
        // Always show the error when the user is done typing, unless there are no errors.
        if (validations[fieldname] !== undefined) {
            if (!validations[fieldname].isValid) {
                dispatch(validationAction(fieldname, true, validations[fieldname].isValid))
            } else {
                dispatch(validationAction(fieldname, false, validations[fieldname].isValid))
            }
        }
    }

    return (
        <React.Fragment>
            <ValidationDispatch.Provider value={{validations, onValidate}}>
                <ValidateOnBlurDispatch.Provider value={handleOnBlurValidation}>
                    {children} 
                </ValidateOnBlurDispatch.Provider>
            </ValidationDispatch.Provider>
        </React.Fragment>
    );
}
