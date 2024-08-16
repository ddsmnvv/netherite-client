import React from 'react'
import NotCoin from '../assets/images/profile/Group.png'
import GraphicFirst from '../assets/images/profile/Vector 184.png'
import TonCoin from '../assets/images/profile/Group1.png'
import GraphicSecond from '../assets/images/profile/graph.png'
import DogeCoin from '../assets/images/profile/Group2.png'
import GraphicThird from '../assets/images/profile/graph (1).png'

const Favorites = () => (
    <div className="profile_blocks-block">
        <p className='profile_blocks-block__favorites-text'>Favorites</p>
        <div className="profile_blocks-block__cards">
            <div className="profile_blocks-block__cards-card">
                <img src={NotCoin} alt="NotCoin" />
                <div className="profile_blocks-block__cards-card__name">
                    <h2>NOT/USDT</h2>
                    <span>Notcoin</span>
                </div>
                <div className="profile_blocks-block__cards-card__graphic">
                    <img src={GraphicFirst} alt="Graph 1" />
                </div>
                <div className="profile_blocks-block__cards-card__price">
                    <h2>$0.09</h2>
                    <span>10.23%</span>
                </div>
            </div>
            <div className="profile_blocks-block__cards-card">
                <img src={TonCoin} alt="TonCoin" />
                <div className="profile_blocks-block__cards-card__name">
                    <h2>NOT/USDT</h2>
                    <span>Notcoin</span>
                </div>
                <div className="profile_blocks-block__cards-card__graphic">
                    <img src={GraphicSecond} alt="Graph 2" />
                </div>
                <div className="profile_blocks-block__cards-card__price">
                    <h2>$0.09</h2>
                    <span>10.23%</span>
                </div>
            </div>
            <div className="profile_blocks-block__cards-card">
                <img src={DogeCoin} alt="DogeCoin" />
                <div className="profile_blocks-block__cards-card__name">
                    <h2>NOT/USDT</h2>
                    <span>Notcoin</span>
                </div>
                <div className="profile_blocks-block__cards-card__graphic">
                    <img src={GraphicThird} alt="Graph 3" />
                </div>
                <div className="profile_blocks-block__cards-card__price">
                    <h2>$0.09</h2>
                    <span>10.23%</span>
                </div>
            </div>
        </div>
    </div>
)

export default Favorites
