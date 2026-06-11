from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

print("==================================================")
print("Memuat komponen AI (Model, Vectorizer, Encoder)...")
try:
    vectorizer = joblib.load('vectorizer.pkl')
    model = joblib.load('model_konseling.pkl')
    encoder = joblib.load('label_encoder.pkl')
    print("[SUKSES] Jembatan AI siap menerima data dari n8n!")
    print("==================================================")
except Exception as e:
    print(f"[GAGAL FATAL] Pastikan 3 file .pkl ada di folder ini.")
    print(f"Detail Eror: {e}")

@app.route('/prediksi', methods=['POST'])
def prediksi():
    try:
        # Menerima paket data JSON dari n8n
        data = request.json
        teks_masuk = data.get('statement', '')
        
        # Validasi keamanan jika n8n mengirim data kosong
        if not teks_masuk:
            return jsonify({'error': 'Teks pengaduan kosong atau tidak ditemukan'}), 400
            
        # Alur Eksekusi AI: Ekstraksi -> Prediksi -> Terjemahan Label
        teks_vektor = vectorizer.transform([teks_masuk])
        angka_prediksi = model.predict(teks_vektor)
        teks_prediksi = encoder.inverse_transform(angka_prediksi)
        
        # Mengembalikan paket data jawaban ke n8n
        return jsonify({
            'teks_asli': teks_masuk,
            'status_psikologis': teks_prediksi[0]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Berjalan di port 5005 agar aman dari blokir Windows
    app.run(host='0.0.0.0', port=5005)
