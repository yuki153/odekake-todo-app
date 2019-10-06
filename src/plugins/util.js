export const showAlert = (() => {
  let isShown = false;
  return (text) => {
    if (isShown === false) {
      isShown = true;
      const div = document.createElement('div');
      const textNode = document.createTextNode(text);
      div.setAttribute('style', `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        max-width: 80%;
        text-align: center;
        border-radius: 8px;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 4px 10px -4px rgba(0, 0, 0, .3);
        transition: .3s opacity;
      `);
      div.appendChild(textNode);
      document.body.appendChild(div);
      setTimeout(() => {
        div.style.opacity = 0;
        setTimeout(() => {
          isShown = false;
          document.body.removeChild(div);
        }, 300);
      }, 2000);
    }
  }
})();
