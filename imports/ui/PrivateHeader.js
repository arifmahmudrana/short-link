import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PrivateHeader = ({title}) => (
  <div className="header">
    <div className="wrapper header--container">
      <h1 className="header--title">{title}</h1>
      <Link to="/log-out" className="header--link hover ">Log Out</Link>
    </div>
  </div>
);

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;