import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";
import { SearchCard } from "./SearchCard.js";

export async function Router() {
  let { hash } = location;
  let $main = document.getElementById("main");

  $main.innerHTML = null;

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        let html = "";
        posts.forEach((post) => (html += PostCard(post)));
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");

    if (!query) {
      document.querySelector(".loader").style.display = "none";
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        console.log(search);
        let html = "";
        if (search.length === 0) {
          html = `
            <p class="error">
                There are no result for the keyword <mark>${query}</mark>
            </p>
          `;
        } else {
          search.forEach((post) => (html += SearchCard(post)));
        }
        $main.innerHTML = html;
      },
    });
  } else {
    $main.innerHTML = "<h2>Content</h2>";
    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
      cbSuccess: (post) => {
        $main.innerHTML = Post(post);
      },
    });
  }
  document.querySelector(".loader").style.display = "none";
}
