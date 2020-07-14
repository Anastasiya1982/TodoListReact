import axios from "axios";
import {TaskType, TodoType} from "./Types/entities";

const baseUrl="https://social-network.samuraijs.com/api/1.1";

const instance=axios.create({
    baseURL:baseUrl,
    withCredentials: true,
    headers: {"API-KEY": "0e5317f8-1eba-40e8-9b59-8d5e29cf9296"}
})

// смотрим в документации что приходит с сервера в responce
// resultCode: 0
// messages: [],
//     data: {
//     item:   {
//         "id": "a2dfe62b-ebce-4b37-9581-1cc77ebc999f",
//             "title": "important",
//             "addedDate": "2019-07-30T12:23:49.677",
//             "order": 0
//     }
// }
type GetTodolistType=Array<TodoType>

type GetTasksType={
    error:null|string
    items:Array<TaskType>
    totalCount:number
}


type CommonAPIType<T> = {
    resultCode: 0 | 1 | 100
    messages: Array<string>
    data: T
}


// type CreateTodoType={
//     resultCode:0|1|100
//     messages:Array<string>
//     data:{
//         item:TodoType
//     }
// }
//
// type Response2TaskType={
//     resultCode:0|1|100
//     messages:Array<string>
//     data:{
//         item:TaskType
//     }
// }
// type DeleteTaskType= {
//     resultCode: 0 | 1 | 100
//     messages: Array<string>
//     data: {}
// }



export const api  = {
    createTodolist(newTitle:string) {
        return instance.post<CommonAPIType<{item:TodoType}>>("/todo-lists",
            {title:newTitle});

    },
    setTodolists() {
        return instance.get<GetTodolistType>(`/todo-lists`);
                },

    loadTasks(todolistId:string) {
        return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks`);
    },

    addTask(newTitle:string,todolistId:string){
      return   instance.post<CommonAPIType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`,
          {title:newTitle})
    },
    updateTask(task:TaskType,todolistId:string){
         return instance.put<CommonAPIType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/${task.id}`, task);
    },
    deleteTodolist(todolistId:string){
        return  instance.delete<CommonAPIType<{}>>("/todo-lists/"+ todolistId)
    },
    deleteTask(taskId:string,todolistId:string){
        return instance.delete<CommonAPIType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTodolistTitle(title:string,todolistId:string){
        return instance.put<CommonAPIType<{item:TaskType}>>(`/todo-lists/${todolistId}`,title);
    },
    authMe(){
        return instance.get(`/auth/me`);
    },
    login(email:string,password:string,rememberMe:boolean=false){
        return instance.post(`/auth/login`,{email,password,rememberMe});
    },
    logout(){
        return instance.delete(`/auth/login`);
    }

}

