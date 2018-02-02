export const initStyles = config => {

  const style = document.createElement('style');

  style.innerHTML = `
    .${config.viewSelector} {
      display: none;
    }

    .${config.viewSelector}.${config.activeViewClass} {
      display: block;
    }
  `;

  document.head.appendChild(style);

};
