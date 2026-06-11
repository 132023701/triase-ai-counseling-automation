# Sistem Otomasi Triase Konseling Sekolah Berbasis AI

Repositori ini memuat seluruh komponen infrastruktur luring untuk sistem triase kedaruratan psikologis siswa menggunakan arsitektur hibrida.

## 🛠️ Komponen Infrastruktur
1. **Google Apps Script**: Penangkap data submisi Google Form publik.
2. **n8n (Docker WSL)**: Komponen orkestrasi alur kerja dan pipa data.
3. **Flask Python (Windows Host)**: Layanan mikro peladen inferensi model AI.
4. **InfluxDB & Grafana (Docker WSL)**: Penyimpanan basis data dan dasbor analitik.

## 🚀 Cara Menjalankan Sistem
1. Pastikan Docker Desktop telah aktif.
2. Jalankan perintah `docker-compose up -d` di dalam folder `docker-infrastructure`.
3. Aktifkan Virtual Environment Python dan jalankan peladen jembatan AI menggunakan perintah `python app.py` di dalam folder `backend-ai`.
4. Pastikan pintu Webhook n8n terhubung dengan Google Apps Script melalui jalur tunneling ngrok yang aktif.
