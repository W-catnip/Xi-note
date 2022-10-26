<template>
  <div class="about-box">
    <img src="../assets/logo.png" alt="" id="logo">
    <h2>XI-NOTE</h2>
    <p class="version">version:0.1.0</p>
    <p class="des">Catnip的第一个WebApp，望不吝赐教。</p>
    <ul class="next">
      <p>下一步的计划:</p>
      <li>支持主题更改</li>
      <li>增加留言板模块</li>
      <li>优化页面样式</li>
      <li>字体样式更换</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style lang="less" scoped>
.about-box {
  box-shadow: 0 -3px 10px #ccc;
  box-sizing: border-box;
  margin: 2rem auto;
  .card(35rem);
  width: 45rem;
  .flex-column;
  padding: 2rem 2rem 0 2rem;

  h2 {
    .title-font(2rem);
    margin-bottom: .5rem;
  }
}

#logo {
  width: 8rem;
  height: 8rem;
  margin-bottom: 1.5rem;
}

.version {
  .remind-font(1rem);
  margin-bottom: 3rem;
}

.des {
  .h3-font(1.2rem);
  font-weight: 540;
  margin-bottom: 6rem;
  letter-spacing: .1rem;
}

.next {
  .remind-font;
  min-width: 20rem;
  text-align: center;

  p {
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: .5rem;
  }
}
</style>