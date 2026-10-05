/** Částka v Kč s nezlomitelnými mezerami: 26600 → „26 600 Kč". */
export function kc(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '− ' : '';
  return `${sign}${String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Kč`;
}
