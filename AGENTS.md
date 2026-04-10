# Agents

Nix flake that packages a shared OpenCode configuration and a bwrap-sandboxed OpenCode binary. Installed via `nix profile install` — no manual env var setup needed.

## Structure

- `flake.nix` — builds a sandboxed OpenCode wrapper with bundled config
  - **inputs**: `nixpkgs`, `llm-agents-nix` (OpenCode binary), `nix-bwrapper` (bubblewrap sandboxing)
  - **default package**: `opencode` binary (sandboxed on Linux, unsandboxed on macOS) + config in `share/opencode-config/`
- `config/opencode.jsonc` — disables `build`/`plan` agents, sets `builder` as default
- `config/agents/builder.md` — primary agent (minimal system prompt)
- `config/agents/general.md` — subagent override (minimal system prompt)
- `config/AGENTS.md` — global instructions injected into all OpenCode sessions

## Sandboxing (Linux only)

Uses `nix-bwrapper` with the `devshell` preset. The sandbox:
- Confines OpenCode to `$PWD` (read-write)
- Provides persistent sandboxed `~/.config`, `~/.local`, `~/.cache`
- Grants read access to `/nix/var` and `~/.ssh`
- Grants read-write access to `~/.config/opencode`
- Shares network (not isolated)

On macOS, OpenCode runs unsandboxed (bwrapper requires bubblewrap/FHS).

## Constraints

- Agent prompts are intentionally minimal ("You are OpenCode, an AI coding agent."). Do not add detailed instructions to them.
- `config/AGENTS.md` is for brief, global behavioral rules — keep it short.
- Do not re-enable `build` or `plan` agents.

## Testing

```bash
nix build --no-link
nix flake check
```
