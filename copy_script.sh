#!/bin/bash

# Define source and destination directories
SOURCE_DIR="/mnt/c/programming/nestjs-microservices/virtual-facility"
DEST_DIR="$HOME/virtual-facility"

# Check if the destination directory exists
if [ -d "$DEST_DIR" ]; then
    echo "Destination directory exists. Clearing it..."
    # Delete everything inside the destination directory
    rm -rf "$DEST_DIR"/*
else
    echo "Destination directory does not exist. Creating it..."
    # Create the destination directory
    mkdir -p "$DEST_DIR"
fi

# Copy content from source to destination, excluding specific patterns
rsync -av --progress "$SOURCE_DIR"/ "$DEST_DIR" \
    --exclude 'node_modules' \
    --exclude 'dist' \
    --exclude 'package-lock.json' \
    --exclude '.git'

echo "Copy operation completed."
