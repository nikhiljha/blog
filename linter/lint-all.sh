#!/bin/bash
# set -e

# Get script directory.
DIR="$(cd "$(dirname "$0")" && pwd)"

headecho () {
	echo "####################"
	echo "$1"
	echo "####################"
	echo
}

headecho "Running a spell check..."
aspell -M -c $1
echo

headecho "Checking for passive voice..."
$DIR/passive.sh $1
echo

headecho "Checking for weasel words..."
$DIR/weasel.sh $1
echo

headecho "Checking for illusions..."
$DIR/illusion.pl $1
echo

headecho "Checking misc proselint things..."
proselint $1

