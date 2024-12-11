import { newPost } from "../interfaces/postInterface.tsx";

// tulee stringinä eli ei toimi tällei.. joko time objektille Datena ja sitte näytettäessä se pestää funktioläpi tai jotai muuta
export default function SortPostByDate(items: newPost[]): newPost[] {
  return items.sort((a, b) => parseInt(a.time) - parseInt(b.time));
}
