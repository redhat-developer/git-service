import {GitSource, SecretType} from "../src/service/modal/gitsource";
import {GitlabService} from "../src/service/gitlab_service";
import * as assert from "assert";
import {DockerFileParser} from "../src/dockerfile_parser/parser";

describe("Gitlab Tests" , () => {
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

  it('should return ok on existing public gitlab repo', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/jpratik999/devconsole-git.git",
      SecretType.NO_AUTH,
      null,
    );

    const gs = new GitlabService(gr)
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

  it('should list all branches of existing public gitlab repo', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/jpratik999/devconsole-git.git",
      SecretType.NO_AUTH,
      null,
    );

    const gs = new GitlabService(gr);
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

  it('should list all files of existing public gitlab repo', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/jpratik999/devconsole-git.git",
      SecretType.NO_AUTH,
      null,
    );

    const gs = new GitlabService(gr);
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
      "https://gitlab.com/jpratik999/devconsole-git.git",
      SecretType.NO_AUTH,
      null,
    );

    const gs = new GitlabService(gr);
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

  it('should detect Golang language', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/jpratik999/devconsole-git.git",
      SecretType.NO_AUTH,
      null,
    );

    const gs = new GitlabService(gr);
    gs.getRepoLanguageList()
      .then((r)=> {
        expect(r.languages.length).toBeGreaterThanOrEqual(1);
        done()
      })
      .catch((err: Error) => {
        expect(err).toBeNull();
        assert.fail("Failed to detect build type");
        done(err);
      })
  });

  it('should return exposed container port', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/jpratik999/tutorial-react-docker.git",
      SecretType.NO_AUTH,
      null
    );

    const gs = new GitlabService(gr);
    gs.getDockerfileContent()
      .then((content: string) => {
        const parser = new DockerFileParser(content);
        const port = parser.getContainerPort();
        expect(port).toEqual(5000);
        done();
      })
      .catch((err: Error) => done(err))
  });

  it('should detect Dockerfile', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/jpratik999/tutorial-react-docker.git",
      SecretType.NO_AUTH,
      null
    );

    const gs = new GitlabService(gr);
    gs.isDevfilePresent().then((r: Boolean) => {
      expect(r).toBe(true);
      done();
    }).catch((e:Error) => done(e))
  });

  it('should not detect Dockerfile', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/jpratik999/devconsole-git.git",
      SecretType.NO_AUTH,
      null
    );

    const gs = new GitlabService(gr);
    gs.isDockerfilePresent().then((r: Boolean) => {
      expect(r).toBe(false);
      done();
    }).catch((e: Error) => done(e))
  });

  it('should detect Devfile', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/rescott/che.git",
      SecretType.NO_AUTH,
      null
    );

    const gs = new GitlabService(gr);
    gs.isDevfilePresent().then((r: Boolean) => {
      expect(r).toBe(true);
      done();
    }).catch((e:Error) => done(e))
  });

  it('should not detect Devfile', (done: any) => {
    const gr = new GitSource(
      "https://gitlab.com/jpratik999/devconsole-git.git",
      SecretType.NO_AUTH,
      null
    );

    const gs = new GitlabService(gr);
    gs.isDevfilePresent().then((r: Boolean) => {
      expect(r).toBe(false);
      done();
    }).catch((e: Error) => done(e))
  });

});
