import { setOutput } from '@actions/core';
import { context } from '@actions/github';
import { extractVersionFromRef, VersionInfo } from './extract';

const toKebabCase = (str: string) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());

if (require.main === module) {
  main();
}

export default function main() {
  const result = extractVersionFromRef(context.ref);
  const keys = Object.keys(result) as Array<keyof VersionInfo>;

  for (const key of keys) {
    setOutput(toKebabCase(key), result[key]);
  }

  setOutput('is-semver', !!result.major);
}
