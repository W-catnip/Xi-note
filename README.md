# Xi-note记事本
>一个前后端分离的记事本项目,前端 Vue2,后端 node.js+express, 数据库 mysql。 前端使用axios请求进行对数据库的CURD操作。  
>在线预览地址：http://www.w-catnip.cn/

## 功能说明
* 支持跳转不同日期
* 支持添加指定日期的待办事项
* 支持添加每日的固定打卡事项
* 支持事项的编辑、删除、完成状态更改
* 支持当前日期的事项完成情况统计
* 支持七天内的待办事项完成情况统计
* 支持每日打卡全部完成情况统计
* 支持用户的注册与登录
* 支持用户资料更改及头像裁剪后更改

## 项目概览

### 1.登录页
![d93jl-c43gs](https://user-images.githubusercontent.com/100354222/197929993-d4092b96-80b3-49ca-96af-dcb89f0cfbaf.gif)

### 2.主页
![bzj6d-9v1zh](https://user-images.githubusercontent.com/100354222/197967255-c4f2cc64-e8e5-4e75-9833-4b7b6a4dade9.gif)


### 3.数据页
![lhg13-2f5ou](https://user-images.githubusercontent.com/100354222/197967624-8ce8d320-c095-44a7-a834-9e5284e772b1.gif)

### 4.设置页
![h1ws0-l1a66](https://user-images.githubusercontent.com/100354222/197969250-77250323-ea49-4dd3-b0d1-a9fb812ca0ea.gif)

## 安装
``` git clone https://github.com/W-catnip/Xi-note.git // 将代码克隆到本地
    cd Xi-note-Vue // 进入Vue项目目录
    npm install // 下载依赖
    npm run serve // 运行项目
    cd Xi-note-API // 进入后端node.js目录
    npm install // 下载依赖
    node app.js // 启动node服务
    // 后端使用了MySQL，所以请确保本地安装有MySQL并需针对自己的MySQL对db文件进行修改
```

## 总结
这是我做的第一个Web应用，虽然实现的功能很简单，但让我的收获很多。希望本项目对您有所启发、有所收获，如有不足之处也敬请指出，您的回馈就是我最大的动力。

