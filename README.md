# OWEN／LAB

个人小界面的 GitHub Pages 主页面与统一索引。

## 内容位置

- `index.html`、`styles.css`、`script.js`：可直接部署的主页面
- `projects.json`：所有小界面的唯一注册表
- `STYLE_GUIDE.md`：视觉规范
- `WORKFLOW.md`：新增页面流程
- `scripts/add-page.mjs`：页面登记命令

新增项目时优先使用 `pnpm add:page -- ...`，也可以直接编辑 `projects.json`。
