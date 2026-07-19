import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'



const brand = {
  name: 'Kembanglangit Park',
  tagline: 'Desa Wisata di Kaki Hutan Pinus Blado',
  since: '2019',
  address:
    'Jl. Bandar-Batur No. Km 10, RW 7, Kembanglangit, Kec. Blado, Kabupaten Batang, Jawa Tengah 51255',
  hours: 'Setiap hari, 09.00 - 17.00 WIB (loket tiket tutup 16.30 WIB)',
  phone: '+62 8810-2455-3395',
  whatsapp: '62881024553395',
  email: 'kembanglangit@gmail.com',
  instagram: 'https://instagram.com/kembanglangit_park',
  instagramHandle: '@kembanglangit_park',
  instagramFollowers: '121K',
  tiktok: 'https://www.tiktok.com/@kembanglangit.park',
  tiktokHandle: '@kembanglangit.park',
  tiktokFollowers: '22.7K',
  facebook: 'https://www.facebook.com/p/Kembanglangit-park-100075743715752/',
  mapsEmbed:
    'https://www.google.com/maps?q=Kembanglangit+Park+Blado+Batang&output=embed',
  youtubeEmbed: 'https://www.youtube.com/embed/nEBHVIjUAvY',
  forestTrainVideo: 'https://www.youtube.com/embed/uAgysmbMIkc',
  coords: { lat: -7.086, lng: 109.9 },
}

function waLink(message) {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`
}

const galleryImages = {
  hero1: '/slide/Slide1.jpg',
  hero2: '/slide/Slide2.jpg',
  hero3: '/slide/Slide3.jpg',
  about1: '/about/wisataAlam1.png',
  about2: '/about/wisataAlam2.jpg',
  featured: '/about/wisataAlam3.png',
  experience:
    'https://www.goersapp.com/blog/wp-content/uploads/2024/12/Wahana-Menarik-yang-Ditawarkan-oleh-Kembang-Langit-Park-Batang.webp',
}

const featuredFacilities = [
  {
    id: 'forest-train',
    icon: 'train',
    name: 'Forest Train',
    price: 10000,
    desc: 'Kereta mini 1 gerbong masinis + 5 gerbong penumpang menyusuri Hutan Damar.',
    img: '/wahana/ForestTrain.jpg',
  },
  {
    id: 'dino-ride',
    icon: 'dino',
    name: 'Dino Ride',
    price: 15000,
    desc: 'Sensasi menunggangi dinosaurus, favorit anak-anak.',
    img: '/wahana/DinoRide.jpg',
  },
  {
    id: 'rainbow-slide',
    icon: 'rainbow',
    name: 'Rainbow Slide',
    price: 15000,
    desc: 'Meluncur dari kontur perbukitan lewat seluncuran warna-warni.',
    img: '/wahana/RainbowSlide.jpg',
  },
  {
    id: 'avante-coaster',
    icon: 'coaster',
    name: 'Avante Coaster',
    price: 25000,
    desc: 'Roller coaster mini untuk pencari sensasi ekstrem di tengah pinus.',
    img: '/wahana/AvanteCoaster.jpg',
  },
  {
    id: 'fun-slide',
    icon: 'slide',
    name: 'Fun Slide',
    price: 15000,
    desc: 'Wahana seluncur terbaru, cocok untuk semua umur.',
    img: '/wahana/FunSlide.jpg',
  },
  {
    id: 'balon-sultan',
    icon: 'balloon',
    name: 'Balon Sultan',
    price: 20000,
    desc: 'Balon udara statis raksasa, spot foto sekaligus wahana baru 2025.',
    img: '/wahana/BalonSultan.jpg',
  },
]

const galleryCards = [
  {
    id: 'kolam-renang',
    title: 'Kolam Renang',
    desc: 'Kolam renang keluarga yang menyegarkan, sudah termasuk tiket masuk.',
    detail:
      'Kolam renang keluarga dengan air pegunungan yang segar, sudah termasuk dalam tiket masuk harian (tidak ada biaya tambahan). Tersedia area khusus untuk anak-anak dengan kedalaman dangkal, serta pengawas kolam selama jam operasional. Cocok dinikmati sebelum atau sesudah mencoba wahana lain di Kembanglangit Park.',
    img: '/fasilitas/kolamRenang.png',
  },
  {
    id: 'forest-kopi',
    title: 'Forest Kopi & Metsa Kopi',
    desc: 'Dua kedai kopi dengan pemandangan hutan pinus untuk bersantai.',
    detail:
      'Forest Kopi dan Metsa Kopi adalah dua kedai kopi milik Kurara Group yang berada di kawasan Kembanglangit Park, masing-masing menawarkan suasana duduk santai dengan pemandangan langsung ke hutan pinus. Menu yang tersedia meliputi kopi susu gula aren, aneka americano/manual brew, camilan ringan, hingga menu berat untuk makan siang. Cocok untuk nongkrong sambil menikmati udara sejuk pegunungan.',
    img: '/fasilitas/forestKopi.png',
    paid: true,
  },
  {
    id: 'spot-foto',
    title: 'Spot Foto Instagramable',
    desc: 'Play Net, Patitie, dan Forest Bridge — spot foto favorit pengunjung.',
    detail:
      'Beberapa spot foto favorit pengunjung yang tersebar di area Kembanglangit Park: Play Net (jaring raksasa di tengah hutan pinus), Patitie (gazebo & tempat nongkrong estetik), dan Forest Bridge (jembatan kayu di antara pepohonan pinus). Semua spot ini bisa dinikmati tanpa biaya tambahan di luar tiket masuk, cocok untuk konten foto maupun video.',
    img: '/fasilitas/forestBridge.png',
  },
  {
    id: 'metsa-cabin',
    title: 'Kurara Forest Villa & Cabin',
    desc: 'Villa & cabin bernuansa hutan pinus, mulai Rp350rb/malam.',
    detail:
      'Kurara Forest menyediakan beragam tipe penginapan di kawasan Kembanglangit Park, mulai dari cabin glamping sederhana hingga villa premium dengan private warmpool. Tamu yang menginap mendapat akses gratis tiket masuk Kembanglangit Park termasuk kolam renang (tidak termasuk tiket wahana seperti Rainbow Slide dan Forest Train).',
    img: '/fasilitas/kuraraVilla.png',
    paid: true,
    types: [
      {
        id: 'villa-zo',
        name: 'Villa Zo',
        priceWeekday: 700000,
        priceWeekend: 800000,
        capacity: 'Cocok untuk staycation berdua',
        features: 'Balkon panorama Kembanglangit Park, living room, WiFi & Netflix',
        img: '/villa/VillaZo.jpg',
      },
      {
        id: 'villa-vin',
        name: 'Villa Vin',
        priceWeekday: 1000000,
        priceWeekend: 1200000,
        capacity: 'Cocok untuk keluarga besar',
        features: 'Jacuzzi, kamar tidur lebih banyak, Netflix & WiFi',
        img: '/villa/VillaVin.jpg',
      },
      {
        id: 'villa-zi',
        name: 'Villa Zi',
        priceWeekday: 1200000,
        priceWeekend: 1600000,
        capacity: 'Cocok untuk pasangan / quality time',
        features: 'Private warmpool, king size bed, smart TV, balkon & living room estetik, kitchen set',
        img: '/villa/VillaZi.jpg',
      },
      {
        id: 'villa-metsa',
        name: 'Villa Metsa',
        priceWeekday: 1100000,
        priceWeekend: 1300000,
        capacity: 'Cocok untuk quality time bareng keluarga',
        features: 'Kamar mandi air panas & dingin, ruang tamu, WiFi & Netflix',
        img: '/villa/VillaMetsa.jpg',
      },
      {
        id: 'villa-lotus',
        name: 'Villa Lotus',
        priceWeekday: 1400000,
        priceWeekend: 1800000,
        capacity: 'Villa premium, 2 kamar tidur',
        features: '2 kamar mandi dalam, smart TV & Netflix, dapur, dispenser, mini kulkas',
        img: '/villa/VillaLotus.jpg',
      },
      {
        id: 'forest-homestay',
        name: 'Forest Homestay',
        priceWeekday: 400000,
        priceWeekend: 500000,
        capacity: 'Cocok untuk staycation berdua',
        features: 'Berlokasi di area Forest Kopi, tanpa dapur (bisa pesan dari Forest/Metsa Kopi)',
        img: '/villa/ForestHomestay.jpg',
      },
      {
        id: 'forest-cabin',
        name: 'Forest Cabin',
        priceWeekday: 400000,
        priceWeekend: 500000,
        capacity: 'Cocok untuk staycation santai',
        features: 'Dikelilingi pemandangan Hutan Damar, suasana sejuk & tenang',
        img: '/villa/ForestCabin.jpg',
      },
      {
        id: 'metsa-cabin-reguler',
        name: 'Metsa Cabin (Glamping)',
        priceWeekday: 350000,
        priceWeekend: 450000,
        capacity: 'Maksimal 4 orang per kabin',
        features: 'Sharing kitchen & kamar mandi di Metsa Kopi, 2 springbed, free air isi ulang, sudah termasuk tiket masuk',
        img: '/villa/MetsaCabin.jpg',
      },
      {
        id: 'cabana-cabin',
        name: 'Cabana Cabin',
        priceWeekday: 450000,
        priceWeekend: 550000,
        capacity: '2 kamar tidur + kamar mandi dalam',
        features: 'Smart TV, WiFi, guest amenities, free tiket wisata Kembanglangit',
        img: '/villa/CabanaCabin.jpg',
      },
    ],
  },
  {
    id: 'camping-ground',
    title: 'Camping Ground',
    desc: 'Area berkemah di tengah rimbunnya pohon pinus dan damar.',
    detail:
      'Area berkemah yang berada di tengah rimbunnya pohon pinus dan damar, cocok untuk kegiatan camping bersama keluarga, komunitas, atau rombongan sekolah. Suasana malam hari yang tenang dan udara sejuk pegunungan menjadi daya tarik utama camping ground ini.',
    img: '/fasilitas/CampingGround.jpg',
    paid: true,
  },
  {
    id: 'playground',
    title: 'Taman Bermain Anak',
    desc: 'Playground aman dan lengkap untuk anak-anak.',
    detail:
      'Taman bermain anak dengan permainan gratis seperti ayunan, mobil-mobilan, dan wahana ketangkasan ringan, sudah termasuk dalam tiket masuk. Area ini dirancang aman untuk anak-anak dan membantu perkembangan psikomotorik mereka sambil bermain di udara terbuka.',
    img: '/fasilitas/playGround.png',
  },
]

const entryTickets = [
  {
    id: 'weekday',
    label: 'Weekday (Senin - Jumat)',
    child: 10000,
    adult: 15000,
    includes: 'Kolam renang, spot foto, playground',
  },
  {
    id: 'weekend',
    label: 'Weekend / Libur Nasional',
    child: 20000,
    adult: 25000,
    includes: 'Kolam renang, spot foto, playground, Forest Train',
  },
]

const parking = { motor: 2000, mobil: 5000 }

const packageCategories = ['Semua Paket', 'Harian', 'Wahana']

const packages = [
  {
    id: 'reguler',
    img: '/paket/Regular.png',
    category: 'Harian',
    name: 'Paket Reguler Weekday',
    subtitle: 'Kolam renang, spot foto, playground',
    price: 15000,
    rating: 4.7,
    reviews: 812,
  },
  {
    id: 'weekend',
    img: '/paket/Weekend.png',
    category: 'Harian',
    name: 'Paket Weekend',
    subtitle: 'Termasuk Forest Train',
    price: 25000,
    rating: 4.8,
    reviews: 1204,
  },
  {
    id: 'keluarga',
    img: '/paket/Keluarga.png',
    category: 'Wahana',
    name: 'Paket Keluarga (3 Wahana)',
    subtitle: 'Tiket masuk + Dino Ride + Forest Train + Kincir Angin',
    price: 45000,
    rating: 4.9,
    reviews: 530,
  },
  {
    id: 'ekstrem',
    img: '/paket/Ekstrem.png',
    category: 'Wahana',
    name: 'Paket Pemburu Adrenalin',
    subtitle: 'Tiket masuk + Avante Coaster + Rainbow Slide',
    price: 55000,
    rating: 4.8,
    reviews: 276,
  },
  {
    id: 'balon-sultan',
    img: '/paket/PaketBalon.png',
    category: 'Wahana',
    name: 'Paket Spot Foto Balon Sultan',
    subtitle: 'Tiket masuk weekday + wahana Balon Sultan (spot foto ikonik)',
    price: 35000,
    rating: 4.8,
    reviews: 143,
  },
  {
    id: 'rombongan',
    img: '/paket/Rombongan.png',
    category: 'Harian',
    name: 'Paket Rombongan',
    subtitle: 'Minimal 30 orang, tiket masuk per orang',
    price: 15000,
    rating: 4.7,
    reviews: 94,
    minGroupSize: 30,
  },
]

const villaTypes = galleryCards.find((c) => c.id === 'metsa-cabin').types

const staycationAddOns = [
  {
    id: 'bbq',
    name: 'Paket BBQ',
    price: 150000,
    unit: 'pax',
    desc: 'Paket barbeque yang bisa dinikmati di area villa/cabin.',
  },
]

const testimonials = [
  {
    name: 'Sharon S.',
    quote:
      'Pemandangannya bagus, tempatnya sejuk dan syahdu. Yang paling seru itu prosotan dan coaster-nya!',
    role: 'Pengunjung dari Semarang',
  },
  {
    name: 'Guna D.',
    quote:
      'Panorama hutan pinus-nya menyejukkan, wahananya juga kekinian. Cocok buat healing akhir pekan.',
    role: 'Pengunjung dari Kendal',
  },
  {
    name: 'Keluarga Naufal',
    quote:
      'Anak-anak paling suka Forest Train, kami dewasanya suka ngopi santai di Forest Kopi.',
    role: 'Wisatawan keluarga',
  },
]

const faqs = [
  {
    q: 'Apakah tiket masuk sudah termasuk semua wahana?',
    a: 'Belum. Tiket masuk mencakup kolam renang, spot foto, dan playground. Wahana seperti Forest Train, Dino Ride, Rainbow Slide, dan lainnya dikenakan biaya tambahan per wahana, atau bisa dipesan sekaligus lewat halaman Booking.',
  },
  {
    q: 'Jam berapa Kembanglangit Park buka dan tutup?',
    a: 'Buka setiap hari pukul 09.00-17.00 WIB. Penjualan tiket masuk ditutup pukul 16.30 WIB, jadi usahakan datang lebih awal.',
  },
  {
    q: 'Bagaimana cara sampai ke lokasi?',
    a: 'Lokasi berada di jalur utama Batang-Dieng, Jalan Bandar-Batur Km 10,8, Desa Kembanglangit, Kecamatan Blado. Sekitar 57 menit (± 30 km) dari pusat Kota Batang.',
  },
  {
    q: 'Apakah tersedia penginapan di lokasi?',
    a: 'Tersedia Metsa Cabin (Kurara Forest Villa), villa kabin bernuansa hutan pinus dengan beberapa tipe (Villa Zo, Vin, Zi, Lotus), mulai dari Rp700.000/malam. Lihat rincian tipe & harganya di bagian Galeri.',
  },
  {
    q: 'Apakah harga yang tertera di website ini pasti berlaku saat kunjungan?',
    a: 'Harga tiket & wahana dapat berubah sewaktu-waktu mengikuti kebijakan pengelola. Struk booking online tetap berlaku sesuai harga saat transaksi dilakukan.',
  },
]

const trustPoints = [
  { icon: 'leaf', title: 'Wahana Modern', desc: 'Wahana baru & terawat, terinspirasi tren wisata terkini.' },
  { icon: 'guide', title: 'Pemandu Berpengalaman', desc: 'Tim lokal yang ramah dan siap membantu kunjungan Anda.' },
  { icon: 'clock', title: 'Buka Setiap Hari', desc: '09.00 - 17.00 WIB, termasuk akhir pekan & libur nasional.' },
  { icon: 'heart', title: 'Kepuasan Pengunjung', desc: 'Ribuan ulasan positif dari wisatawan lokal & luar daerah.' },
]

const PPN_RATE = 0.1 // 10%



function formatIDR(n) {
  return `Rp${n.toLocaleString('id-ID')}`
}

/* =========================================================================
   ICON 
   ========================================================================= */

function Icon({ id, size = 20, className = '' }) {
  return (
    <svg
      className={`icon icon-${id} ${className}`}
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
    >
      <use href={`/icons.svg#${id}-icon`} />
    </svg>
  )
}

/* =========================================================================
   AUTH CONTEXT — login/register/logout 
   ========================================================================= */

const AuthContext = createContext(null)

const USERS_KEY = 'kbl_users'
const SESSION_KEY = 'kbl_session'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem(SESSION_KEY)
    if (savedEmail) {
      const found = loadUsers().find((u) => u.email === savedEmail)
      if (found) setUser(found)
    }
    setReady(true)
  }, [])

  function register({ name, phone, email, password }) {
    const users = loadUsers()
    if (users.some((u) => u.email === email)) {
      return { ok: false, message: 'Email sudah terdaftar. Silakan login.' }
    }
    const newUser = { name, phone, email, password }
    saveUsers([...users, newUser])
    localStorage.setItem(SESSION_KEY, email)
    setUser(newUser)
    return { ok: true }
  }

  function login({ email, password }) {
    const users = loadUsers()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      return { ok: false, message: 'Email atau kata sandi salah.' }
    }
    localStorage.setItem(SESSION_KEY, email)
    setUser(found)
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, ready, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return ctx
}

/* =========================================================================
   WISHLIST CONTEXT
   ========================================================================= */

const WishlistContext = createContext(null)

function keyFor(email) {
  return `kbl_wishlist_${email || 'guest'}`
}

function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(keyFor(user?.email))) || []
      setItems(saved)
    } catch {
      setItems([])
    }
  }, [user])

  function toggle(id) {
    setItems((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      localStorage.setItem(keyFor(user?.email), JSON.stringify(next))
      return next
    })
  }

  function isSaved(id) {
    return items.includes(id)
  }

  return (
    <WishlistContext.Provider value={{ items, toggle, isSaved }}>
      {children}
    </WishlistContext.Provider>
  )
}

function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist harus dipakai di dalam WishlistProvider')
  return ctx
}

/* =========================================================================
   LOGIN GATE 
   ========================================================================= */

function LoginGate() {
  const { register, login } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!form.name || !form.email || !form.password) {
        setError('Nama, email, dan kata sandi wajib diisi.')
        return
      }
      const result = register(form)
      if (!result.ok) setError(result.message)
    } else {
      if (!form.email || !form.password) {
        setError('Email dan kata sandi wajib diisi.')
        return
      }
      const result = login(form)
      if (!result.ok) setError(result.message)
    }
  }

  return (
    <div className="login-gate">
      <div className="login-gate__panel">
        <div className="login-gate__panel-inner">
          <div className="login-gate__logo">
            <span className="login-gate__logo-mark" aria-hidden="true">
              <img src="/logowebKembanglangit.png" alt="" />
            </span>
            <div>
              <strong>{brand.name}</strong>
              <span>Portal Kunjungan &amp; Booking Tiket</span>
            </div>
          </div>

          <h1>{mode === 'login' ? 'Masuk ke akun Anda' : 'Buat akun pengunjung'}</h1>
          <p className="login-gate__sub">
            {mode === 'login'
              ? 'Login sekali, dan data diri Anda tidak perlu diisi ulang setiap kali booking tiket.'
              : 'Daftar sekali untuk mempercepat proses booking tiket di kunjungan berikutnya.'}
          </p>

          <form onSubmit={handleSubmit} className="login-gate__form" noValidate>
            {mode === 'register' && (
              <>
                <label className="field">
                  <span>Nama Lengkap</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={updateField('name')}
                    placeholder="cth. Sari Ayu Wulandari"
                    autoComplete="name"
                  />
                </label>
                <label className="field">
                  <span>No. WhatsApp</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={updateField('phone')}
                    placeholder="08xxxxxxxxxx"
                    autoComplete="tel"
                  />
                </label>
              </>
            )}

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={updateField('email')}
                placeholder="nama@email.com"
                autoComplete="email"
              />
            </label>

            <label className="field">
              <span>Kata Sandi</span>
              <div className="field__password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={updateField('password')}
                  placeholder="Minimal 6 karakter"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="field__eye"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  <Icon id={showPassword ? 'eye-off' : 'eye'} size={18} />
                </button>
              </div>
            </label>

            {error && <p className="login-gate__error" role="alert">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block">
              {mode === 'login' ? 'Masuk & Lanjut ke Website' : 'Daftar & Lanjut ke Website'}
            </button>
          </form>

          <p className="login-gate__switch">
            {mode === 'login' ? (
              <>Belum punya akun? <button type="button" onClick={() => { setMode('register'); setError('') }}>Daftar di sini</button></>
            ) : (
              <>Sudah punya akun? <button type="button" onClick={() => { setMode('login'); setError('') }}>Masuk di sini</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   LAYOUT: TopBar, Navbar, Footer
   ========================================================================= */

function TopBar() {
  return (
    <div className="topbar">
      <span>{brand.name.toUpperCase()} — DESA WISATA KEMBANGLANGIT, BLADO, BATANG, JAWA TENGAH</span>
    </div>
  )
}

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#wahana', label: 'Wahana' },
  { href: '#paket', label: 'Paket' },
  { href: '#lokasi', label: 'Lokasi' },
]

function Navbar({ page, onNavigate, onOpenWishlist }) {
  const { user, logout } = useAuth()
  const { items } = useWishlist()
  const [open, setOpen] = useState(false)

  function handleLinkClick(href) {
    setOpen(false)
    if (page !== 'home') {
      onNavigate('home')
      window.setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <button className="navbar__brand" onClick={() => handleLinkClick('#beranda')}>
          <span className="navbar__logo">
            <img src="/logowebKembanglangit.png" alt="Logo Kembanglangit Park" />
          </span>
          <span className="navbar__brand-text">
            <strong>Kembanglangit</strong>
            <em>Park</em>
          </span>
        </button>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => handleLinkClick(link.href)}>
              {link.label}
            </button>
          ))}
          <button className="navbar__faq-link" onClick={() => handleLinkClick('#ulasan')}>Ulasan</button>

          <div className="navbar__links-mobile-actions">
            <button className="btn btn-outline btn-block" onClick={() => { setOpen(false); onOpenWishlist() }}>
              Wishlist Saya ({items.length})
            </button>
            <button className="btn btn-primary btn-block" onClick={() => { setOpen(false); onNavigate('booking') }}>
              Booking Tiket
            </button>
          </div>
        </nav>

        <div className="navbar__actions">
          <button className="navbar__icon-btn" onClick={onOpenWishlist} aria-label="Wishlist wahana favorit">
            <Icon id="heart" size={19} />
            {items.length > 0 && <span className="navbar__badge">{items.length}</span>}
          </button>

          <div className="navbar__user">
            <Icon id="user" size={16} />
            <span>{user?.name?.split(' ')[0] || 'Pengunjung'}</span>
          </div>

          <button className="btn btn-primary navbar__cta" onClick={() => onNavigate('booking')}>
            Booking Tiket
          </button>

          <button className="navbar__logout" onClick={logout} title="Keluar akun">
            Logout
          </button>

          <button className="navbar__toggle" onClick={() => setOpen((o) => !o)} aria-label="Buka menu">
            <Icon id={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__logo">
            <img src="/logowebKembanglangit.png" alt="Logo Kembanglangit Park" />
          </span>
          <div>
            <strong>{brand.name}</strong>
            <p>Desa Wisata hutan pinus di Kecamatan Blado, Kabupaten Batang, Jawa Tengah. Dikelola bersama warga Desa Kembanglangit sejak {brand.since}.</p>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Jelajahi</h4>
          <ul>
            <li><a href="#tentang">Tentang Kami</a></li>
            <li><a href="#wahana">Wahana &amp; Fasilitas</a></li>
            <li><a href="#paket">Paket Kunjungan</a></li>
            <li><a href="#faq">Pertanyaan Umum</a></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Kontak</h4>
          <ul>
            <li>{brand.address}</li>
            <li>{brand.hours}</li>
            <li>{brand.email}</li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Ikuti Kami</h4>
          <div className="site-footer__social">
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram Kembanglangit Park">
              <Icon id="instagram" size={18} />
            </a>
            <a href={brand.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok Kembanglangit Park">
              <Icon id="tiktok" size={18} />
            </a>
            <a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Facebook Kembanglangit Park">
              <Icon id="facebook" size={18} />
            </a>
          </div>
          <p className="site-footer__handle">{brand.instagramHandle}</p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <span>&copy; {new Date().getFullYear()} Muhammad Naufal Adib - 25.240.0011. Seluruh hak cipta dilindungi.</span>
          <span>Dibuat sebagai proyek UAS Pemrograman Web &mdash; Tema Desa Wisata Kembang Langit</span>
        </div>
      </div>
    </footer>
  )
}

/* =========================================================================
   HOME SECTIONS
   ========================================================================= */

const heroSlides = [
  { src: galleryImages.hero1 },
  { src: galleryImages.hero2 },
  { src: galleryImages.hero3 },
]

function Hero({ onBooking }) {
  const sliderRef = useRef(null)
  const indexRef = useRef(0)

  useEffect(() => {
    const $ = window.jQuery
    if (!$ || !sliderRef.current) return undefined

    const $slides = $(sliderRef.current).find('.hero-slide')
    $slides.hide().eq(0).show()


    const timer = window.setInterval(() => {
      const current = indexRef.current
      const next = (current + 1) % $slides.length
      $slides.eq(current).fadeOut(600)
      $slides.eq(next).fadeIn(600)
      indexRef.current = next
      $(sliderRef.current)
        .find('.hero-dots button')
        .removeClass('is-active')
        .eq(next)
        .addClass('is-active')
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  function goTo(i) {
    const $ = window.jQuery
    if (!$ || !sliderRef.current) return
    const $slides = $(sliderRef.current).find('.hero-slide')
    $slides.eq(indexRef.current).fadeOut(500)
    $slides.eq(i).fadeIn(500)
    indexRef.current = i
    $(sliderRef.current).find('.hero-dots button').removeClass('is-active').eq(i).addClass('is-active')
  }

  return (
    <section id="beranda" className="hero">
      <div className="container hero__inner">
        <div className="hero__visual" ref={sliderRef}>
          {heroSlides.map((slide, i) => (
            <figure key={slide.src + i} className="hero-slide" style={{ display: i === 0 ? 'block' : 'none' }}>
              <img src={slide.src} alt={slide.caption} />
            </figure>
          ))}

          <div className="hero-dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={i === 0 ? 'is-active' : ''}
                onClick={() => goTo(i)}
                aria-label={`Tampilkan foto ${i + 1}`}
              />
            ))}
          </div>

          <div className="hero__badge-top">
            <Icon id="pin" size={16} />
            <span>Blado, Kab. Batang</span>
          </div>
          <div className="hero__badge-bottom">
            <strong>350rb+</strong>
            <span>Pengunjung sejak {brand.since}</span>
          </div>
        </div>

        <div className="hero__content">
          <span className="hero__pill">
            <Icon id="leaf" size={15} /> Desa Wisata Hutan Pinus sejak {brand.since}
          </span>
          <h1>
            Healing di Kembanglangit Park, <span>Rumahnya Hutan Pinus Batang</span>
          </h1>
          <p>
            Nikmati udara sejuk kaki gunung, wahana kekinian seperti Forest Train dan Rainbow Slide,
            hingga secangkir kopi hutan di Forest Kopi. Booking tiket dari rumah, tinggal scan di loket.
          </p>

          <div className="hero__stats">
            <div>
              <Icon id="ticket" size={20} />
              <div>
                <strong>Rp10rb</strong>
                <span>Tiket mulai dari</span>
              </div>
            </div>
            <div>
              <Icon id="clock" size={20} />
              <div>
                <strong>09.00-17.00</strong>
                <span>Buka setiap hari</span>
              </div>
            </div>
            <div>
              <Icon id="star" size={20} />
              <div>
                <strong>4.8/5</strong>
                <span>Ulasan pengunjung</span>
              </div>
            </div>
          </div>

          <div className="hero__actions">
            <button className="btn btn-primary" onClick={() => onBooking()}>Booking Tiket</button>
            <a className="btn btn-outline" href="#wahana">Lihat Semua Wahana</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function About({ onBooking }) {
  return (
    <section id="tentang" className="section about">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Tentang Kami</span>
          <h2>Wisata Alam Asri di Kaki Hutan Pinus Sejak 2019</h2>
        </div>

        <div className="about__grid">
          <div className="about__collage">
            <img className="about__collage-main" src={galleryImages.about1} alt="Suasana hutan pinus Kembanglangit Park" />
            <img className="about__collage-small about__collage-small--1" src={galleryImages.about2} alt="Pengunjung bersantai di Kembanglangit Park" />
            <img className="about__collage-small about__collage-small--2" src={galleryImages.featured} alt="Wahana Kembanglangit Park" />
          </div>

          <div className="about__content">
            <div className="about__point">
              <span><Icon id="leaf" size={20} /></span>
              <div>
                <h4>Dikelola Bersama Warga Desa</h4>
                <p>Kembanglangit Park dikembangkan oleh Kurara Group bersama warga Desa Kembanglangit, menjaga hutan pinus tetap lestari sambil membuka lapangan kerja lokal.</p>
              </div>
            </div>
            <div className="about__point">
              <span><Icon id="guide" size={20} /></span>
              <div>
                <h4>Wahana Terus Diperbarui</h4>
                <p>Dari Forest Train, Avante Coaster, hingga wahana terbaru Balon Sultan dan Fun Slide — selalu ada yang baru setiap musim liburan.</p>
              </div>
            </div>

            <div className="about__stats">
              <div>
                <strong>121K+</strong>
                <span>Pengikut Instagram</span>
              </div>
              <div>
                <strong>4.8/5</strong>
                <span>Rating kepuasan pengunjung</span>
              </div>
            </div>

            <div className="about__actions">
              <button className="btn btn-primary" onClick={() => onBooking()}>Booking Sekarang</button>
              <a className="btn btn-ghost" href={galleryImages.hero1} target="_blank" rel="noreferrer">
                <Icon id="ticket" size={16} /> Lihat Galeri Foto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const featuredWahanaPoints = [
  'Buka penuh setiap hari, termasuk akhir pekan & libur nasional',
  'Wahana baru rutin ditambah tiap musim liburan',
  'Area parkir luas untuk motor & mobil rombongan',
  'Pemandu lokal siap membantu di setiap titik wahana',
]

function FeaturedWahana() {
  return (
    <section className="featured-wahana">
      <div className="container featured-wahana__inner">
        <div className="featured-wahana__text">
          <span className="eyebrow">Wahana Unggulan</span>
          <h2>Forest Train: Jelajahi Hutan Damar Naik Kereta Mini</h2>
          <p>
            Wahana paling favorit di Kembanglangit Park. Satu gerbong masinis dan lima gerbong
            penumpang membawa Anda menyusuri jalur di antara pepohonan damar, cocok untuk
            pengunjung dari segala usia.
          </p>

          <ul className="featured-wahana__list">
            {featuredWahanaPoints.map((point) => (
              <li key={point}>
                <Icon id="check" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="featured-wahana__image">
          <iframe
            src={brand.forestTrainVideo}
            title="Video Forest Train di Kembanglangit Park"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

function FacilitiesGrid({ onBooking }) {
  const { isSaved, toggle } = useWishlist()

  return (
    <section id="wahana" className="section facilities">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Wahana Unggulan</span>
          <h2>6 Wahana Paling Diminati Pengunjung</h2>
        </div>

        <div className="facilities__grid">
          {featuredFacilities.map((f) => (
            <div className="facility-card" key={f.id}>
              <div className="facility-card__media">
                <img src={f.img} alt={f.name} loading="lazy" />
                <button
                  className={`facility-card__save ${isSaved(f.id) ? 'is-saved' : ''}`}
                  onClick={() => toggle(f.id)}
                  aria-pressed={isSaved(f.id)}
                  aria-label="Simpan ke wishlist"
                >
                  <Icon id={isSaved(f.id) ? 'heart-fill' : 'heart'} size={17} />
                </button>
              </div>
              <div className="facility-card__body">
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
                <div className="facility-card__foot">
                  <span>{formatIDR(f.price)}</span>
                  <button
                    onClick={() =>
                      onBooking({
                        category: 'Harian',
                        name: `Wahana ${f.name}`,
                        subtitle: f.desc,
                        addOnIds: [f.id],
                      })
                    }
                  >
                    Booking &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABanner({ onBooking }) {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">
        <h2>Jadwalkan Kunjungan Wisata Anda Sekarang</h2>
        <p>Booking online lebih hemat waktu — tinggal tunjukkan struk digital di loket.</p>
        <button className="btn btn-amber" onClick={() => onBooking()}>Booking Tiket Sekarang</button>
      </div>
    </section>
  )
}

function GalleryWahana({ onBooking }) {
  const [activeCard, setActiveCard] = useState(null)

  function closeModal() {
    setActiveCard(null)
  }

  function bookVillaType(t) {
    setActiveCard(null)
    onBooking?.({
      category: 'Staycation',
      name: `Staycation ${t.name}`,
      subtitle: t.capacity,
      villaId: t.id,
    })
  }

  return (
    <section className="section gallery-wahana">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Galeri &amp; Fasilitas</span>
          <h2>Setiap Sudut Kembanglangit Punya Cerita</h2>
          <p>
            Dokumentasi nyata kunjungan wisatawan, dirangkum dari akun Instagram {brand.instagramHandle}
            {' '}dan TikTok {brand.tiktokHandle}.
          </p>
        </div>

        <div className="gallery-wahana__grid">
          {galleryCards.map((card) => (
            <button
              type="button"
              className="gallery-card"
              key={card.id}
              onClick={() => setActiveCard(card)}
            >
              <div className="gallery-card__media">
                <img src={card.img} alt={card.title} loading="lazy" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <span className="gallery-card__link">Lihat Detail &rarr;</span>
            </button>
          ))}
        </div>
      </div>

      {activeCard && (
        <div className="gallery-modal__backdrop" onClick={closeModal}>
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label={activeCard.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="gallery-modal__close" onClick={closeModal} aria-label="Tutup">
              <Icon id="close" size={18} />
            </button>

            <div className="gallery-modal__scroll">
              <div className="gallery-modal__media">
                <img src={activeCard.img} alt={activeCard.title} />
              </div>

              <div className="gallery-modal__body">
                <h3>{activeCard.title}</h3>
                <p>{activeCard.detail || activeCard.desc}</p>

                {activeCard.paid && !activeCard.types && (
                  <a
                    className="btn btn-whatsapp"
                    href={waLink(`Halo, saya ingin tanya/booking ${activeCard.title} di Kembanglangit Park.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon id="whatsapp" size={18} /> Tanya / Booking via WhatsApp
                  </a>
                )}

                {activeCard.types && activeCard.types.length > 0 && (
                  <>
                    <h4 className="gallery-modal__subtitle">Pilihan Tipe &amp; Harga</h4>
                    <div className="gallery-modal__types">
                      {activeCard.types.map((t) => (
                        <div className="type-card" key={t.id}>
                          <div className="type-card__media">
                            <img src={t.img} alt={t.name} loading="lazy" />
                          </div>
                          <div className="type-card__body">
                            <strong>{t.name}</strong>
                            <span className="type-card__capacity">{t.capacity}</span>
                            <p>{t.features}</p>
                            <div className="type-card__price">
                              {t.priceWeekday ? (
                                <>
                                  <span>Weekday <strong>{formatIDR(t.priceWeekday)}</strong></span>
                                  <span>Weekend <strong>{formatIDR(t.priceWeekend)}</strong></span>
                                </>
                              ) : (
                                <span className="type-card__price--contact">Hubungi untuk harga terbaru</span>
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary btn-whatsapp--small"
                              onClick={() => bookVillaType(t)}
                            >
                              <Icon id="ticket" size={14} /> Booking {t.name}
                            </button>
                            <a
                              className="type-card__wa-link"
                              href={waLink(`Halo, saya ingin tanya ${t.name} di Kurara Forest Kembanglangit Park.`)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Icon id="whatsapp" size={13} /> Tanya via WA
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Packages({ onBooking }) {
  const [active, setActive] = useState('Semua Paket')

  const visible =
    active === 'Semua Paket' ? packages : packages.filter((p) => p.category === active)

  return (
    <section id="paket" className="section packages">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Paket Kunjungan</span>
          <h2>Pilih Paket yang Sesuai Rencana Liburan Anda</h2>
        </div>

        <div className="packages__tabs">
          {packageCategories.map((cat) => (
            <button
              key={cat}
              className={active === cat ? 'is-active' : ''}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="packages__grid">
          {visible.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <div className="package-card__head">
                <div className="package-card__avatar">
                  <img src={pkg.img} alt={pkg.name} />
                </div>
                <div>
                  <h3>{pkg.name}</h3>
                  <span>{pkg.subtitle}</span>
                </div>
              </div>

              <div className="package-card__rating">
                <Icon id="star" size={14} />
                <strong>{pkg.rating}</strong>
                <span>({pkg.reviews} ulasan)</span>
              </div>

              <div className="package-card__foot">
                <span className="package-card__price">{formatIDR(pkg.price)}</span>
                <button className="btn btn-primary" onClick={() => onBooking(pkg)}>Pilih Paket</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceBanner({ onBooking }) {
  return (
    <section id="lokasi" className="experience-banner">
      <div className="container experience-banner__inner">
        <div className="experience-banner__text">
          <h2>Mudah Dijangkau di Kaki Hutan Pinus Blado</h2>
          <p>
            Kembanglangit Park berada di jalur utama Batang-Dieng, mudah diakses dengan
            kendaraan pribadi maupun rombongan. Cek alamat dan jam bukanya sebelum berangkat.
          </p>

          <div className="experience-banner__info">
            <div className="experience-banner__info-item">
              <Icon id="pin" size={20} />
              <div>
                <strong>Alamat</strong>
                <span>{brand.address}</span>
              </div>
            </div>
            <div className="experience-banner__info-item">
              <Icon id="clock" size={20} />
              <div>
                <strong>Jam Operasional</strong>
                <span>{brand.hours}</span>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => onBooking()}>Rencanakan Kunjungan</button>
        </div>
        <div className="experience-banner__image">
          <iframe
            title="Peta lokasi Kembanglangit Park"
            src={brand.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="container trust-strip__grid">
        {trustPoints.map((t) => (
          <div className="trust-strip__item" key={t.title}>
            <span><Icon id={t.icon} size={22} /></span>
            <div>
              <h4>{t.title}</h4>
              <p>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactBar() {
  return (
    <section className="contact-bar">
      <div className="container contact-bar__inner">
        <div className="contact-bar__info">
          <span><Icon id="phone" size={20} /></span>
          <div>
            <strong>Butuh bantuan reservasi rombongan?</strong>
            <span>Tim kami siap membantu setiap hari, {brand.phone}</span>
          </div>
        </div>
        <a className="btn btn-amber" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">
          Hubungi via WhatsApp
        </a>
      </div>
    </section>
  )
}

/* =========================================================================
   EXTRA: Ulasan, Tombol WhatsApp, Drawer Wishlist
   ========================================================================= */

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function ReviewsSection() {
  return (
    <section id="ulasan" className="section reviews">
      <div className="container">
        <div className="section-head">
          <h2>Ulasan &amp; Komentar Pengunjung</h2>
          <p>Cerita langsung dari pengunjung yang sudah healing di Kembanglangit Park.</p>
        </div>

        <div className="reviews__grid">
          {testimonials.map((t) => (
            <div className="review-card" key={t.name}>
              <div className="review-card__stars" aria-label="Rating 5 dari 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} id="star" size={15} />
                ))}
              </div>
              <p className="review-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="review-card__author">
                <span className="review-card__avatar">{initials(t.name)}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews__cta">
          <p>Baru saja berkunjung? Ceritakan pengalaman Anda ke kami.</p>
          <a
            className="btn btn-whatsapp"
            href={waLink('Halo, saya mau kirim ulasan/komentar tentang kunjungan saya di Kembanglangit Park.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon id="whatsapp" size={18} /> Kirim Ulasan via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function WhatsAppButton() {
  const message = encodeURIComponent('Halo Kembanglangit Park, saya ingin tanya-tanya soal kunjungan.')

  return (
    <a
      className="wa-float"
      href={`https://wa.me/62881024553395${brand.whatsapp}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat via WhatsApp"
    >
      <Icon id="whatsapp" size={26} />
    </a>
  )
}

function WishlistDrawer({ open, onClose, onBooking }) {
  const { items, toggle } = useWishlist()
  const saved = featuredFacilities.filter((f) => items.includes(f.id))

  if (!open) return null

  return (
    <div className="wishlist-drawer__backdrop" onClick={onClose}>
      <aside className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-drawer__head">
          <h3>Wishlist Wahana Saya</h3>
          <button onClick={onClose} aria-label="Tutup wishlist">
            <Icon id="close" size={20} />
          </button>
        </div>

        {saved.length === 0 ? (
          <p className="wishlist-drawer__empty">
            Belum ada wahana favorit. Tekan ikon hati pada kartu wahana untuk menyimpannya di sini.
          </p>
        ) : (
          <ul className="wishlist-drawer__list">
            {saved.map((f) => (
              <li key={f.id}>
                <div>
                  <strong>{f.name}</strong>
                  <span>{formatIDR(f.price)}</span>
                </div>
                <button onClick={() => toggle(f.id)} aria-label={`Hapus ${f.name} dari wishlist`}>
                  <Icon id="close" size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {saved.length > 0 && (
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              onClose()
              onBooking()
            }}
          >
            Booking Wahana Ini
          </button>
        )}
      </aside>
    </div>
  )
}

/* =========================================================================
   BOOKING: Struk (Receipt) & Halaman Booking
   ========================================================================= */

function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function Receipt({ order, onNewOrder }) {
  const isQris = order.paymentMethod === 'qris'

  return (
    <div className="receipt-modal__backdrop" onClick={onNewOrder}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-modal__scroll">
          {/* Struk model kertas kasir: header 200x960, footer 120x960, logo 120x120 sesuai ketentuan tugas */}
          <div className="receipt">
            <button
              type="button"
              className="receipt__close no-print"
              onClick={onNewOrder}
              aria-label="Tutup struk"
            >
              &times;
            </button>

            <div className="receipt__header">
              <div className="receipt__logo">
                <img src="/logowebKembanglangit.png" alt="Logo PT Kurara Wisata Lestari" />
              </div>
              <div className="receipt__header-text">
                <strong>PT KURARA WISATA LESTARI</strong>
                <span>{brand.name}</span>
              </div>
            </div>

            <div className="receipt__body">
              <div className="receipt__meta">
                <span>{order.invoiceNumber}</span>
                <span>{formatDate(order.date)}</span>
              </div>
              {order.packageName && <div className="receipt__package">Paket: {order.packageName}</div>}

              <div className="receipt__visitor">
                <div><span>Pemesan</span><strong>{order.visitor.name}</strong></div>
                {order.dateLines.map((dl) => (
                  <div key={dl.label}><span>{dl.label}</span><strong>{dl.value}</strong></div>
                ))}
              </div>

              <table className="receipt__table">
                <tbody>
                  {order.lineItems.map((li) => (
                    <tr key={li.id}>
                      <td className="receipt__item-name">{li.label}<span>{li.qty} &times; {formatIDR(li.price)}</span></td>
                      <td className="receipt__item-sub">{formatIDR(li.price * li.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="receipt__totals">
                <div><span>Subtotal</span><span>{formatIDR(order.subtotal)}</span></div>
                <div><span>PPN (10%)</span><span>{formatIDR(order.ppn)}</span></div>
                <div className="receipt__grand-total"><span>Total</span><span>{formatIDR(order.total)}</span></div>
              </div>

              <div className={`receipt__status ${isQris ? 'is-qris' : 'is-tunai'}`}>
                <span className="receipt__status-dot" />
                {isQris ? 'Pembayaran QRIS — Berhasil' : 'Pembayaran Tunai — Bayar di Loket'}
              </div>

              {order.notes && <p className="receipt__notes">{order.notes}</p>}

              <p className="receipt__thanks">Terima kasih atas kunjungan Anda</p>
            </div>

            <div className="receipt__footer">
              <span>{brand.address}</span>
              <span>{brand.phone} &middot; {brand.email}</span>
            </div>
          </div>

          <div className="receipt-modal__actions no-print">
            <button className="btn btn-outline" onClick={onNewOrder}>&larr; Buat Pesanan Baru</button>
            <button className="btn btn-primary" onClick={() => window.print()}>Cetak / Simpan PDF</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function isWeekend(dateStr) {
  if (!dateStr) return false
  const day = new Date(dateStr).getDay()
  return day === 0 || day === 6
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}


const PACKAGE_ADDON_MAP = {
  keluarga: ['dino-ride', 'forest-train'],
  ekstrem: ['avante-coaster', 'rainbow-slide'],
  'balon-sultan': ['balon-sultan'],
}

function BookingSection({ onClose, initialPackage }) {
  const { user } = useAuth()

  const [mode, setMode] = useState(initialPackage?.category === 'Staycation' ? 'staycation' : 'tiket')
  const [activePackage, setActivePackage] = useState(initialPackage || null)

  useEffect(() => {
    if (initialPackage) {
      setActivePackage(initialPackage)
      setMode(initialPackage.category === 'Staycation' ? 'staycation' : 'tiket')
      if (initialPackage.villaId) setVillaId(initialPackage.villaId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPackage])

  const [phone, setPhone] = useState(user?.phone || '')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('qris')
  const [order, setOrder] = useState(null)

  // ----- Mode: Tiket Harian & Wahana -----
  const [visitDate, setVisitDate] = useState(todayISO())
  const [childCount, setChildCount] = useState(0)
  const [adultCount, setAdultCount] = useState(0)
  const [addOns, setAddOns] = useState(() => {
    const preset = PACKAGE_ADDON_MAP[initialPackage?.id] || initialPackage?.addOnIds
    return preset ? Object.fromEntries(preset.map((id) => [id, 1])) : {}
  })

  const ticket = isWeekend(visitDate) ? entryTickets[1] : entryTickets[0]
  const groupTotal = childCount + adultCount
  const minGroupSize = activePackage?.minGroupSize || 0

  function changeAddOn(id, delta) {
    setAddOns((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta)
      return { ...prev, [id]: next }
    })
  }

  const entryTotal = ticket.child * childCount + ticket.adult * adultCount

  const addOnLines = useMemo(
    () =>
      featuredFacilities
        .filter((f) => addOns[f.id] > 0)
        .map((f) => ({ ...f, qty: addOns[f.id] })),
    [addOns]
  )

  const addOnTotal = addOnLines.reduce((sum, f) => sum + f.price * f.qty, 0)
  const ticketSubtotal = entryTotal + addOnTotal
  const ticketPpn = Math.round(ticketSubtotal * PPN_RATE)
  const ticketTotal = ticketSubtotal + ticketPpn

  // ----- Mode: Staycation / Villa -----
  const [villaId, setVillaId] = useState(villaTypes[0].id)
  const [checkInDate, setCheckInDate] = useState(todayISO())
  const [nights, setNights] = useState(0)
  const [stayAdultCount, setStayAdultCount] = useState(0)
  const [stayChildCount, setStayChildCount] = useState(0)
  const [stayAddOns, setStayAddOns] = useState({})
  const [stayWahana, setStayWahana] = useState({})

  const villa = villaTypes.find((v) => v.id === villaId) || villaTypes[0]
  const villaIsWeekend = isWeekend(checkInDate)
  const villaPricePerNight = villaIsWeekend ? villa.priceWeekend : villa.priceWeekday
  const villaAvailable = villaPricePerNight != null

  function changeStayAddOn(id, delta) {
    setStayAddOns((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta)
      return { ...prev, [id]: next }
    })
  }

  function changeStayWahana(id, delta) {
    setStayWahana((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta)
      return { ...prev, [id]: next }
    })
  }

  const villaSubtotal = villaAvailable ? villaPricePerNight * nights : 0

  const stayAddOnLines = useMemo(
    () =>
      staycationAddOns
        .filter((a) => stayAddOns[a.id] > 0)
        .map((a) => ({ ...a, qty: stayAddOns[a.id] })),
    [stayAddOns]
  )
  const stayAddOnTotal = stayAddOnLines.reduce((sum, a) => sum + a.price * a.qty, 0)

  const stayWahanaLines = useMemo(
    () =>
      featuredFacilities
        .filter((f) => stayWahana[f.id] > 0)
        .map((f) => ({ ...f, qty: stayWahana[f.id] })),
    [stayWahana]
  )
  const stayWahanaTotal = stayWahanaLines.reduce((sum, f) => sum + f.price * f.qty, 0)

  const staySubtotal = villaSubtotal + stayAddOnTotal + stayWahanaTotal
  const stayPpn = Math.round(staySubtotal * PPN_RATE)
  const stayTotal = staySubtotal + stayPpn

  // ----- Ringkasan aktif sesuai mode -----
  const subtotal = mode === 'staycation' ? staySubtotal : ticketSubtotal
  const ppn = mode === 'staycation' ? stayPpn : ticketPpn
  const total = mode === 'staycation' ? stayTotal : ticketTotal
  const canCheckout =
    mode === 'staycation'
      ? villaAvailable && nights > 0 && subtotal > 0
      : subtotal > 0 && groupTotal >= minGroupSize

  function handleCheckout(e) {
    e.preventDefault()
    if (!canCheckout) return

    const invoiceNumber = `KLP-${Date.now().toString().slice(-8)}`
    const visitor = { name: user?.name || 'Pengunjung', email: user?.email || '-', phone }

    if (mode === 'staycation') {
      const lineItems = [
        {
          id: villa.id,
          label: `${villa.name} — ${villaIsWeekend ? 'tarif weekend' : 'tarif weekday'}`,
          qty: nights,
          price: villaPricePerNight,
        },
        ...stayWahanaLines.map((f) => ({ id: f.id, label: `Wahana ${f.name}`, qty: f.qty, price: f.price })),
        ...stayAddOnLines.map((a) => ({ id: a.id, label: a.name, qty: a.qty, price: a.price })),
      ]

      setOrder({
        invoiceNumber,
        date: new Date(),
        visitor,
        packageName: activePackage?.name || `Staycation ${villa.name}`,
        dateLines: [
          { label: 'Check-in', value: checkInDate },
          { label: 'Lama Menginap', value: `${nights} malam` },
          { label: 'Tamu', value: `${stayAdultCount} dewasa, ${stayChildCount} anak` },
        ],
        lineItems,
        subtotal,
        ppn,
        total,
        paymentMethod,
        notes,
      })
    } else {
      const lineItems = [
        { id: 'tiket-anak', label: `Tiket Masuk Anak-anak (${ticket.label})`, qty: childCount, price: ticket.child },
        { id: 'tiket-dewasa', label: `Tiket Masuk Dewasa (${ticket.label})`, qty: adultCount, price: ticket.adult },
        ...addOnLines.map((f) => ({ id: f.id, label: `Wahana ${f.name}`, qty: f.qty, price: f.price })),
      ].filter((li) => li.qty > 0)

      setOrder({
        invoiceNumber,
        date: new Date(),
        visitor,
        packageName: activePackage?.name || null,
        dateLines: [{ label: 'Tanggal Kunjungan', value: visitDate }],
        lineItems,
        subtotal,
        ppn,
        total,
        paymentMethod,
        notes,
      })
    }
  }

  return (
    <section className="booking-page">
      <div className="container booking-page__inner">
        {onClose && (
          <button
            type="button"
            className="booking-page__close"
            onClick={onClose}
            aria-label="Tutup halaman booking"
          >
            <Icon id="close" size={18} />
          </button>
        )}

        <div className="booking-page__head">
          <span className="eyebrow">Transaksi</span>
          <h1>Booking Tiket Kembanglangit Park</h1>
          <p>
            Anda masuk sebagai <strong>{user?.name || 'Pengunjung'}</strong>. Data diri otomatis
            terisi karena Anda sudah login, jadi tidak perlu mengisi ulang.
          </p>
        </div>

        <div className="booking-mode-tabs">
          <button
            type="button"
            className={mode === 'tiket' ? 'is-active' : ''}
            onClick={() => setMode('tiket')}
          >
            <Icon id="ticket" size={16} /> Tiket Harian &amp; Wahana
          </button>
          <button
            type="button"
            className={mode === 'staycation' ? 'is-active' : ''}
            onClick={() => setMode('staycation')}
          >
            <Icon id="mountain" size={16} /> Staycation / Villa
          </button>
        </div>

        {activePackage && (
          <div className="booking-package-banner">
            <div>
              <span>Paket dipilih</span>
              <strong>{activePackage.name}</strong>
              <span>{activePackage.subtitle}</span>
            </div>
            <button type="button" onClick={() => setActivePackage(null)}>
              Ganti paket
            </button>
          </div>
        )}

        <form className="booking-layout" onSubmit={handleCheckout}>
          <div className="booking-main">
            {mode === 'tiket' ? (
              <>
                <div className="card booking-block">
                  <h3>1. Tanggal Kunjungan</h3>
                  <label className="booking-field">
                    <span>Pilih tanggal</span>
                    <input
                      type="date"
                      value={visitDate}
                      min={todayISO()}
                      onChange={(e) => setVisitDate(e.target.value)}
                      required
                    />
                  </label>
                  <p className="booking-hint">
                    Tarif yang berlaku: <strong>{ticket.label}</strong> — {ticket.includes}
                  </p>
                </div>

                <div className="card booking-block">
                  <h3>2. Jumlah Tiket Masuk</h3>
                  {minGroupSize > 0 && (
                    <p className="booking-hint">
                      Paket ini berlaku untuk rombongan minimal <strong>{minGroupSize} orang</strong>
                      {groupTotal > 0 && groupTotal < minGroupSize && (
                        <> — saat ini baru {groupTotal} orang.</>
                      )}
                    </p>
                  )}
                  <div className="ticket-row">
                    <div>
                      <strong>Anak-anak</strong>
                      <span>{formatIDR(ticket.child)} / orang</span>
                    </div>
                    <div className="qty-control">
                      <button type="button" onClick={() => setChildCount((c) => Math.max(0, c - 1))}>-</button>
                      <span>{childCount}</span>
                      <button type="button" onClick={() => setChildCount((c) => c + 1)}>+</button>
                    </div>
                  </div>
                  <div className="ticket-row">
                    <div>
                      <strong>Dewasa</strong>
                      <span>{formatIDR(ticket.adult)} / orang</span>
                    </div>
                    <div className="qty-control">
                      <button type="button" onClick={() => setAdultCount((c) => Math.max(0, c - 1))}>-</button>
                      <span>{adultCount}</span>
                      <button type="button" onClick={() => setAdultCount((c) => c + 1)}>+</button>
                    </div>
                  </div>
                </div>

                <div className="card booking-block">
                  <h3>3. Tambah Wahana (opsional)</h3>
                  <div className="addon-list">
                    {featuredFacilities.map((f) => (
                      <div className="addon-row" key={f.id}>
                        <div>
                          <strong>{f.name}</strong>
                          <span>{formatIDR(f.price)} / orang</span>
                        </div>
                        <div className="qty-control">
                          <button type="button" onClick={() => changeAddOn(f.id, -1)}>-</button>
                          <span>{addOns[f.id] || 0}</span>
                          <button type="button" onClick={() => changeAddOn(f.id, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card booking-block">
                  <h3>1. Pilih Villa / Cabin</h3>
                  <p className="booking-hint">
                    Tamu yang menginap otomatis mendapat tiket masuk gratis (termasuk kolam renang),
                    tidak termasuk tiket wahana seperti Rainbow Slide atau Forest Train.
                  </p>
                  <div className="villa-list">
                    {villaTypes.map((v) => {
                      const priceNow = villaIsWeekend ? v.priceWeekend : v.priceWeekday
                      return (
                        <label
                          key={v.id}
                          className={`villa-option ${villaId === v.id ? 'is-active' : ''}`}
                        >
                          <input
                            type="radio"
                            name="villaType"
                            value={v.id}
                            checked={villaId === v.id}
                            onChange={() => setVillaId(v.id)}
                          />
                          <div className="villa-option__img">
                            <img src={v.img} alt={v.name} />
                          </div>
                          <div className="villa-option__body">
                            <strong>{v.name}</strong>
                            <span>{v.capacity}</span>
                            <span>{v.features}</span>
                          </div>
                          <div className="villa-option__price">
                            {priceNow != null ? (
                              <>
                                <strong>{formatIDR(priceNow)}</strong>
                                <span>/ malam</span>
                              </>
                            ) : (
                              <span>Hubungi kami</span>
                            )}
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>

                <div className="card booking-block">
                  <h3>2. Tanggal &amp; Tamu</h3>
                  <div className="booking-field-grid">
                    <label className="booking-field">
                      <span>Check-in</span>
                      <input
                        type="date"
                        value={checkInDate}
                        min={todayISO()}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                      />
                    </label>
                    <label className="booking-field">
                      <span>Jumlah malam</span>
                      <input
                        type="number"
                        min={0}
                        value={nights}
                        onChange={(e) => setNights(Math.max(0, Number(e.target.value) || 0))}
                        required
                      />
                    </label>
                  </div>
                  <p className="booking-hint">
                    Tarif berlaku: <strong>{villaIsWeekend ? 'Weekend / Libur Nasional' : 'Weekday'}</strong>.
                    Check-in 14.00 WIB, check-out 12.00 WIB.
                  </p>
                  <div className="ticket-row">
                    <div>
                      <strong>Dewasa</strong>
                    </div>
                    <div className="qty-control">
                      <button type="button" onClick={() => setStayAdultCount((c) => Math.max(0, c - 1))}>-</button>
                      <span>{stayAdultCount}</span>
                      <button type="button" onClick={() => setStayAdultCount((c) => c + 1)}>+</button>
                    </div>
                  </div>
                  <div className="ticket-row">
                    <div>
                      <strong>Anak-anak</strong>
                    </div>
                    <div className="qty-control">
                      <button type="button" onClick={() => setStayChildCount((c) => Math.max(0, c - 1))}>-</button>
                      <span>{stayChildCount}</span>
                      <button type="button" onClick={() => setStayChildCount((c) => c + 1)}>+</button>
                    </div>
                  </div>
                </div>

                <div className="card booking-block">
                  <h3>3. Tambahan (opsional)</h3>
                  <div className="addon-list">
                    {staycationAddOns.map((a) => (
                      <div className="addon-row" key={a.id}>
                        <div>
                          <strong>{a.name}</strong>
                          <span>{formatIDR(a.price)} / {a.unit}</span>
                        </div>
                        <div className="qty-control">
                          <button type="button" onClick={() => changeStayAddOn(a.id, -1)}>-</button>
                          <span>{stayAddOns[a.id] || 0}</span>
                          <button type="button" onClick={() => changeStayAddOn(a.id, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                    {featuredFacilities.map((f) => (
                      <div className="addon-row" key={f.id}>
                        <div>
                          <strong>Wahana {f.name}</strong>
                          <span>{formatIDR(f.price)} / orang</span>
                        </div>
                        <div className="qty-control">
                          <button type="button" onClick={() => changeStayWahana(f.id, -1)}>-</button>
                          <span>{stayWahana[f.id] || 0}</span>
                          <button type="button" onClick={() => changeStayWahana(f.id, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="card booking-block">
              <h3>4. Metode Pembayaran</h3>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'qris' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="qris"
                    checked={paymentMethod === 'qris'}
                    onChange={() => setPaymentMethod('qris')}
                  />
                  <span className="payment-option__icon">
                    <Icon id="qris" size={20} />
                  </span>
                  <span className="payment-option__text">
                    <strong>QRIS</strong>
                    <span>Scan &amp; bayar dari e-wallet atau m-banking apa saja</span>
                  </span>
                </label>

                <label className={`payment-option ${paymentMethod === 'tunai' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="tunai"
                    checked={paymentMethod === 'tunai'}
                    onChange={() => setPaymentMethod('tunai')}
                  />
                  <span className="payment-option__icon">
                    <Icon id="cash" size={20} />
                  </span>
                  <span className="payment-option__text">
                    <strong>Tunai</strong>
                    <span>Bayar langsung di loket saat kunjungan</span>
                  </span>
                </label>
              </div>

              {paymentMethod === 'qris' ? (
                <div className="payment-qris">
                  <img src="/qris-pembayaran.jpg" alt="Kode QRIS pembayaran Kembanglangit Park" />
                  <p>
                    Scan kode QRIS di atas untuk membayar, lalu simpan bukti pembayaran. Struk akan
                    tetap diterbitkan setelah Anda menekan tombol pesan di bawah.
                  </p>
                </div>
              ) : (
                <p className="booking-hint">
                  Total pembayaran ditagihkan tunai di loket pada tanggal kunjungan Anda. Tunjukkan
                  struk ini (cetak atau digital) kepada petugas.
                </p>
              )}
            </div>

            <div className="card booking-block">
              <h3>5. Data Pemesan</h3>
              <div className="booking-field-grid">
                <label className="booking-field">
                  <span>Nama</span>
                  <input type="text" value={user?.name || ''} readOnly disabled />
                </label>
                <label className="booking-field">
                  <span>Email</span>
                  <input type="email" value={user?.email || ''} readOnly disabled />
                </label>
                <label className="booking-field">
                  <span>No. WhatsApp</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </label>
              </div>
              <label className="booking-field">
                <span>Catatan (opsional)</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="cth. rombongan sekolah, butuh kursi roda, dll."
                  rows={3}
                />
              </label>
            </div>
          </div>

          <aside className="booking-summary card">
            <h3>Ringkasan Pemesanan</h3>

            {mode === 'tiket' ? (
              <>
                <div className="booking-summary__line">
                  <span>Tiket masuk ({childCount} anak, {adultCount} dewasa)</span>
                  <span>{formatIDR(entryTotal)}</span>
                </div>
                {addOnLines.map((f) => (
                  <div className="booking-summary__line" key={f.id}>
                    <span>{f.name} x{f.qty}</span>
                    <span>{formatIDR(f.price * f.qty)}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="booking-summary__line">
                  <span>{villa.name} x{nights} malam</span>
                  <span>{villaAvailable ? formatIDR(villaSubtotal) : 'Hubungi kami'}</span>
                </div>
                {stayWahanaLines.map((f) => (
                  <div className="booking-summary__line" key={f.id}>
                    <span>Wahana {f.name} x{f.qty}</span>
                    <span>{formatIDR(f.price * f.qty)}</span>
                  </div>
                ))}
                {stayAddOnLines.map((a) => (
                  <div className="booking-summary__line" key={a.id}>
                    <span>{a.name} x{a.qty}</span>
                    <span>{formatIDR(a.price * a.qty)}</span>
                  </div>
                ))}
              </>
            )}

            <div className="booking-summary__divider" />

            <div className="booking-summary__line">
              <span>Subtotal</span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            <div className="booking-summary__line">
              <span>PPN (10%)</span>
              <span>{formatIDR(ppn)}</span>
            </div>

            <div className="booking-summary__total">
              <span>Total Bayar</span>
              <span>{formatIDR(total)}</span>
            </div>

            <div className="booking-summary__line booking-summary__line--payment">
              <span>Metode Pembayaran</span>
              <span>{paymentMethod === 'qris' ? 'QRIS' : 'Tunai (di loket)'}</span>
            </div>

            {mode === 'tiket' && minGroupSize > 0 && groupTotal < minGroupSize && (
              <p className="booking-summary__note">Minimal {minGroupSize} orang untuk paket ini.</p>
            )}
            {mode === 'staycation' && !villaAvailable && (
              <p className="booking-summary__note">
                Tipe villa ini harga on-request, silakan hubungi kami via WhatsApp untuk konfirmasi.
              </p>
            )}
            {mode === 'staycation' && villaAvailable && nights === 0 && (
              <p className="booking-summary__note">Isi jumlah malam menginap terlebih dahulu.</p>
            )}

            <button type="submit" className="btn btn-primary btn-block" disabled={!canCheckout}>
              <Icon id="ticket" size={17} /> Buat Pesanan &amp; Terbitkan Struk
            </button>
            <p className="booking-summary__note">
              PPN 10% berlaku karena transaksi ini adalah tiket layanan wisata, bukan pengiriman
              barang fisik.
            </p>
          </aside>
        </form>
      </div>

      {order && <Receipt order={order} onNewOrder={() => setOrder(null)} />}
    </section>
  )
}

/* =========================================================================
   APP SHELL — Home, SiteShell, Gate, App
   ========================================================================= */

function HomePage({ onBooking }) {
  return (
    <>
      <Hero onBooking={onBooking} />
      <About onBooking={onBooking} />
      <FeaturedWahana />
      <FacilitiesGrid onBooking={onBooking} />
      <CTABanner onBooking={onBooking} />
      <GalleryWahana onBooking={onBooking} />
      <Packages onBooking={onBooking} />
      <ExperienceBanner onBooking={onBooking} />
      <TrustStrip />
      <ReviewsSection />
      <ContactBar />
    </>
  )
}

function SiteShell() {
  const [page, setPage] = useState('home') // 'home' | 'booking'
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)

  function goToBooking(pkg) {
    setSelectedPackage(pkg || null)
    setPage('booking')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeBooking() {
    setPage('home')
    setSelectedPackage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNavigate(nextPage) {
    if (nextPage !== 'booking') setSelectedPackage(null)
    setPage(nextPage)
  }

  return (
    <WishlistProvider>
      <TopBar />
      <Navbar page={page} onNavigate={handleNavigate} onOpenWishlist={() => setWishlistOpen(true)} />

      {page === 'home' ? (
        <HomePage onBooking={goToBooking} />
      ) : (
        <BookingSection onClose={closeBooking} initialPackage={selectedPackage} />
      )}

      <Footer />
      <WhatsAppButton />
      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onBooking={goToBooking}
      />
    </WishlistProvider>
  )
}

function Gate() {
  const { user, ready } = useAuth()

  if (!ready) return null
  if (!user) return <LoginGate />
  return <SiteShell />
}

function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}

export default App
