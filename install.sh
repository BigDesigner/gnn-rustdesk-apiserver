#!/bin/bash
set -e

# GNN RustDesk API Server Kurulum & Güncelleme Scripti (Ubuntu / Debian)

INSTALL_DIR="/opt/rustdesk-api"
SERVICE_FILE="gnn-rustdesk-api.service"

echo "=== GNN RustDesk API Server Kurulum / Güncelleme Başlatılıyor ==="

# 1. Kurulum dizinini oluştur
mkdir -p "$INSTALL_DIR"

# 2. data.json rehber yedeğini al ve koru (Mevcut rehber asla silinmez)
if [ -f "$INSTALL_DIR/data.json" ]; then
    cp "$INSTALL_DIR/data.json" "$INSTALL_DIR/data.json.bak"
    echo "[GÜVENLİK] Mevcut rehberin otomatik yedeği alındı: $INSTALL_DIR/data.json.bak"
    echo "[BİLGİ] Mevcut rehber kayıtları (cihazlar ve etiketler) aynen korunuyor."
else
    if [ -f "data.json.example" ]; then
        cp data.json.example "$INSTALL_DIR/data.json"
    else
        echo '{"tags": ["Genel", "GNN"], "peers": []}' > "$INSTALL_DIR/data.json"
    fi
    chmod 644 "$INSTALL_DIR/data.json"
    echo "[BİLGİ] Yeni $INSTALL_DIR/data.json rehber dosyası oluşturuldu."
fi

# 3. .env dosyasını kontrol et ve eski şifreleri koru
if [ ! -f "$INSTALL_DIR/.env" ]; then
    echo "[BİLGİ] Yeni .env yapılandırma dosyası hazırlanıyor..."
    # Eğer eski systemd servis dosyasında kullanıcı adı/şifre varsa otomatik .env içine aktar
    if [ -f "/etc/systemd/system/rustdesk-api.service" ]; then
        OLD_USER=$(grep -oP 'Environment=RUSTDESK_API_USER=\K.*' /etc/systemd/system/rustdesk-api.service || echo "admin")
        OLD_PASS=$(grep -oP 'Environment=RUSTDESK_API_PASS=\K.*' /etc/systemd/system/rustdesk-api.service || echo "admin123")
        cat <<EOF > "$INSTALL_DIR/.env"
# GNN RustDesk Ortam Değişkenleri (Otomatik Aktarıldı)
RUSTDESK_API_USER=${OLD_USER:-admin}
RUSTDESK_API_PASS=${OLD_PASS:-admin123}
RUSTDESK_API_PORT=21114
RUSTDESK_API_DIR=/opt/rustdesk-api
EOF
        echo "[BAŞARILI] Mevcut kullanıcı adı ve şifreniz otomatik olarak $INSTALL_DIR/.env içine aktarıldı."
    elif [ -f ".env.example" ]; then
        cp .env.example "$INSTALL_DIR/.env"
    fi
    chmod 600 "$INSTALL_DIR/.env" 2>/dev/null || true
else
    echo "[BİLGİ] Mevcut $INSTALL_DIR/.env yapılandırması korundu (üzerine yazılmadı)."
fi

# 4. Program dosyalarını güncelle
cp server.py "$INSTALL_DIR/"
cp icon.png "$INSTALL_DIR/" 2>/dev/null || true
chmod +x "$INSTALL_DIR/server.py"

# 5. Systemd servisini kur ve yeniden başlat
cp "$SERVICE_FILE" /etc/systemd/system/rustdesk-api.service
systemctl daemon-reload
systemctl enable rustdesk-api
systemctl restart rustdesk-api

echo "=== Kurulum / Güncelleme Başarıyla Tamamlandı ==="
systemctl status rustdesk-api --no-pager
