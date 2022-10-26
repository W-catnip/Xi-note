import serviceAxios from "../index";
// 用户注册
export const userLogup = (data) => {
  return serviceAxios({
    method: 'post',
    url: '/user/logup',
    data: `nickname=${data.nickname}&username=${data.username}&password=${data.password}`
  })
}

// 用户登录
export const userLogin = (data) => {
  return serviceAxios({
    method: 'post',
    url: 'user/login',
    data: `username=${data.username}&password=${data.password}`
  })
}

// 更改头像
export const updateProfile = (data) => {
  return serviceAxios({
    method: 'post',
    url: 'user/updateProfile',
    data: `profile=${data.croppedImg}`,
    params: { id: data.id }
  })
}

// 获取用户信息
export const getUser = (params) => {
  return serviceAxios({
    method: 'get',
    url: 'user/get',
    params: { id: params },
  })
}

// 获取头像信息
export const getProfile = (params) => {
  return serviceAxios({
    method: 'get',
    url: 'user/profile',
    params: { id: params },
  })
}

// 更改昵称
export const updateNick = (data) => {
  return serviceAxios({
    method: 'post',
    url: 'user/updateNick',
    data: `id=${data.id}&nickname=${data.nickname}`
  })
}

// 更改密码
export const updatePwd = (data) => {
  return serviceAxios({
    method: 'post',
    url: 'user/updatePwd',
    data: `id=${data.id}&oldPwd=${data.oldPwd}&newPwd=${data.newPwd}`
  })
}