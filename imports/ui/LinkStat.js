import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const LinkState = ({visited_count, last_visited}) => {
  const visitMessage = visited_count > 1 ? 'Visits' : 'Visit';
  let message = null;

  if (visited_count && last_visited) {
    message = '(visited ' + moment(last_visited).fromNow() + ')';
  }
  return (
    <p>{visited_count} {visitMessage} {message}</p>
  );
}

LinkState.propTypes = {
  visited_count: PropTypes.number.isRequired,
  last_visited: PropTypes.number
};
export default LinkState;