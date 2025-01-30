import React, { useState } from 'react';
import Verify from '../../public/verify-tick.png';
import Info from '../../public/blue-war.png';

const Banner = ({ type, fullMode, closeIcon }) => {
  const [visible, setVisible] = useState(true);

  const img = type === 'success' ? Verify : Info;
  const description =
    type === 'success'
      ? 'Your default group is: default, group ratio: 1'
      : 'The cost of pay-as-you-go = Group ratio × Model ratio × (Prompt token number + Completion token number × Completion ratio) / 500000 (Unit: USD)';
  return (
    <div
      className='banner'
      style={{
        display: visible ? 'flex' : 'none',
        backgroundColor: type === 'success' ? '#32936F17' : '#007AFF0D',
      }}
    >
      <div className='banner-description'>
        <img src={img} alt='' />
        <p>{description}</p>
      </div>
      <div onClick={() => setVisible(false)}>
        <h5>I understand</h5>
      </div>
    </div>
  );
};

export default Banner;
