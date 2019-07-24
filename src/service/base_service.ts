import { GitSource } from './modal/gitsource'
import {RepoCheck} from "./modal/response_model/repo_check";
import {BranchList} from "./modal/response_model/branch_list";
import {RepoFileList} from "./modal/response_model/repo_file_list";
import {BuildType, detectBuildType} from "../build_type_detection/detector";
import {ResponseLanguageList} from "./modal/response_model/language_list";

 export abstract class BaseService {
    protected gitsource: GitSource;

    protected constructor(gitsource: GitSource) {
        this.gitsource = gitsource;
    }

    // Detect build types for given gitsource, It runs regular expressions on file list
   // and returns list of build types matched.
    public async detectBuildType() : Promise<BuildType[]> {
      try {
        const fileList = await this.getRepoFileList();
        return detectBuildType(fileList.files);
      }catch (e) {
        throw e;
      }
    }

    protected getRepoMetadata(){};
    protected abstract getAuthProvider(): any;

    // Returns list of branches for given gitsource.
    abstract async getRepoBranchList(): Promise<BranchList>;

   // Returns if repo reachable or not along with the api response.
    abstract async isRepoReachable(): Promise<RepoCheck>;

   // Returns source code tree for given gitsource
    abstract async getRepoFileList(): Promise<RepoFileList>;

    // Checks if dockerfile exist in the repo and returns dockerfile content
    abstract async getDockerfileContent(): Promise<string>;

   // Returns list of detected languages
   abstract async getRepoLanguageList(): Promise<ResponseLanguageList>;
}
