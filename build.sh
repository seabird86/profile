#!/bin/sh
ng build --base-href=/myProfile/
cp -R /Users/kris/Projects/profile/dist/profile/browser/* /Users/kris/Projects/myProfile/docs
cp /Users/kris/Projects/myProfile/docs/index.html /Users/kris/Projects/myProfile/docs/404.html