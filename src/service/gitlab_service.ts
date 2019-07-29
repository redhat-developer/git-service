import {BaseService} from './base_service'
import { Gitlab } from 'gitlab'
import * as GitUrlParse from 'git-url-parse'
import {RepoMetadata} from './modal/repo_metadata'
import {GitSource, SecretType} from "./modal/gitsource"
import {RepoCheck} from "./modal/response_model/repo_check"
import {Branch, BranchList} from "./modal/response_model/branch_list"
import {RepoFileList} from "./modal/response_model/repo_file_list"
import {ResponseLanguageList} from "./modal/response_model/language_list"

export class GitlabService extends BaseService{
  client: any
  repodata: any
  metadata: any
  projectID: any
  constructor(gitsource: GitSource){
    super(gitsource)
    this.repodata = this.getRepoMetadata()
    var token = this.getAuthProvider()
    this.client = new Gitlab({
      host: this.repodata.host,
      token: token
    })
  }

  getRepoMetadata() {
    if (this.repodata) {
      return this.repodata
    }
    this.metadata = this.getMetadata()
    let host = this.metadata.protocol + "://" + this.metadata.source
    return new RepoMetadata(
        this.metadata.owner,
        host,
        this.gitsource.ref,
        this.metadata.name
    )
  }

  getMetadata(){
    if (this.metadata) {
      return this.metadata
    }
    return GitUrlParse(this.gitsource.url)
  }

  getAuthProvider = (): any => {
    switch(this.gitsource.secretType) {
      case SecretType.PERSONAL_ACCESS_TOKEN || SecretType.OAUTH:
        return this.gitsource.secretContent
      default:
        return null;
    }
  }

  async getProjectId(): Promise<any> {
    try {
        if(this.projectID) {
          return this.projectID;
        }
        this.metadata = this.getMetadata()
        const resp = await this.client.Projects.search(this.metadata.name)
        resp.forEach(p => {
          if (p.path_with_namespace === this.metadata.full_name) {
            this.projectID = p.id
          }
        });
        return this.projectID;
    }catch (e) {
        throw e;
    }
  }

  async isRepoReachable(): Promise<RepoCheck> {
    this.metadata = this.getMetadata()
    try {
        const resp = await this.client.Projects.search(this.metadata.name)
        if (resp.length < 1) {
          return new RepoCheck(resp, false)
        }
        return new RepoCheck(resp, true)
    }catch (e) {
        throw e;
    }
}

async getRepoBranchList(): Promise<BranchList> {
    try {
        this.projectID = await this.getProjectId();
        const resp = await this.client.Branches.all(this.projectID)
        const list = resp.map(branch => {
          return new Branch(branch.name);
        });
        return new BranchList(resp, list)
    }catch (e) {
        throw e;
    }
  }

  async getRepoFileList(): Promise<RepoFileList> {
    try {
      this.projectID = await this.getProjectId();
      const resp = await this.client.Repositories.tree(this.projectID)
      var files = [];
      resp.forEach(t => {
        if(t.type === "blob"){
          files.push(t.path)
        }
      });
      return <RepoFileList>{ files };
    }
    catch (e) {
      throw e;
    }
  }

  async getRepoLanguageList(): Promise<ResponseLanguageList> {
    try {
      this.projectID = await this.getProjectId();
      const resp = await this.client.Projects.languages(this.projectID)
      return <ResponseLanguageList>{languages: Object.keys(resp)};
    }
    catch (e) {
      throw e;
    }
  }
}

