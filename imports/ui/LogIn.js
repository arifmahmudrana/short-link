import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor'

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value.trim(), 
          password = e.target.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      let error = '';
      if (err) {
        error = err.reason;
      }
      this.setState({error});
    })
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Link</h1>
          {this.state.error && <p className="error">{this.state.error}</p>}
          <form onSubmit={this.onSubmit} className="boxed-view__form">
            <input type="email" name="email" placeholder="Email" autoComplete="email" />
            <input type="password" name="password" placeholder="Password" autoComplete="current-password" />
            <button type="submit" className="button">LogIn</button>
          </form>
          <Link to="/sign-up" className="hover">Need an account?</Link>
        </div>
      </div>
    );
  }
}

export default LogIn;