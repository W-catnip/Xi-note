import serviceAxios from "../index";
export const getTodo = (params) => {
  return serviceAxios({
    method: 'get',
    url: 'todo/getTodo',
    params: { timestamp: params }
  })
}

export const addTodo = (todoData) => {
  return serviceAxios({
    method: 'post',
    url: 'todo/addTodo',
    data: `content=${todoData.content}&timestamp=${todoData.timestamp}`,
  })
}

export const editTodo = (todoData) => {
  return serviceAxios({
    method: 'post',
    url: 'todo/editTodo',
    data: `content=${todoData.content}&id=${todoData[0].id}&timestamp=${todoData[0].timestamp}`,
  })
}

export const changeTodoCompleted = (params) => {
  return serviceAxios({
    method: 'post',
    url: 'todo/changeTodo',
    params: { id: params }
  })
}

export const deleteTodo = (params) => {
  return serviceAxios({
    method: 'post',
    url: 'todo/deleteTodo',
    params: { id: params }
  })
}