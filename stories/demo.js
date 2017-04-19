import React from 'react';

import Sample from '../src'

const buttonStyles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10,
};

const Demo = ({ children, onClick }) => (
  <Sample
    style={buttonStyles}
    onClick={onClick}
  >
    {children}
  </Sample>
);

Demo.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Demo;
