// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// production : apiURL_BASE: 'http://10.57.180.80:81/api'
// dev 'http://10.60.147.245:82/api'
// localhost 'http://10.60.147.245:82/api'
export const environment = {
  production: false,
  assetPath: 'assets',
  apiURL_BASE: 'http://10.60.147.245:82/api'
};
