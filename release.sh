#!/bin/bash

rm -f Release.zip
zip -r Release.zip dist
scp -v Release.zip unearth_prod:/home/forge/atlas.unearthcampaigns.com/storage/app/extension/