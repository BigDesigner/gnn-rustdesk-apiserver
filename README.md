# GNN RustDesk API Server & GnnDesk Console

RustDesk için harici bağımlılık gerektirmeyen (zero-dependency, saf Python 3), ~3-15 MB bellek (RAM) tüketen hafif **Adres Defteri (Address Book) / Doğrulama API Sunucusu** ve **GnnDesk Console Web Yönetim Paneli**.

---

## 🚀 Özellikler

- **RustDesk Client Desteği:**
  - Mobil ve masaüstü RustDesk istemcilerinin kullanıcı adı / şifre ile giriş yapabilmesi (`/api/login`, `/api/login-options`, `/api/currentUser`).
  - Adres defteri (Rehber) cihaz senkronizasyonu (`/api/ab`).
  - İstemcideki etiket ve renk ayarlarının (`tag_colors`) tam uyumlu saklanması.
  - RustDesk Server PR #706 ile tam uyumlu anahtar doğrulama akışı.
- **GnnDesk Console Web Arayüzü:**
  - Koyu temalı (dark mode), modern yönetim paneli (`http://<SUNUCU-IP>:21114`).
  - Cihazları listeleme, ekleme, düzenleme ve silme.
  - Renkli etiket (Tag) hapları ile tek tıkla filtreleme ve etiket yönetimi.
  - ID ve cihaz adına göre anlık hızlı arama.
  - **CSV İçe & Dışa Aktarma:** Tek tıkla rehberi Excel uyumlu CSV (`ID,Device,Password,Tags,Note`) olarak indirme veya topluca içe aktarma.
  - Sunucu servis durumu takibi (`hbbs`, `hbbr`, `API`).
- **Sıfır Yük & Yüksek Performans:**
  - Node.js, Docker, Nginx, veritabanı veya pip paketi gerektirmez.
  - Sadece Python 3 standart kütüphanesini (`http.server`, `json`, `threading`) kullanır.
  - RAM tüketimi: **~3-15 MB**.
- **İzole & Güvenli Yapılandırma (`.env`):**
  - Sunucu şifreleri, IP bilgileri ve rehber kayıtları Git deposuna girmez (`.gitignore`).
  - `git pull` yapıldığında veya güncellemelerde sunucudaki şifreniz ve kayıtlı cihazlarınız asla ezilmez.

---

## 📁 Proje Dosya Yapısı

```text
gnn-rustdesk-apiserver/
├── server.py                 # Ana API ve Web Sunucusu kodu (saf Python 3)
├── icon.png                  # GNN Destek logo görseli
├── .env.example              # Ortam değişkenleri ve kimlik bilgisi şablonu
├── data.json.example         # Örnek rehber ve cihaz veri dosyası
├── gnn-rustdesk-api.service  # Systemd servis tanım dosyası
├── install.sh                # Otomatik kurulum ve güncelleme scripti (Ubuntu/Debian)
├── cloudflare-pages/         # Cloudflare Pages müşteri indirme & destek portalı
├── .gitignore
└── README.md
```

---

## 🛠️ Kurulum ve Dağıtım

### Yöntem 1: Tek Komutla Otomatik Kurulum (Ubuntu / Debian)

Depoyu sunucunuza çektikten sonra:

```bash
chmod +x install.sh
sudo ./install.sh
```

Kurulum tamamlandıktan sonra `/opt/rustdesk-api/.env` dosyasını düzenleyerek kendi güçlü şifrenizi belirleyin:
```bash
sudo nano /opt/rustdesk-api/.env
sudo systemctl restart rustdesk-api
```

### Yöntem 2: Manuel Kurulum

1. Dizin oluşturun ve dosyaları yerleştirin:
```bash
sudo mkdir -p /opt/rustdesk-api
sudo cp server.py /opt/rustdesk-api/
sudo cp icon.png /opt/rustdesk-api/
sudo cp .env.example /opt/rustdesk-api/.env
sudo cp data.json.example /opt/rustdesk-api/data.json
sudo chmod +x /opt/rustdesk-api/server.py
sudo chmod 600 /opt/rustdesk-api/.env
```

2. Systemd servisini kurun ve başlatın:
```bash
sudo cp gnn-rustdesk-api.service /etc/systemd/system/rustdesk-api.service
sudo systemctl daemon-reload
sudo systemctl enable rustdesk-api
sudo systemctl start rustdesk-api
```

---

## 🔄 Güncelleme Yapma (Şifre & Rehber Kaybı Olmadan)

Projeye GitHub üzerinden yeni bir güncelleme geldiğinde sunucuda tek yapmanız gereken:

```bash
cd /opt/rustdesk-api-repo # veya repoyu klonladığınız dizin
git pull
sudo ./install.sh
```

> [!NOTE]
> `install.sh` scripti sunucudaki `/opt/rustdesk-api/.env` ve `/opt/rustdesk-api/data.json` dosyalarını tespit eder ve asla üzerlerine yazmaz. Şifreniz ve tüm kayıtlı cihazlarınız aynen korunur.

---

## ⚙️ Yapılandırma ve Çevresel Değişkenler (`.env`)

Aşağıdaki ayarlar `/opt/rustdesk-api/.env` dosyası üzerinden yapılandırılabilir:

| Değişken | Varsayılan Değer | Açıklama |
| :--- | :--- | :--- |
| `RUSTDESK_API_DIR` | `/opt/rustdesk-api` | Veri ve logo dosyalarının bulunduğu dizin |
| `RUSTDESK_API_PORT` | `21114` | API ve Web Konsolu dinleme portu |
| `RUSTDESK_API_USER` | `admin` | Web Konsolu ve RustDesk API kullanıcı adı |
| `RUSTDESK_API_PASS` | `admin123` | Giriş şifresi (ilk kurulumda mutlaka değiştiriniz) |
| `RUSTDESK_SERVER_HOST` | `rustdesk.example.com` | RustDesk ID / Relay sunucusu adresi (IP veya Domain) |
| `RUSTDESK_SERVER_KEY` | *(boş)* | RustDesk sunucu açık anahtarı (public key) |
| `RUSTDESK_API_URL` | `http://rustdesk.example.com:21114` | RustDesk API adresi |
| `RUSTDESK_PRESET_PWD` | *(boş)* | Özel istemci için kalıcı bağlantı şifresi |

---

## 📡 API Endpoint Listesi

### RustDesk İstemci İstekleri
- `GET /api/login-options`: Kimlik doğrulama tipi (`account`).
- `POST /api/login`: RustDesk hesaba giriş ve Bearer token üretimi.
- `GET /api/currentUser`: Aktif kullanıcı profili ve yetki bilgisi.
- `GET /api/ab`: Adres defteri (rehber) verisini JSON formatında çeker.
- `POST /api/ab`: RustDesk istemcisinden gelen rehber değişikliklerini kaydeder.
- `GET /healthz`: Basit servis canlılık kontrolü.

### Web Yönetim & İndirme
- `GET /`: Oturum yoksa login sayfasına, varsa panele yönlendirir.
- `GET /dashboard`: GnnDesk Console ana yönetim arayüzü.
- `POST /web/login`: Web paneli oturum açma.
- `GET /logout`: Web oturumunu sonlandırma.
- `POST /web/peer/add`: Yeni cihaz kaydı ekleme.
- `POST /web/peer/edit`: Kayıtlı cihaz adı, etiket veya notunu güncelleme.
- `POST /web/peer/delete`: Cihaz silme.
- `POST /web/tag/add`: Yeni etiket oluşturma.
- `POST /web/tag/delete`: Etiket silme.
- `GET /web/export/csv`: Rehberi Excel uyumlu CSV formatında dışa aktarma (`ID,Device,Password,Tags,Note`).
- `POST /web/import/csv`: CSV dosyası veya metni ile toplu cihaz içe aktarma (merge/replace).
- `GET /logo.png`: GNN logosu görseli (önbellekli).
- `GET /download/GNNQS.exe`: Windows QuickSupport istemcisini sunucudan indirme (dosya sunucudaysa).
