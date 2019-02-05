sfdx-nforce
===========

Plugin that enhances sfdx. Most of the comands will be deprecated as DX matures.

[![Version](https://img.shields.io/npm/v/sfdx-nforce.svg)](https://npmjs.org/package/sfdx-nforce)
[![CircleCI](https://circleci.com/gh/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/tree/master.svg?style=shield)](https://circleci.com/gh/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-nforce/branch/master)
[![Codecov](https://codecov.io/gh/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/branch/master/graph/badge.svg)](https://codecov.io/gh/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce)
[![Greenkeeper](https://badges.greenkeeper.io/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/badge.svg)](https://snyk.io/test/github/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-nforce.svg)](https://npmjs.org/package/sfdx-nforce)
[![License](https://img.shields.io/npm/l/sfdx-nforce.svg)](https://github.com/https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-nforce
$ sfdx-nforce COMMAND
running command...
$ sfdx-nforce (-v|--version|version)
sfdx-nforce/0.0.2 darwin-x64 node-v9.5.0
$ sfdx-nforce --help [COMMAND]
USAGE
  $ sfdx-nforce COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx-nforce nforce`](#sfdx-nforce-nforce)
* [`sfdx-nforce nforce:org [FILE]`](#sfdx-nforce-nforceorg-file)
* [`sfdx-nforce nforce:profiles:fix`](#sfdx-nforce-nforceprofilesfix)
* [`sfdx-nforce nforce:profiles:retrieve`](#sfdx-nforce-nforceprofilesretrieve)

## `sfdx-nforce nforce`

print a greeting and your org IDs

```
USAGE
  $ sfdx-nforce nforce

OPTIONS
  -f, --force                                     example boolean flag
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
     Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
     My hub org id is: 00Dxx000000001234
  
  $ sfdx hello:org --name myname --targetusername myOrg@example.com
     Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
```

_See code: [src/commands/nforce.ts](https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/blob/v0.0.2/src/commands/nforce.ts)_

## `sfdx-nforce nforce:org [FILE]`

print a greeting and your org IDs

```
USAGE
  $ sfdx-nforce nforce:org [FILE]

OPTIONS
  -f, --force                                      example boolean flag
  -n, --name=name                                  name to print
  -u, --targetusername=targetusername              username or alias for the target org; overrides default target org
  -v, --targetdevhubusername=targetdevhubusername  username or alias for the dev hub org; overrides default dev hub org
  --apiversion=apiversion                          override the api version used for api requests made by this command
  --json                                           format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)   logging level for this command invocation

EXAMPLES
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
     Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
     My hub org id is: 00Dxx000000001234
  
  $ sfdx hello:org --name myname --targetusername myOrg@example.com
     Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
```

_See code: [src/commands/nforce/org.ts](https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/blob/v0.0.2/src/commands/nforce/org.ts)_

## `sfdx-nforce nforce:profiles:fix`

Run Operations against profiles

```
USAGE
  $ sfdx-nforce nforce:profiles:fix

OPTIONS
  -n, --name=name                                 name to print
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  $ sfdx nforce:profiles:fix
  $ sfdx nforce:profiles:fix -n SystemProfile
```

_See code: [src/commands/nforce/profiles/fix.ts](https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/blob/v0.0.2/src/commands/nforce/profiles/fix.ts)_

## `sfdx-nforce nforce:profiles:retrieve`

Run Operations against profiles

```
USAGE
  $ sfdx-nforce nforce:profiles:retrieve

OPTIONS
  -c, --clean                                     Run clean on the profile(s)
  -n, --name=name                                 name to print
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  $ sfdx nforce:profiles:retrieve
  $ sfdx nforce:profiles:retrieve -n SystemProfile
```

_See code: [src/commands/nforce/profiles/retrieve.ts](https://github.com/mauricio87/https://github.com/mauricio87/sfdx-nforce/blob/v0.0.2/src/commands/nforce/profiles/retrieve.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
