import React, {Component} from "react";
import Modal from 'react-modal';

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isOpen: false,
      url: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.inputRef = React.createRef();
  }
  handleSubmit(e) {
    e.preventDefault();
    let url = this.state.url.trim();

    Meteor.call('links.insert', url, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.closeModal();
      }
    });
  }
  closeModal(e) {
    this.setState({
      isOpen: false, 
      url: '',
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>
          + Add Link
        </button>
        <Modal 
          isOpen={this.state.isOpen} 
          contentLabel="Add link" 
          onAfterOpen={() => this.inputRef.current.focus()}
          onRequestClose={this.closeModal}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error && <p className="error">{this.state.error}</p>}
          <form onSubmit={this.handleSubmit} className="boxed-view__form">
            <input type="text" placeholder="URL" value={this.state.url} 
              onChange={e => this.setState({url: e.target.value})} 
              ref={this.inputRef} />
            <button type="submit" className="button">Add Link</button>
            <button type="button" onClick={this.closeModal} className="button button--secondary">Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddLink;