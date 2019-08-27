import {GitSource, SecretType} from "./service/modal/gitsource";
import {GitlabService} from "./service/gitlab_service";

const gr = new GitSource(
  "https://gitlab.com/jpratik999/devconsole-operator.git",
  SecretType.NO_AUTH,
  ''
);

const gs = new GitlabService(gr);

//Expected output: true
gs.isDockerfilePresent()
  .then(resp => console.log(resp))
  .catch(err => console.error(err.message));

//Expected output: Dockerfile content
gs.getDockerfileContent()
  .then(resp => console.log(resp))
  .catch(err => console.error(err.message));

