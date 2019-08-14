import {GitSource, SecretType} from "./service/modal/gitsource";
import {BitbucketService} from "./service/bitbucket_service";

const gr = new GitSource(
  "https://bitbucket.org/akshinde/testgitsource",
  SecretType.NO_AUTH,
  null
);

const gs = new BitbucketService(gr);
gs.getDockerfileContent()
  .then(resp => console.log(resp))
  .catch(err => console.error(err.message));
