export function PostCard(props) {
  let { date, id, slug, title, _embedded } = props;
  let dateHumanFormat = new Date(date).toDateString();
  let urlImage = _embedded["wp:featuredmedia"]
    ? _embedded["wp:featuredmedia"][0].source_url
    : "app/assets/favicon.png";

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".post-card a")) return false;

    localStorage.setItem("wpPostId", e.target.dataset.id);
  });

  return `
    <article class="post-card">
      <img src="${urlImage}" alt="${title.rendered}">
        <h2>${title.rendered}</h2>
          <p> 
            <time datetime="${date}">${dateHumanFormat}</time>
            <a href="#/${slug}" data-id="${id}">Read more</a>
          </p>
    </article>
  `;
}
