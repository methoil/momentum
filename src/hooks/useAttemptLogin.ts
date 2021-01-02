import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { loadHabits } from '../redux/actions/habit-thunks';
import { autoLoginFromBearer } from '../redux/actions/user-actions';
import { IUser } from '../redux/reducer';
import { generateDisplayedDates } from '../services/date-utils';

export default function useAttemptLogin(user: IUser, loadData: boolean = false) {
  const dispatch = useDispatch();
  useEffect(() => {
    const attemptLogin = async () => {
      let bearerToken = localStorage.getItem('BEARER_TOKEN');
      if (bearerToken && !user.loggedIn) {
        try {
          await dispatch(autoLoginFromBearer(bearerToken));
          // setGoToDashboard(true);
        } catch (error) {
          localStorage.removeItem('BEARER_TOKEN');
        }
      }
    }
    attemptLogin().finally(() => {
      if (!loadData) return;
      const displayedDates = generateDisplayedDates(30);
      dispatch(loadHabits(displayedDates));
    });
  }, []);
}