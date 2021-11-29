import React from 'react';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div
        style={{
          width: '100%',
          background: 'grey',
          textAlign: 'center',
          fontWeight: '700',
          padding: '0.5rem',
          marginTop: '0.5rem',
        }}
      >
        <i>{alert.message}</i>
      </div>
    )
  );
};

export default Alert;
