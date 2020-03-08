/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

export const QiscusMessageToGiftedChat = message => {
  return {
    _id: message.id,
    text: message.message,
    createdAt: new Date(message.unix_timestamp),
    user: {
      _id: message.user_id,
      name: message.username !== '' ? message.username : message.email,
      avatar: message.avatar_url,
    },
    image: null,
    video: null,
    audio: null,
    system: null,
    sent: message.status === 'send',
    received: message.status === 'received',
    pending: false,
    quickReplies: null,
  };
};
