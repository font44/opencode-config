# opencode-config

Shared [OpenCode](https://opencode.ai) configuration managed as a Nix flake.

Packages OpenCode with bundled config (agents, skills, settings). Disables the built-in `explore` agent; ships (highly) minimal `build`, `plan`, and `general` agents.

## Install

```bash
nix profile install github:font44/opencode-config
```

## Update

```bash
nix profile upgrade '.*'
```
