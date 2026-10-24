# Cloudflare Pages - GNN Uzaktan Hızlı Destek Portalı

Bu klasör, müşterilerinizin `GNNQS.exe` uygulamasını doğrudan indirebileceği, 2 saniyede otomatik indirme başlatan ve 3 basit adımda destek alabileceği modern Cloudflare Pages portalını içerir.

## Özellikler
- **Cloudflare R2 Entegrasyonu:** `/indir`, `/download` ve `/GNNQS.exe` istekleri `_redirects` dosyası üzerinden doğrudan Cloudflare R2 CDN (`https://dl.gnn.tr/GNNQS.exe`) bağlantısına yönlendirilir (`302`).
- **Otomatik İndirme Sayacı:** Sayfa açıldıktan 2 saniye sonra indirme otomatik başlar; indirme gerçekleşmezse tek tıkla manuel indirme butonu yer alır.
- **Akıllı Rehberlik & Mockup:** QuickSupport mini istemci penceresi görseli ve Windows SmartScreen ("Ek bilgi -> Yine de çalıştır") yardım akordiyonu yer alır.
- **Yönetici Konsolu Kısayolu:** Sağ üstteki ve en alttaki konsol butonu `/console` üzerinden RustDesk yönetim paneline (`GnnDesk Console`) yönlendirir.
- **Güvenlik Başlıkları:** `_headers` dosyası ile X-Frame-Options ve modern güvenlik kuralları hazır gelir.

## Cloudflare Pages Kurulumu (Git ile)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** bölümüne gidin.
2. **Create application** > **Pages** > **Connect to Git** seçeneğini tıklayın.
3. Bu depoyu (`gnn-rustdesk-apiserver`) seçin.
4. Yapılandırma ayarlarında:
   - **Framework preset:** `None`
   - **Build command:** *(Boş bırakın)*
   - **Build output directory:** `cloudflare-pages`
5. **Save and Deploy** butonuna basın.

Siteniz saniyeler içinde `https://<proje-adi>.pages.dev` adresiyle yayına girecektir.

## Yönlendirme (Redirect) Ayarları (`_redirects`)

```
# Cloudflare R2 İndirme Yönlendirmeleri
/indir      https://dl.gnn.tr/GNNQS.exe 302
/download   https://dl.gnn.tr/GNNQS.exe 302
/GNNQS.exe  https://dl.gnn.tr/GNNQS.exe 302
/gnnqs.exe  https://dl.gnn.tr/GNNQS.exe 302
/GNNQS.zip  https://dl.gnn.tr/GNNQS.zip 302
/gnnqs.zip  https://dl.gnn.tr/GNNQS.zip 302

# RustDesk Yönetim Konsolu Kısayolları (Kendi sunucu adresinizi yazınız)
/console    http://rustdesk.example.com:21114/ 302
/panel      http://rustdesk.example.com:21114/ 302
```
