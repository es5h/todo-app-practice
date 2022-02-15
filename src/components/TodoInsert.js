import {MdAdd} from "react-icons/md";
import "./TodoInsert.scss"

const TodoInsert = () => {
  return (
    <form className="TodoInsert">
      <input placeholder="Write what to do" />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;