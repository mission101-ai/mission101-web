#!/bin/bash

# Script to update the lastmod dates in sitemap.xml to today's date
# Usage: ./update-sitemap-date.sh

SITEMAP_FILE="public/sitemap.xml"
TODAY=$(date +%Y-%m-%d)

if [ ! -f "$SITEMAP_FILE" ]; then
    echo "Error: $SITEMAP_FILE not found!"
    exit 1
fi

# Update all lastmod dates to today
sed -i.bak "s|<lastmod>[0-9-]*</lastmod>|<lastmod>$TODAY</lastmod>|g" "$SITEMAP_FILE"

echo "✓ Updated all lastmod dates in $SITEMAP_FILE to $TODAY"
echo "✓ Backup saved as $SITEMAP_FILE.bak"

