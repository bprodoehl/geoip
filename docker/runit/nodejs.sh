#!/bin/bash

set -e

cd /app/geoip
node ./bin/www 2>&1

