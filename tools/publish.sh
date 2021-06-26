#!/usr/bin/env bash
# args
package=$1

# variables
package_json=dist/packages/$package/package.json

# run
echo runing $package:publish
nx run $package:build
echo $(jq 'del(.dependencies | ."fp-ts", ."fp-ts-rxjs", ."io-ts", ."monocle-ts", ."newtype-ts")' $package_json) > $package_json
yarn publish --access public dist/packages/$package
echo finished $package:publish
