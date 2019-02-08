import React from 'react';
import { connect } from 'react-redux';
import { itemsActions } from '../../actions';

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteItem = (item, event) => {
    event.preventDefault();
    this.props.dispatch(itemsActions.deleteItem(item));
  };

  render() {
    const { items } = this.props;
    return (
      <div>
        <h3>{items.length}</h3>
        <ul>
          {items &&
            items.map((item, i) => (
              <li key={i}>
                {item}
                <button onClick={event => this.deleteItem(item, event)}>
                  delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    items: store.itemsReducer
  };
};

export default connect(mapStateToProps)(ItemsList);
