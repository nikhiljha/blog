#!/bin/bash
set -e

# Get script directory.
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Running a spell check..."
aspell -M -c $1

echo "Checking for passive voice..."
$DIR/passive.sh $1

echo "Checking for weasel words..."
$DIR/weasel.sh $1

echo "Checking for illusions..."
$DIR/illusion.pl $1
