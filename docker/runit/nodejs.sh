#!/bin/bash

set -e

cd /app/geoip
node app.js 2>&1
