import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

class LinkListFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { showVisible: Session.get('showVisible') };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  onChange() {
    Session.set('showVisible', !Session.get('showVisible'));
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" onChange={this.onChange} checked={!this.state.showVisible} />
          Show hidden links
        </label>
      </div>
    );
  }
}

export default LinkListFilters;