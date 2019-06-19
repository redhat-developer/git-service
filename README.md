
## Quick start

Import library

```sh
npm install git-service-node
```

## How to use
Get git service from factory method
```sh
 import { getGitService } from 'git-service-node/src'
 const service = getGitService(gitsource, gitprovider);
```
### API available
Check if Repo exist
```sh
 const resp = service.isRepoReachable();
```

Get list of branches
```sh
 const branchList = service.getRepoBranchList();
```

Detect build type 
```sh
 const buildTypes = service.detectBuildType();
```

Get list of files exist in the repo 
```sh
 const buildTypes = service.detectBuildType();
```

## Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
