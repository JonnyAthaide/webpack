const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Configuração do diretório de entrada e saída
const inputDir = './src/assets';
const outputDir = './content/assets';

// Função para converter as imagens para o formato WebP
async function convertImages() {
  // Criar o diretório de saída, se não existir
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Obter a lista de caminhos dos arquivos de imagem
  const imagePaths = glob.sync(`${inputDir}/**/*.{png,jpg,jpeg}`);

  // Converter cada imagem para o formato WebP
  await Promise.all(
    imagePaths.map(async (imagePath) => {
      const outputFileName = path.basename(imagePath, path.extname(imagePath)) + '.webp';
      const outputFilePath = path.join(outputDir, outputFileName);

      await sharp(imagePath).toFile(outputFilePath);

      console.log(`Imagem convertida: ${imagePath} -> ${outputFilePath}`);
    })
  );

  console.log('Conversão concluída.');
}

// Executar a função de conversão
convertImages().catch((error) => {
  console.error('Ocorreu um erro durante a conversão das imagens:', error);
});
