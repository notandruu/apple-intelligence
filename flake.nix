{
  description = "Apple Intelligence – privacy-first voice dictation, meeting transcription & notes";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
          apple-intelligence = pkgs.callPackage ./nix/package.nix { };
        in
        {
          default = apple-intelligence;
          apple-intelligence = apple-intelligence;
        }
      );

      overlays.default = _final: _prev: {
        apple-intelligence = self.packages.x86_64-linux.apple-intelligence;
      };

      nixosModules.default = import ./nix/module.nix self;
    };
}
