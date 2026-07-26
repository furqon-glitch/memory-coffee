import { useEffect, useMemo, useState } from "react";
import { TABLES, WA_NUMBER } from "../lib/orderConstants";
import { pauseSmoothScroll, resumeSmoothScroll } from "../lib/smoothScroll";
import {
  MENU_CATEGORIES,
  ORDERABLE_MENU,
  formatCurrency,
  type MenuCategory,
} from "../data/menu";

type OrderType = "dine-in" | "takeaway" | null;
type Step = "type" | "table" | "menu" | "details";

const ALL_STEPS: Step[] = ["type", "table", "menu", "details"];

const STEP_LABEL: Record<Step, string> = {
  type: "Tipe Order",
  table: "Nomor Meja",
  menu: "Pilih Menu",
  details: "Data Pemesan",
};

function CupIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8h13l-.9 9.1a3 3 0 0 1-3 2.9H7.9a3 3 0 0 1-3-2.9L4 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 5c0-1 .8-1 .8-2M12 5c0-1 .8-1 .8-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function OrderSekarang() {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [orderType, setOrderType] = useState<OrderType>(null);
  const [table, setTable] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [menuCategory, setMenuCategory] = useState<MenuCategory>(
    MENU_CATEGORIES[0]
  );

  const steps = useMemo(
    () => ALL_STEPS.filter((s) => !(s === "table" && orderType === "takeaway")),
    [orderType]
  );
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];

  const menuItemsInCategory = useMemo(
    () => ORDERABLE_MENU.filter((item) => item.category === menuCategory),
    [menuCategory]
  );

  const cartItems = useMemo(
    () =>
      ORDERABLE_MENU.filter((item) => cart[item.skuId] > 0).map((item) => ({
        ...item,
        qty: cart[item.skuId],
      })),
    [cart]
  );
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    pauseSmoothScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      resumeSmoothScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setStepIndex(0);
    setOrderType(null);
    setTable(null);
    setCart({});
    setName("");
    setNote("");
    setMenuCategory(MENU_CATEGORIES[0]);
  }

  function addQty(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }

  function removeQty(id: string) {
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      if (next[id] <= 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  }

  function canGoNext() {
    if (currentStep === "type") return orderType !== null;
    if (currentStep === "table") return table !== null;
    if (currentStep === "menu") return cartItems.length > 0;
    return true;
  }

  function goNext() {
    if (!canGoNext()) return;
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function handleCheckout() {
    if (!name.trim()) return;

    const lines = [
      "Halo Memory Coffee, saya mau order:",
      "",
      `Tipe: ${
        orderType === "dine-in" ? `Dine In (Meja ${table})` : "Take Away"
      }`,
      `Nama: ${name.trim()}`,
    ];
    if (note.trim()) lines.push(`Catatan: ${note.trim()}`);
    lines.push("", "Pesanan:");
    cartItems.forEach((item, i) => {
      const label = item.variantLabel ? `${item.name} (${item.variantLabel})` : item.name;
      lines.push(
        `${i + 1}. ${label} x${item.qty} = ${formatCurrency(item.price * item.qty)}`
      );
    });
    lines.push("", `Total: ${formatCurrency(total)}`);

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
    window.open(url, "_blank", "noreferrer");
    close();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="fixed bottom-6 right-4 z-[90] flex items-center gap-2 rounded-full bg-amber px-5 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-ink shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.05] sm:right-8 sm:px-6 sm:py-4 sm:text-sm"
      >
        <CupIcon />
        Order Sekarang
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-cream/10 bg-ink shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5 sm:px-8">
              <div>
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
                  Langkah {stepIndex + 1} dari {steps.length}
                </span>
                <h3 className="mt-1 font-display font-extrabold text-xl uppercase tracking-[0.02em] text-cream sm:text-2xl">
                  {STEP_LABEL[currentStep]}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Tutup"
                onClick={close}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/10 text-cream/70 transition-colors hover:border-amber/40 hover:text-amber"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 5l14 14M19 5 5 19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Category tabs — sticky sub-header, only on the menu step */}
            {currentStep === "menu" && (
              <div className="border-b border-cream/10 px-6 pb-3 pt-4 sm:px-8">
                <div
                  data-lenis-prevent
                  className="scrollbar-hide -mx-1 flex flex-nowrap gap-1.5 overflow-x-auto overscroll-x-contain px-1 touch-pan-x [-webkit-overflow-scrolling:touch]"
                >
                  {MENU_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setMenuCategory(category)}
                      className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                        menuCategory === category
                          ? "border-amber bg-amber/10 text-amber"
                          : "border-cream/10 text-cream/60 hover:border-cream/30"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Body — scrolls on its own; data-lenis-prevent + overscroll-contain
                stop the scroll gesture from bleeding through to the page behind. */}
            <div
              data-lenis-prevent
              className="max-h-[70vh] flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8"
            >
              {currentStep === "type" && (
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { value: "dine-in", label: "Dine In" },
                      { value: "takeaway", label: "Take Away" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setOrderType(opt.value)}
                      className={`rounded-2xl border px-4 py-6 font-body text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                        orderType === opt.value
                          ? "border-amber bg-amber/10 text-amber"
                          : "border-cream/10 text-cream/70 hover:border-cream/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === "table" && (
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
                  {TABLES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTable(t)}
                      className={`rounded-xl border py-3 font-body text-sm transition-colors ${
                        table === t
                          ? "border-amber bg-amber/10 text-amber"
                          : "border-cream/10 text-cream/70 hover:border-cream/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === "menu" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    {menuItemsInCategory.map((item) => {
                      const qty = cart[item.skuId] ?? 0;
                      return (
                        <div
                          key={item.skuId}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-cream/10 bg-cream/[0.03] p-4"
                        >
                          <div>
                            {item.variantLabel && (
                              <span className="inline-block rounded-full border border-amber/30 px-2.5 py-0.5 font-body text-[9px] uppercase tracking-[0.2em] text-amber">
                                {item.variantLabel}
                              </span>
                            )}
                            <h4 className="mt-2 font-display font-bold text-base text-cream">
                              {item.name}
                            </h4>
                            <p className="mt-1 font-body text-xs text-cream/50">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <button
                              type="button"
                              onClick={() => removeQty(item.skuId)}
                              disabled={!qty}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors disabled:opacity-30 enabled:hover:border-amber/40 enabled:hover:text-amber"
                            >
                              −
                            </button>
                            <span className="w-4 text-center font-body text-sm text-cream">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => addQty(item.skuId)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-amber/40 hover:text-amber"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="flex items-center justify-between border-t border-cream/10 pt-4">
                      <span className="font-body text-xs uppercase tracking-[0.2em] text-muted">
                        Total ({cartItems.reduce((n, i) => n + i.qty, 0)} item)
                      </span>
                      <span className="font-display font-extrabold text-lg text-amber">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {currentStep === "details" && (
                <div className="flex flex-col gap-5">
                  <label className="flex flex-col gap-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-muted">
                      Nama Pemesan
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama kamu"
                      className="rounded-xl border border-cream/15 bg-cream/[0.03] px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:border-amber/50 focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-muted">
                      Catatan (opsional)
                    </span>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Contoh: less sugar, tanpa es"
                      rows={2}
                      className="resize-none rounded-xl border border-cream/15 bg-cream/[0.03] px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:border-amber/50 focus:outline-none"
                    />
                  </label>

                  <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-4">
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-muted">
                      Ringkasan
                    </span>
                    <p className="mt-2 font-body text-sm text-cream/80">
                      {orderType === "dine-in"
                        ? `Dine In — Meja ${table}`
                        : "Take Away"}
                    </p>
                    <ul className="mt-3 flex flex-col gap-1">
                      {cartItems.map((item) => (
                        <li
                          key={item.skuId}
                          className="flex justify-between font-body text-sm text-cream/70"
                        >
                          <span>
                            {item.name}
                            {item.variantLabel ? ` (${item.variantLabel})` : ""} x
                            {item.qty}
                          </span>
                          <span>{formatCurrency(item.price * item.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-cream/10 pt-3">
                      <span className="font-body text-xs uppercase tracking-[0.2em] text-muted">
                        Total
                      </span>
                      <span className="font-display font-extrabold text-lg text-amber">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer nav */}
            <div className="flex items-center justify-between gap-3 border-t border-cream/10 px-6 py-5 sm:px-8">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0}
                className="rounded-full border border-cream/15 px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-cream/70 transition-colors disabled:opacity-0 enabled:hover:border-cream/30"
              >
                Kembali
              </button>

              {currentStep === "details" ? (
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={!name.trim()}
                  className="rounded-full bg-amber px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-200 enabled:hover:scale-[1.03] disabled:opacity-40"
                >
                  Checkout via WhatsApp
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNext()}
                  className="rounded-full bg-amber px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-transform duration-200 enabled:hover:scale-[1.03] disabled:opacity-40"
                >
                  Lanjut
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
