const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const glob = require('glob');
const path = require('path');

// Configuração do diretório de entrada e saída
const inputDir = './src/assets';
const outputDir = './content/assets';

// Função para converter as imagens para o formato WebP
async function convertImages() {
  // Obter a lista de caminhos dos arquivos de imagem
  const imagePaths = await new Promise((resolve, reject) => {
    glob(`${inputDir}/**/*.{png,jpg,jpeg}`, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

  // Converter cada imagem para o formato WebP
  await Promise.all(
    imagePaths.map(async (imagePath) => {
      const outputFileName = path.basename(imagePath, path.extname(imagePath)) + '.webp';
      const outputFilePath = path.join(outputDir, outputFileName);

      await imagemin([imagePath], {
        destination: outputDir,
        plugins: [imageminWebp({ quality: 75 })],
        use: [imageminWebp({ quality: 75 })],
      });

      console.log(`Imagem convertida: ${imagePath} -> ${outputFilePath}`);
    })
  );

  console.log('Conversão concluída.');
}

// Executar a função de conversão
convertImages().catch((error) => {
  console.error('Ocorreu um erro durante a conversão das imagens:', error);
});
