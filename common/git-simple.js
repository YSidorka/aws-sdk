const { simpleGit, CleanOptions } = require('simple-git');

const githubUsername = 'YSidorka';
const repoName = 'lambdaGetProducts';
const destination = './lambda.zip';
const repoUrl = `https://github.com/${githubUsername}/${repoName}.git`;

const git = simpleGit();
git.clean(CleanOptions.FORCE);

git.clone(repoUrl, destination, { '--depth': 1, '--branch': 'master' }, (err) => {
  if (err) {
    console.error(`Error cloning repository: ${err}`);
  } else {
    console.log('Repository cloned successfully!');
  }
});
