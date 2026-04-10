# opencode-config

Shared [OpenCode](https://opencode.ai) configuration managed as a Nix flake.

Installs a bwrap-sandboxed OpenCode binary (Linux) with bundled config. Disables built-in `build`/`plan` agents, replaces them with a single `builder` primary agent with a minimal system prompt.

## Install

```bash
nix profile install github:<user>/opencode-config
```

That's it — `opencode` is on your PATH with config pre-wired. No env vars needed.

## Update

```bash
nix profile upgrade '.*'
```
