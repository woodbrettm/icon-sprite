import fs from 'node:fs';
import path from 'node:path';
import prettier from 'prettier';

/**
 * Imports ALL svg files from a specified directory and builds
 * a svg sprite string, formatted using prettier, to be exported to a file.
 * @param inputFolderPath - Path to the folder containing the source icons.
 * @see exportSpriteToFile - Use this function to export to a file.
 *
 * @example
 * const spriteString = await buildSprite('./src/icons/source');
 */
export async function buildSprite(inputFolderPath: string) {
  let output = `<svg xmlns="http://www.w3.org/2000/svg"><defs>`;
  const svgs = getFolderSvgs(inputFolderPath);
  const symbols = convertSvgsToSymbols(svgs);
  output += symbols;
  output += `</defs></svg>`;
  const outputPretty = await prettifyXml(output);
  return outputPretty;
}

/**
 * Exports an svg string as an svg to a designated path.
 * @param source - The svg file string built using buildSprite.
 * @param filePath - the file path to export to (including .svg ext).
 * @see buildSprite - Use this function to build the svg string.
 *
 * @remarks
 * Make sure to export to a different directory than where the source
 * icons are located. The buildSprite function simply imports all svg
 * files from a directory, including the svg sprite if it's in
 * the same directory.
 *
 * @example
 * ```
 * exportSpriteToFile(spriteString, './src/icons/sprite/icon-sprite.svg')
 * ```
 */
export function exportSpriteToFile(source: string, filePath: string) {
  fs.writeFileSync(filePath, source);
}

function getFolderSvgs(folderPath: string) {
  const allFiles: fs.Dirent[] = fs.readdirSync(folderPath, {
    withFileTypes: true,
  });
  const svgs = allFiles.filter((f) => path.extname(f.name) === '.svg');
  return svgs;
}

function convertSvgsToSymbols(svgs: fs.Dirent[]) {
  let output = '';
  for (const svg of svgs) {
    const filePath = `${svg.path}/${svg.name}`;
    const symbolId = svg.name.replace('.svg', '');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    output += convertSvgToSymbol(fileContent, symbolId);
  }
  return output;
}

function convertSvgToSymbol(source: string, symbolId: string) {
  const output = source
    .replace(`xmlns="http://www.w3.org/2000/svg"`, '')
    .replace('<svg', `<symbol id="${symbolId}"`)
    .replace('</svg>', '</symbol>');
  return output;
}

async function prettifyXml(source: string) {
  const output = await prettier.format(source, {
    parser: 'html',
  });
  return output;
}
