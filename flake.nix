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

    devShells.${system}.website = pkgs.mkShell {
      packages = with pkgs; [
        nodejs_22
        corepack_22
      ];
    };
  };
}
