<template>
  <div id="app">
    <!-- 使用 ant-design-vue 的按钮 -->
    <a-button>按钮</a-button>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less"></style>
