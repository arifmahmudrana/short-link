import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import ClipBoard from 'clipboard';
import LinkStat from './LinkStat';

class LinkListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonText: 'Copy' };
    this.buttonRef = React.createRef();
    this.timeOut = null;
    this.clipBoardItem = null;
  }
  componentDidMount() {
    this.clipBoardItem = new ClipBoard(this.buttonRef.current);
    this.clipBoardItem.on('success', () => {
      this.setState({buttonText: 'Copied'});
      this.timeOut = setTimeout(() => this.setState({buttonText: 'Copy'}), 1000);
    }).on('error', () => {
      alert('Unable to copy. Manually copy the link.');
    });
  }
  componentWillUnmount() {
    this.clipBoardItem.destroy();
    clearTimeout(this.timeOut)
  }
  render() {
    const {_id, url, shortUrl, visible, visited_count, last_visited} = this.props;

    return (
      <div className="item">
        <h2>{url}</h2>
        <p>{shortUrl}</p>        
        <LinkStat visited_count={visited_count} last_visited={last_visited} />
        <a href={shortUrl} target="_blank" className="button button--link button--pill">Visit</a>
        <button ref={this.buttonRef} data-clipboard-text={shortUrl} className="button button--pill">
          {this.state.buttonText}
        </button>
        <button onClick={
          () => Meteor.call(
            'links.setVisibility', _id, !visible
          )
        } className="button button--pill">
          {visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinkListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visited_count: PropTypes.number.isRequired,
  last_visited: PropTypes.number
};

export default LinkListItem;