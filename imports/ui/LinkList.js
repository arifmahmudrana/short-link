import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker';
import Links from '../api/links';
import LinkListItem from './LinkListItem';
import FlipMove from 'react-flip-move';


class LinkList extends Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      this.setState({links: Links.find({
        visible: Session.get('showVisible')
      }).fetch()});
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {
            this.state.links.length
            ? this.state.links.map(
                i => <LinkListItem key={i._id} {...i} 
                        shortUrl={Meteor.absoluteUrl(i._id)} />
            )
            : <p className="item item__noitem">No links</p>
          }        
        </FlipMove>
      </div>
    );
  }
}

export default LinkList;