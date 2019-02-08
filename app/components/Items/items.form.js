import React from 'react';
import { connect } from 'react-redux';
import { itemsActions } from '../../actions';

class ItemsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    this.props.dispatch(itemsActions.createItem(this.state.value));
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Item Name:
          <input type='text' onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

const mapStateToProps = store => {
  return {
    items: store.itemsReducer
  };
};

export default connect(mapStateToProps)(ItemsForm);
