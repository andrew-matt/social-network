import styles from './FormsControls.module.css'

export const FormControl = (props: any) => {

    const showError = props.meta.touched && props.meta.error

    return (
        <div className={styles.formControl + ' ' + (showError && styles.error)}>
            <div>
                {props.children}
            </div>
            {showError && <span>{props.meta.error}</span>}
        </div>
    );
};

export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};
