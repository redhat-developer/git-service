// import { Delays, greeter } from '../src/main';

import {GitSource, SecretType} from "../src/service/modal/gitsource";
import {BitbucketService} from "../src/service/bitbucket_service";
import * as assert from "assert";

describe('Main Suit', () => {
  // Read more about fake timers: http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers();

  // Act before assertions
  beforeAll(async () => {
    jest.runOnlyPendingTimers();
    jest.setTimeout(1000*10);
  });


  it('should return ok on existing public bitbucket repo', (done: any) => {
    const gr = new GitSource(
      "https://bitbucket.org/akshinde/testgitsource",
      SecretType.NO_AUTH,
      null
    );
    const gs = new BitbucketService(gr);
    gs.isRepoReachable()
      .then(() => {
        assert.ok("Repo is reachable");
        done();
      })
      .catch(() => {
        assert.fail("Repo is existing");
        done();
      })
  });

});
