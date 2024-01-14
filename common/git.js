const axios = require('axios');
const fs = require('fs');

const githubUsername = 'YSidorka';
const repoName = 'lambdaGetProducts';
const destination = './lambda.zip';
const repoUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/zipball/master`;

// Function to download a file from a URL
async function downloadFile(url, dest) {
  const response = await axios({
    method: 'get',
    url,
    responseType: 'stream'
  });

  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(dest);
    response.data.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      resolve();
    });

    fileStream.on('error', (err) => reject(err));
  });
}

// Function to download the latest commit ZIP archive
async function downloadLatestCommit(archiveLink) {
  try {
    // Download the ZIP archive
    await downloadFile(archiveLink, destination);

    console.log(`Latest commit archive downloaded: ${destination}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

downloadLatestCommit(repoUrl).then();

module.exports = {
  downloadLatestCommit
};
