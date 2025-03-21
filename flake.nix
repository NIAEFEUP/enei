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

    devShells.${system} = let
      nodejs = [ pkgs.nodejs_22 pkgs.corepack_22 ];
      sqlite = [ pkgs.sqlite ];
    in {
      workspace = pkgs.mkShell {
        packages = nodejs;
      };
      
      adminjs-license = pkgs.mkShell {
        packages = nodejs;
      };

      website = pkgs.mkShell {
        packages = nodejs ++ sqlite;
      };
    };
  };
}
