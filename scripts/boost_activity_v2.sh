#!/bin/bash
# Script to boost commit activity v2

for i in {1..50}
do
   echo "Activity log v2 entry $i: $(date)" >> activity_v2.log
   git add -f activity_v2.log
   git commit -m "chore: update activity log v2 entry $i"
   # sleep 0.1 # optional delay
done
