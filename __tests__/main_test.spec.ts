import {GitSource, SecretType} from "../src/service/modal/gitsource";
import {getGitService, GitProvider} from "../src";

describe("Factory test", () =>{
  it('should return github service',  () => {
    const gr = new GitSource(
      "https://github.com/redhat-developer/devconsole-git",
      SecretType.NO_AUTH,
      null
    );
    const gitProvider = GitProvider.GITHUB;
    const service = getGitService(gr, gitProvider);
    expect(service.constructor.name).toEqual("GithubService")
  });
});
