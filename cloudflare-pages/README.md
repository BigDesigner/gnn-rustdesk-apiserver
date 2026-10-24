# Cloudflare Pages - GNN Uzaktan Hızlı Destek Portalı

Müşterilerinizin `GNNQS.zip` arşivini doğrudan indirebileceği, 2 saniyede otomatik indirme başlatan ve 3 basit adımda destek alabileceği modern Cloudflare Pages portalı.

## 🚀 Cloudflare Pages Değişken Ayarı

GitHub'daki public repoda IP adresi veya özel dosya linki bulunmaz. Yönlendirmelerin çalışması için Cloudflare Pages paneline şu 2 değişkeni eklemeniz yeterlidir:

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** bölümüne gidin.
2. Pages projenizi seçip **Settings > Environment variables** sekmesine tıklayın.
3. **Production** ortamına şu iki değişkeni ekleyin:
   - `DOWNLOAD_URL`: Gerçek indirme linkiniz (Örn: `https://dl.gnn.tr/GNNQS.zip`)
   - `CONSOLE_URL`: Sunucu yönetim paneli adresiniz (Örn: `http://<SUNUCU-IP>:21114/`)
4. **Save** butonuna basarak kaydedin.

## 📡 Dinamik Yönlendirmeler (Pages Functions)

Tüm yönlendirmeler `functions/` klasöründeki Cloudflare Functions tarafından yukarıdaki değişkenler okunarak güvenli bir şekilde yapılır:
- `/download`, `/indir`, `/GNNQS.zip`: `DOWNLOAD_URL` hedefine yönlendirir (`302`).
- `/console`, `/panel`: `CONSOLE_URL` hedefine yönlendirir (`302`).
