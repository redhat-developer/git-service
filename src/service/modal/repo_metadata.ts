export class RepoMetadata{
    owner: string
    host: string
    defaultBranch: string
    repoName: string

    constructor(owner: string,
                host: string,
                defaultbranch: string,
                reponame: string) {
        this.owner = owner;
        this.host = host;
        this.defaultBranch = defaultbranch;
        this.repoName = reponame;
    }
}
