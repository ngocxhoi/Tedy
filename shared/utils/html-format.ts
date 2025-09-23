export default (html: string) => {
  if (html.startsWith("```html") && html.endsWith("```")) {
    return html.slice(7, -3).trim();
  }
  return html;
};
