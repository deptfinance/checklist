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
    <main className="min-h-screen bg-[#f4f1ea] text-[#18231f]">
      <header className="sticky top-0 z-30 border-b border-[#d8d0c1]/80 bg-[#f8f6f0]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded bg-[#1f3b33] text-sm font-bold text-[#f2d58b]">
              HY
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#6f5930]">
                PT Hongyi
              </span>
              <span className="block text-sm font-medium text-[#27342f]">
                Asset Manajemen
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-[#40514a] md:flex">
            <a className="transition hover:text-[#1f3b33]" href="#tentang">
              Tentang
            </a>
            <a className="transition hover:text-[#1f3b33]" href="#layanan">
              Layanan
            </a>
            <a className="transition hover:text-[#1f3b33]" href="#komitmen">
              Komitmen
            </a>
            <a className="transition hover:text-[#1f3b33]" href="#kontak">
              Kontak
            </a>
          </div>

          <a
            href="tel:+6285123936967"
            className="inline-flex h-10 items-center gap-2 rounded bg-[#1f3b33] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#142b25]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Hubungi
          </a>
        </nav>
      </header>

      <section
        id="home"
        className="relative overflow-hidden border-b border-[#d8d0c1]"
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
          <div className="absolute inset-0 bg-[#f5f1e8]/85" />
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#f8f6f0_0%,rgba(248,246,240,0.94)_38%,rgba(248,246,240,0.54)_100%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl content-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded border border-[#c9b06d] bg-[#fff8e5] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#765d22]">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Asset management
            </p>

            <h1 className="text-5xl font-semibold leading-[1.02] text-[#14231f] sm:text-6xl lg:text-7xl">
              PT Hongyi Asset Manajemen
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#40514a] sm:text-xl">
              Solusi pengelolaan aset, optimalisasi investasi, pengembangan
              nilai aset, serta pembiayaan produktif untuk individu dan
              korporasi.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#layanan"
                className="inline-flex h-12 items-center justify-center gap-2 rounded bg-[#1f3b33] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#142b25]"
              >
                Lihat Layanan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:hongying.id@gmail.com"
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-[#b8ad98] bg-[#fffdf8] px-6 text-sm font-semibold text-[#24352f] transition hover:border-[#1f3b33]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Kirim Email
              </a>
            </div>
          </div>

          <aside className="self-end border-l-4 border-[#c89b3c] bg-[#fffdf8]/92 p-6 shadow-[0_18px_60px_rgba(35,45,39,0.14)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7d6427]">
              Kemitraan strategis
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#17251f]">
              Menghubungkan keahlian lokal dengan pengalaman global.
            </h2>
            <p className="mt-4 leading-7 text-[#53615b]">
              PT Hongyi Asset Manajemen menjalin kerja sama dengan Hongyi
              Enterprises yang berbasis di Taiwan untuk memperkuat kualitas
              layanan investasi dan pembiayaan.
            </p>
          </aside>
        </div>
      </section>

      <section id="tentang" className="bg-[#fffdf8] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8a6a27]">
              Tentang Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#18231f] sm:text-5xl">
              Pengelolaan aset yang berorientasi pada nilai, keamanan, dan
              keberlanjutan.
            </h2>
          </div>

          <div className="grid gap-6 text-lg leading-8 text-[#4f5d56]">
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

      <section id="layanan" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8a6a27]">
              Layanan Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Layanan utama untuk aset, investasi, dan pembiayaan produktif.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded border border-[#d9d0bd] bg-[#fffdf8] p-6 shadow-sm"
                >
                  <div className="grid h-12 w-12 place-items-center rounded bg-[#e9dcc0] text-[#1f3b33]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#17251f]">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#56655e]">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="komitmen" className="bg-[#17342d] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e4c36e]">
              Dampak Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Komitmen pada solusi yang aman, bernilai tambah, dan bertanggung
              jawab.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#d7e2dc]">
              Dengan dukungan tim profesional yang berpengalaman, perusahaan
              berupaya memberikan layanan investasi dan pembiayaan yang
              berkelanjutan bagi seluruh pemangku kepentingan.
            </p>
          </div>

          <div className="grid gap-3">
            {principles.map((principle) => (
              <div
                key={principle}
                className="flex items-start gap-4 rounded border border-white/15 bg-white/8 p-5"
              >
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#e4c36e]"
                  aria-hidden="true"
                />
                <p className="leading-7 text-[#edf4f0]">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf8] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded bg-[#e9dcc0] text-[#1f3b33]">
              <Globe2 className="h-8 w-8" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8a6a27]">
                Hongyi Enterprises
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#18231f]">
                Mitra berbasis Taiwan
              </h2>
            </div>
          </div>

          <p className="text-lg leading-8 text-[#4f5d56]">
            Kemitraan ini memperkuat kapabilitas perusahaan melalui integrasi
            pengalaman global dan eksekusi lokal untuk layanan yang profesional
            serta berstandar internasional.
          </p>
        </div>
      </section>

      <section id="kontak" className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#d8d0c1] pt-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8a6a27]">
              Hubungi Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Mulai percakapan tentang kebutuhan aset dan pembiayaan Anda.
            </h2>
          </div>

          <div className="grid gap-4">
            <a
              href="mailto:hongying.id@gmail.com"
              className="flex items-center gap-4 rounded border border-[#d9d0bd] bg-[#fffdf8] p-5 text-[#1d2d28] transition hover:border-[#1f3b33]"
            >
              <Mail className="h-5 w-5 text-[#8a6a27]" aria-hidden="true" />
              <span className="font-medium">hongying.id@gmail.com</span>
            </a>

            <a
              href="tel:+6285123936967"
              className="flex items-center gap-4 rounded border border-[#d9d0bd] bg-[#fffdf8] p-5 text-[#1d2d28] transition hover:border-[#1f3b33]"
            >
              <Phone className="h-5 w-5 text-[#8a6a27]" aria-hidden="true" />
              <span className="font-medium">+62 85123936967</span>
            </a>

            <div className="flex items-start gap-4 rounded border border-[#d9d0bd] bg-[#fffdf8] p-5 text-[#1d2d28]">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#8a6a27]" aria-hidden="true" />
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
