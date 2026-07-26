import { formatCurrency, type MenuItem } from "../../data/menu";

function PriceLine({
  hotPrice,
  icePrice,
}: {
  hotPrice?: number;
  icePrice?: number;
}) {
  if (hotPrice != null && icePrice != null) {
    return (
      <div className="mt-3 flex items-center gap-4 font-body text-sm text-cream/80">
        <span>
          <span className="text-cream/40">Hot </span>
          {formatCurrency(hotPrice)}
        </span>
        <span>
          <span className="text-cream/40">Ice </span>
          {formatCurrency(icePrice)}
        </span>
      </div>
    );
  }

  const price = hotPrice ?? icePrice;
  if (price == null) return null;

  return (
    <div className="mt-3 font-body text-sm text-cream/80">
      {formatCurrency(price)}
    </div>
  );
}

export default function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div
      data-reveal
      className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 transition-colors duration-300 hover:border-amber/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-extrabold text-lg uppercase tracking-[0.02em] leading-[1.1] text-cream">
          {item.name}
        </h3>
        <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
          {item.signature && (
            <span
              title="Signature"
              className="flex h-5 w-5 items-center justify-center rounded-full border border-amber/40 text-[10px] text-amber"
            >
              ★
            </span>
          )}
          {item.spicy && (
            <span title="Pedas" className="text-sm leading-none">
              🌶️
            </span>
          )}
        </div>
      </div>

      {item.variantNote && (
        <p className="mt-1.5 font-body text-[11px] uppercase tracking-[0.15em] text-muted">
          {item.variantNote}
        </p>
      )}

      {item.description && (
        <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-cream/60">
          {item.description}
        </p>
      )}

      {item.availability && (
        <p className="mt-2 font-body text-xs italic text-cream/40">
          {item.availability}
        </p>
      )}

      <PriceLine hotPrice={item.hotPrice} icePrice={item.icePrice} />
    </div>
  );
}
