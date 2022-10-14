import style from 'components/common/FormControls/FormControl.module.css'
import {Field} from 'redux-form'
import React from 'react'
import Checkbox from '@mui/material/Checkbox'

export const FormControl = (props: any) => {

    const showError = (props.meta.touched && props.meta.error) || props.error === 'Incorrect anti-bot symbols'

    return (
        <div className={style.formControl}>
            <span className={style.errorTooltipRelativeWrapper}>
                <div className={`${showError && style.errorTooltipPointer}`}></div>
                <div className={`${showError && style.errorTooltip}`}>
                    {showError && <span>{props.meta.error || props.error}</span>}
                </div>
            </span>
            {props.children}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const CheckBox = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><Checkbox {...input} {...restProps}
                                             className={style.checkBox}/></FormControl>
}

export const createField = (placeholder: string | null, name: string, validators: any, component: any, props: any = {}, text = '') => {
    return (
        <div>
            <div className={style.formFieldWrapper}>
                <Field
                    placeholder={placeholder}
                    name={name}
                    component={component}
                    validate={validators}
                    className={props.className}
                    {...props}
                />
                <div className={style.checkBoxText}>
                    {text}
                </div>
            </div>
        </div>
    )
}