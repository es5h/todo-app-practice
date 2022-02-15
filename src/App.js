import './App.css';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import {useCallback, useReducer, useRef, useState} from "react";

function BulkTodos() {
  const range = len => Array.from(Array(len).keys());
  return range(2500).reduce((acc, cur) =>
      [...acc, {id: cur, text: `todo ${cur}`, checked: false,}]
    , []);
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return [...todos, action.todo];
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id)
    case 'TOGGLE':
      return todos.map(todo => (todo.id === action.id) ? {...todo, checked: !todo.checked} : todo)
    default:
      return todos;
  }
}

const App = () => {

  const nextId = useRef(4);
  const [todos, dispatch] = useReducer(todoReducer, undefined, BulkTodos);
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false,
    };
    dispatch({type: 'INSERT', todo});
    nextId.current++;
  }, []);

  const onRemove = useCallback(id => {
    dispatch({type: 'REMOVE', id});
  }, []);

  const onToggle = useCallback(id => {
    dispatch({type: 'TOGGLE', id});
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}


export default App;


//To optimize performance with functional method,

/*
const [todos, setTodos] = useState(BulkTodos);
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
}, [todos],);*/
