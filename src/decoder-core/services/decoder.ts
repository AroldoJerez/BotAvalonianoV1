import { Boss } from '../types/boss.js';
import { bosses } from '../config/bosses.js';
import { cleanText, hexToStr } from '../utils/text.js';

export class DungeonDecoder {
  /**
   * Procesa el texto codificado y retorna la información de los jefes
   */
  static decode(encodedData: string): Boss[] {
    try {
      const hexData = encodedData.replace(/\s/g, '');
      const stringData = hexToStr(hexData);
      const cleanedText = cleanText(stringData.toLocaleLowerCase());

      const bossPositions: Boss[] = [];

      Object.keys(bosses).forEach((boss) => {
        const regex = new RegExp(`${boss}.*?layer(\\d{1,2})`, 'gi');
        let match;

        while ((match = regex.exec(cleanedText)) !== null) {
          bossPositions.push({
            name: bosses[boss].name,
            position: match.index,
            layer: parseInt(match[1], 10),
            color: bosses[boss][parseInt(match[1], 10)]
          });
        }
      });

      return bossPositions.sort((a, b) => (a.position || 0) - (b.position || 0));
    } catch (error) {
      throw new Error('Error al decodificar la información del calabozo');
    }
  }
}
