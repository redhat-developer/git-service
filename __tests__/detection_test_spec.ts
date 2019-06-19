import {detectBuildType} from "../src/build_type_detection/detector";

describe("Build tool detection tests", () => {
  it('should return nodejs build type', function () {
    const files = ["package.json", "public", "src"]
    detectBuildType(files)
  });
})
