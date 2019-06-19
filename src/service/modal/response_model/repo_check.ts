export class RepoCheck {
  response: Object;
  isReachable: boolean;

  constructor(resp: Object, isRechable: boolean){
    this.response = resp;
    this.isReachable = isRechable;
  }
}
