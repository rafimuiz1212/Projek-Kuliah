import { Database, Server, Monitor, ShieldCheck, MapPin } from "lucide-react";

export default function TechStackGuide() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-600 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold font-sans text-slate-800 flex items-center gap-2">
          <ShieldCheck className="text-emerald-500 w-5.5 h-5.5" />
          Rekomendasi Tech Stack Produksi
        </h3>
        <p className="text-slate-500 text-xs mt-1">
          Arsitektur skala industri untuk mengelola koordinat ODP & pengecekan jangkauan presisi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Database Layer */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <Database className="w-4.5 h-4.5" />
            <h4 className="font-bold text-slate-800 text-xs">1. Geospatial DB</h4>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Untuk data koordinat geografis presisi, database relasional dengan ekstensi spasial adalah standar industri terbaik.
          </p>
          <div className="space-y-1.5 pt-1 text-[11px]">
            <div className="bg-white p-2 rounded border border-slate-200/80">
              <span className="font-bold text-emerald-600 block">PostgreSQL + PostGIS</span>
              Paling direkomendasikan. Menyediakan kueri spasial super cepat menggunakan indeks GiST.
            </div>
            <div className="bg-white p-2 rounded border border-slate-200/80 text-slate-500">
              <span className="font-bold text-slate-700 block">MySQL Spatial / MongoDB</span>
              Alternatif yang memadai jika sudah menggunakan stack non-Postgres.
            </div>
          </div>
        </div>

        {/* Backend Layer */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
          <div className="flex items-center gap-2 text-blue-600">
            <Server className="w-4.5 h-4.5" />
            <h4 className="font-bold text-slate-800 text-xs">2. Backend API</h4>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Menerima koordinat dari user, melakukan sanitasi data, kueri database, dan memproses status port.
          </p>
          <div className="space-y-1.5 pt-1 text-[11px]">
            <div className="bg-white p-2 rounded border border-slate-200/80">
              <span className="font-bold text-blue-600 block">Node.js Express / NestJS</span>
              Performa I/O asinkronus yang sangat tinggi, ekosistem library melimpah, dan mudah di-deploy di Cloud Run.
            </div>
            <div className="bg-white p-2 rounded border border-slate-200/80 text-slate-500">
              <span className="font-bold text-slate-700 block">Python FastAPI / Django</span>
              Pilihan tepat jika tim Anda lebih familiar dengan ekosistem Python atau integrasi AI/Sains Data.
            </div>
          </div>
        </div>

        {/* Frontend Layer */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
          <div className="flex items-center gap-2 text-pink-600">
            <Monitor className="w-4.5 h-4.5" />
            <h4 className="font-bold text-slate-800 text-xs">3. Frontend Web</h4>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Menyajikan antarmuka interaktif, peta interaktif untuk menjatuhkan pin, dan visualisasi rute garis jangkauan.
          </p>
          <div className="space-y-1.5 pt-1 text-[11px]">
            <div className="bg-white p-2 rounded border border-slate-200/80">
              <span className="font-bold text-pink-600 block">React.js + Tailwind CSS</span>
              Membangun UI reaktif dengan cepat. Gaya kustom dapat diatur dengan mudah menggunakan utilitas Tailwind.
            </div>
            <div className="bg-white p-2 rounded border border-slate-200/80 text-slate-500">
              <span className="font-bold text-slate-700 block">Leaflet.js + OpenStreetMap</span>
              Library peta interaktif open-source yang sangat ringan, bebas API key, dan cepat dimuat tanpa biaya platform.
            </div>
          </div>
        </div>
      </div>

      {/* SQL Query Example */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 font-mono">
        <div className="flex items-center justify-between text-[11px] border-b border-slate-200 pb-2">
          <span className="text-blue-600 font-bold flex items-center gap-1.5">
            <Database className="w-4 h-4" /> SQL QUERY PRODUKSI (PostgreSQL + PostGIS)
          </span>
          <span className="text-slate-400">Kueri Jarak & Radius 300m</span>
        </div>
        <pre className="text-[10px] leading-relaxed text-slate-700 overflow-x-auto whitespace-pre p-2 bg-white rounded border border-slate-200/60">
{`-- Mencari ODP terdekat dalam radius 300 meter menggunakan PostGIS
SELECT 
  id, 
  name, 
  available_ports, 
  -- Hitung jarak riil (meter) menggunakan Geografi
  ST_Distance(
    geom, 
    ST_SetSRID(ST_MakePoint(user_longitude, user_latitude), 4326)::geography
  ) AS distance_meters
FROM odps
-- Filter radius maksimal 300 meter untuk efisiensi kueri
WHERE ST_DWithin(
  geom, 
  ST_SetSRID(ST_MakePoint(user_longitude, user_latitude), 4326)::geography, 
  300
)
ORDER BY distance_meters ASC
LIMIT 1;`}
        </pre>
      </div>

      {/* Haversine Formula Reference */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
        <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
          <MapPin className="w-4 h-4 text-emerald-500" /> Catatan Rumus Haversine (Alternatif Tanpa Database Spasial)
        </h4>
        <p className="text-slate-500 leading-relaxed text-[11px]">
          Jika database Anda tidak mendukung fungsi geospatial bawaan, hitung di tingkat backend server atau di kueri manual menggunakan formula trigonometri Haversine:
        </p>
        <code className="block p-2 bg-white border border-slate-200 rounded text-[11px] text-blue-600 overflow-x-auto">
          d = 2 * R * arcsin(sqrt(sin²(Δφ/2) + cos(φ1) * cos(φ2) * sin²(Δλ/2)))
        </code>
        <p className="text-slate-400 leading-relaxed text-[10px]">
          *Di mana R adalah jari-jari bumi (6.371.000 meter), φ adalah lintang (latitude), dan λ adalah bujur (longitude) dalam radian. Formula ini telah kami implementasikan secara lengkap di backend Express (`server.ts`) aplikasi ini!
        </p>
      </div>
    </div>
  );
}
