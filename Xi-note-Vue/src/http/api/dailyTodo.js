import serviceAxios from "../index";


export const getDaily = () => {
  return serviceAxios({
    method: 'get',
    url: 'dailytodo/get',
  })
}

export const addDaily = (todoData) => {
  return serviceAxios({
    method: 'post',
    url: 'dailytodo/add',
    data: `content=${todoData.content}`,
  })
}

export const editDaily = (todoData) => {
  return serviceAxios({
    method: 'post',
    url: 'dailytodo/edit',
    data: `content=${todoData.content}&id=${todoData[0].id}`,
  })
}

export const deleteDaily = (params) => {
  return serviceAxios({
    method: 'post',
    url: 'dailytodo/delete',
    params: { id: params }
  })
}

export const changeDailyCompleted = (params) => {
  return serviceAxios({
    method: 'post',
    url: 'dailytodo/change',
    params: { id: params }
  })
}