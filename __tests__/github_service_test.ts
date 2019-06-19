import {GitSource, SecretType} from "../src/service/modal/gitsource";
import {GithubService} from "../src/service/github_service";
import * as assert from "assert";

describe("Github Tests" , () => {
  // Read more about fake timers: http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers();

  // const name: string = 'John';
  // let hello: string;

  // Act before assertions
  beforeAll(async () => {
    // const p: Promise<string> = greeter(name);
    jest.runOnlyPendingTimers();
    jest.setTimeout(1000*10);
    // hello = await p;
  });

  it('should return ok on existing public github repo', (done: any) => {
    const gr = new GitSource(
      "https://github.com/redhat-developer/devconsole-git",
      SecretType.NO_AUTH,
      null,
    );

    const gs = new GithubService(gr)
    gs.isRepoReachable()
      .then(() => {
        assert.ok("Got");
        done();
      })
      .catch((err: Error) => {
        assert.fail("Repo is existing" + err.toString());
        done();
      })
  });

  it('should list all branches of existing public github repo', (done: any) => {
    const gr = new GitSource(
      "https://github.com/redhat-developer/devconsole-git",
      SecretType.NO_AUTH,
      null
    );

    const gs = new GithubService(gr);
    gs.getRepoBranchList()
      .then((r: any)=> {
        assert.ok("List of branches", r);
        done()
      })
      .catch((err: Error) => {
        done(err);
        assert.fail("Repo is existing")
      })
  });

  it('should list all files of existing public github repo', (done: any) => {
    const gr = new GitSource(
      "https://github.com/redhat-developer/devconsole-git",
      SecretType.NO_AUTH,
      null
    );

    const gs = new GithubService(gr);
    gs.getRepoFileList()
      .then((r)=> {
        expect(r.files.length).toBeGreaterThanOrEqual(1);
        done()
      })
      .catch((err: Error) => {
        expect(err).toBeNull();
        assert.fail("Failed to list files in the repo");
        done(err);
      })
  });

  it('should detect golang build type', (done: any) => {
    const gr = new GitSource(
      "https://github.com/redhat-developer/devconsole-git",
      SecretType.NO_AUTH,
      null
    );

    const gs = new GithubService(gr);
    gs.detectBuildType()
      .then((r)=> {
        expect(r.length).toBeGreaterThanOrEqual(1);
        done()
      })
      .catch((err: Error) => {
        expect(err).toBeNull();
        assert.fail("Failed to detect build type");
        done(err);
      })
  });

});
