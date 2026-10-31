---
title: "github图床搭建"
date: 2026-05-20 14:32:29.000
updated: 2026-05-20 21:41:44.479
permalink: 2026/05/20/github图床搭建/
tags: []
categories: []
---
## 第一步：配置 GitHub 仓库

首先，你需要一个专门用来存放图片的 GitHub 仓库，并生成一个用于第三方软件上传的 Token（访问令牌）。

### 1\. 新建一个公开仓库

1.  登录你的 GitHub 账号，点击右上角的 **`+`** -> **New repository**。
2.  **Repository name**：起一个名字（例如：`bed` 或 `image-hosting`）。
3.  **Public/Private**：必须选择 **Public**（公开），否则生成的图片链接别人无法访问。
4.  勾选 **Add a README file**（初始化一个文件，防止仓库为空导致上传失败）。
5.  点击 **Create repository**。

### 2\. 生成 Token（访问令牌）

1.  点击你网页右上角的头像 -> **Settings**（设置）。
2.  在左侧边栏拉到最底部，点击 **Developer settings**。
3.  选择 **Personal access tokens** -> **Tokens (classic)**。
4.  点击 **Generate new token** -> **Generate new token (classic)**。
5.  **Note**：填个名字，比如 `PicGo-image-bed`。
6.  **Expiration**：建议选择 **No expiration**（永不过期），免得以后定期更换。
7.  **Select scopes**（权限）：**勾选 `repo` 这一项即可**（它包含了对公开和私有仓库的访问权）。
8.  拉到最下方，点击 **Generate token**。

> ⚠️ **注意**：生成的 Token 只会显示这一次！请立刻把它复制并保存到你的记事本中，刷新页面后它就再也看不到了。

## 第二步：配置 PicGo 客户端

手动把图片上传到 GitHub 太麻烦了，我们使用 **PicGo** 这款开源的图片管理工具来实现一键上传。

1.  前往 GitHub 下载并安装 **PicGo** 客户端。
    
2.  打开 PicGo，在左侧边栏选择 **图床设置** -> **GitHub图床**。
    
3.  填写以下配置信息：
    
    -   **设定仓库名**：填写 `你的GitHub用户名/你的仓库名`（例如：`charlie/image-hosting`）。~~还有一个图床配置名 这个可以瞎写~~
        
    -   **设定分支名**：一般填 `main` 或 `master`（去你的 GitHub 仓库看看默认分支叫什么）。
        
    -   **设定Token**：把刚才在第一步中生成的那个 Token 粘贴进来。
        
    -   **指定存储路径**：选填。比如填 `img/`，图片就会自动上传到仓库下的 `img` 文件夹中（记得末尾加斜杠 `/`）。
        
        ~~建议直接留空~~
        
    -   **设定自定义域名**：这里可以先留空，或者填写 CDN 加速地址（见第三步）。
        
4.  点击 **确定**，然后点击 **设为默认图床**。
    

## 第三步：配置 jsDelivr CDN 加速

因为 GitHub 的国内访问速度有时并不理想，直接用 GitHub 的原始图片链接可能会导致博客或文档里的图片加载极慢、甚至裂开。我们可以利用免费的 **jsDelivr CDN** 进行加速。

1.  重新打开 PicGo 的 **GitHub图床** 设置。
    
2.  在 **设定自定义域名** 一栏中，填入以下格式的链接：
    
    Plaintext
    
    ```plaintext
    https://cdn.jsdelivr.net/gh/你的GitHub用户名/你的仓库名@分支名
    ```
    
    -   _举例_：如果你的用户名是 `charlie`，仓库名是 `image-hosting`，分支是 `main`，则填写：
        
        `[https://cdn.jsdelivr.net/gh/charlie/image-hosting@main](https://cdn.jsdelivr.net/gh/charlie/image-hosting@main)`
        
        比如我的 [https://cdn.jsdelivr.net/gh/liuzining-plus/image-hosting@main](https://cdn.jsdelivr.net/gh/liuzining-plus/image-hosting@main)
        
3.  点击 **确定** 保存。
    

## 第四步：开始使用！

现在，你已经拥有一套完美的自动化图床了。你可以通过以下几种方式上传图片：

-   **快捷键上传**：截图后，直接按 `Ctrl + Shift + P`（Mac 上是 `Cmd + Shift + P`），PicGo 会自动将剪贴板里的图片上传，并将 Markdown 格式的图片链接复制到你的剪贴板，直接去编辑器里 `Ctrl + V` 即可。
-   **拖拽上传**：把图片直接拖进 PicGo 的上传区。

![](https://cdn.jsdelivr.net/gh/liuzining-plus/image-hosting@main/20260520144024408.png)

选择你需要的格式 写博客一般是用markdown格式 url是原图直链

相册可以看你原来上传的图片 里面删除只是删除历史记录 并不会删除github里的图片 如果需要删除 直接去自己的仓库里手动操作。

仓库大小好像是1G 可以适当的删除一些不需要的图片
