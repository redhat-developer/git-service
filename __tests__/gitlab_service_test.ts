import {GitSource, SecretType} from "../src/service/modal/gitsource";
import {GitlabService} from "../src/service/gitlab_service";
import * as assert from "assert";

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
      "https://gitlab.com/DhritiShikhar/testgitsource",
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

});
