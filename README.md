# Kimbo BPhO Website

Welcome to the web application for the Kimbo BPhO entry to the BPhO Computational Physics Challenge 2022.

This repository is a React.js web application, bootstrapped (and ejected) from Create React App. It also has a submodule to the bpho-wasm repository, which houses the Rust code behind our WebAssembly usage.

Firstly, to run the application you must build the wasm. With wasm-pack [installed](https://rustwasm.github.io/wasm-pack/installer/), run:
```
wasm-pack build bpho-wasm --out-dir bpho-wasm/build/
```
To start the web application in development mode, assuming you have `pnpm` installed, run the following:
```
pnpm start
```

To build the web application for production, run:
```
pnpm run build
```
