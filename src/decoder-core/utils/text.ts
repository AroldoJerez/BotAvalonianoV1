/**
 * Convierte un string hexadecimal a texto
 */
export function hexToStr(hex: string): string {
  try {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  } catch (error) {
    throw new Error('Error al decodificar texto hexadecimal');
  }
}

/**
 * Limpia el texto de caracteres especiales
 */
export function cleanText(text: string): string {
  return text.replace(/[^a-zA-Z0-9]/g, '');
}
