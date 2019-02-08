import React from 'react';
import config from '../app.config';

import ItemsForm from '../components/Items/items.form';
import ItemsList from '../components/Items/items.list';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: config.appname
    };
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        {name}
        <hr />
        <ItemsForm />
        <hr />
        <ItemsList />
      </div>
    );
  }
}

export default Home;
