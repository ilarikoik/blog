import { newPost } from "../interfaces/postInterface.tsx";

// tulee stringinä eli ei toimi tällei.. joko time objektille Datena ja sitte näytettäessä se pestää funktioläpi tai jotai muuta
export default function SortPostByDateNewest(items: newPost[]): newPost[] {
  return items.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );
}
