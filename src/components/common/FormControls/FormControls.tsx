import styles from './FormsControls.module.css'

export const FormControl = (props: any) => {

    const showError = props.meta.touched && props.meta.error

    return (
        <div className={styles.formControl + ' ' + (showError && styles.error)}>
            <div>
                {props.children}
            </div>
            {showError && <span className={styles.error}>some error</span>}
        </div>
    );
};

export const Textarea = (props: any) => {
    return <FormControl {...props}><textarea {...props.input}/></FormControl>
};

export const Input = (props: any) => {
    return <FormControl {...props}><input {...props.input} placeholder={props.placeholder} type={props.type}/></FormControl>
};
