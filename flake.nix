{
  description = "OpenCode config wrapper";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    llm-agents-nix.url = "github:numtide/llm-agents.nix";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      llm-agents-nix,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        opencode = llm-agents-nix.packages.${system}.opencode;
      in
      {
        packages.default = pkgs.runCommand "opencode-wrapped"
          { nativeBuildInputs = [ pkgs.makeWrapper ]; }
          ''
            mkdir -p $out/bin $out/share/opencode-config
            cp -r ${./config}/* $out/share/opencode-config/
            makeWrapper ${opencode}/bin/opencode $out/bin/opencode \
              --set OPENCODE_CONFIG_DIR "$out/share/opencode-config"
          '';
      }
    )
    // {
      checks.x86_64-linux.install-test = import ./tests/install-test.nix {
        pkgs = nixpkgs.legacyPackages.x86_64-linux;
        inherit self;
      };
    };
}
