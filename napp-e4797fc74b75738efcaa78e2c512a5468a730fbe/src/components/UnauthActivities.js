import React from 'react';
import deposit from '../assets/images/deposit.svg';
import withdraw from '../assets/images/withdraw.svg';

const UnauthActivities = () => {
    return (
        <>
            <div className="profile_blocks-block__activities">
                <div className="profile_blocks-block__activities-button">
                    <button><img src={deposit} /> Deposit</button>
                    <button><img src={withdraw} /> Withraw</button>
                </div>
            </div>
        </>
    );
};

export default UnauthActivities;