/**
 * GNN QuickSupport (GNNQS) - Otomatik İndirme ve Yönetim Betiği
 */

// ==========================================
// 1. YAPILANDIRMA (CONFIG)
// ==========================================
const CONFIG = {
  // Cloudflare R2 üzerindeki GNNQS.exe doğrudan indirme bağlantınız.
  // R2 Özel Alan Adı (Custom Domain) veya R2 Public dev URL'si:
  // Örn: 'https://dl.gnn.tr/GNNQS.exe' veya 'https://pub-xxxxxxxxxx.r2.dev/GNNQS.exe'
  downloadUrl: 'https://dl.gnn.tr/GNNQS.exe',

  // İndirilecek dosya adı
  fileName: 'GNNQS.exe',

  // Otomatik indirme bekleme süresi (Milisaniye cinsinden - 2000ms = 2 sn)
  delayMs: 2000,
};

// ==========================================
// 2. DOM ELEMENTLERİ
// ==========================================
const countdownNumberEl = document.getElementById('countdownNumber');
const progressBarEl = document.getElementById('progressBar');
const statusMessageEl = document.getElementById('statusMessage');
const manualDownloadBtn = document.getElementById('manualDownloadBtn');
const downloadIconBox = document.getElementById('downloadIconBox');
const currentYearEl = document.getElementById('currentYear');

// Yılı dinamik güncelle
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Buton linkini ve dosya adını ata
if (manualDownloadBtn) {
  manualDownloadBtn.href = CONFIG.downloadUrl;
  manualDownloadBtn.setAttribute('download', CONFIG.fileName);
}

// ==========================================
// 3. İNDİRME TETİKLEME FONKSİYONU
// ==========================================
let hasDownloaded = false;

function triggerDownload() {
  if (hasDownloaded) return;
  hasDownloaded = true;

  // Görünmez bir <a> bağlantısı ile güvenli indirme başlat
  const downloadLink = document.createElement('a');
  downloadLink.href = CONFIG.downloadUrl;
  downloadLink.setAttribute('download', CONFIG.fileName);
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  // Arayüz durumunu güncelle
  if (statusMessageEl) {
    statusMessageEl.innerHTML = '<span style="color: #10b981; font-weight: 600;">✓ İndirme başarıyla başlatıldı!</span> Dosyanız tarayıcınızın indirilenler klasörüne kaydediliyor.';
  }

  if (downloadIconBox) {
    downloadIconBox.style.borderColor = 'rgba(16, 185, 129, 0.6)';
    downloadIconBox.style.color = '#34d399';
    downloadIconBox.innerHTML = `
      <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    `;
  }
}

// ==========================================
// 4. GERİ SAYIM & PROGRESS BAR DÖNGÜSÜ
// ==========================================
const startTime = Date.now();
const totalDuration = CONFIG.delayMs;

// URL parametresinde direkt indirme istenmişse (?direct=1 veya ?dl=1) beklemeden başlat
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('direct') === '1' || urlParams.get('dl') === '1') {
  triggerDownload();
} else {
  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / totalDuration) * 100, 100);

    // Progress bar güncellemesi
    if (progressBarEl) {
      progressBarEl.style.width = `${progress}%`;
    }

    // Kalan saniye güncellemesi
    const remainingSeconds = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
    if (countdownNumberEl) {
      countdownNumberEl.textContent = remainingSeconds;
    }

    // Süre dolduğunda
    if (elapsed >= totalDuration) {
      clearInterval(timer);
      triggerDownload();
    }
  }, 50);
}

// Kullanıcı butona elle basarsa
if (manualDownloadBtn) {
  manualDownloadBtn.addEventListener('click', () => {
    triggerDownload();
  });
}
