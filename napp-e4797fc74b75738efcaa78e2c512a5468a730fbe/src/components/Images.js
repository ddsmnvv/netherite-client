import styles from '../App.module.css';
import cardImage from '../assets/images/card1.png';
import coinsImage from '../assets/images/coins.png';
import testWomen from '../assets/images/womem.png';
import TextAndImg from './textandimg/TextAndImg';
import allCard from '../assets/images/Group 16.svg';


function Images() {
    return (
        <div className={styles.images}>
            {/* <img src={cardImage} className={styles.card} />
            <img src={testWomen} className={styles.women} />
            <TextAndImg />
            <img src={coinsImage} className={styles.coins} />
            <img src={coinsImage} className={styles.coins} /> */}
            <img style={{position:'relative', zIndex:'11'}} src={allCard} alt="" />
        </div>
    );
}

export default Images;