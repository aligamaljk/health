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

export function formatDateEng(isoString: string) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-Uk').format(date);
}

export function formatDateAr(isoString: string) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('ar-EG').format(date);
}
