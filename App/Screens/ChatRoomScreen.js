/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import * as Qiscus from '../Services/qiscus';
import {
  QiscusMessageToGiftedChat,
  QiscusMessageUpdateToGiftedChat,
} from '../Helpers';
import xs from 'xstream';

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
    this.getDataRoom(this.user.email);
    this.subscription = xs
      .merge(
        Qiscus.newMessage$().map(this._onNewMessage),
        Qiscus.messageRead$().map(this._onMessageRead),
        Qiscus.messageDelivered$().map(this._onMessageDelivered),
        Qiscus.onlinePresence$().map(this._onOnline),
        Qiscus.typing$()
          .filter(it => Number(it.room_id) === this.state.room.id)
          .map(this._onTyping),
      )
      .subscribe({
        next: () => {},
        error: error => console.log('subscription error', error),
      });
  }

  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
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
        this.setState({messages: formattedMessages});
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
    this.addMessage(messages[0]);
    Qiscus.qiscus
      .sendComment(this.state.room.id, messages[0].text, messages[0]._id)
      .then(comment => {
        console.log('sendComment', comment);
        this.updateMessage(messages[0]._id, QiscusMessageToGiftedChat(comment));
      })
      .catch(function(error) {
        // On error
      });
  };
  updateMessage = (id, newMessage) => {
    this.setState(state => ({
      messages: {
        ...state.messages,
        [id]: newMessage,
      },
    }));
  };
  addMessage = messages => {
    this.setState(state => ({
      messages: {
        [messages._id]: messages,
        ...state.messages,
      },
    }));
  };

  render() {
    console.log('state_message', this.state);
    return (
      <GiftedChat
        messages={Object.values(this.state.messages)}
        onSend={messages => this.sendMessage(messages)}
        user={{
          _id: Qiscus.currentUser().email,
        }}
        placeholder={'Type a message...'}
      />
    );
  }

  _onNewMessage = message => {
    console.log('_onNewMessage', message);
    this.addMessage(QiscusMessageToGiftedChat(message));
  };

  _onMessageRead = data => {
    console.log('_onMessageRead', QiscusMessageUpdateToGiftedChat(data));
    this.updateMessage(
      data.comment.unique_id,
      QiscusMessageUpdateToGiftedChat(data),
    );
  };

  _onMessageDelivered = data => {
    console.log('_onMessageDelivered', QiscusMessageUpdateToGiftedChat(data));
    this.updateMessage(
      data.comment.unique_id,
      QiscusMessageUpdateToGiftedChat(data),
    );
  };

  _onOnline = data => {};

  _onTyping = data => {};
}

export default ChatRoomScreen;
