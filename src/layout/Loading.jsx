import React from 'react';
import sunLoading from './outlined_sun.gif';

const Loading = () => {
  return (
    <div>
      <img
        src={sunLoading}
        alt="Loading"
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default Loading;
