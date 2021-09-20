import { VFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Top } from '../pages/Top';
import { Page404 } from '../pages/Page404';
import { TodoList } from '../pages/TodoList';

export const Router: VFC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Top />
      </Route>
      <Route exact path="/todo">
        <TodoList />
      </Route>
      <Route exact path="/*">
        <Page404 />
      </Route>
    </Switch>
  );
};
