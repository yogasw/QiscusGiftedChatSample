/**
 * Created on : 08/03/20
 * Author     : arioki
 * Name       : Yoga Setiawan
 * GitHub     : https://github.com/arioki
 */

import xs from 'xstream';
import mitt from 'mitt';
import QiscusSDK from 'qiscus-sdk-core';

const distinct = stream => {
  let subscription = null;
  let lastData = null;
  return xs.create({
    start(listener) {
      subscription = stream.subscribe({
        next(data) {
          if (data === lastData) {
            return;
          }
          lastData = data;
          listener.next(data);
        },
        error(error) {
          listener.error(error);
        },
        complete() {
          listener.complete();
        },
      });
    },
    stop() {
      subscription && subscription.unsubscribe();
    },
  });
};

export const qiscus = new QiscusSDK();

const appId = 'qiscusgif-pvh4kw4hfrg';
//const appId = 'sdksample';
const event = mitt();
export const event$ = xs.create({
  start(emitter) {
    event.on('event', data => {
      emitter.next({
        kind: data.kind,
        data: data.data,
      });
    });
  },
  stop() {},
});

export const init = () => {
  qiscus.init({
    AppId: appId,
    options: {
      loginSuccessCallback(authData) {
        event.emit('event', {kind: 'login-success', data: authData});
      },
      typingCallback(data) {
        event.emit('event', {kind: 'typing', data});
      },
      presenceCallback(data) {
        event.emit('event', {kind: 'online-presence', data});
      },
      newMessagesCallback(messages) {
        messages.forEach(messages => {
          event.emit('event', {kind: 'new-message', data: messages});
        });
      },
      commentDeliveredCallback(data) {
        event.emit('event', {kind: 'comment-delivered', data});
      },
      commentReadCallback(data) {
        event.emit('event', {kind: 'comment-read', data});
      },
      loginErrorCallback(data) {
        event.emit('event', {kind: 'login-error', data});
      },
      onReconnectCallback(data) {
        console.log('mqtt Reconnect');
      },
      commentDeletedCallback(data) {
        event.emit('event', {kind: 'comment-deleted', data});
      },
    },
  });
  qiscus.debugMode = true;
  qiscus.debugMQTTMode = true;
};

export const currentUser = () => qiscus.userData;
export const login$ = () =>
  event$.filter(it => it.kind === 'login-success').map(it => it.data);
export const loginError$ = () =>
  event$.filter(it => it.kind === 'login-error').map(it => it.data);
export const isLogin$ = () =>
  xs
    .periodic(300)
    .map(() => qiscus.isLogin)
    .compose(distinct)
    .filter(it => it === true);

export const newMessage$ = () =>
  event$.filter(it => it.kind === 'new-message').map(it => it.data);
export const messageRead$ = () =>
  event$.filter(it => it.kind === 'comment-read').map(it => it.data);
export const messageDelivered$ = () =>
  event$.filter(it => it.kind === 'comment-delivered').map(it => it.data);
export const onlinePresence$ = () =>
  event$.filter(it => it.kind === 'online-presence').map(it => it.data);
export const typing$ = () =>
  event$.filter(it => it.kind === 'typing').map(it => it.data);
export const commentDeleted$ = () =>
  event$.filter(it => it.kind === 'comment-deleted').map(it => it.data);
export function registerDeviceToken(token) {
  const userToken = qiscus.userData.token;
  console.log(`URL : ${qiscus.baseURL}/api/v2/mobile/set_user_device_token`);
  return qiscus
    .registerDeviceToken(token)
    .then(res => {
      console.log('success sending device token', res);
    })
    .catch(error => {
      console.log('failed sending device token', error);
    });
}
export function removeDeviceToken(token) {
  return qiscus
    .removeDeviceToken(token)
    .then(res => {
      console.log('success sending device token', res);
    })
    .catch(error => {
      console.log('failed sending device token', error);
    });
}
