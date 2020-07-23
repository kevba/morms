import React from "react";
interface IFormProps {
    children: React.ReactNode;
    onSubmit?: () => void;
}
interface IValidation {
    showError: boolean;
    isValid: boolean;
}
interface Validations {
    [key: string]: IValidation;
}
export declare const ValidateOnBlurDispatch: React.Context<(fieldname: string) => void>;
export declare const ValidationDispatch: React.Context<{
    validations: Validations;
    onValidate: (fieldname: string, valid: boolean) => void;
}>;
export declare const SubmitContext: React.Context<{
    isValid: boolean;
    onClick: () => void;
}>;
export declare function Form(props: IFormProps): React.ReactElement;
export {};
