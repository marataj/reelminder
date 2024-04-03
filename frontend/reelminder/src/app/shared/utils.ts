export function createErrorMessage(error: any) {
  const keys = Object.keys(error.error);
  let err_msg = `Error:\n\n`;
  keys.forEach((k) => {
    err_msg += `${k.toUpperCase()}: ${error.error[k][0]}\n`;
  });
  return err_msg;
}
