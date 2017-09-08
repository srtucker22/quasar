import Immutable from 'seamless-immutable';
import { chai } from 'meteor/practicalmeteor:chai';
import { REHYDRATE } from 'redux-persist/constants';
import * as constants from '../constants/constants';

import reducer from './rtc.reducer';

const { expect } = chai;

describe('rtc reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal({
      localStream: {},
      remoteStreams: {},
    });
  });

  it(`should handle ${REHYDRATE}, ${constants.JOIN_ROOM_STREAM}`, () => {
    const fakeState = {
      something: 'cheese',
    };

    expect(reducer(fakeState, {
      type: REHYDRATE,
      payload: 'something',
    })).to.equal(fakeState);

    expect(reducer(fakeState, {
      type: constants.JOIN_ROOM_STREAM,
      payload: 'something',
    })).to.equal(fakeState);
  });

  it(`should handle ${constants.SET_REMOTE_VIDEO}`, () => {
    const fakeState = {
      something: 'cheese',
      remoteStreams: { yay: 'yay' },
    };

    expect(reducer(fakeState, {
      type: constants.SET_REMOTE_VIDEO,
      id: 1,
      hideVideo: true,
    })).to.equal({
      something: 'cheese',
      remoteStreams: { yay: 'yay', 1: { hideVideo: true } },
    });
  });

  it(`should handle ${constants.ADD_REMOTE_STREAM}`, () => {
    const fakeState = {
      something: 'cheese',
      remoteStreams: { yay: 'yay' },
    };

    expect(reducer(fakeState, {
      type: constants.ADD_REMOTE_STREAM,
      id: 1,
      tracks: { audio: 'something' },
    })).to.equal({
      something: 'cheese',
      remoteStreams: {
        yay: 'yay',
        1: { tracks: { audio: 'something', ready: true } },
      },
    });
  });

  it(`should handle ${constants.UPDATE_REMOTE_STREAM}`, () => {
    const fakeState = {
      something: 'cheese',
      remoteStreams: { yay: 'yay', 1: { tracks: { audio: 'something', ready: true } } },
    };

    expect(reducer(fakeState, {
      type: constants.UPDATE_REMOTE_STREAM,
      id: 1,
      tracks: { audio: 'something else' },
    })).to.equal({
      something: 'cheese',
      remoteStreams: {
        yay: 'yay',
        1: { tracks: { audio: 'something else', ready: true } },
      },
    });
  });

  it(`should handle ${constants.REMOVE_REMOTE_STREAM}`, () => {
    const fakeState = {
      something: 'cheese',
      remoteStreams: { yay: 'yay', 1: { tracks: { audio: 'something', ready: true } } },
    };

    expect(reducer(fakeState, {
      type: constants.REMOVE_REMOTE_STREAM,
      id: 1,
    })).to.equal({
      something: 'cheese',
      remoteStreams: {
        yay: 'yay',
      },
    });
  });

  it(`should handle ${constants.GET_LOCAL_STREAM}`, () => {
    const fakeState = {
      something: 'cheese',
      localStream: { yay: 'yay' },
    };

    expect(reducer(fakeState, {
      type: constants.GET_LOCAL_STREAM,
    })).to.equal({
      something: 'cheese',
      localStream: { yay: 'yay', loading: true },
    });
  });

  it(`should handle ${constants.SET_LOCAL_STREAM}`, () => {
    const fakeState = {
      something: 'cheese',
      localStream: { yay: 'yay' },
    };

    expect(reducer(fakeState, {
      type: constants.SET_LOCAL_STREAM,
    })).to.equal({
      something: 'cheese',
      localStream: {
        yay: 'yay',
        loading: false,
        error: null,
        audio: true,
        video: true,
      },
    });
  });

  it(`should handle ${constants.STOP_LOCAL_STREAM}`, () => {
    const fakeState = {
      something: 'cheese',
      localStream: {
        yay: 'yay',
        loading: false,
        error: null,
        audio: true,
        video: true,
      },
    };

    expect(reducer(fakeState, {
      type: constants.STOP_LOCAL_STREAM,
    })).to.equal({
      something: 'cheese',
      localStream: {},
    });
  });

  it(`should handle ${constants.LOCAL_STREAM_ERROR}`, () => {
    const fakeState = {
      something: 'cheese',
      localStream: {
        yay: 'yay',
        loading: true,
        error: null,
        audio: true,
        video: true,
      },
    };

    expect(reducer(fakeState, {
      type: constants.LOCAL_STREAM_ERROR,
      error: 'some error',
    })).to.equal({
      something: 'cheese',
      localStream: {
        yay: 'yay',
        audio: true,
        video: true,
        loading: false,
        error: 'some error',
      },
    });
  });

  it(`should handle ${constants.TOGGLE_LOCAL_AUDIO}`, () => {
    const fakeState = {
      something: 'cheese',
      localStream: {
        yay: 'yay',
        audio: true,
        video: true,
      },
    };

    expect(reducer(fakeState, {
      type: constants.TOGGLE_LOCAL_AUDIO,
      enabled: false,
    })).to.equal({
      something: 'cheese',
      localStream: {
        yay: 'yay',
        audio: false,
        video: true,
      },
    });
  });

  it(`should handle ${constants.TOGGLE_REMOTE_AUDIO}`, () => {
    const fakeState = {
      something: 'cheese',
      remoteStreams: {
        1: {
          yay: 'yay',
          audio: true,
          video: true,
        },
      },
    };

    expect(reducer(fakeState, {
      type: constants.TOGGLE_REMOTE_AUDIO,
      id: 1,
      enabled: false,
    })).to.equal({
      something: 'cheese',
      remoteStreams: {
        1: {
          yay: 'yay',
          audio: true,
          video: true,
          muted: true,
        },
      },
    });
  });

  it(`should handle ${constants.TOGGLE_LOCAL_VIDEO}`, () => {
    const fakeState = {
      something: 'cheese',
      localStream: {
        yay: 'yay',
        audio: true,
        video: true,
      },
    };

    expect(reducer(fakeState, {
      type: constants.TOGGLE_LOCAL_VIDEO,
      enabled: false,
    })).to.equal({
      something: 'cheese',
      localStream: {
        yay: 'yay',
        audio: true,
        video: false,
      },
    });
  });
});
