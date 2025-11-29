# BFMeta-PC-Upgrade（中文）

## 简介
基于 LoopBack 4 + Socket.IO 的升级服务，为 BFMeta PC 客户端提供主动升级、版本检查与通知；支持容器化部署。

## 使用
1) 安装依赖：`pnpm install`（或 `npm install`），兼容 Node 16/18/20。
2) 开发运行：`pnpm start`（清理+编译后启动）。
3) 构建：`pnpm rebuild` 或 `pnpm build`（生成 `dist/`）。
4) 测试：`pnpm test` / `pnpm test:none`。
5) Docker：`pnpm docker:build && pnpm docker:run`。
6) 配置：在 `config/` 下按环境填写 Mongo 连接、发布源、签名/校验等信息。

## 贡献规范（简要）
- 控制器保持薄逻辑，业务放入 `services`，遵循 SRP/KISS。
- TypeScript 严格模式，不新增 `any`/`@ts-ignore`；共用常量与工具放 `shared/`，减少重复（DRY）。
- 新增接口需同步实体/校验，并补充使用说明；建议使用 `zod`/类型守卫保障运行时安全。
- 提交前跑 `pnpm build` + 相关测试；分支建议 `feature/<scope>`、`fix/<issue>`。
