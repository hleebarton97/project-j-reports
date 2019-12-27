# J-Reports
- Lee Garcia
- Ryan Hallberg
- Dawson Autry
- Henry Lee Barton III
- Jeff Martin


##### Capstone Project Fall 2019

# 📖 Documentation
### Cloning and Installation
```sh
$ git clone https://github.com/hleebarton97/project-j-reports.git
$ cd project-j-reports
$ npm install
```
Run `npm run dev` to make sure it is working.

### Before Making Changes
Make sure to create a new branch: `git checkout -b topic-myNewFeature`
When you're done:
```
git status
git add .
git commit -m "feature: description of new feature"
git push origin topic-myNewFeature
```
It is important to create a new branch if we are making changes,
so that merging is as easy as possible.

### Important Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Starts the express server and the client react app. Runs code-analysis, the test runner, and once all is passed, runs the app in dev mode (http://localhost:3000 && http://localhost:5000). |
| `npm run client` | Starts only the `front-end` react app (http://localhost:3000). |
| `npm run server` | Starts only the `back-end` express server (http://localhost:5000). |
| `npm run build` | Build the app for production to the `build` folder. |
| `npm run test` | Launch the test runner (jest) in interactive watch mode. (q to quit). |
| `npm run code-analysis` | Run `standard.js` linter / formatter. |
| `npm run code-analysis:fix` | Run `standard --fix` script to fix `standard.js` linter and formatting errors. |

### git Commit Message Formatting:
| Type | Message |
| --- | --- |
| New feature | `feature: my description of my new feature` |
| Refactor / Cleanup | `refactor: my description of changes made` |
| Bug fix | `fix: my description of the problem and resolution` |
| Required changes | `chore: my description of the required updates or features` |

### Quick `git` Review
| Command | Description |
| --- | --- |
| `git status` | Review local uncommitted changes on current branch. |
| `git add .` | Add all local uncommitted changes to the staging area. |
| `git commit -m "description"` | Commit all staged changes to the current branch with a `"description"`. |
| `git branch` | Display all branches. |
| `git checkout branch-name` | Switch to `branch-name` branch. |
| `git checkout -b name-of-new-branch` | Create a new branch from the current checked-out branch named `name-of-new-branch`. |
| `git pull origin master` | Pull any changes from the `master` branch. Replace `master` with any branch name. |
| `git push origin branch-name` | Push local committed changes to `branch-name` branch. |