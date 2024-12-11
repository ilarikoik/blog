interface newPost {
  postId: string;
  title: string;
  school: string;
  post: string;
  time: string;
}
// pitää etukäteen märitellä mitä se ottaa vastaan ja mitä palauttaa kans
export default function filterBySchool(
  koulu: string,
  postaukset: newPost[] // Tämä viittaa siihen, että postaukset on taulukko, jossa on Postaus-objekteja
): newPost[] {
  // Funktio palauttaa taulukon, joka sisältää Postaus-objekteja
  let filtered = postaukset.filter(
    (item) => koulu.trim().toLowerCase() === item.school.trim().toLowerCase()
  );
  return filtered || [];
}
