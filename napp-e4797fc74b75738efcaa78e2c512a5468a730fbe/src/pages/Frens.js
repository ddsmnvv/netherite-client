import React, { useContext, useEffect } from 'react'
import '../assets/style/frens.css'
import itemLogo from '../assets/images/frens/Vector.svg'
import bgImageFirst from "../assets/images/profile/Ellipse 1142 (1).png"
import bgImageSecond from "../assets/images/profile/Ellipse 1141 (1).png"
import bgImageThird from "../assets/images/profile/Ellipse 1158.png"
import fleshIcon from '../assets/images/frens/Lightning.svg'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { getFriends } from '../api/friendsAPI'

const Frens = observer(() => {

    const {user, friends} = useContext(Context);

    useEffect(() => {
        if(user.isAuth) {
            getFriends(user.user.id)
            .then(response => {
                friends.setFriends(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [user.isAuth]);

    return (
        <div className='frens'>
            <div className="frens_blocks">
                <div className="frens_bg">
                    <img src={bgImageFirst} alt="Background 1" />
                    <img src={bgImageSecond} alt="Background 2" />
                    <img src={bgImageThird} alt="Background 3" />
                    <img src={fleshIcon} alt="" />
                </div>
                <div className="frens_blocks-block">
                    <span>Frens</span>
                    <h1>Earn tokens</h1>
                    <p>Get <span> 10%</span> of referrals and <span>3% </span> of their frens. <span>Double</span> the amount if a frien has a premium account</p>
                </div>
                <div className="frens_blocks-block frens_blocks-block__cards">
                    <span>1 Fren</span>
                    {friends.friends.length > 0 ? friends.friends.map(friend => 
                        <ul className="frens_blocks-block__list">
                        <li className="frens_blocks-block__list-item">
                            <img src={itemLogo} alt="" />
                            <div className="frens_blocks-block__list-item_desc">
                                <p>{friend.telegramName}</p>
                                <span>{friend.referals === 1 ? `${friend.referals} fren` : friend.referals > 0 ? `${friend.referals} frens` : "No frens"}</span>
                            </div>
                            <p>{friend.profit}</p>
                        </li>
                        </ul>)
                        :
                        <p>No friends</p>
                    }
                </div>
                <img src={fleshIcon} className='mobile_flesh' alt="" />
            </div>
            <div className="frens_blocks-absolute">
                <button className='btn' onClick={() => {
                    navigator.clipboard.writeText(`https://app.netherite.pro/?invitedId=${user.user.id}`)
                    .then(() => {
                      alert("Скопировано")
                    })
                    .catch(err => {
                        alert("Ошибка копирования")
                    });
                }}>Copy link ✨</button>
            </div>
        </div>
    )
});

export default Frens
