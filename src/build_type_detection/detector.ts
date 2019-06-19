import {Tool, Tools} from "./tools";

export interface BuildType {
  buildType: string,
  language: string,
  files: string[]
}

export function detectBuildType(files: string[]): BuildType[] {
  const buildTypes = Tools.map((t:Tool) => {
    const matchedFiles = files.filter((f: string) => t.expectedRegexps.test(f));
    return <BuildType>{ buildType: t.name, language: t.language, files: matchedFiles };
  });
  return buildTypes.filter(b => b.files.length > 0)
}
