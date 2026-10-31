# Because Why Not · 博客写作工程

仓库：https://github.com/liuzining-plus/liuzining-plus.github.io

环境：Node.js 24、Hexo 8.1.2、Cactus 3.0。依赖版本记录在 `package-lock.json`，主题源码已随项目保存，不需要再次克隆主题。

## 开始写作

在 PowerShell 中进入此目录：

```powershell
cd C:\Users\27000\Desktop\hexo
npm.cmd start
```

浏览器打开 http://localhost:14000 。修改文章并保存后，刷新浏览器即可预览。终端按 Ctrl+C 停止服务。4000、4001 端口已被本机其他程序占用，所以使用 14000。

新建文章：

```powershell
npm.cmd run new -- "文章标题"
```

在 `source/_posts/` 编辑生成的 Markdown。文件头的 `title`、`date`、`tags`、`categories` 分别控制标题、时间、标签和分类。图片可放在 `source/images/`，正文用 `![说明](/images/图片.png)` 引用。

先写草稿：

```powershell
npm.cmd run draft -- "文章标题"
npm.cmd run dev
```

草稿位于 `source/_drafts/`；`dev` 会显示草稿，普通 `start` 和发布构建不会。写完用 `npm.cmd run publish -- "文章标题"` 移入正式文章目录，这一步只在本地修改文件。

## 构建和发布

```powershell
npm.cmd run build
```

静态网页输出到 `public/`。若需要清理缓存，运行 `npm.cmd run clean` 后再构建。

已配置发布到远程 `main`：

```powershell
npm.cmd run deploy
```

此命令会构建并推送网页到 GitHub，改变线上博客。认证走 SSH 密钥（`~/.ssh/id_ed25519`，已在 GitHub 注册），不需要输入密码或登录 Git Credential Manager；`deploy.repo` 与 `origin` 的 push 地址都已设为 `git@github.com:...`。

当前工作分支是 `source`，用来保存配置、文章和主题；`main` 是原来的发布分支。不要把写作源码直接推送到 `main`。建议定期备份源码：

```powershell
git add .
git commit -m "更新博客源码"
git push -u origin source
```

`source` 已推送到 `origin/source`，2026-10-31 完成。新电脑获取源码时，克隆 `source` 分支并安装依赖；不要只克隆包含网页的 `main`：

```powershell
git clone -b source git@github.com:liuzining-plus/liuzining-plus.github.io.git hexo
cd hexo
npm.cmd ci
```

`node_modules/`、`public/`、`db.json`、`.recovery/` 都不进版本库，靠 `npm.cmd ci` 和 `hexo generate` 重新生成。

如果本机 Git 尚未设置身份，可只为本仓库设置：

```powershell
git config user.name "你的名字"
git config user.email "你的 GitHub 提交邮箱"
```

## 常用文件

- `source/_posts/`：8 篇恢复的历史文章，以及之后的新文章。
- `source/about/index.md`：关于页面。
- `source/friends/index.md`：友链页面，保留原有 HTML 样式。
- `_config.yml`：站点信息、网址、主题选项、部署配置。
- `themes/cactus/`：主题源码；常用外观设置优先修改 `_config.yml` 中的 `theme_config`。
- `RECOVERY.md`：恢复来源和限制。

命令示例使用 `npm.cmd`，避免 Windows PowerShell 执行策略拦截 `npm.ps1`。
