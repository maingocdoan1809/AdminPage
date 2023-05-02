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
export function toMoney(realNumber: number) {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(realNumber);
}
