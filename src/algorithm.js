////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTE Imports
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const {
  XML_DSIG_GOST: {
    XmlDsigGost2012Url256,
    XmlDsigGost2012Url256Digest,
    XmlDsigGost2012Url512,
    XmlDsigGost2012Url512Digest,
    XmlDsigGost3410Url,
    XmlDsigGost3411Url,
  },
} = require('./constants');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTE Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @method template
 * @param {String} signAlgorithm алгоритм подписи
 */
function template(signAlgorithm) {
  /**
   * @function doHashAlgorithm
   * @param {String} hashAlgorithm алгоритм хэширования
   */
  return function doHashAlgorithm(hashAlgorithm) {
    return {
      signAlgorithm,
      hashAlgorithm,
    };
  };
}

/**
 * @function xmlAlgorithm
 * @param {String} value алгоритм сертификата
 * @returns
 * @throws {Error}
 * @description определяет алгоритм подписания XML документа в зависимости от алгоритма сертификата
 */
function xmlAlgorithm(value) {
  switch (value) {
    case '1.2.643.7.1.1.1.1':
      // алгоритм подписи ГОСТ Р 34.10-2012 с ключом 256 бит
      return template(XmlDsigGost2012Url256)(XmlDsigGost2012Url256Digest);
    case '1.2.643.7.1.1.1.2':
      // алгоритм подписи ГОСТ Р 34.10-2012 с ключом 512 бит
      return template(XmlDsigGost2012Url512)(XmlDsigGost2012Url512Digest);
    case '1.2.643.2.2.19':
      // алгоритм ГОСТ Р 34.10-2001
      return template(XmlDsigGost3410Url)(XmlDsigGost3411Url);
    default:
      throw new Error(
        'Данная страница не поддерживает XML подпись сертификатами с алгоритмом ГОСТ Р 34.10-2012 или' +
          'ГОСТ Р 34.10-2001'
      );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTE Exports
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = xmlAlgorithm;
