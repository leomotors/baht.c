#!/usr/bin/env bash

source ~/src/emsdk/emsdk_env.sh

mkdir -p dist

emcc src/baht.c -O3 -o dist/build.js \
    -s MODULARIZE=1 \
    -s ASSERTIONS=$1 \
    -s SAFE_HEAP=$1 \
    -s EXPORTED_RUNTIME_METHODS=UTF8ToString,stringToUTF8

yarn uglifyjs dist/build.js --compress --mangle -o dist/build.js
yarn uglifyjs src/index.js --compress --mangle -o dist/index.js
cp src/*.ts dist
