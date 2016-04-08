import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  onReload() {
    this.props.relay.forceFetch();
  }

  render() {
    console.log("App#render this.props:", this.props);
    return (
      <div>
        <h1>Denim List</h1>
        <ul>
          {this.props.denimList.denims.edges.map(edge =>
            <li key={edge.node.id}><strong>{edge.node.brand}</strong>'s <em>{edge.node.model}</em> has min size: {edge.node.size}</li>
          )}
        </ul>
        <button onClick={this.onReload.bind(this)}>Reload</button>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    denimList: () => Relay.QL`
      fragment on DenimList {
        id,
        denims(first: 10) {
          edges {
            node {
              id,
              brand,
              model,
              size,
            },
          },
        },
      }
    `,
  },
});
