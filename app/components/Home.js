import React from 'react';
import config from '../app.config';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: config.appname
    };
  }

  render() {
    const { name } = this.state;
    return <div>{name}</div>;
  }
}

export default Home;
