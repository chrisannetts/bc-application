// const path = require('path')
// const glob = require('glob')
// const fs = require('fs')
// const { execSync } = require('child_process')

// const CWD = path.resolve(__dirname, '../src/pages/')
// const FILES = '**/*.pug'

// function getLastModifiedFs(fullPath) {
//   var stats = fs.statSync(fullPath)
//   return new Date(stats.mtime).toISOString().split('T')[0]
// }

// function getLastModifiedGit(fullPath) {
//   return execSync(`git log -1 --format="%ad" --date=format:"%Y-%m-%d" -- ${fullPath}`)
// }

// function getLastLogicalModifiedDate(relativePath) {
//   const fullPath = `${CWD}/${relativePath}`
//   const lastModifiedFs = getLastModifiedFs(fullPath)
//   const lastModifiedGit = getLastModifiedGit(fullPath)

//   if (lastModifiedGit > lastModifiedFs) {
//     return lastModifiedGit
//   } else {
//     return lastModifiedFs
//   }
// }

// function generateSitemapConfig() {
//   return glob
//     .sync(FILES, { cwd: CWD })
//     .filter((relativePath) => !relativePath.includes('404.pug') )
//     .map((relativePath) => {
//       const lastmod = getLastLogicalModifiedDate(relativePath)
//       let path = ''

//       if (!relativePath.includes('index.pug')) {
//         path = `/${relativePath.replace('.pug', '')}`
//       }

//       return { path, lastmod, changefreq: 'monthly' }
//     })
// }

// module.exports.generateSitemapConfig = generateSitemapConfig


const path = require('path')
const glob = require('glob')
const fs = require('fs')
const { execSync } = require('child_process')
const CWD = path.resolve(__dirname, '../src/pages/')
const FILES = '**/*.pug'
function getLastModifiedFs(fullPath) {
  var stats = fs.statSync(fullPath)
  return new Date(stats.mtime).toISOString().split('T')[0]
}
function getLastLogicalModifiedDate(relativePath) {
  const fullPath = `${CWD}/${relativePath}`
  return getLastModifiedFs(fullPath)
}
function generateSitemapConfig() {
  return glob
    .sync(FILES, { cwd: CWD })
    .filter((relativePath) => !relativePath.includes('404.pug') )
    .map((relativePath) => {
      const lastmod = getLastLogicalModifiedDate(relativePath)
      let path = ''
      if (!relativePath.includes('index.pug')) {
        path = `/${relativePath.replace('.pug', '')}`
      }
      return { path, lastmod, changefreq: 'monthly' }
    })
}
module.exports.generateSitemapConfig = generateSitemapConfig
