/**
 * This script reverts the last commit in the repository. This is used for undoing
 * the inclusion of firebase.cert.json file after deploying to Heroku.
 * @IMPORTANT: Any uncommited work will be lost. Only run this script with
 * `npm run deploy` and only when all work is commited.
*/
const child = require('child_process');

// Get last commit ID
child.exec('git rev-parse HEAD', { windowsHide: true }, (error, stdout) => {

  if ( error ) return console.error(error);

  const lastCommitId = stdout.trim();

  // Rollback
  child.exec(`git reset --hard ${lastCommitId}`, { windowsHide: true }, (error, stdout) => {

    if ( error ) return console.error(error);

    console.log('Hard reset done');

  });

});
