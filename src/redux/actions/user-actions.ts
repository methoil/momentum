import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppEvents } from '../events';
import { IState } from '../reducer';

interface ISetUserInfoPayload {
  token: string;
  userId: string;
  email: string;
  username?: string;
}

export const SetUserInfoAction = (payload: ISetUserInfoPayload) => {
  return {
    type: AppEvents.SET_USER_INFO,
    payload,
  };
};

export const autoLoginFromBearer = (
  existingBearerToken: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const userPromise = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/me`
      );
      const { _id, username, email } = await userPromise.json();
      const payload = {
        token: existingBearerToken,
        userId: _id,
        email,
        username,
      };
      dispatch(SetUserInfoAction(payload));
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const loginUser = (
  email: string,
  password: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const body = { email, password };
      const userPromise = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        {
          method: 'POST',
          body: JSON.stringify(body),
        }
      );
      const res = await userPromise.json();
      const { _id, username } = res.user;
      const payload = {
        userId: _id,
        email,
        token: res.token,
        username,
      };
      dispatch(SetUserInfoAction(payload));
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const createUser = (
  email: string,
  password: string,
  username?: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const body = {
        email,
        password,
        username,
      };
      const createPromise = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await createPromise.json();
      const { _id } = res.user;
      const payload = {
        userId: _id,
        email,
        token: res.token,
        username,
      };
      dispatch(SetUserInfoAction(payload));
    } catch (error) {}
  };
};
