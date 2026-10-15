import { PALETTE_COOKIE, palettes } from './palettes'

const slugs = JSON.stringify(palettes.map((palette) => palette.slug))

/**
 * Runs before the page is drawn, so there is no flash of the original orange:
 * reads ?palette=… (and remembers it in a session cookie) or the cookie from an
 * earlier page, then sets <html data-palette="…">. Pages stay static: the server
 * never reads the cookie.
 */
const script = `(function(){try{
var allowed=${slugs},root=document.documentElement;
var asked=new URLSearchParams(location.search).get('palette');
var saved=(document.cookie.match(/(?:^|; )${PALETTE_COOKIE}=([a-z-]+)/)||[])[1];
if(asked!==null){document.cookie=allowed.indexOf(asked)>-1?'${PALETTE_COOKIE}='+asked+'; path=/; SameSite=Lax':'${PALETTE_COOKIE}=; path=/; max-age=0; SameSite=Lax';}
var palette=asked!==null?asked:saved;
if(allowed.indexOf(palette)>-1)root.setAttribute('data-palette',palette);
}catch(e){}})();`

export function PaletteScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
