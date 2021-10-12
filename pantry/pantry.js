import { renderFerms, renderNav, renderPlayButton } from '../render-utils.js';
import { fermsTemplate } from '../fermentables-template.js';

renderNav();
// curious why this needs to be passed in. Why not just import it in the same file as the function? Doesn't look like you mutate it, for example
renderFerms(fermsTemplate);
renderPlayButton();


