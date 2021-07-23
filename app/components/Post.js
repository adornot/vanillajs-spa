export function Post(props) {
  let { title, date, content } = props;
  let dateHumanFormat = new Date(date).toLocaleString();
  return `
    <section class="post-page">
      <aside>
        <h2>${title.rendered}</h2>
        <time datetime="${date}">${dateHumanFormat}</time>
      </aside>
      <hr>
        <article>${content.rendered}</article>
    </section>
  `;
}
