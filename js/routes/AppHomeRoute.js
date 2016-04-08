import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    denimList: () => Relay.QL`
      query {
        denimList
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
