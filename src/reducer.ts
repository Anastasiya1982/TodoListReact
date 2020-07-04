import {api} from "./api";
import {TaskType, TodoType} from "./Types/entities";
import {Dispatch} from "redux";
import {AppStateType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";


export  const SET_TODOLISTS="SET_TODOLISTS";
export const ADD_TODOLIST="TodoList/Reducer/ADD-TODOLIST";
export const ADD_TASK="TodoList/Reducer/ADD-TASK";
export const SET_TASKS= "SET-TASKS";
export const DELETE_TASK ="DELETE_TASK";
export  const UPDATE_TASK ="UPDATE-TASK";
export  const DELETE_TODOLIST= "DELETE_TODOLIST";
export const UPDATE_TODOLIST_TITLE="TodoList/Reducer/UPDATE_TODOLIST_TITLE";

type InitialStateType={
    todolists:Array<TodoType>
}


const initialState:InitialStateType={
    "todolists":[]
}

const reducer=(state:InitialStateType=initialState,action:ActionsType):InitialStateType=> {
    switch (action.type) {
        case UPDATE_TODOLIST_TITLE:
            return {
               ...state,
                todolists: state.todolists.map(tl=>{
                    if(tl.id!= action.todolistId){
                        return tl
                    }else{
                        return {
                            ...tl,
                            title:action.title
                        }
                    }
                })
        }
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(todolist=> {
                    return {
                        ...todolist,
                        tasks: []
                    }
                })
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(todolist=>{
                    if(todolist.id !==action.todolistId){
                        return todolist
                    } else{
                        return {...todolist,tasks:action.tasks}
                    }
                    }

                )
            }
        case ADD_TASK :
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: [...tl.tasks, action.newTask]
                        }
                    } else {
                        return tl
                    }
                })
            }

        case UPDATE_TASK:{
            return {
                ...state,
                todolists: state.todolists.map(todolist=>{
                    if(todolist.id===action.todolistId){
                        return{
                            ...todolist,
                            tasks:todolist.tasks.map(t=>{
                                if(t.id !==action.task.id){
                                    return t
                                }else{
                                    return action.task
                                }
                            })
                        }

                    }else{
                        return todolist
                    }
                })
            }
        }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(
                    todolist => todolist.id !== action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: todo.tasks.filter(task => task.id !== action.taskId)}
                    }
                })
            };
        default:
            return state;
}
 };
export default reducer;


export type ActionsType=SetTodolistsACType|
    DeleteTodolistACType|
    SetTasksACType|CreateTodolistACType|AddTaskACType|
    DeleteTaskACType|UpdateTaskACType|ChangeTodolistTitleACType


type SetTodolistsACType={
    type: typeof SET_TODOLISTS
    todolists:Array<TodoType>
}

type DeleteTodolistACType={
    type:typeof DELETE_TODOLIST
    todolistId:string
}
type SetTasksACType={
    type:typeof SET_TASKS
    todolistId:string
    tasks:Array<TaskType>
}
type CreateTodolistACType ={
    type: typeof ADD_TODOLIST
    newTodolist:TodoType
}

type AddTaskACType={
    type:typeof  ADD_TASK
    newTask:TaskType
    todolistId:string
}
type DeleteTaskACType={
    type:typeof DELETE_TASK
    taskId:string
    todolistId:string
}

type UpdateTaskACType={
    type:typeof UPDATE_TASK
    todolistId:string
    task:TaskType
}
 type ChangeTodolistTitleACType={
    type:typeof UPDATE_TODOLIST_TITLE
     title:string
     todolistId:string
 }
 const setTodolistsAC=(todolists:Array<TodoType>):SetTodolistsACType=>{
    return{
        type:SET_TODOLISTS,
        todolists:todolists
    }
}
const deleteTodolistAC=(todolistId:string):DeleteTodolistACType=>{
    return {
        type: DELETE_TODOLIST,
        todolistId: todolistId
    }
}
 const setTasksAC=(todolistId:string,tasks:Array<TaskType>):SetTasksACType=>{
    return{
        type:SET_TASKS,
        todolistId:todolistId,
        tasks:tasks

    }
}
 const createTodolistAC =(newTodolist:TodoType):CreateTodolistACType=>{
    return{
        type:ADD_TODOLIST,
        newTodolist:newTodolist
    }
}
 const addTaskAC=(newTask:TaskType,todolistId:string):AddTaskACType=>{
    return{
        type:ADD_TASK,
        newTask,
        todolistId
    }
}
 const deleteTaskAC=(taskId:string, todolistId:string):DeleteTaskACType=>{
    return{
        type:DELETE_TASK,
        taskId,
        todolistId
    }
}
export const updateTaskAC=(task:TaskType,todolistId:string):UpdateTaskACType=>{
    return{
        type:UPDATE_TASK,
        todolistId,
        task
    }
}
 const changeTodolistTitleAC=(title:string,todolistId:string):ChangeTodolistTitleACType=>{
    return{
        type:UPDATE_TODOLIST_TITLE,
        title,
        todolistId
    }
}

export type ThunkType=ThunkAction<void,AppStateType,unknown,ActionsType>;
export type ThunkDispatchType  =ThunkDispatch<AppStateType,unknown,ActionsType>
export  const loadTodolists=():ThunkType=> {
    return (dispatch:ThunkDispatchType) => {
        api.setTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data));
            });
    }
}
export const addTodo=(newTitle:string):ThunkType=>{
    return(dispatch:Dispatch<ActionsType>,getState:()=>AppStateType)=>{
        api.createTodolist(newTitle)
            .then(res => {
                let todolist=res.data.data.item;
                dispatch(createTodolistAC(todolist));
                    }
            )
    }
}
export const deleteTodo=(todolistId:string):ThunkType=>{
    return(dispatch:ThunkDispatchType)=>{
        api.deleteTodolist(todolistId)
            .then(res => {
                    if (res.data.resultCode === 0) {
                       dispatch(deleteTodolistAC(todolistId));
                    }
                }
            )
    }
}
export const changeTodolistTitle=(title:string,todolistId:string):ThunkType=>{
    return(dispatch:ThunkDispatchType)=>{
        api.updateTodolistTitle(title,todolistId)
            .then(res=> {
                if (res.data.resultCode === 0) {
                    //change value in Redux
                    dispatch(changeTodolistTitleAC(title, todolistId));
                }
            });

    }
}
export const loadTasks=(todolistId:string):ThunkType=>{
    return (dispatch:ThunkDispatchType)=>{
        api.loadTasks(todolistId)
            .then(res => {
                let tasks=res.data.items
                   dispatch(setTasksAC(todolistId, tasks));
                });
    }
}
export const addTask=(newTitle:string, todolistId:string):ThunkType=>{
    return(dispatch:ThunkDispatchType)=>{
        api.addTask(newTitle, todolistId)
            .then(res => {
                let task=res.data.data.item;
                dispatch(addTaskAC(task,todolistId));
            })
    }
}
export  const deleteTask =(taskId:string,todolistId:string):ThunkType=>{
    return(dispatch:ThunkDispatchType)=>{
        api.deleteTask( taskId,todolistId)
            .then(res => {
                dispatch(deleteTaskAC(taskId, todolistId));
                }
            )
    }
}
export const updateTask=( task:TaskType,todolistId:string):ThunkType=>{
    return (dispatch:ThunkDispatchType)=>{
        api.updateTask( task,todolistId)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(task,todolistId));
                    }
                }
            )
    }
}


