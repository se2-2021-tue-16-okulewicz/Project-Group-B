# Project Group B
Implementation of lost dogs and shelters project accoding to group C documentation.

Webapp link:

Expo app link:

Backend ip:

----
## Working on the project
### Creating new issue
* Create issue, describe the thing
* Add one of 4 labels
* If the label is not a `question`, add one of 4 projects

### Working on the issue
* Assign yourself to the issue
* Create branch (look at branch names section)
* Push the branch and create draft pull request (look at pull requests section)
* When element is ready, remove "draft" mark and ask for review
* If there are changes requested, talk about it with reviewer or fix them and wait for next review
* When all reviewers are satisfied (at leat 1) and all checks are passed - PR can be merged
* In the issue comment how long did it take and close the issue

Linking the PRs and issues: you can link one element to the other one, by writing #number. Additionally in PRs you can use special words to automatically close issues, for example "Closes #2". Try not to use them and manually close issues, since we want to track time spent for it.

### Branch names
Branches (excluding rare exceptions) should have name created from 3 parts separated by `/`:
1. project name: `backend`, `web`, `mobile`, `pm` - should correspond to project in the issue
2. type: `feature`, `bugfix`, `refactor` - should correspond to label in the issue
3. name of the element with spaces replaced by `-`
For example branch that adds dogs to the database and backend, should be named (for example) `backend/feature/add-dogs`

### PRs
When you start working on something, create new PR and mark it as draft (from your branch to main). In the name add what the PR is about (3rd part of branch name, issue name). Add label and project (in the same way as in issue). In the description link the issue. If it requires more work, try to add checkboxes so other can see how the work is going. After work is complete, just delete "Draft" mark and ask for review, eventually add requested changes. To merge PR the following conditions must apply:
* All checks must be passed (tests etc)
* Branch must be up to date with main (and so all conflicts must be resolved beforehand)
* PR must have at least one review and they must be approving ones

----
## Stack:
Backend: java with spring and hibernate, junit for unit tests and mysql as database

Webapp: react with redux and reduxtoolkit, written with typescript

Mobile app: react native with redux and reduxtoolkit, written with typescript, expo

Other: docker, github actions for deployment and expo for publishing mobile app
