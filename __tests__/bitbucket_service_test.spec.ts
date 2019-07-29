import {GitSource, SecretType} from "../src/service/modal/gitsource";
import {BitbucketService} from "../src/service/bitbucket_service";
import {RepoFileList} from "../src/service/modal/response_model/repo_file_list";
import {DockerFileParser} from "../src/dockerfile_parser/parser";

describe('Bitbucket Service Tests', () => {
  it('should list all files of existing public bitbucket repo', (done: any) => {
    const gr = new GitSource(
      "https://bitbucket.org/akshinde/testgitsource",
      SecretType.NO_AUTH,
      null
    );
    const gs = new BitbucketService(gr);
    gs.getRepoFileList()
      .then((r: RepoFileList) => {
        expect(r.files.length).toBeGreaterThanOrEqual(1);
        done();
      })
      .catch((err: Error) => {
        done(err);
      })
  });

  it('should detect no build type', (done: any) => {
    const gr = new GitSource(
      "https://bitbucket.org/akshinde/testgitsource",
      SecretType.NO_AUTH,
      null
    );

    const gs = new BitbucketService(gr);
    gs.detectBuildType()
      .then((r) => {
        expect(r.length).toStrictEqual(0);
        done()
      })
      .catch((err: Error) => {
        expect(err).toBeNull();
        done(err);
      });
  });

  it('should return exposed container port', (done: any) => {
    const gr = new GitSource(
      "https://bitbucket.org/akashshinde123/tutorial-react-docker",
      SecretType.NO_AUTH,
      null
    );

    const gs = new BitbucketService(gr);
    gs.getDockerfileContent()
      .then((content: string) => {
        const parser = new DockerFileParser(content);
        const port = parser.getContainerPort();
        expect(port).toEqual(5000);
        done();
      })
      .catch((err: Error) => done(err))
  });

  it('should not return exposed container port', (done: any) => {
    const gr = new GitSource(
      "https://bitbucket.org/akshinde/testgitsource",
      SecretType.NO_AUTH,
      null
    );

    const gs = new BitbucketService(gr);
    gs.getDockerfileContent()
      .then((_: string) => {
        done(new Error("This promise should have been rejected"));
      })
      .catch((err: Error) => {
        expect(err).toBeDefined();
        done();
      })
  });

  it('should detect Dockerfile', (done: any) => {
    const gr = new GitSource(
      "https://bitbucket.org/akashshinde123/tutorial-react-docker",
      SecretType.NO_AUTH,
      null
    );

    const gs = new BitbucketService(gr);
    gs.isDockerfilePresent().then((r: Boolean) => {
      expect(r).toBe(true);
      done();
    }).catch((e:Error) => done(e))
  });

  it('should not detect Dockerfile', (done: any) => {
    const gr = new GitSource(
      "https://bitbucket.org/akshinde/testgitsource",
      SecretType.NO_AUTH,
      null
    );

    const gs = new BitbucketService(gr);
    gs.isDockerfilePresent().then((r: Boolean) => {
      expect(r).toBe(false);
      done();
    }).catch((e: Error) => done(e))
  });

});
