#!/bin/bash

# Define source and destination directories
SOURCE_DIR="/mnt/c/programming/nestjs-microservices/virtual-facility"
DEST_DIR="$HOME/virtual-facility"

# Check if the destination directory exists
if [ ! -d "$DEST_DIR" ]; then
  echo "The destination directory $DEST_DIR does not exist."
  exit 1 # Exit the script with an error code
fi

# Run rsync to copy .ts files while excluding specific directories
rsync -avm --include='*.ts' \
--exclude='node_modules' \
--exclude='dist' \
--exclude='.git' \
--filter='dir-merge,- .gitignore' \
"$SOURCE_DIR/" "$DEST_DIR"

echo "Copy operation completed."
