import React, { Component } from 'react';
import '../styling/search.css';

class Search extends Component {
  state = {
    text: '',
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something');
    } else {
      this.props.searchCity(this.state.text);
      this.setState({ text: '' });
    }
  };

  render() {
    return (
      <div className="search-container">
        <form className="form-input" onSubmit={this.onSubmit}>
          <input
            className="input-field"
            placeholder="Enter a city..."
            type="text"
            name="text"
            onChange={this.onChange}
            value={this.state.text}
          />
          <input className="submit-field" type="submit" value="search" />
        </form>
      </div>
    );
  }
}

export default Search;
