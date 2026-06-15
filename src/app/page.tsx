import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChartNoAxesCombined,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    title: "Bidang Investasi",
    description:
      "Pendekatan investasi yang terarah untuk membantu klien mengoptimalkan potensi aset dan peluang pertumbuhan.",
    icon: TrendingUp,
  },
  {
    title: "Manajemen Portofolio",
    description:
      "Pengelolaan portofolio dengan perhatian pada tujuan, profil risiko, dan keberlanjutan nilai aset.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Pengelolaan Aset Keuangan",
    description:
      "Layanan pengelolaan aset yang disiplin, transparan, dan didukung proses evaluasi yang terukur.",
    icon: Landmark,
  },
  {
    title: "Pembiayaan Profesional",
    description:
      "Solusi pembiayaan dan kredit produktif bagi individu maupun korporasi dengan standar layanan internasional.",
    icon: Building2,
  },
];

const principles = [
  "Transparansi dalam setiap proses pengelolaan.",
  "Kehati-hatian dalam menilai peluang dan risiko.",
  "Good corporate governance sebagai dasar keputusan.",
  "Nilai tambah berkelanjutan bagi pemangku kepentingan.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0f2b2e]">
      <header className="sticky top-0 z-30 border-b border-[#f0b119]/50 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded bg-[#f0b119] text-sm font-bold text-[#0f2b2e]">
              HY
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#f0b119]">
                PT Hongyi
              </span>
              <span className="block text-sm font-medium text-[#0f2b2e]">
                Asset Manajemen
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-[#244a4e] md:flex">
            <a className="transition hover:text-[#f0b119]" href="#tentang">
              Tentang
            </a>
            <a className="transition hover:text-[#f0b119]" href="#layanan">
              Layanan
            </a>
            <a className="transition hover:text-[#f0b119]" href="#komitmen">
              Komitmen
            </a>
            <a className="transition hover:text-[#f0b119]" href="#kontak">
              Kontak
            </a>
          </div>

          <a
            href="tel:+6285123936967"
            className="inline-flex h-10 items-center gap-2 rounded bg-[#0f2b2e] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06191b]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Hubungi
          </a>
        </nav>
      </header>

      <section
        id="home"
        className="relative overflow-hidden border-b border-[#f0b119]"
      >
        <div className="absolute inset-0">
          <Image
            src="/hongyi-hero.png"
            alt="Ilustrasi kawasan bisnis dan grafik pertumbuhan aset"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/82" />
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.96)_38%,rgba(255,255,255,0.48)_100%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl content-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded border border-[#f0b119] bg-[#f0b119] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0f2b2e]">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Asset management
            </p>

            <h1 className="text-5xl font-semibold leading-[1.02] text-[#0f2b2e] sm:text-6xl lg:text-7xl">
              PT Hongyi Asset Manajemen
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#244a4e] sm:text-xl">
              Solusi pengelolaan aset, optimalisasi investasi, pengembangan
              nilai aset, serta pembiayaan produktif untuk individu dan
              korporasi.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#layanan"
                className="inline-flex h-12 items-center justify-center gap-2 rounded bg-[#0f2b2e] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06191b]"
              >
                Lihat Layanan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:hongying.id@gmail.com"
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-[#f0b119] bg-white px-6 text-sm font-semibold text-[#0f2b2e] transition hover:bg-[#fff7d8]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Kirim Email
              </a>
            </div>
          </div>

          <aside className="self-end border-l-4 border-[#f0b119] bg-[#0f2b2e]/96 p-6 text-white shadow-[0_18px_60px_rgba(15,43,46,0.18)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f0b119]">
              Kemitraan strategis
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Menghubungkan keahlian lokal dengan pengalaman global.
            </h2>
            <p className="mt-4 leading-7 text-white/78">
              PT Hongyi Asset Manajemen menjalin kerja sama dengan Hongyi
              Enterprises yang berbasis di Taiwan untuk memperkuat kualitas
              layanan investasi dan pembiayaan.
            </p>
          </aside>
        </div>
      </section>

      <section id="tentang" className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f0b119]">
              Tentang Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0f2b2e] sm:text-5xl">
              Pengelolaan aset yang berorientasi pada nilai, keamanan, dan
              keberlanjutan.
            </h2>
          </div>

          <div className="grid gap-6 border-l-4 border-[#f0b119] bg-[#f7f7f7] p-6 text-lg leading-8 text-[#244a4e]">
            <p>
              PT Hongyi Asset Manajemen bergerak di bidang pengelolaan aset
              dengan fokus pada optimalisasi investasi, pengembangan nilai
              aset, serta penyaluran pembiayaan dan kredit produktif.
            </p>
            <p>
              Perusahaan melayani kebutuhan klien individu maupun korporasi
              melalui pendekatan profesional, tata kelola yang baik, dan
              pemahaman terhadap dinamika pasar lokal maupun internasional.
            </p>
          </div>
        </div>
      </section>

      <section id="layanan" className="bg-[#f0b119] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Layanan Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0f2b2e] sm:text-5xl">
              Layanan utama untuk aset, investasi, dan pembiayaan produktif.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded border border-[#d99c00] bg-white p-6 shadow-[0_16px_45px_rgba(15,43,46,0.12)]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded bg-[#0f2b2e] text-[#f0b119]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#0f2b2e]">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#244a4e]">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="komitmen" className="bg-[#0f2b2e] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f0b119]">
              Dampak Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Komitmen pada solusi yang aman, bernilai tambah, dan bertanggung
              jawab.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/78">
              Dengan dukungan tim profesional yang berpengalaman, perusahaan
              berupaya memberikan layanan investasi dan pembiayaan yang
              berkelanjutan bagi seluruh pemangku kepentingan.
            </p>
          </div>

          <div className="grid gap-3">
            {principles.map((principle) => (
              <div
                key={principle}
                className="flex items-start gap-4 rounded border border-[#f0b119]/55 bg-white/8 p-5"
              >
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#f0b119]"
                  aria-hidden="true"
                />
                <p className="leading-7 text-[#edf4f0]">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded bg-[#f0b119] text-[#0f2b2e]">
              <Globe2 className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f0b119]">
                Hongyi Enterprises
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#0f2b2e]">
                Mitra berbasis Taiwan
              </h2>
            </div>
          </div>

          <p className="border-l-4 border-[#f0b119] bg-[#f7f7f7] p-6 text-lg leading-8 text-[#244a4e]">
            Kemitraan ini memperkuat kapabilitas perusahaan melalui integrasi
            pengalaman global dan eksekusi lokal untuk layanan yang profesional
            serta berstandar internasional.
          </p>
        </div>
      </section>

      <section id="kontak" className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#f0b119] pt-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f0b119]">
              Hubungi Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Mulai percakapan tentang kebutuhan aset dan pembiayaan Anda.
            </h2>
          </div>

          <div className="grid gap-4">
            <a
              href="mailto:hongying.id@gmail.com"
              className="flex items-center gap-4 rounded border border-[#f0b119] bg-white p-5 text-[#0f2b2e] transition hover:bg-[#fff7d8]"
            >
              <Mail className="h-5 w-5 text-[#f0b119]" aria-hidden="true" />
              <span className="font-medium">hongying.id@gmail.com</span>
            </a>

            <a
              href="tel:+6285123936967"
              className="flex items-center gap-4 rounded border border-[#f0b119] bg-white p-5 text-[#0f2b2e] transition hover:bg-[#fff7d8]"
            >
              <Phone className="h-5 w-5 text-[#f0b119]" aria-hidden="true" />
              <span className="font-medium">+62 85123936967</span>
            </a>

            <div className="flex items-start gap-4 rounded border border-[#f0b119] bg-white p-5 text-[#0f2b2e]">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#f0b119]" aria-hidden="true" />
              <p className="font-medium leading-7">
                Plaza Pondok Gede, Jalan Raya Jatiwaringin, Jatiwaringin,
                Pondokgede, Bekasi Kota 17411, West Java, Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
