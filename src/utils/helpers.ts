export function getNWords(str: string, numberOfWords: number) {
  const res = str.split(' ').reduce((acc, cur, i) => {
    // Enter the length of words to display like here    : 9
    if (cur !== ' ' && i < numberOfWords) {
      return (acc = acc + ' ' + cur);
    }
    return acc;
  }, '');

  return res + '...';
}
