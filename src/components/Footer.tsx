export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-[60px] border-t border-[rgba(157,78,221,0.5)] p-10 text-center opacity-60">
      <div className="mb-2 text-base font-semibold text-white">
        CHRISTMAS AI WORKSHOP
      </div>
      <div className="mb-4 text-xs text-[rgba(255,255,255,0.7)]">
        Master AI Tools for Your Business
      </div>
      <div className="text-[11px] tracking-wide text-[rgba(255,255,255,0.7)]">
        Produced By Danny McMillan | CURV Tools | A Seller Sessions Production{" "}
        {currentYear}
      </div>
    </footer>
  );
}
