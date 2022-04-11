const glob = require('glob')
const ImageMagick = require('imagemagick')

const BACKGROUND_COLOR = '#121417'
const QUALITY = 80
const FILES = __dirname + '/../src/assets/**/*.png'

async function convertPng(inputPath) {
  const outputPath = inputPath.replace('.png', '.jpg')

  return new Promise((resolve, reject) => {
    ImageMagick.convert(
      [
        inputPath,
        '-background',
        BACKGROUND_COLOR,
        '-quality',
        QUALITY,
        '-flatten',
        outputPath
      ],
      function(err, stdout){
        if (err) return reject(err)
        return resolve(stdout)
      }
    )
  })
}

glob(FILES, {}, (err, files) => {
  files.forEach(async function(file) {
    if (file.includes('favicon')) return
    return await(convertPng(file))
  })
})
