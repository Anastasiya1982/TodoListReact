export  const SET_TODOLISTS="SET_TODOLISTS";
export const ADD_TODOLIST="TodoList/Reducer/ADD-TODOLIST";
export const ADD_TASK="TodoList/Reducer/ADD-TASK";
export const SET_TASKS= "SET-TASKS";
export const DELETE_TASK ="DELETE_TASK";
export  const UPDATE_TASK ="UPDATE-TASK";
export  const DELETE_TODOLIST= "DELETE_TODOLIST";
export const UPDATE_TODOLIST_TITLE="TodoList/Reducer/UPDATE_TODOLIST_TITLE";




const initialState={
    "todolists":[]
}

const reducer=(state=initialState,action)=> {
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
                todolists: action.todolists.map(tl=> {
                    return {
                        ...tl,
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

                    if(todolist.id===action.task.todoListId){
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
            }
    }

    return state;
}


export const setTodolistsAC=(todolists)=>{
    return{
        type:SET_TODOLISTS,
        todolists:todolists
    }
}
export const setTasksAC=(todolistId,tasks)=>{
    return{
        type:SET_TASKS,
        todolistId:todolistId,
        tasks:tasks

    }
}
export const createTodolistAC =(newTodolist)=>{
    return{
        type:ADD_TODOLIST,
        newTodolist:newTodolist
    }
}
export const addTaskAC=(newTask,todolistId)=>{
    return{
        type:ADD_TASK,
        newTask,
        todolistId
    }
}
export const deleteTaskAC=(taskId, todolistId)=>{
    return{
        type:DELETE_TASK,
        taskId,
        todolistId
    }
}
export const updateTaskAC=(task)=>{
    return{
        type:UPDATE_TASK,
        task
    }
}
export const changeTodolistTitleAC=(title,todolistId)=>{
    return{
        type:UPDATE_TODOLIST_TITLE,
        title,
        todolistId
    }
}




export default reducer;