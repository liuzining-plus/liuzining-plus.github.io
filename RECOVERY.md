# 恢复记录

恢复日期：2026-10-25。

原始仓库：`liuzining-plus/liuzining-plus.github.io`，发布快照 `6e03969`（完整提交可在 `main` 查看）。检查了全部 20 次历史提交和远程分支、标签，没有找到 Hexo 写作源码，只有发布产物。

恢复了 8 篇文章、About、Friends，保留文章标题、发布时间、修改时间及原 URL。正文从生成 HTML 转换为 Markdown，代码块从高亮 HTML 提取；无法恢复原 Markdown 的空白、排版写法、未发布草稿或已经丢失的源文件。分类和标签在原页面中未出现，恢复为空列表。友链保留原始自定义 HTML。

原始网页备份位于本机 `.recovery/original-site/`（忽略提交），Git 的 `main` 分支也完整保留原发布内容。一次性转换工具位于 `tools/recover-from-html.cjs`，默认拒绝覆盖已有文章；日常写作无需运行。

主题使用 Cactus 上游源码，来源 https://github.com/probberechts/hexo-theme-cactus ，提交 `7a6074d830ac5d524582f142ac524c041077aad7`。源码和 MIT 许可证随项目保存。恢复站点名称、介绍、作者、导航、社交链接、头像和图标；页脚补回框架与主题署名。JavaScript 和图标使用主题自带的本地资源，减少 CDN 依赖。

旧站点的 `http://example.com` 改为 `https://liuzining-plus.github.io`。文章内图床链接、头像和友链图片仍使用原始外链，未将外部图片全部镜像到本地。

恢复时只准备了本地写作环境，没有推送远程分支或部署网站。

2026-10-31 迁移到新电脑后补充：写作源码已提交并推送到 `origin/source`（`git clone -b source` 即可取回），推送认证使用已注册的 SSH 密钥而非 HTTPS 凭据。`main` 与线上站点未改动。
