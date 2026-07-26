export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-ink px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <span className="font-display font-extrabold text-xl uppercase tracking-wide text-cream">
              Memory<span className="text-amber">.</span> Coffee
            </span>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-cream/55">
              Kedai kopi di Palembang — ruang buat menyimpan momen terbaikmu.
            </p>
            <a
              href="https://instagram.com/memorycoffee.idn"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-body text-sm text-cream/70 transition-colors hover:text-amber"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
              </svg>
              @memorycoffee.idn
            </a>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-cream/45">
              Jam Buka
            </p>
            <p className="mt-3 font-body text-sm text-cream/70">Setiap hari</p>
            <p className="font-body text-sm text-cream/70">08.00 &ndash; 22.00</p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-cream/45">Cabang</p>
            <p className="mt-3 font-body text-sm text-cream/70">Palembang &middot; Lorok Pakjo</p>
            <p className="font-body text-sm text-cream/70">Pekanbaru</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 font-body text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {year} Memory Coffee. Semua hak dilindungi.</span>
          <span>Dibuat dengan secangkir kopi di Palembang.</span>
        </div>
      </div>
    </footer>
  );
}
