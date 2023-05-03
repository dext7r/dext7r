import path from 'node:path';
import { readFileSync } from 'node:fs';
import { cac } from 'cac';
import { cwd } from 'node:process';
import { CliOption } from '../types';
import { syncNpmMirrorPackage } from './index';
// import { version } from '../package.json';

const { version } = JSON.parse(
  readFileSync(path.resolve(cwd(), 'package.json')).toString()
);

const cli = cac('sync-to-mirror');

cli
  .command('[...packageNames]', 'sync packages in npm mirror(taobao)')
  .option('--timeout <timeout>', 'timeout in seconds for each package', {
    default: 30,
  })
  .action(async (pkgNames: string[], options: CliOption) => {
    let allPkgs: string[] = [];

    if (pkgNames.length > 0) {
      allPkgs = pkgNames;
    } else if (process.env.npm_package_name) {
      allPkgs = [process.env.npm_package_name];
    }

    if (allPkgs.length === 0) {
      throw new Error(
        'sync-to-mirror require at least one pkg name as argument'
      );
    }

    await syncNpmMirrorPackage(allPkgs, options.timeout);
  });

cli.help();
cli.version(version);

cli.parse();
