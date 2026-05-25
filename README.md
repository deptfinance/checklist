# Checklist Kerja Administrasi

Website checklist kerja administrasi yang simple, modern, dan rapi seperti Notion mini. Dibuat dengan Next.js App Router, TypeScript, Tailwind CSS, dan penyimpanan `localStorage`.

## Fitur

- Dashboard checklist kerja harian
- Bagian projek untuk mengelompokkan beberapa task
- Tracking per projek dengan progress, selesai, belum selesai, dan terlambat
- Tambah, edit, hapus task
- Centang task selesai atau belum selesai
- Kategori: Administrasi, Keuangan, Dokumen, Follow Up, Lainnya
- Prioritas: Rendah, Sedang, Tinggi
- Deadline tanggal
- Filter: Semua, Hari ini, Belum selesai, Selesai, Prioritas tinggi
- Progress bar persentase pekerjaan selesai
- Ringkasan total task, selesai, belum selesai, dan terlambat
- Reminder task deadline hari ini dan task yang sudah lewat deadline
- Responsive untuk desktop dan mobile

## Struktur Project

```txt
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    FilterBar.tsx
    ProjectSection.tsx
    Sidebar.tsx
    SummaryCards.tsx
    TaskCard.tsx
    TaskDashboard.tsx
    TaskForm.tsx
  lib/
    tasks.ts
```

## Install

Pastikan Node.js sudah terpasang. Next.js 16 membutuhkan Node.js versi modern.

```bash
npm install
```

## Run Lokal

```bash
npm run dev
```

Buka:

```txt
http://localhost:3000
```

## Build Production

```bash
npm run build
npm run start
```

## Push ke GitHub

```bash
git init
git add .
git commit -m "Initial checklist administrasi app"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Jika repository sudah dibuat dari GitHub dan remote sudah ada, cukup jalankan:

```bash
git add .
git commit -m "Update checklist administrasi app"
git push
```

## Deploy ke Vercel

1. Login ke [Vercel](https://vercel.com).
2. Klik **Add New Project**.
3. Import repository GitHub.
4. Framework akan otomatis terdeteksi sebagai **Next.js**.
5. Klik **Deploy**.

Tidak perlu database atau environment variable untuk versi ini karena data tersimpan di browser menggunakan `localStorage`.
