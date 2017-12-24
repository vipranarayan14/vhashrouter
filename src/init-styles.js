import {activeHashClass, navPageSelector} from './literals';

export const initStyles = () => {
  const style = document.createElement('style');

  style.innerHTML = `
    .${navPageSelector} {
      display: none;
    }

    .${navPageSelector}.${activeHashClass} {
      display: block;
    }
  `;

  document.head.appendChild(style);
};
