import { FormEvent, useCallback, useEffect, useState, VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Wrap } from '@chakra-ui/layout';
import { Input, Button, VStack } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import { useMessage } from '../hooks/useMessage';
import { TodoItem } from '../components/TodoItem';
import { TodoLink } from '../components/buttons/TodoLink';
import { TodoModal } from '../components/modals/TodoModal';
import { useInitialData } from '../hooks/useInitialData';
import { userState } from '../store/userState';
import { Todo } from '../types/todo';
import { User } from '../types/user';

export const TodoList: VFC = () => {
  const { planList, completeList, apiData } = useInitialData();
  useEffect(() => {
    if (apiData.length) {
      setTodo(planList);
      setComplete(completeList);
    }
  }, [planList, completeList, apiData]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [task, setTask] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [todos, setTodo] = useState<Todo[]>([]);
  const [completes, setComplete] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number>(0);
  const [editTask, setEditTask] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');

  const userInfo = useRecoilValue<User>(userState);

  const { showMessage } = useMessage();

  const handleNewTask = useCallback((e) => {
    setTask(e.target.value);
  }, []);

  const handleNewDate = useCallback((e) => {
    setDate(e.target.value);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task === '') {
      showMessage({
        title: 'タスクを入力してください。',
        status: 'error',
        duration: 5000,
      });
      return;
    }
    setTodo((todos) => [...todos, { task, date, isCompleted: false }]);
    setTask('');
    showMessage({
      title: '登録しました。',
      status: 'success',
      duration: 2000,
    });
  };

  const handleCompleteTask = useCallback(
    (index: number) => {
      const newCompletes = [...completes, todos[index]];
      setComplete(newCompletes);
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodo(newTodos);
      showMessage({
        title: 'お疲れっした～～～！！！',
        status: 'success',
        duration: 2000,
      });
    },
    [completes, todos]
  );

  const handleRemoveTask = useCallback(
    (index: number) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodo(newTodos);
      showMessage({
        title: '削除しました。',
        status: 'success',
        duration: 2000,
      });
    },
    [todos]
  );

  const handleCancelTask = useCallback(
    (index: number) => {
      const newTodos = [...todos, completes[index]];
      setTodo(newTodos);
      const newCompletes = [...completes];
      newCompletes.splice(index, 1);
      setComplete(newCompletes);
      showMessage({
        title: '取り消しました。',
        status: 'success',
        duration: 2000,
      });
    },
    [todos, completes]
  );

  const editTodo = useCallback(
    (index: number) => {
      setEditIndex(index);
      const changeTask = todos[index].task;
      setEditTask(changeTask);
      const changeDate = todos[index].date;
      setEditDate(changeDate);
      onOpen();
    },
    [todos]
  );

  const editTaskChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditTask(e.target.value);
    },
    []
  );
  const editDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditDate(e.target.value);
    },
    []
  );

  const editTodoUpdate = useCallback(() => {
    if (editTask === '') {
      showMessage({
        title: 'タスクを入力してください。',
        status: 'error',
        duration: 5000,
      });
      return;
    }
    const editList = [
      {
        task: editTask,
        date: editDate,
      },
    ];
    todos[editIndex] = editList[0];
    const newTodos = [...todos];
    setTodo(newTodos);
    showMessage({
      title: '更新しました。',
      status: 'success',
      duration: 2000,
    });
    onClose();
  }, [editTask, editDate]);

  const onClickTop = () => {
    planList.length = 0;
    completeList.length = 0;
  };

  return (
    <Box m="3">
      <h1>TODOアプリ</h1>
      <VStack align="center">
        <Box>ユーザーID：{userInfo ? userInfo.userID : 'ノーID'}</Box>
        <Box>ユーザー名：{userInfo ? userInfo.userName : 'ノーName'}</Box>
      </VStack>
      <FormControl>
        <FormLabel>予定</FormLabel>
        <Input
          value={task}
          placeholder="予定を入れろ～"
          onChange={handleNewTask}
        />
        <FormLabel>期限</FormLabel>
        <Input value={date} type="date" onChange={handleNewDate} />
        <Button colorScheme="teal" onClick={handleSubmit}>
          登録
        </Button>
      </FormControl>
      <Wrap minH="200px">
        <TodoItem
          todos={todos}
          handleCompleteTask={handleCompleteTask}
          handleRemoveTask={handleRemoveTask}
          editTodo={editTodo}
          backGround="#00FFCC">
          予定
        </TodoItem>
        <TodoItem
          todos={completes}
          handleCancelTask={handleCancelTask}
          backGround="#FFFF99">
          完了
        </TodoItem>
      </Wrap>
      <TodoModal
        isOpen={isOpen}
        onClose={onClose}
        editTask={editTask}
        editTaskChange={editTaskChange}
        editDate={editDate}
        editDateChange={editDateChange}
        editTodoUpdate={editTodoUpdate}
      />
      <TodoLink link="/" onClick={onClickTop}>
        Topページへ
      </TodoLink>
    </Box>
  );
};
