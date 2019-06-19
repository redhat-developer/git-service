export class BranchList {
  response: object;
  branchList: Branch[];

  constructor(resp: object, branchList: Branch[]) {
    this,resp = resp;
    this.branchList = branchList;
  }
}


export class Branch {
  name: string

  constructor(name: string) {
    this.name = name;
  }
}
