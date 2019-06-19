import * as Bitbucket from 'bitbucket'
import {BaseService} from "./base_service";
import {RepoMetadata} from './modal/repo_metadata'
import * as parseBitbucketUrl from 'parse-bitbucket-url'
import {GitSource, SecretType} from "./modal/gitsource";
import {RepoCheck} from "./modal/response_model/repo_check";
import {Branch, BranchList} from "./modal/response_model/branch_list";
import {RepoFileList} from "./modal/response_model/repo_file_list";

export class BitbucketService extends BaseService {

    client: Bitbucket;

    constructor(gitsource: GitSource) {
        super(gitsource);
        this.client = new Bitbucket();
        const creds = this.getAuthProvider();
        if (creds) this.client.authenticate(creds)
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
            });
            const list = resp.data.values.map(v => new Branch(v.name));
            return new BranchList(resp, list)
        }catch (e) {
            throw e;
        }
    }

    getRepoMetadata(): RepoMetadata {
        const metadata = parseBitbucketUrl(this.gitsource.url);
        return  new RepoMetadata(
            metadata.owner,
            metadata.source,
            this.gitsource.ref,
            metadata.name
        );
    }

    getAuthProvider(): any {
      switch (this.gitsource.secretType) {
          case SecretType.BASIC_AUTH:
            const {username, password} = this.gitsource.secretContent;
            return {type: 'basic', username, password};
          case SecretType.NO_AUTH:
            return null;
          default:
            return null;
      }
    }

    async getRepoFileList(): Promise<RepoFileList> {
      try {
        const metadata = this.getRepoMetadata();
        const resp = await this.client.repositories.readSrc({
          node: metadata.defaultBranch,
          path: '',
          username: metadata.owner,
          repo_slug: metadata.repoName,
          pagelen: 50
        });
        const files = resp.data.values.map(f => f.path)
        return <RepoFileList> { files }
      }catch (e) {
        throw e;
      }
    }

    async getRepoLanguageList(): Promise<any> {
      return undefined;
    }
}
