import React from 'react'
import { FaRegCircle, FaCheck, PiNavigationArrowBold } from './icons';

const Orders = () => (
    <div className="order_blocks-block">
        <p className='order_blocks-block__favorites-text'>Orders</p>
        <div className="order_blocks-block__cards">
            <div className="order_blocks-block__cards-card">
                <FaRegCircle />
                <PiNavigationArrowBold className='order_blocks-block__cards-card__navigate green' />
                <p>ETH/USDT <span>$0.6643</span> on <span>15:13</span></p>
                <p className='order_blocks-block__cards-card-text__w46px'>1H</p>
            </div>
            <div className="order_blocks-block__cards-card">
                <FaCheck />
                <PiNavigationArrowBold className='order_blocks-block__cards-card__navigate red' />
                <p>ETH/USDT <span>$0.6643</span> on <span>15:10</span></p>
                <p className='order_blocks-block__cards-card-text__w46px'>3H</p>
            </div>
            <div className="order_blocks-block__cards-card">
                <FaCheck />
                <PiNavigationArrowBold className='order_blocks-block__cards-card__navigate green' />
                <p>ETH/USDT <span>$0.6643</span> on <span>15:10</span></p>
                <p className='order_blocks-block__cards-card-text__w46px'>10M</p>
            </div>
        </div>
    </div>
)

export default Orders
