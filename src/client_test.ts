import {DockerFileParser} from "./dockerfile_parser/parser";

const contents = 'FROM ubuntu:latest\n'
  + 'ADD . /root\n'
  + 'RUN echo done\n'
  + 'EXPOSE 8080';
const parser = new DockerFileParser(contents);
parser.parse();
