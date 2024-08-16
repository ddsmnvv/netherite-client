import React from 'react'

const Balance = (props) => (
    <div className="profile_blocks-block__balance">
        <span>Total balance</span>
        <div className="profile_blocks-block__balance-num">
            <div className="profile_blocks-block__balance-num__logo">
                N
            </div>
            <h1>{props.balance || 0}</h1>
        </div>
    </div>
)

export default Balance
