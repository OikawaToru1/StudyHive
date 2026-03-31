import {React,useEffect,useState} from 'react'
import { IoMdAdd } from "react-icons/io";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { RiDeleteBin5Line } from "react-icons/ri";
import {useSelector, useDispatch} from 'react-redux'
import { addTodo, removeTodo, updateTodo } from '../../store/todoSlice';
import axios from 'axios';
import { addUser } from '../../store/authSlice';

function Todo({themeStatus, customThemeStatus, customTheme}) {
  const username = useSelector(state=> state.auth.user.username)
  const [todo,setTodo] = useState('')
  let test = useSelector(state=> state.todo.todos)
  // console.log(test,"test todooooo")
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!username)
    {
      axios.get('/api/auth/me')
      .then(res=> dispatch(addUser({username: res.data.username})))
      .catch(err=> console.log('You are not authenticated, so data will be stored temporarily'))
    }
  },[]);

  const saveTodo = ()=>{
      // post todo in backend
      {
        username && axios.post('api/todos/create',{content: todo})
      .then(res=> console.log('created todo succesfully', res.data))
      .catch(err=> console.log('something went wrong', err))
      }
  }

  const deleteTodo = ()=>{
    const id = 1
    {
      username && axios.delete(`/api/todos/delete/${id}`)
    }

  }

  return (
    <>
      <div
        className={`${
          customThemeStatus
            ? `bg-${customTheme}`
            : themeStatus
              ? "bg-black text-white"
              : "bg-white text-black"
        } w-full h-15 rounded-md border-1 border-gray-800 flex justify-around items-center`}
      >
        <input
          value={todo}
          onKeyDown={(e) => {
            if (e.key === "Enter" && todo.length > 0) {
              dispatch(addTodo({ content: todo }));
              // setTodos(prev=> [ {content: todo, isCompleted: false},...prev])
              setTodo("");
              if (username) {
                saveTodo();
              } else {

                dispatch(addTodo({ content: todo }));
              }
            }
          }}
          onChange={(e) => {
            e.preventDefault();
            setTodo(e.currentTarget.value);
          }}
          placeholder="Add a task ..."
          className=" px-4 py-2 border-1 border-gray-800 rounded-md w-3/4 "
          type="text"
        />
        <IoMdAdd
          className="text-black bg-white rounded-md hover:text-white hover:bg-blue-950 hover:cursor-pointer"
          size={30}
          onClick={(e) => {
            if (todo.length > 0) {
              dispatch(addTodo({ content: todo }));
              setTodo("");
              if (username) {
                saveTodo();
              }
            }
          }}
        />
      </div>
      <div className=" w-full h-60 overflow-y-scroll lg:text-md text-sm md:text-md ">
        <ul>
          {test.length > 0 &&
            test.map((todo) => (
              <li
                key={todo.id}
                className={`${
                  customThemeStatus
                    ? `bg-${customTheme}`
                    : themeStatus
                      ? "bg-black text-white"
                      : "bg-white text-black"
                } rounded-md border-1 border-gray-800 p-4 mt-3 flex justify-between ${todo.completedStatus ? "line-through" : ""} `}
              >
                {todo.completedStatus ? (
                  <ImCheckboxChecked
                    onClick={() => {
                      dispatch(
                        updateTodo({ completedStatus: false, id: todo.id }),
                      );
                    }}
                  />
                ) : (
                  <ImCheckboxUnchecked
                    onClick={() => {
                      dispatch(
                        updateTodo({ completedStatus: true, id: todo.id }),
                      );
                    }}
                  />
                )}
                <p>{todo.content}</p>
                <RiDeleteBin5Line
                  className="hover:text-red-600"
                  onClick={() => {
                    dispatch(removeTodo({ id: todo.id }));
                  }}
                />
              </li>
            ))}
          <li
            className={`${
              customThemeStatus
                ? `bg-${customTheme}`
                : themeStatus
                  ? "bg-black text-white"
                  : "bg-white text-black"
            } rounded-md  border-1 border-gray-800 p-4 mt-3 flex justify-between`}
          >
            <ImCheckboxUnchecked />
            <p>Do HomeWork</p>
            <RiDeleteBin5Line className="hover:text-red-600" />
          </li>
          <li
            className={`${
              customThemeStatus
                ? `bg-${customTheme}`
                : themeStatus
                  ? "bg-black text-white"
                  : "bg-white text-black"
            } rounded-md border-1 border-gray-800 p-4 mt-3 flex justify-between`}
          >
            <ImCheckboxChecked />
            <p className="line-through">Code Ui </p>
            <RiDeleteBin5Line className="hover:text-red-600" />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Todo