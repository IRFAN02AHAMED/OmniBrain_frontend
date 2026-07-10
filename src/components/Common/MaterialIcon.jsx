import React from 'react';

const MaterialIcon = ({ name, className = '', style = {}, filled = false }) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;
