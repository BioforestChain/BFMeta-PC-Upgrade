# BFMeta-PC-Upgrade (English)

## Overview
LoopBack 4 + Socket.IO service for proactive upgrades of BFMeta PC clients: version checks, package delivery, and notifications; Docker-friendly.

## Usage
1) Install deps: `pnpm install` (or `npm install`), Node 16/18/20.
2) Dev run: `pnpm start` (clean + build + run).
3) Build: `pnpm rebuild` or `pnpm build` (outputs to `dist/`).
4) Tests: `pnpm test` / `pnpm test:none`.
5) Docker: `pnpm docker:build && pnpm docker:run`.
6) Config: set Mongo connection, release source, signing/verification details under `config/` per env.

## Contribution (brief)
- Keep controllers thin, move business to `services` (SRP/KISS).
- TS strict; avoid `any`/`@ts-ignore`; share constants/utilities via `shared/` to stay DRY.
- When adding endpoints, update entities/validation and usage notes; prefer `zod` or type guards for runtime safety.
- Run `pnpm build` + relevant tests before commit; branches `feature/<scope>` / `fix/<issue>` with concise messages.
