import core from '@actions/core';
import github from '@actions/github';
import { extractVersionFromRef, VersionInfo } from './extract';

const toKebabCase = (str: string) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());

if (require.main === module) {
  main();
}

export default function main() {
  const result = extractVersionFromRef(github.context.ref);
  const keys = Object.keys(result) as Array<keyof VersionInfo>;

  for (const key of keys) {
    core.setOutput(toKebabCase(key), result[key]);
  }

  core.setOutput('is-semver', !!result.major);
}
