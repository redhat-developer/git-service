import {getGitService, GitProvider} from "./index";
import {GitSource, SecretType} from "./service/modal/gitsource";

const gr = new GitSource(
  "https://github.com/redhat-developer/devconsole-git",
  SecretType.NO_AUTH,
  null,
);

const service = getGitService(gr, GitProvider.GITHUB);

console.log("GIT URL : " + gr.url + "\n");

service.isRepoReachable()
  .then(r => console.log("Repo is reachable: " + r.isReachable + "\n"));

service.detectBuildType()
  .then(r => console.log("Detected build types: [ " + r.map(b => b.buildType) + " ]\n"));

service.getRepoBranchList()
  .then(r => console.log("Branch list: [ " + r.branchList.map(b => b.name) + " ]\n"));

service.getRepoLanguageList()
  .then(r => console.log("Detected languages: [ " + r.languages + " ]\n"));
