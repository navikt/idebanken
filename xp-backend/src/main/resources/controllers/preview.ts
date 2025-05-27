import type { Response } from '/index.d';
import { getContent, imageUrl, assetUrl } from '/lib/xp/portal';
// @ts-expect-error no-types
import { render } from '/lib/thymeleaf';

export function get(): Response {
    const content = getContent();
    const photoId = (Array.isArray(content.data.photos)) ? content.data.photos[0] : content.data.photos;
    const view = resolve('preview.html');
    const model = {
      cssUrl: assetUrl({path: 'styles/styles.css'}),
      displayName: (content.displayName) ? content.displayName : null,
      imageUrl: (photoId) ?
        imageUrl({
          id: photoId,
          scale: "width(500)"
        }) :
        null
    };

   return {
    body: render(view, model),
   }
};
