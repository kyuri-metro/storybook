# kyuri-line-id-block-storybook

[![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/) [![React](https://img.shields.io/badge/React-19-222222?logo=react&logoColor=61DAFB)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflarepages&logoColor=white)](https://pages.cloudflare.com/)

> 以下内容为 Cursor Agent（Auto）生成，未经过人工检查，请谨慎对待。

[@kyuri-metro](https://www.npmjs.com/org/kyuri-metro) 组织下线路号方块 SVG 生成器 npm 包的 Storybook 展示站：调参数、看预览、导出 SVG / PNG / JPG / WebP。

## npm 包

### SVG 生成器

| 包 | npm |
| --- | --- |
| `@kyuri-metro/shmetro-line-id-block-2025-svg-generator` | [npm](https://www.npmjs.com/package/@kyuri-metro/shmetro-line-id-block-2025-svg-generator) |
| `@kyuri-metro/shmetro-line-id-block-2020-svg-generator` | [npm](https://www.npmjs.com/package/@kyuri-metro/shmetro-line-id-block-2020-svg-generator) |
| `@kyuri-metro/shmetro-line-id-block-2020-type-2-svg-generator` | [npm](https://www.npmjs.com/package/@kyuri-metro/shmetro-line-id-block-2020-type-2-svg-generator) |
| `@kyuri-metro/njmetro-line-id-block-svg-generator` | [npm](https://www.npmjs.com/package/@kyuri-metro/njmetro-line-id-block-svg-generator) |

### 配色

| 包 | npm |
| --- | --- |
| `@kyuri-metro/shmetro-palette` | [npm](https://www.npmjs.com/package/@kyuri-metro/shmetro-palette) |
| `@kyuri-metro/njmetro-palette` | [npm](https://www.npmjs.com/package/@kyuri-metro/njmetro-palette) |

组织主页：<https://www.npmjs.com/org/kyuri-metro>

## 本地开发

```bash
npm install
npm run storybook
```

浏览器打开 <http://localhost:6006>。静态构建：

```bash
npm run build-storybook
```

输出目录为 `storybook-static/`。

## 部署到 Cloudflare Pages

本项目为纯静态 Storybook 站点，推荐使用 **Cloudflare Pages**（无需 Workers 运行时逻辑）。

### 方式 A：Git 连接（推荐）

1. 将本仓库推送到 GitHub（或 GitLab / Bitbucket）。
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
3. 选择本仓库，配置构建设置：

   | 项 | 值 |
   | --- | --- |
   | Framework preset | None |
   | Build command | `npm run build-storybook` |
   | Build output directory | `storybook-static` |
   | Root directory | `/`（仓库根目录） |

4. **Environment variables**（可选）：一般无需额外变量。
5. **Build settings** → **Node.js version**：与仓库根目录 `.node-version` 一致（当前为 22），或在 Pages 项目设置中指定 `22`。
6. 保存并部署。首次构建完成后会获得 `*.pages.dev` 预览域名；可在 **Custom domains** 绑定自己的域名。

后续每次推送到所选分支，Pages 会自动重新构建并发布。

### 方式 B：Wrangler CLI（本地构建后上传）

1. 安装依赖并构建：

   ```bash
   npm install
   npm run build-storybook
   ```

2. 使用 Wrangler 部署静态目录（需已登录 Cloudflare，见 [Wrangler 文档](https://developers.cloudflare.com/workers/wrangler/)）：

   ```bash
   npx wrangler pages deploy storybook-static --project-name=kyuri-line-id-block-storybook
   ```

   首次会提示创建 Pages 项目；`wrangler.toml` 中已声明 `pages_build_output_dir = "storybook-static"`，与上述目录一致。

3. 在 Dashboard 中为该项目配置自定义域名（可选）。

### 部署注意

- 构建命令必须先成功执行 `build-storybook`，输出目录必须为 `storybook-static`，与 Storybook 默认一致。
- 若站点不在域名根路径而在子路径下，需在 Storybook 配置中设置 `base`（当前按根路径部署，无需修改）。
- PNG / JPG / WebP 导出在访客浏览器内完成，与 Cloudflare 托管无关。

## 脚本

| 命令 | 说明 |
| --- | --- |
| `npm run storybook` | 本地开发 |
| `npm run build-storybook` | 生产静态构建 |
| `npm run check` | TypeScript 检查 |

## 许可

MIT
