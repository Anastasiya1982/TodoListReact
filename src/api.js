import axios from "axios";

const baseUrl="https://social-network.samuraijs.com/api/1.1";

const instance=axios.create({
    baseURL:baseUrl,
    withCredentials: true,
    headers: {"API-KEY": "0e5317f8-1eba-40e8-9b59-8d5e29cf9296"}
})
export const api  = {
    createTodolist(newTitle) {
        return instance.post("/todo-lists",
            {title:newTitle});

    },
    setTodolists() {
        return instance.get(`/todo-lists`);
                },

    loadTasks(todolistId) {
        return instance.get(`/todo-lists/${todolistId}/tasks`);
    },

    addTask(newTitle,todolistId,){
      return   instance.post(`/todo-lists/${todolistId}/tasks`,
          {title:newTitle})
    },
    updateTask(task,todolistId){
         return instance.put(`/todo-lists/${todolistId}/tasks/${task.id}`, task);
    },
    deleteTodolist(todolistId){
        return  instance.delete("/todo-lists/"+ todolistId)
    },
    deleteTask(taskId,todolistId){
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTodolistTitle(title,todolistId){
        return instance.put(`/todo-lists/${todolistId}`,title);
    }


}

