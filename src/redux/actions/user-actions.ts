import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppEvents } from "../events";
import { IState } from "../reducer";

interface ISetUserInfoPayload {
  token: string,
  userId: string,
  email: string,
  username?: string,
}

export const SetUserInfoAction = (payload: ISetUserInfoPayload) => {
  return {
    type: AppEvents.SET_USER_INFO, payload,
  }
}


export const autoLoginFromBearer =  (
  existingBearerToken?: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async (dispatch) => {
    if (existingBearerToken) {
      try {
        const userPromise = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/users/me`
        );
        const {_id, username, email} = await userPromise.json();
        const payload = {
          token: existingBearerToken,
          userId: _id,
          email,
          username,
        }
        dispatch(SetUserInfoAction(payload))
      } catch (error) {
        // return false here?
      }
    }
  };
};

export const loginUser = (
  existingBearerToken?: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async (dispatch) => {
    if (existingBearerToken) {
      try {
        const userPromise = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/users/me`
        );
        const userInfo = await userPromise.json();
      } catch (error) {

      }
    }
  };
};

export const createUser = () => {};
