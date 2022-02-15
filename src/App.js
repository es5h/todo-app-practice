import './App.css';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import {useCallback, useRef, useState} from "react";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1, text: 'first', checked: true
    },
    {
      id: 2, text: 'second', checked: true
    },
    {
      id: 3, text: 'third', checked: false
    }
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(text => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false,
      }
      setTodos([...todos, todo]);
      nextId.current++;
    }, [todos],
  );
  const onRemove = useCallback(id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }, [todos],);
  const onToggle = useCallback( id => {
    setTodos(todos.map(todo => (todo.id === id)? {...todo, checked : !todo.checked} : todo));
  }, [todos],);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}


export default App;
