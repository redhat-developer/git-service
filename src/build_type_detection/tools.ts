export interface Tool {
  name: string,
  language: string,
  expectedRegexps: RegExp,
  expectedFiles: string[]
}

const Maven = <Tool>{
    name:            "Maven",
    language:        "java",
    expectedRegexps: RegExp([`pom\.xml`].join("|")),
    expectedFiles:   ["pom.xml"],
};

const Gradle = <Tool>{
    name:            "Gradle",
    language:        "java",
    expectedRegexps: RegExp([`.*gradle.*`].join("|")),
    expectedFiles:   ["build.gradle", "gradlew", "gradlew.bat"],
};

const Golang = <Tool>{
    name:            "Golang",
    language:        "go",
    expectedRegexps: RegExp([`main\.go`, `Gopkg\.toml`, `glide\.yaml`].join("|")),
    expectedFiles:   ["main.go", "Gopkg.toml", "glide.yaml"],
};

const Ruby = <Tool>{
    name:            "Ruby",
    language:        "ruby",
    expectedRegexps: RegExp([`Gemfile`, `Rakefile`, `config\.ru`].join("|")),
    expectedFiles:   ["Gemfile", "Rakefile", "config.ru"],
};

const NodeJS = <Tool>{
    name:            "NodeJS",
    language:        "javascript",
    expectedRegexps:  RegExp([`app\.json`, `package\.json`, `gulpfile\.js`, `Gruntfile\.js`].join("|")),
    expectedFiles:    ["app.json", "package.json", "gulpfile.js", "Gruntfile.js"],
};

const PHP = <Tool>{
    name:            "PHP",
    language:        "php",
    expectedRegexps: RegExp([`index\.php`, `composer\.json`].join("|")),
    expectedFiles:   ["index.php", "composer.json"],
};

const Python = <Tool>{
    name:            "Python",
    language:        "python",
    expectedRegexps: RegExp([`requirements\.txt`, `setup\.py`].join("|")),
    expectedFiles:   ["requirements.txt", "setup.py"],
};

const Perl = <Tool>{
    name:            "Perl",
    language:        "perl",
    expectedRegexps: RegExp([`index\.pl`, `cpanfile`].join("|")),
    expectedFiles:   ["index.pl", "cpanfile"],
};

const Dotnet = <Tool>{
    name:            "Dotnet",
    language:        "C#",
    expectedRegexps: RegExp([`project\.json`, `.*\.csproj`].join("|")),
    expectedFiles:   ["project.json", "app.csproj"],
};

export const Tools = [
  Dotnet,Golang,Gradle,Maven,NodeJS,Perl,PHP,Python,Ruby
];

