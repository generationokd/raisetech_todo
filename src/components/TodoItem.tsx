import { memo, ReactNode, VFC } from 'react';
import {
  Box,
  Button,
  ListItem,
  Stack,
  UnorderedList,
  WrapItem,
} from '@chakra-ui/react';

import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
  handleCompleteTask?: (index: number) => void;
  handleRemoveTask?: (index: number) => void;
  editTodo?: (index: number) => void;
  handleCancelTask?: (index: number) => void;
  children: ReactNode;
  backGround: string;
};

export const TodoItem: VFC<Props> = memo((props) => {
  const {
    todos,
    handleCompleteTask,
    handleRemoveTask,
    editTodo,
    handleCancelTask,
    children,
    backGround,
  } = props;
  return (
    <WrapItem w="40%">
      <Box bg={backGround} w="100%" h="100%" p={4}>
        <UnorderedList>
          <p>{children}</p>
          {todos.map((todo, index) => (
            <ListItem key={index}>
              {todo.task} <br />
              期限：{todo.date ? todo.date : '期限なし'}
              <Stack spacing={2} direction="row" align="center">
                {handleCompleteTask && (
                  <Button
                    colorScheme="blue"
                    size="md"
                    variant="outline"
                    onClick={() => handleCompleteTask(index)}>
                    完了
                  </Button>
                )}
                {handleRemoveTask && (
                  <Button
                    colorScheme="blue"
                    size="md"
                    variant="solid"
                    onClick={() => handleRemoveTask(index)}>
                    削除
                  </Button>
                )}
                {editTodo && (
                  <Button onClick={() => editTodo(index)}>編集</Button>
                )}
                {handleCancelTask && (
                  <Button
                    colorScheme="blue"
                    size="md"
                    onClick={() => handleCancelTask(index)}>
                    取消
                  </Button>
                )}
              </Stack>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </WrapItem>
  );
});

TodoItem.displayName = 'TodoItem';
