# Cloudflare Pages - GNN Uzaktan Hızlı Destek Portalı

Bu klasör, müşterilerinizin `GNNQS.zip` arşivini doğrudan indirebileceği, 2 saniyede otomatik indirme başlatan ve 3 basit adımda destek alabileceği modern Cloudflare Pages portalını içerir.

## Özellikler
- **Cloudflare R2 Entegrasyonu & Dinamik Ortam Değişkeni:** `/indir`, `/download`, `/GNNQS.zip` ve `/GNNQS.exe` istekleri Cloudflare Pages Functions üzerinden tanımladığınız `DOWNLOAD_URL` ortam değişkenine güvenli bir şekilde yönlendirilir (`302`).
- **Otomatik İndirme Sayacı:** Sayfa açıldıktan 2 saniye sonra indirme otomatik başlar; indirme gerçekleşmezse tek tıkla manuel indirme butonu yer alır.
- **Akıllı Rehberlik & Mockup:** QuickSupport mini istemci penceresi görseli ve Windows SmartScreen ("Ek bilgi -> Yine de çalıştır") yardım akordiyonu yer alır.
- **Yönetici Konsolu Kısayolu:** Sağ üstteki ve en alttaki konsol butonu `/console` üzerinden Cloudflare `CONSOLE_URL` değişkeninizle RustDesk yönetim paneline yönlendirir.
- **Güvenlik Başlıkları:** `_headers` dosyası ile X-Frame-Options ve modern güvenlik kuralları hazır gelir.

## Cloudflare Pages Kurulumu (Git ile)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** bölümüne gidin.
2. Projenizi seçip **Settings > Environment variables** sekmesine gidin.
3. Şu 2 değişkeni tanımlayın:
   - `DOWNLOAD_URL`: Gerçek indirme linkiniz (Örn: `https://dl.gnn.tr/GNNQS.zip`)
   - `CONSOLE_URL`: Sunucu yönetim paneli adresiniz (Örn: `http://<SUNUCU-IP>:21114/`)

Yapılan tüm indirme ve konsol yönlendirmeleri bu değişkenler üzerinden otomatik ve güvenli şekilde çalışır.
