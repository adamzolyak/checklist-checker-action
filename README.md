# ✅ Checklist Checker - GitHub Action

A [GitHub Action](https://github.com/features/actions) that helps make checklists more useful in GitHub issues 📝.

## How It Works

This GitHub Action runs when an [`issues` event webhook](https://developer.github.com/v3/activity/events/types/#issuesevent) is fired in your GitHub repo. The action checks if there are incomplete checklist items `- [ ] to do` in markdown in the issue's description. If there is 1 or > incomplete checklist items, the action labels the issue with "Incomplete Items". Also, if the issue is closed with incomplete checklist items, the action will reopen the issue and comment on the issue.

## Installation

To use this GitHub Action, you must have access to [GitHub Actions](https://github.com/features/actions). GitHub Actions are currently only available in private beta (you must [apply for access](https://github.com/features/actions)) and only work in private repos.

To setup this action:

1. Create a `.github/main.workflow` in your GitHub repo.
2. Add the following code to the `main.workflow` file and commit it to the repo's `master` branch.

```
workflow "Issue Checklist Checker" {
  resolves = ["Check Checklist"]
  on = "issues"
}

action "Check Checklist" {
  uses = "adamzolyak/checklist-checker-action@master"
  secrets = ["GITHUB_TOKEN"]
}
```

3. Whenever you create, update, close, or reopen an issue, the action will run!

## Examples

Example of issue with incomplete checklist items in the description labeled with "Incomplete Tasks" label:
![GitHub Logo](./docs/issuewlabel.png)

Example of re-opened issue with incomplete checklist items in the description labeled with "Incomplete Tasks" label:
![GitHub Logo](./docs/issuereopened.png)

## Extending

### Tests

Tests are written in [Jest](https://jestjs.io/en/). Tests automatically run on check in.

Test Status: [![CircleCI](https://circleci.com/gh/adamzolyak/checklist-checker-action/tree/master.svg?style=svg)](https://circleci.com/gh/adamzolyak/checklist-checker-action/tree/master)

### To run tests locally

1. run `npm install` to install dependencies
2. run `npm test` to run tests

### To run action locally

1. `npm install` to install dependencies
2. create a `dev` file with the following contents:

```bash
export GITHUB_TOKEN="12345"
export GITHUB_REPOSITORY="adamzolyak/actions-playground"
export GITHUB_EVENT_PATH="/action-checklistchecker/tests/fixtures/actionTrigger.json"

node index.js
```

3. modify contents of [/tests/fixtures/actionTrigger.json](./tests/fixtures/actionTrigger.json) as needed for test data
4. run `bash dev` to run locally

## Contributing

If you have suggestions for how Waffle.io's GitHub Actions could be improved, or want to report a bug, open an issue! Or pull request! We'd love all and any contributions. For more, check out the [Contributing Guide](CONTRIBUTING.md).

### Debugging

If you've followed the steps above and it isn't working, trying the following:

- If you don't see an Actions tab in your repo, make sure your repo is private and make sure you've been accepted into the private beta.
- If you see the Actions tab but there isn't a comment on your new issue, click on the Log link on the action to view the log and check for errors.

## Extending

Some helpful resources:

- [GitHub Actions Docs](https://developer.github.com/actions/)
- [Octokit Rest.js Docs](https://octokit.github.io/rest.js/#api-Issues-createComment)
- [Dockerfile Docs](https://docs.docker.com/engine/reference/builder/)

## License

[ISC](LICENSE) © 2018 Adam Zolyak <adam@tinkurlab.com> (www.tinkurlab.com)
