import React, { useState, useRef } from 'react';
import styles from './button.module.css';
import YellowCircle from './YellowCircle';
import WhiteCircle from './WhiteCircle';
import { FaChevronRight, GoArrowRight } from '../icons'

function Button( title ) {
    const [isDragging, setIsDragging] = useState(false);
    const [startPosX, setStartPosX] = useState(0);
    const [currentPosX, setCurrentPosX] = useState(0);
    const buttonRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPosX(e.clientX || e.touches[0].clientX);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const clientX = e.clientX || e.touches[0].clientX;
            const diffX = clientX - startPosX;
            const newPosX = Math.max(0, Math.min(diffX, buttonRef.current.offsetWidth - 50));
            setCurrentPosX(newPosX);
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            if (currentPosX > 250) {
                window.location.href = "/profile";
            }

            setCurrentPosX(0);
            setIsDragging(false);
            setStartPosX(0);
        }
    };

    return (
        <div className={styles.buttonContainer} ref={buttonRef}>
            <YellowCircle />
            <WhiteCircle />
            <div onClick={()=> window.location.href = '/profile'} className={styles.button}>
                <span
                    className={`material-symbols-outlined ${styles.arrow}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                    style={{ transform: `translateX(${currentPosX}px)` }}
                >
                    <GoArrowRight style={{fontSize:'24px'}}/>
                </span>
                <p className={styles.button_desc} style={{fontSize:"16px", fontWeight:'400', lineHeight:"20.8px"}}>Tap to Start</p>
                <p className={styles.button_mobile} style={{fontSize:"16px", fontWeight:'400', lineHeight:"20.8px"}}>Swipe to start</p>
                <div className={styles.spans}>
                    <span className={`material-symbols-outlined ${styles.firstSpan}`}>
                        <FaChevronRight />
                    </span>
                    <span className={`material-symbols-outlined ${styles.secondSpan}`}>
                        <FaChevronRight />
                    </span>
                    <span className={`material-symbols-outlined ${styles.thirdSpan}`} style={{ marginRight: '16px' }}>
                        <FaChevronRight />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Button;