interface Postaus {
  postId: number;
  koulu: string;
  title: string;
  postaus: string;
}
// pitää etukäteen märitellä mitä se ottaa vastaan ja mitä palauttaa kans
export default function filterBySchool(
  koulu: string,
  postaukset: Postaus[] // Tämä viittaa siihen, että postaukset on taulukko, jossa on Postaus-objekteja
): Postaus[] {
  // Funktio palauttaa taulukon, joka sisältää Postaus-objekteja
  let filtered = postaukset.filter(
    (item) => koulu.trim().toLowerCase() === item.koulu.trim().toLowerCase()
  );
  return filtered;
}
