import {GitSource, SecretType} from "../src/service/modal/gitsource";
import {BitbucketService} from "../src/service/bitbucket_service";
import {RepoFileList} from "../src/service/modal/response_model/repo_file_list";

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
});
