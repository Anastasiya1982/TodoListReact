

export  type TodoType={
    id: string
    addedDate: string
    order: number
    title: string
    tasks:Array<TaskType>
}

export type TodoUpdateObject={
    status?:number
    title?:string
}

export type TaskType ={
    description: string
    title: string
    completed:boolean
    status: number
    priority: number
    startDate: string
    deadline:string
    id: string
    todoListId:string
    order: number
    addedDate: string
}