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

export const ResetUserInfoAction = () => {
  return {
    type: AppEvents.RESET_USER_INFO,
  };
};

export const autoLoginFromBearer = (
  existingBearerToken: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const userPromise = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/me`,
        {
          headers: { Authorization: existingBearerToken },
        }
      );
      if (userPromise.status > 210 || userPromise.status < 200) {
        localStorage.removeItem('BEARER_TOKEN');
        return Promise.reject(userPromise.statusText);
      }

      const { _id, username, email } = await userPromise.json();
      const payload = {
        token: existingBearerToken,
        userId: _id,
        email,
        username,
        loggedIn: true,
      };

      return dispatch(SetUserInfoAction(payload));
    } catch (error) {
      localStorage.removeItem('BEARER_TOKEN');
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
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await userPromise.json();
      if (userPromise.status > 210 || userPromise.status < 200) {
        localStorage.removeItem('BEARER_TOKEN');
        return Promise.reject(userPromise.statusText);
      }
      const { _id, username } = res.user;
      const payload = {
        userId: _id,
        email,
        token: `Bearer ${res.token}`,
        username,
        loggedIn: true,
      };
      dispatch(SetUserInfoAction(payload));
      localStorage.setItem('BEARER_TOKEN', payload.token);
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
      if (createPromise.status > 210 || createPromise.status < 200) {
        localStorage.removeItem('BEARER_TOKEN');
        return Promise.reject(createPromise.statusText);
      }
      const { _id } = res.user;
      const payload = {
        userId: _id,
        email,
        token: `Bearer ${res.token}`,
        username,
        loggedIn: true,
      };
      dispatch(SetUserInfoAction(payload));
      localStorage.setItem('BEARER_TOKEN', payload.token);
    } catch (error) {}
  };
};

export const logoutUser = (): ThunkAction<
  void,
  IState,
  unknown,
  Action<string>
> => {
  return async (dispatch, getState) => {
    const logoutPromise = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/logout`,
      {
        method: 'POST',
        headers: { Authorization: getState().user.token },
      }
    );
    // const res = await logoutPromise.json();
    if (logoutPromise.status > 210 || logoutPromise.status < 200) {
      return Promise.reject(logoutPromise.statusText);
    }

    localStorage.removeItem('BEARER_TOKEN');
    dispatch(ResetUserInfoAction());

    try {
    } catch (error) {}
  };
};
