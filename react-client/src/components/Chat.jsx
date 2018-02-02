import io from 'socket.io-client';
import React from 'react';
import { Popup, Segment, Input, Header, Image, Button } from 'semantic-ui-react'


class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        message: []
      }
    };
  }


  // componentDidMount() {
  //   let data = this.state.data
  //   setTimeout(() => {
  //     this.refs.author.refs.input.focus()
  //   }, 100)
  //   const socket = io()
  //   Cosmic.getObjects(config, (err, res) => {
  //     const messages = res.objects.type.messages
  //     if (messages) {
  //       messages.reverse()
  //       this.setState({
  //         data: {
  //           author: data.author,
  //           messages
  //         }
  //       })
  //     }
  //   })
  //   // Listen for messages coming in
  //   socket.on('chat message', message => {
  //     data = this.state.data
  //     const messages = this.state.data.messages
  //     if (data.author !== message.metafield.author.value) {
  //       messages.push(message)
  //       this.setState({
  //         data: {
  //           author: data.author,
  //           messages
  //         }
  //       })
  //     }
  //   })
  // }


  // componentDidUpdate() {
  //   if (this.refs.message)
  //     this.refs.message.refs.input.focus()
  //   if (this.refs.messages_scroll_area)
  //     this.refs.messages_scroll_area.scrollTop = this.refs.messages_scroll_area.scrollHeight
  // }

  // setAuthor() {
  //   const author = this.refs.author.refs.input.value.trim()
  //   if (!author)
  //     return
  //   this.refs.author.refs.input.value = ''
  //   const messages = this.state.data.messages
  //   this.setState({
  //     data: {
  //       author,
  //       messages
  //     }
  //   })
  // }

  // createMessage() {
  //   const data = this.state.data
  //   const messages = data.messages
  //   const socket = io()
  //   const message_text = this.refs.message.refs.input.value.trim()
  //   if (!message_text)
  //     return
  //   const message_emit = {
  //     message: message_text,
  //     author: data.author
  //   }
  //   // Send message out
  //   socket.emit('chat message', message_emit)
  //   // Render to browser
  //   const message_browser = {
  //     _id: uuid.v1(),
  //     metafield: {
  //       author: {
  //         value: data.author
  //       },
  //       message: {
  //         value: message_text
  //       }
  //     }
  //   }
  //   messages.push(message_browser)
  //   this.setState({
  //     data: {
  //       author: data.author,
  //       messages
  //     }
  //   })
  //   this.refs.message.refs.input.value = ''
  // }

  // handleSubmit(e) {
  //   e.preventDefault()
  //   const data = this.state.data
  //   if (data.author)
  //     this.createMessage()
  //   else
  //     this.setAuthor()
  // }

  render() {

    const Chatbox = (
      <div>
        <Header as='h2' attached='top'>Dan</Header>
        <Segment attached>
          <p>Dan: hello</p>
          <p>Ralph: hi there!</p>
        </Segment>
        <Segment attached><Input focus placeholder='...' /></Segment>
      </div>
    );

    return (
      <Popup
        trigger={<Button color='green' content='Chat' />}
        content={Chatbox}
        on='click'
      />
    );
  }

}

export default Chat;