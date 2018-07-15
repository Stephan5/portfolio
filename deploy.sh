#!/bin/bash

# Performs a release of a new version of the site. This script will fail
# if the working directory is not clean (in git terms).
rm -rf deploy build

# install dependencies and run build
yarn build

mkdir deploy
cd deploy
cp -r ../build .
cd ..

rm -rf build
