export const randomString = () => {
  const string = "1234567890abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * string.length);
    result += string[randomIndex];
  }

  return result;
};
