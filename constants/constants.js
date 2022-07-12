const ERROR_CODE_400 = 400;
const ERROR_CODE_500 = 500;
const ERROR_CODE_404 = 404;
const ERROR_CODE_403 = 403;
const ERROR_CODE_401 = 401;
const ERROR_DUPLICATE = 11000;
const RES_OK = 200;
const RES_CREATED = 201;
// eslint-disable-next-line max-len
// const regExpAvatar = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
const regExpURL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/;

module.exports = {
  ERROR_CODE_400,
  ERROR_CODE_500,
  ERROR_CODE_404,
  ERROR_CODE_403,
  ERROR_CODE_401,
  RES_CREATED,
  RES_OK,
  regExpURL,
  ERROR_DUPLICATE,
};
