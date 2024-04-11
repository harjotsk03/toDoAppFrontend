export interface IUser {
    email: string
    name: string
    password: string
}
  
export interface IAuthenticatedUser {
    email: string
    name: string
}
  
export interface IColor {
    name: string
    id: string
    code: string
}
  
export interface IIcon {
    name: string
    id: string
    symbol: string
}
  
export interface ICategory {
    _id: string
    name: string
    user: IUser | string
    isEditable: boolean
    color: IColor
    icon: IIcon
}
  
export interface ICategoryRequest {
    name: string
    color: IColor
    icon: IIcon
}
  
export interface ITask {
    _id: string
    name: string
    isCompleted: boolean
    categoryId: string
    createdAt: string
    date: string
}
  
export interface ITaskRequest {
    name: string
    isCompleted: boolean
    categoryId: string
    date: string
}

export interface MainTabLayoutProps {
    loggedIn: boolean
    loggingOut: () => void
}

export interface LogOutProps {
    loggedIn: boolean
    loggingOut: () => void
}

export interface Task {
    _id: string
    name: string
    isCompleted: boolean
    categoryId: string
    createdAt: string
    date: string
}

export interface NewScreenParams {
    taskName: string;
}