function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');
  btn.addEventListener('click', () => {
    if (!text.hidden) {
      text.hidden = !text.hidden;
    } else {
      text.hidden = !text.hidden;
    }
  });
}