module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // 引入我们的 ant-design-vue
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ] // `style: css` 加载css文件，`style: true` 会加载 less 文件
  ]
};
