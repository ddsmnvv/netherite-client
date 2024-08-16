// src/pages/Graph.js
import React, { useEffect, useState } from 'react';
import '../assets/style/graph.css';
import { FaAngleDown, FaChevronLeft } from '../components/icons';
import bgImageFirst from "../assets/images/profile/Ellipse 1142 (1).png";
import bgImageSecond from "../assets/images/profile/Ellipse 1141 (1).png";
import Accordion from '../components/Accordion/Accordion';
import iconStar from '../assets/images/graph/Vector.svg'
import TradingViewWidget from '../components/TradingView/TradingViewWidget';
import { FaRegCircle, FaCheck, PiNavigationArrowBold } from '../components/icons';


const Graph = ({ height }) => {
    const [openModal, setOpenModal] = useState(false)
    const openModalBtn = () => {
        setOpenModal(!openModal)
    }

    useEffect(() => {
        document.querySelector('body').style = 'overflow-y:hidden; height:100vh';
        document.querySelector('#root').style = 'height:100vh';
    }, [])
    return (
        <div style={{ height: height }} className='graph'>
            <div className={`modal ${openModal ? 'open' : ''}`}>
                <div className="modal_block">
                    <div className="modal_block-content">
                        <p>Amount:</p>
                        <div className="modal_block-content__flex">
                            <div className="modal_block-content__flex-logo">
                                N
                            </div>
                            <input type="text" defaultValue='1000' />
                        </div>
                    </div>
                    <button onClick={openModalBtn}>SAVE</button>
                </div>
            </div>
            <div className="graph_bg ">
                <img src={bgImageFirst} alt="Background 1" />
                <img src={bgImageSecond} alt="Background 2" />
            </div>
            <div className="graph_nav graph_trade-desc__price-hidden">
                <div className="graph_nav-block">
                    <div onClick={() => window.location.href = "/profile"} className="graph_nav-block__icon">
                        <FaChevronLeft />
                    </div>
                    {/* Используем компонент Accordion */}
                    <Accordion title="BTC / ETH">
                        {/* Дочерние элементы аккордеона */}
                        <p style={{ fontSize: '13px' }}>BTC / USDT</p>
                    </Accordion>
                </div>
                <div className="graph_nav-block">
                    <div className="graph_nav-block__icon">
                        <img src={iconStar} alt="" />
                    </div>
                </div>
            </div>
            <div className="graph_nav graph_trade-desc__price-hidden-desc">
                <div className="graph_nav-block">
                    <div onClick={() => window.location.href = "/profile"} className="graph_nav-block__icon">
                        <FaChevronLeft />
                    </div>
                    {/* Используем компонент Accordion */}
                </div>
                <Accordion title="BTC / ETH">
                    {/* Дочерние элементы аккордеона */}
                    <p>BTC / USDT</p>
                </Accordion>
                <div className="graph_nav-block">
                    <div className="graph_nav-block__icon">
                        <img src={iconStar} alt="" />
                    </div>
                </div>
            </div>
            <div className="graph_trade">
                <div className="graph_trade-grafik">
                    <TradingViewWidget />
                </div>
                <div className="graph_trade-desc">
                    <div className="graph_trade-desc__price">
                        <h1>$1,150.00</h1>
                        <div className="graph_trade-desc__price-accordion">
                            <Accordion style="fontWeight:'400'" title="1 hour">
                                <p className='graph_trade-desc__price-accordion__item'>1 hour</p>
                                <p className='graph_trade-desc__price-accordion__item'>1 hour</p>
                            </Accordion>
                        </div>
                    </div>
                    <div style={{ alignItems: 'start' }} className="graph_trade-desc__price graph_trade-desc__price-hidden">
                        <p style={{ color: "#02C173" }}>Profit: 93%</p>

                        <div className="graph_trade-desc__price-amout">
                            <p>Amount:</p>
                            <input type="text" placeholder='1000' defaultValue={'1000'} />
                            <div className="graph_trade-desc__price-amout__logo">
                                N
                            </div>
                        </div>
                    </div>
                    <div className="graph_trade-desc__price-hidden-desc graph_trade-desc__price">
                        <div className="graph_trade-desc__price-block">
                            <p style={{ color: "#02C173" }}>Profit: 93%</p>
                            <div className="graph_trade-desc__price-amout__logo">
                                N
                            </div>
                            <p style={{ color: "#C4C4C4" }}>1000</p>
                        </div>
                        <div style={{ width: '101px' }} className="graph_trade-desc__price-accordion">
                            <div className="graph_nav-block__accordion">
                                <div onClick={openModalBtn} className="graph_nav-block__accordion-button">
                                    <p style={{ fontWeight: '400' }}>Amount</p>
                                    <FaAngleDown />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flexDirection: 'column', alignItems: 'start' }} className="graph_trade-desc__price graph_trade-desc__price-hidden">
                        <p style={{ color: '#C4C4C4' }}>Open positions:</p>
                        <div className="graph_trade-desc__price-cards">
                            <div className="graph_trade-desc__price-cards__card">
                                <p>ETH/USDT <span> $0.6643 </span> on <span> 15:13</span>  </p>
                                <PiNavigationArrowBold className='graph_trade-desc__price-cards__card-navigate green' />
                                <p style={{ width: '100px', textAlign: 'right' }}>1H</p>
                            </div>
                            <div className="graph_trade-desc__price-cards__card">
                                <p>ETH/USDT <span> $0.6643 </span> on <span> 15:13</span>  </p>
                                <PiNavigationArrowBold className='graph_trade-desc__price-cards__card-navigate red' />
                                <p style={{ width: '100px', textAlign: 'right' }}>5H</p>
                            </div>
                            <div className="graph_trade-desc__price-cards__card">
                                <p>ETH/USDT <span> $0.6643 </span> on <span> 15:13</span>  </p>
                                <PiNavigationArrowBold className='graph_trade-desc__price-cards__card-navigate green' />
                                <p style={{ width: '100px', textAlign: 'right' }}>1H</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ flexDirection: 'column', alignItems: 'start' }} className="graph_trade-desc__price graph_trade-desc__price-hidden-desc">
                        <div className="graph_trade-desc__price-cards">
                            <div className="graph_trade-desc__price-cards__card">
                                <div className="graph_trade-desc__price-cards__card-block">
                                    <p>ETH/USDT <span> $0.6643 </span> on <span> 15:13</span>  </p>
                                    <PiNavigationArrowBold className='graph_trade-desc__price-cards__card-navigate green' />
                                </div>
                                <p>1H</p>
                            </div>
                        </div>
                    </div>
                    <div className="graph_trade-btn">
                        <button style={{ background: '#02C173' }}>Call</button>
                        <button style={{ background: '#E11A38' }}>Put</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Graph;
