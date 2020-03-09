/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

export const QiscusMessageToGiftedChat = message => {
  return {
    _id: message.unique_temp_id,
    text: message.message,
    createdAt: new Date(message.timestamp),
    user: {
      _id: message.email,
      name: message.username !== '' ? message.username : message.email,
      avatar: message.avatar_url,
    },
    image: null,
    video: null,
    audio: null,
    system: null,
    sent: message.status === 'sent',
    received: message.status === 'received',
    pending: false,
    quickReplies: null,
  };
};

export const QiscusMessageUpdateToGiftedChat = data => {
  const {comment} = data;
  return {
    _id: comment.unique_id,
    text: comment.message,
    createdAt: new Date(comment.timestamp),
    user: {
      _id: comment.username_real,
      name: comment.username_real,
      avatar: comment.avatar_url || comment.avatar,
    },
    image: null,
    video: null,
    audio: null,
    system: null,
    sent: comment.status === 'sent',
    received: comment.status === 'received',
    pending: false,
    quickReplies: null,
  };
};
