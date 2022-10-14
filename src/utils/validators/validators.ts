export const required = (value: string) => {
    if (value) return undefined;

    return 'Field is required';
};

export const emailRequired = (value: string) => {
    if (value) return undefined;

    return 'Email is required';
};

export const emailValidation = (value: string) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address';
    }

    return undefined;
};

export const passwordRequired = (value: string) => {
    if (value) return undefined;

    return 'Password is required';
};

export const captchaRequired = (value: string) => {
    if (value) return undefined;

    return 'Symbols required';
};

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;

    return undefined;
};

export const maxLength30 = maxLengthCreator(30);
