function triangle(row){
  const n = row.length - 1, dig = [];
  let val = n, power = 1;

  while (val > 0) dig.push([val % 3, power]) && (val = Math.floor(val / 3)) && (power *= 3);

  let res = 0;

  /*
   * Lucas theorem: C(n, k) mod 3 is product of C(n_i, k_i) mod 3
   * where n_i and k_i are the base-3 dig
   */
  function chk(digIdx, rowIdx, cx){
    if (digIdx === dig.length){
      res = (res + cx * (row.charCodeAt(rowIdx) === 82 ? 0 : row.charCodeAt(rowIdx) === 71 ? 1 : 2)) % 3;
      return;
    }

    const [d, p] = dig[digIdx];
    chk(digIdx + 1, rowIdx, cx);

    if (d === 1) chk(digIdx + 1, rowIdx + p, cx);
    else if (d) chk(digIdx + 1, rowIdx + p, (cx * 2) % 3) || chk(digIdx + 1, rowIdx + 2 * p, cx);
  }

  chk(0, 0, 1);
  if (n % 2 === 1) res = (3 - res) % 3;

  return "RGB"[res];
}
