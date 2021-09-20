import { VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { Box } from '@chakra-ui/react';

import { TodoLink } from '../components/buttons/TodoLink';
import { userState } from '../store/userState';
import { User } from '../types/user';

export const Top: VFC = () => {
  const setUserInfoRecoil = useSetRecoilState<User>(userState);

  const onClickUser1 = () => {
    setUserInfoRecoil({ userID: 1, userName: 'TEST1' });
  };
  const onClickUser2 = () => {
    setUserInfoRecoil({ userID: 2, userName: 'TEST2' });
  };

  return (
    <Box mt="50" textAlign="center">
      <h1>TODOアプリ トップページ</h1>
      <TodoLink link="/todo" onClick={onClickUser1}>
        Todoリスト（ユーザー１）
      </TodoLink>
      <TodoLink link="/todo" onClick={onClickUser2}>
        Todoリスト（ユーザー２）
      </TodoLink>
    </Box>
  );
};
