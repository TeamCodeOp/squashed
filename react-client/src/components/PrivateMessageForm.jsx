import React from 'react'
import { Form } from 'semantic-ui-react'

class PrivateMessageForm extends React.Component {
constructor(props) {
  super(props);
  this.state = {};
}

  handleChange(e, { value }) {
    this.setState({ value })
  }

  render() {
    const { value } = this.state;
    return (
      <Form>
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default PrivateMessageForm;
