export const onClickRefresh = function () {
  window.location.reload();
};

export function copyToClipboard(text, callback) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      callback();
    })
    .catch((err) => {
      console.error(err.message);
    });
}
