import React from 'react';

const Widget: React.FC = () => {
  const number = Math.floor(Math.random() * 100);
  return (
    <div className="widget">
      <p>nombre aléatoire : {number}</p>
    </div>
  );
};

export default Widget;