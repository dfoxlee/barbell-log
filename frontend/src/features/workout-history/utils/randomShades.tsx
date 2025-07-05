export const randomShades = (hex: string) => {
   const amt = Math.floor(Math.random() * 40) - 20;

   const col = parseInt(hex.slice(1), 16);

   let r = (col >> 16) + amt;
   let g = ((col >> 8) & 0xff) + amt;
   let b = (col & 0xff) + amt;

   r = Math.max(Math.min(255, r), 0);
   g = Math.max(Math.min(255, g), 0);
   b = Math.max(Math.min(255, b), 0);

   return `rgb(${r},${g},${b})`;
};
