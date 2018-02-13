const React = require('react');
const ReactDOM = require('react-dom');
const NotificationSystem = require('react-notification-system');
// var constants = require('constants');
// var NotificationGenerator = require('./NotificationGenerator');
// var CustomElement = require('./CustomElement');

// var _getRandomPosition = function() {
//   var positions = Object.keys(constants.positions);
//   return positions[Math.floor(Math.random() * ((positions.length - 1) + 1)) + 0];
// };

// // Styles
// require('styles/base');

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null
    };

    this._addNotification = this._addNotification.bind(this);
  }

  _addNotification(event) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  }

  // componentWillMount() {
  //   this.setState({ viewHeight: window.innerHeight });
  // }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <div>
        <button onClick={this._addNotification}>Add notification</button>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

export default Notifications;

