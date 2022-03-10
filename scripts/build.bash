#!/usr/bin/env bash

source ~/src/emsdk/emsdk_env.sh

mkdir -p dist

emcc src/baht.c -O3 -o dist/build.js \
    -s MODULARIZE=1 \
    -s EXPORTED_RUNTIME_METHODS=UTF8ToString,stringToUTF8
