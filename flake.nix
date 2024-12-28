{
  description = "A flake for development of ENEI's applications";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {nixpkgs, ...}: let
    system = "x86_64-linux";

    pkgs = import nixpkgs {
      inherit system;
    };
  in {
    formatter.${system} = pkgs.alejandra;

    devShells.${system}.website = let
      ory = {
        kratos.version = "v1.3.0";
        hydra.version = "v1.3.0";
      };

      kratos = pkgs.writeShellScriptBin "kratos" ''
        docker run -it --rm -v "$(pwd):/home/ory" oryd/kratos:${ory.kratos.version} "$@"
      '';
    in
      pkgs.mkShell {
        packages = [
          pkgs.nodejs_22
          pkgs.corepack_22
          kratos
        ];
      };
  };
}
