import {GitSource} from "./service/modal/gitsource";
import {GithubService} from "./service/github_service";
import {BitbucketService} from "./service/bitbucket_service";
import {BaseService} from "./service/base_service";

export enum GitProvider {
  GITHUB= "github",
  BITBUCKET= "bitbucket",
  GITLAB= "gitlab"
}

export function getGitService(gitsource: GitSource, gitProvider: GitProvider): BaseService {
  switch (gitProvider) {
    case GitProvider.GITHUB: return new GithubService(gitsource)
    case GitProvider.BITBUCKET: return new BitbucketService(gitsource);
    default: return null;
  }
}
