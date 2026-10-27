export interface DynamicForm{
    key : string,
    label:string,
    order:number,
    required?:boolean,
    type:'text' | 'number' | 'checkbox' | 'email' | 'date'  |'button'|'submit'|'group',
    placeholder?:string,
    value?:any,
    children?:any
}