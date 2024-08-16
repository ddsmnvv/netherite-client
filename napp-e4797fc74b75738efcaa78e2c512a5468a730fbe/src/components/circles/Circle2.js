import styles from './circle2.module.css';

function Circle2() {
    return (
        <div className={styles.circles}>
            <div className={styles.whitecircle}></div>
            <div className={styles.whitecircle2}></div>
        </div>
    );
}

export default Circle2;