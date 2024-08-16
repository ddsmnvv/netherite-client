import styles from './underheader.module.css';
import line from '../../assets/images/Vector 183.svg'
import Button from '../button/ButtonMobile';

function UnderHeader() {
    return (
        <div className={styles.underContainer}>
            <div className={styles.title}>
                <p>Trade
                    <br />
                    more efficient
                </p>
                <img src={line} className={styles.line}></img>
            </div>
            <div className={styles.desc}>
                <p>A binary options broker working with TON. Get
                    up to <text>~98%</text> of the profit from the transaction,
                    which can be completed in just <text>3 minutes</text>
                </p>
            </div>

            <div>
                <div className={styles.spans}>
                    <div className={styles.whitespan}></div>
                    <div className={styles.grayspan}></div>
                    <div className={styles.grayspan}></div>
                </div>
            </div>
            <Button />
        </div>
    );
}

export default UnderHeader;