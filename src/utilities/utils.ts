export function checkPassword(password: string) {
  const numberPtn = new RegExp("[0-9]");
  const charPtn = new RegExp("[A-Za-z]");
  const specialCharPtn = new RegExp("\\W");

  return (
    numberPtn.test(password) &&
    charPtn.test(password) &&
    specialCharPtn.test(password)
  );
}
export function checkEmail(email: string) {
  const patterncheck = new RegExp("^\\w+@\\w+\\.(com|edu\\.vn|vn|gov)$");
  return patterncheck.test(email);
}
export function checkPhonenumber(phonenumber: string) {
  const patterncheck = new RegExp("^([0-9]{10,11})|(\\+(84)[0-9]{9,10})$");
  return patterncheck.test(phonenumber);
}
export function toMoney(realNumber: number) {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(realNumber);
}
