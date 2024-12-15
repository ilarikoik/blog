export interface newPost {
  postId: string;
  posterUid: string;
  title: string;
  school: string;
  post: string;
  time: string;
  answers: Answer[];
}

// tyhjä taulukko vastauksia varten
// taulukkoon tulee objekti jossa on --> uid, käyttäjänimi, title, postaus, aika
export interface Answer {
  uid: string; // Vastaajan käyttäjän ID
  username: string; // Vastaajan käyttäjänimi
  title: string; // Vastauksen otsikko
  post: string; // Vastauksen sisältö
  time: string; // Vastauksen aikaleima
}
