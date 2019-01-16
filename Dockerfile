FROM node:8-slim

LABEL "com.github.actions.name"="Issue Checklist Checker"
LABEL "com.github.actions.description"="Making sure checklists are completed before closing an issue"
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="green"

LABEL "repository"="http://github.com/waffleio/gh-actions"
LABEL "homepage"="https://github.com/adamzolyak/checklist-checker-action"
LABEL "maintainer"="Adam Zolyak <adam@tinkurlab.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js
ADD helpers.js /action/helpers.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]