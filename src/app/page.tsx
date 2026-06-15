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
      "Pendekatan investasi yang terarah untuk mengoptimalkan peluang pertumbuhan dan nilai aset.",
    icon: TrendingUp,
  },
  {
    title: "Manajemen Portofolio",
    description:
      "Pengelolaan portofolio dengan perhatian pada tujuan, profil risiko, dan keberlanjutan.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Pengelolaan Aset Keuangan",
    description:
      "Proses pengelolaan aset yang disiplin, transparan, dan didukung evaluasi terukur.",
    icon: Landmark,
  },
  {
    title: "Pembiayaan Profesional",
    description:
      "Solusi pembiayaan dan kredit produktif bagi individu maupun korporasi.",
    icon: Building2,
  },
];

const principles = [
  "Transparansi dalam setiap proses pengelolaan.",
  "Kehati-hatian dalam menilai peluang dan risiko.",
  "Good corporate governance sebagai dasar keputusan.",
  "Nilai tambah berkelanjutan bagi pemangku kepentingan.",
];

const highlights = [
  "Individu & korporasi",
  "Kemitraan Taiwan",
  "Standar internasional",
  "Tata kelola baik",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0f2b2e]">
      <header className="sticky top-0 z-30 border-b border-[#f0b119]/45 bg-white/92 shadow-[0_10px_30px_rgba(15,43,46,0.06)] backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <span className="rounded-full bg-[#0f2b2e] p-1 shadow-[0_10px_24px_rgba(15,43,46,0.16)] transition group-hover:scale-105">
              <Image
                src="/hongyi-logo.png"
                alt="Logo PT Hongyi Asset Manajemen"
                width={48}
                height={48}
                className="h-10 w-10 rounded-full object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#f0b119]">
                PT Hongyi
              </span>
              <span className="block text-sm font-semibold text-[#0f2b2e]">
                Asset Manajemen
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#244a4e] md:flex">
            {["Tentang", "Layanan", "Komitmen", "Kontak"].map((item) => (
              <a
                key={item}
                className="nav-link"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="tel:+6285123936967"
            className="gold-sheen inline-flex h-11 items-center gap-2 rounded bg-[#0f2b2e] px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,43,46,0.18)] transition hover:-translate-y-0.5 hover:bg-[#06191b]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Hubungi
          </a>
        </nav>
      </header>

      <section
        id="home"
        className="surface-grid relative overflow-hidden border-b border-[#f0b119]/70 bg-white"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(240,177,25,0.18),transparent_31%),linear-gradient(90deg,#ffffff_0%,#ffffff_48%,#fff7db_100%)]" />
          <Image
            src="/hongyi-logo.png"
            alt=""
            priority
            width={980}
            height={980}
            aria-hidden="true"
            className="hero-watermark absolute -right-24 top-10 h-[430px] w-[430px] rounded-full object-contain opacity-[0.075] sm:h-[590px] sm:w-[590px] lg:right-8 lg:top-0 lg:h-[780px] lg:w-[780px]"
          />
          <Image
            src="/hongyi-logo.png"
            alt=""
            width={560}
            height={560}
            aria-hidden="true"
            className="absolute -bottom-32 left-1/2 h-[310px] w-[310px] -translate-x-1/2 rounded-full object-contain opacity-[0.035] sm:left-1/3 sm:h-[430px] sm:w-[430px]"
          />
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.99)_44%,rgba(255,255,255,0.58)_100%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-77px)] max-w-7xl content-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:py-20">
          <div className="reveal-up max-w-3xl">
            <div className="mb-8 inline-flex rounded-full bg-white p-2 shadow-[0_22px_60px_rgba(15,43,46,0.14)] ring-1 ring-[#f0b119]/35">
              <Image
                src="/hongyi-logo.png"
                alt="Logo PT Hongyi Asset Manajemen"
                width={112}
                height={112}
                className="h-24 w-24 rounded-full object-contain"
              />
            </div>

            <p className="mb-5 inline-flex items-center gap-2 rounded bg-[#f0b119] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#0f2b2e] shadow-[0_12px_24px_rgba(240,177,25,0.2)]">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Asset management
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-[#0f2b2e] sm:text-6xl lg:text-7xl">
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
                className="gold-sheen inline-flex h-12 items-center justify-center gap-2 rounded bg-[#0f2b2e] px-6 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(15,43,46,0.18)] transition hover:-translate-y-0.5 hover:bg-[#06191b]"
              >
                Lihat Layanan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:hongying.id@gmail.com"
                className="inline-flex h-12 items-center justify-center gap-2 rounded border border-[#f0b119] bg-white px-6 text-sm font-semibold text-[#0f2b2e] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff7d8]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Kirim Email
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded border border-[#f0b119]/40 bg-white/78 px-4 py-3 text-sm font-semibold text-[#0f2b2e] shadow-sm backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="card-lift reveal-up self-end border-l-4 border-[#f0b119] bg-[#0f2b2e]/96 p-7 text-white shadow-[0_26px_70px_rgba(15,43,46,0.24)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f0b119]">
              Kemitraan strategis
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
              Menghubungkan keahlian lokal dengan pengalaman global.
            </h2>
            <p className="mt-5 leading-8 text-white/78">
              PT Hongyi Asset Manajemen menjalin kerja sama dengan Hongyi
              Enterprises yang berbasis di Taiwan untuk memperkuat kualitas
              layanan investasi dan pembiayaan.
            </p>
            <div className="mt-7 h-1 w-28 rounded-full bg-[#f0b119]" />
          </aside>
        </div>
      </section>

      <section id="tentang" className="relative overflow-hidden bg-white px-5 py-20 sm:px-8">
        <Image
          src="/hongyi-logo.png"
          alt=""
          width={520}
          height={520}
          aria-hidden="true"
          className="absolute -right-28 top-8 h-[360px] w-[360px] rounded-full object-contain opacity-[0.025]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f0b119]">
              Tentang Kami
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0f2b2e] sm:text-5xl">
              Pengelolaan aset yang berorientasi pada nilai, keamanan, dan
              keberlanjutan.
            </h2>
          </div>

          <div className="card-lift grid gap-6 border-l-4 border-[#f0b119] bg-[#f7f7f7] p-7 text-lg leading-8 text-[#244a4e] shadow-[0_18px_55px_rgba(15,43,46,0.08)]">
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

      <section id="layanan" className="relative overflow-hidden bg-[#f0b119] px-5 py-20 sm:px-8">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative mx-auto max-w-7xl">
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
                  className="card-lift group rounded border border-[#d99c00] bg-white p-6 shadow-[0_18px_50px_rgba(15,43,46,0.14)]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded bg-[#0f2b2e] text-[#f0b119] transition group-hover:scale-105">
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

      <section id="komitmen" className="relative overflow-hidden bg-[#0f2b2e] px-5 py-20 text-white sm:px-8">
        <Image
          src="/hongyi-logo.png"
          alt=""
          width={680}
          height={680}
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full object-contain opacity-[0.045]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
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
                className="card-lift flex items-start gap-4 rounded border border-[#f0b119]/55 bg-white/8 p-5 backdrop-blur"
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
            <div className="grid h-16 w-16 place-items-center rounded bg-[#f0b119] text-[#0f2b2e] shadow-[0_14px_32px_rgba(240,177,25,0.22)]">
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

          <p className="card-lift border-l-4 border-[#f0b119] bg-[#f7f7f7] p-7 text-lg leading-8 text-[#244a4e] shadow-[0_18px_55px_rgba(15,43,46,0.08)]">
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
              className="card-lift flex items-center gap-4 rounded border border-[#f0b119] bg-white p-5 text-[#0f2b2e] shadow-sm transition hover:bg-[#fff7d8]"
            >
              <Mail className="h-5 w-5 text-[#f0b119]" aria-hidden="true" />
              <span className="font-medium">hongying.id@gmail.com</span>
            </a>

            <a
              href="tel:+6285123936967"
              className="card-lift flex items-center gap-4 rounded border border-[#f0b119] bg-white p-5 text-[#0f2b2e] shadow-sm transition hover:bg-[#fff7d8]"
            >
              <Phone className="h-5 w-5 text-[#f0b119]" aria-hidden="true" />
              <span className="font-medium">+62 85123936967</span>
            </a>

            <div className="card-lift flex items-start gap-4 rounded border border-[#f0b119] bg-white p-5 text-[#0f2b2e] shadow-sm">
              <MapPin
                className="mt-1 h-5 w-5 shrink-0 text-[#f0b119]"
                aria-hidden="true"
              />
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
