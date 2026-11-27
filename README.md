# Upsell KITMEGA

Página estática (HTML + CSS + JS, sem build).

- `index.html` → upsell KITMEGA + R$ 19,90 (Cakto rkxs8ph)
- `desconto.html` → downsell + R$ 14,90 (Cakto j3vubdv_1336785), aparece para quem recusa
- `obrigado.html` → para quem recusa as duas ofertas
- Links de checkout e pixel: topo do `app.js`. Os UTMs da URL são repassados ao checkout.

Configure na Cakto/Wiapy o redirecionamento pós-compra do Guia para a URL publicada do `index.html`.
