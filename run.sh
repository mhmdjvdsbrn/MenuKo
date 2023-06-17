#!/bin/bash
# 30 * * * * ./run.sh

# exec ./manage.py runserver 0.0.0.0:7000 

# forever 5 echo .

while true
do
exec ./manage.py runserver 0.0.0.0:7000 
sleep 1000
done
