import styles from './FormsControls.module.css'

export const Textarea = (props: any) => {

    const showError = props.meta.touched && props.meta.error

    return (
        <div className={styles.formControl + ' ' + (showError && styles.error)}>
            <div><textarea {...props.input}/></div>
            {showError && <span className={styles.error}>some error</span>}
        </div>
    );
};