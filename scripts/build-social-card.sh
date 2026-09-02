#!/bin/sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
repo_dir=$(CDPATH= cd -- "$script_dir/.." && pwd)
target_dir="$repo_dir/static/images/social"
avatar_crop="/tmp/giorocks-social-card-avatar.png"

mkdir -p "$target_dir"

convert "$repo_dir/static/images/avatar.png" \
  -resize '300x300^' \
  -gravity center \
  -extent 300x300 \
  -bordercolor '#1a1917' \
  -border 2 \
  "$avatar_crop"

convert -size 1200x630 xc:'#f5f2ec' \
  -fill '#c82c2c' \
  -draw 'rectangle 0,0 18,630' \
  -fill '#1a1917' \
  -font Iowan-Old-Style-Roman \
  -pointsize 78 \
  -annotate +84+170 'Giordano Scalzo' \
  -font Avenir-Next-Bold \
  -pointsize 34 \
  -annotate +87+250 'AI & ENGINEERING LEADER' \
  -fill '#c82c2c' \
  -font Menlo-Bold \
  -pointsize 18 \
  -annotate +88+300 'MOBILE  /  SPEAKER  /  AUTHOR' \
  -fill '#68645d' \
  -font Iowan-Old-Style-Italic \
  -pointsize 28 \
  -annotate +87+375 'Building software. Growing engineers.' \
  -annotate +87+415 'Writing down what I learn.' \
  -fill '#1a1917' \
  -font Menlo-Bold \
  -pointsize 16 \
  -annotate +88+555 'GIOSCALZO.COM' \
  "$avatar_crop" \
  -geometry +835+145 \
  -composite \
  -quality 90 \
  "$target_dir/giordano-scalzo.jpg"

unlink "$avatar_crop"
