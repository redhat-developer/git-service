import {BaseService} from './base_service'
import { Gitlab } from 'gitlab';
import * as GitlabUrlParse from 'gitlab-url-parse'
import {RepoMetadata} from './modal/repo_metadata'
import {GitSource, SecretType} from "./modal/gitsource";
import {RepoCheck} from "./modal/response_model/repo_check";
import {Branch, BranchList} from "./modal/response_model/branch_list";

export class GitlabService extends BaseService {
    client: any;

    constructor(gitsource: GitSource) {
        super(gitsource);
        var opts = this.getAuthProvider();
        this.client = new Gitlab({token: opts});
    }

    async isRepoReachable(): Promise<RepoCheck> {
        try {
            const metadata = this.getRepoMetadata();
            const resp = await this.client.repositories.get({
                repo_slug: metadata.repoName,
                username: metadata.owner
            });
            return new RepoCheck(resp, true)
        }catch (e) {
            throw e;
        }
    }

    async getRepoBranchList(): Promise<BranchList> {
        const metadata = this.getRepoMetadata();
        try {
            const resp = await this.client.refs.listBranches({
                repo_slug: metadata.repoName,
                username: metadata.owner
            })
            const list = resp.data.values.map(v => new Branch(v.name));
            return new BranchList(resp, list)
        }catch (e) {
            throw e;
        }
    }

    getRepoMetadata() {
        const metadata = GitlabUrlParse(this.gitsource.url);
        return new RepoMetadata(
            metadata.owner,
            metadata.source,
            metadata.ref,
            metadata.name
        )
    }

    getAuthProvider(): any {
      switch (this.gitsource.secretType) {
          case SecretType.BASIC_AUTH:
            const {username, password} = this.gitsource.secretContent;
            return { username, password};
          case SecretType.NO_AUTH:
            return null;
          default:
            return null;
      }
    }

    async getRepoLanguageList(): Promise<any> {
        return undefined;
      }


    async getRepoFileList(): Promise<any> {
	    return undefined;
	}
}

