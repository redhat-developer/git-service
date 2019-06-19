import {BaseService} from './base_service'
import * as Octokit from '@octokit/rest'
import * as GitUrlParse from 'git-url-parse'
import {RepoMetadata} from './modal/repo_metadata'
import {GitSource, SecretType} from "./modal/gitsource";
import {RepoCheck} from "./modal/response_model/repo_check";
import {Branch, BranchList} from "./modal/response_model/branch_list";
import {RepoFileList} from "./modal/response_model/repo_file_list";

export class GithubService extends BaseService {
    client: Octokit;

    constructor(gitsource: GitSource) {
        super(gitsource);
        var opts = this.getAuthProvider();
        this.client = new Octokit({ auth: opts })
    }

    getAuthProvider = (): any => {
      switch(this.gitsource.secretType) {
        case SecretType.BASIC_AUTH:
          var {username, password} = this.gitsource.secretContent;
          return { username, password };
        case SecretType.NO_AUTH:
          return null;
        default:
          return null;
      }
    };

    async isRepoReachable(): Promise<RepoCheck> {
        const metadata:RepoMetadata = this.getRepoMetadata();
        try {
            const resp = await this.client.repos.get({
                owner: metadata.owner,
                repo: metadata.repoName,
            });
            return new RepoCheck(resp, resp.status === 200)
        }catch (e) {
            throw e;
        }
    }

    async getRepoBranchList(): Promise<BranchList> {
        const metadata = this.getRepoMetadata();
        try {
            const resp = await this.client.repos.listBranches({
                owner: metadata.owner,
                repo: metadata.repoName
            });
            const list = resp.data.map((r) => {
              return new Branch(r.name);
            });
            return new BranchList(resp, list)
        }catch (e) {
            throw e;
        }
    }

    getRepoMetadata() {
        const metadata = GitUrlParse(this.gitsource.url);
        return new RepoMetadata(
            metadata.owner,
            metadata.source,
            this.gitsource.ref,
            metadata.name
        )
    }

  async getRepoFileList(): Promise<RepoFileList> {
      try {
        const metadata = this.getRepoMetadata();
        const resp = await this.client.git.getTree({
          tree_sha: metadata.defaultBranch,
          owner: metadata.owner,
          repo: metadata.repoName
        });
        let files = [];
        if (resp.status === 200) {
          files = resp.data.tree.map(t => t.path)
        }
        return <RepoFileList>{ files };
      }
      catch (e) {
        throw e;
      }
  }

  async getRepoLanguageList(): Promise<any> {
    return undefined;
  }
}
