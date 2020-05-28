import {createStore} from "redux";


const initialState={
    todolists:[
        {id:0,title:"today",tasks:[
                {id:1,title:"CSS",isDone:true,priority:'low'},
                {id:2,title:"JS",isDone:false,priority:'high'},
                {id:3,title:"HTML",isDone:true,priority:'low'}
            ]},
        {id:1,title:"tomorrow",tasks:[
                {id:1,title:"CSS",isDone:true,priority:'low'},
                {id:2,title:"JS",isDone:false,priority:'high'},
                {id:3,title:"HTML",isDone:true,priority:'low'}
            ]},
        {id:2,title:"yesterday",tasks:[
                {id:1,title:"CSS",isDone:true,priority:'low'},
                {id:2,title:"JS",isDone:false,priority:'high'},
                {id:3,title:"HTML",isDone:true,priority:'low'}
            ]}
    ]
}

const reducer=(state=initialState,action)=> {
    switch (action.type) {
        case "ADD_TODOLIST":
            return {
                ...state, todolists: [...state.todolists, action.newTodoList]
            }
        case "ADD_TASK" :
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl, tasks: [...tl.tasks, action.newTask]
                        }
                    } else {
                        return tl
                    }
                })
            }
        case "CHANGE_TASK":
           const todolistsNew = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {...todo, tasks: [...todo.tasks.map(task=>{
                            if(task.id !==action.taskId){
                                return task
                            }else{
                                return {...task,...action.obj}
                            }
                        })]
                    }
                }
            })
            return {...state, todolists:  todolistsNew}


    }

    return state;
}


const store=createStore(reducer);
export default store;