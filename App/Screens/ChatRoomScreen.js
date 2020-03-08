/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import * as Qiscus from '../Services/qiscus';
import {QiscusMessageToGiftedChat} from '../Helpers';

class ChatRoomScreen extends React.Component {
  state = {
    messages: [],
    room: {},
  };
  constructor(props) {
    super(props);
    this.user = this.props.route.params.user;
  }
  componentDidMount() {
    /*this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          sent: true,
        },
        {
          _id: 2,
          text: 'My message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          user: {
            _id: 1,
            name: 'React Native',
            avatar:
              'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
          },
          image:
            'https://image.shutterstock.com/image-vector/sample-stamp-square-grunge-sign-260nw-1474408826.jpg',
          // You can also add a video prop:
          // video:
          //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          // // Any additional custom parameters are passed through
        },
        {
          _id: 3,
          text: 'This is a system message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
          // Any additional custom parameters are passed through
        },
        {
          id: 4,
          text: 'message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 2)),
          user: {
            _id: 1,
            name: 'Test',
            avatar: 'https://piktochart.com/wp-content/authors/Wilson-113.jpg',
          },
          pending: false,
          sent: false,
          received: false,
        },
        {
          _id: 5,
          text:
            'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
          createdAt: new Date(),
          quickReplies: {
            type: 'radio', // or 'checkbox',
            keepIt: true,
            values: [
              {
                title: '😋 Yes',
                value: 'yes',
              },
              {
                title: '📷 Yes, let me show you with a picture!',
                value: 'yes_picture',
              },
              {
                title: '😞 Nope. What?',
                value: 'no',
              },
            ],
          },
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ],
    });*/
    this.getDataRoom(this.user.email);
  }
  loadMessage = roomId => {
    /*       var options = {
          last_comment_id:10,
          after:false,
          limit:20
      }*/

    Qiscus.qiscus
      .loadComments(roomId)
      .then(messages => {
        const formattedMessages = messages.reduce((result, message) => {
          result[message.unique_temp_id] = QiscusMessageToGiftedChat(message);
          return result;
        }, {});
        this.setState({messages: Object.values(formattedMessages)});
      })
      .catch(function(error) {
        // On error
      });
  };
  getDataRoom = email => {
    Qiscus.qiscus
      .chatTarget(email)
      .then(room => {
        this.setState({room});
        this.loadMessage(room.id);
      })
      .catch(function(error) {
        // On error
      });
  };

  sendMessage = (messages = []) => {
    messages[0].pending = true;
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    Qiscus.qiscus
      .sendComment(this.state.room.id, messages[0].text)
      .then(comment => {
        let message = [];
        message.push(QiscusMessageToGiftedChat(comment));
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }));
      })
      .catch(function(error) {
        // On error
      });
  };
  _updateMessage = (message, newMessage) => {
    this.setState(state => ({
      messages: {
        ...state.messages,
        [message._id]: newMessage,
      },
    }));
  };

  render() {
    console.log('isis state', this.state);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.sendMessage(messages)}
        user={{
          _id: Qiscus.currentUser().id,
        }}
      />
    );
  }
}

export default ChatRoomScreen;
