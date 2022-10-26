// 数据统计相关请求
import serviceAxios from "..";

export const getTodoStat = (params) => {
  return serviceAxios({
    method: 'get',
    url: 'stat/todo',
    params: { timestamp: params }
  })
}