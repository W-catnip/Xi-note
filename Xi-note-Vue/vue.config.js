const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // 部署的路径配置
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons")) //处理svg目录（根据你建的文件路径）
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/css/common.less")],
    },
  },
});
