import './App.css';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import {useCallback, useRef, useState} from "react";

function BulkTodos() {
  const range = len => Array.from(Array(len).keys());
  return range(2500).reduce((acc, cur) =>
      [...acc, {id: cur, text: `todo ${cur}`, checked: false,}]
    , []);
}

const App = () => {

  const [todos, setTodos] = useState(BulkTodos);

  const nextId = useRef(4);

  const onInsert = useCallback(text => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false,
      }
      setTodos(todos => [...todos, todo]);
      nextId.current++;
    }, [todos],
  );
  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [todos],);
  const onToggle = useCallback(id => {
    setTodos(todos => todos.map(todo => (todo.id === id) ? {...todo, checked: !todo.checked} : todo));
  }, [todos],);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}


export default App;
