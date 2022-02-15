import './TodoListItem.scss'
import cn from 'classnames'
import {MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline} from "react-icons/md";

const TodoListItem = ({todo, onRemove, onToggle}) => {
  const {id, text, checked} = todo;
  return (
    <div className="TodoListItem">
      <div className={cn("checkbox", {checked})} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
        <div className="Text"> {text} </div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline/>
      </div>
    </div>
  );
};

export default TodoListItem;