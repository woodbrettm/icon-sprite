import type { ParserOptions } from './types.ts';
import { XMLParser as FastXMLParser } from 'fast-xml-parser';


export function initXMLParser() {

  const parserOptions: ParserOptions = {
    allowBooleanAttributes: true,
    ignoreAttributes: false,
    alwaysCreateTextNode: true,
    attributeNamePrefix: '@ATTR__',
    preserveOrder: true,
  };

  try {

    const parser = new FastXMLParser(parserOptions);
    const res = parser.parse('', true);

  } catch(err) {



  }

}
