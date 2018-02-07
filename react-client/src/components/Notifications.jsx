var React = require('react');
var ReactDOM = require('react-dom');
var NotificationSystem = require('react-notification-system');
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
    console.log('line 19:' , this)
    this.state = {
      _notificationSystem: null
    }

    this._addNotification = this._addNotification.bind(this);
  }

   _addNotification(event) {
    console.log('line 26:', event);
    console.log('line 27:', this);
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

