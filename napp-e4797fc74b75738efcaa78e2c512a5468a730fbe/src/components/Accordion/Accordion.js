import React, { useEffect, useState, useRef } from 'react';
import { FaAngleDown, FaAngleUp } from '../icons';
import './accordion.css';

const Accordion = ({ title, children }) => {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      const textContent = buttonRef.current.textContent.trim();
      console.log('Button text before change:', textContent);

      // Устанавливаем классы в зависимости от текста заголовка
      if (textContent === '1 hour') {
        buttonRef.current.classList.add('font-weight-400');
      } else if (textContent === 'BTC / ETH') {
        buttonRef.current.classList.add('font-weight-700');
      }
    }
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="graph_nav-block__accordion">
      <div 
        className="graph_nav-block__accordion-button" 
        onClick={toggleAccordion}
        ref={buttonRef}
      >
        <p className='graph_nav-block__accordion-button__text'>{title}</p>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      {isOpen && (
        <div className="graph_nav-block__accordion-item">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
