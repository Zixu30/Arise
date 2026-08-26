ARISEE — GitHub Pages

Upload the CONTENTS of this folder to the ROOT of your GitHub repository.
Keep these paths exactly:
index.html
css/styles.css
js/app.js

No React, Vite, npm, Node, external CDN build step, or server is required.
GitHub Pages can serve this directly as a static site.

Flow: user picks a pack, enters UID, taps Continue -> WhatsApp opens with
the order (ID, UID, package, amount) pre-filled. You reply with the QR
code and confirm the order yourself in the chat.

Note: this version loads two Google Fonts (Rajdhani + Manrope) via a
standard <link> tag in index.html — that's just a font request made by
the visitor's browser, not a build step, so it works fine on GitHub Pages.
