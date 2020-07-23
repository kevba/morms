declare type validatableValue = string | number | undefined | null;
export declare type validator = (value: validatableValue) => IValidationResult;
interface IValidationResult {
    valid: boolean;
    text: string;
}
export declare const validate: (input: string, validators: validator[]) => IValidationResult;
export declare const required: (errorText?: string | undefined) => validator;
export declare const integer: (errorText?: string | undefined) => validator;
export declare const float: (maxDecimals: number, errorText?: string | undefined) => validator;
export declare const base: (base: number, errorText?: string | undefined) => validator;
export declare const maxValue: (maxVal: number, errorText?: string | undefined) => validator;
export declare const minValue: (minVal: number, errorText?: string | undefined) => validator;
export declare const macAddress: (errorText?: string | undefined) => validator;
export declare const ipAddress: (errorText?: string | undefined) => validator;
export declare const minLength: (min: number, errorText?: string | undefined) => validator;
export declare const maxLength: (max: number, errorText?: string | undefined) => validator;
export {};
