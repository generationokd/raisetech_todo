import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

import { userState } from '../store/userState';
import { Todo } from '../types/todo';
import { User } from '../types/user';

const planList: Todo[] = [];
const completeList: Todo[] = [];

type TodoData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const useInitialData = () => {
  const [apiData, setApiData] = useState<TodoData[]>([]);
  useEffect(() => {
    axios
      .get<TodoData[]>('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        setApiData(response.data);
      });
  }, []);

  const userInfo = useRecoilValue<User>(userState);
  let number = 0;
  if (userInfo) {
    if (userInfo.userID === 1) {
      number = 1;
    } else if (userInfo.userID === 2) {
      number = 2;
    }
  }

  const day = new Date();
  const setDay = new Date();
  useEffect(() => {
    if (apiData.length) {
      for (let i = number * 10; i < number * 10 + 10; i++) {
        setDay.setDate(day.getDate() + i);

        const initialYear = setDay.getFullYear();
        const initialMonth = setDay.getMonth() + 1;
        const initialDay = setDay.getDate();
        const initialDate =
          initialYear +
          '-' +
          ('0' + initialMonth).slice(-2) +
          '-' +
          ('0' + initialDay).slice(-2);

        if (apiData[i].completed === false) {
          planList.push({
            id: apiData[i].id,
            task: apiData[i].title,
            date: initialDate,
          });
        } else {
          completeList.push({
            id: apiData[i].id,
            task: apiData[i].title,
            date: initialDate,
          });
        }
      }
    }
  }, [apiData]);

  return { planList, completeList, apiData };
};
