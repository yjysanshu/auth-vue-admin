# 基本权限管理系统前端

后端代码：[https://github.com/yjysanshu/auth-php-admin](https://github.com/yjysanshu/auth-php-admin)
前端代码：[https://github.com/yjysanshu/auth-vue-admin](https://github.com/yjysanshu/auth-vue-admin)

## 前言

这是一个简单的权限管理系统，为自己开发小项目使用；顺便贡献出来，为那些做一些小项目的同学方便，直接拿去使用

## 本地开发

```bash
# clone the project
git clone git@github.com:yjysanshu/auth-vue-admin.git

# enter the project directory
cd auth-vue-admin

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527

## 打包

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## 代码检查

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## 三级菜单

三级菜单目前有一个`demo`，在`views/example/book`中，如过你要配置三级菜单的话，类似`views/example/book`的目录下的`index.vue`记得原样复制进去，作为父级菜单的二级菜单的组件配置为`example/book/index`

## 存在的问题

角色配置菜单权限时，选中二级父菜单下面一个子菜单时，回显的时候，默认全部选中，暂未解决

当然可能还存在一些其他未解决的问题，欢迎纠正 QQ群：523820254
