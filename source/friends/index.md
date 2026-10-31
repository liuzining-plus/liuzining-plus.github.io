---
title: "Friends"
layout: page
---

<style>
  /* 整体容器 */
  .friend-container {
    margin-top: 2rem;
  }
  /* 单个友链项 */
  .friend-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px dotted #666; /* 极简虚线分割 */
  }
  .friend-item:last-child {
    border-bottom: none;
  }
  /* Logo 样式 */
  .friend-logo {
    width: 48px;
    height: 48px;
    border-radius: 4px; /* 稍带圆角，更有质感 */
    margin-right: 18px;
    object-fit: cover;
    /* 防止图片加载失败时显示很难看的破损图 */
    background-color: #333; 
  }
  /* 文字部分 */
  .friend-content {
    display: flex;
    flex-direction: column;
  }
  .friend-name {
    color: #2bbc8a; /* Cactus 招牌绿 */
    font-weight: bold;
    font-family: "Menlo", "Meslo LG", monospace;
    text-decoration: none;
  }
  .friend-name:hover {
    text-decoration: underline;
  }
  .friend-desc {
    font-size: 0.85rem;
    color: #8c8c8c;
    margin-top: 4px;
  }
</style>

<div class="friend-container">

  <div class="friend-item">
    <img class="friend-logo" src="https://cclog.org/upload/college-insignia.webp" alt="CC的博客">
    <div class="friend-content">
      <a href="https://cclog.org/" class="friend-name" target="_blank">CC的博客</a>
      <span class="friend-desc">我们永不消逝！</span>
    </div>
  </div>
  </div>

<hr>
