export default function Header() {
  return (
    <div className="relative mx-auto mt-5 max-w-[1000px] w-full overflow-hidden rounded-[18px] border-[1.5px] border-[rgba(157,78,221,0.5)] bg-gradient-to-b from-[rgb(18,11,41)] via-[rgb(13,18,41)] via-40% to-[rgb(4,16,32)] to-70% px-10 py-10 text-center backdrop-blur-[10px]">
      <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-[headerRotate_30s_linear_infinite] bg-[radial-gradient(circle,rgba(157,78,221,0.3)_0%,transparent_70%)] opacity-30" />
      <div className="relative z-10">
        <h1 className="m-0 text-[56px] font-bold leading-none tracking-[-1.5px] [text-shadow:0_0_25px_rgba(255,255,255,0.6),0_0_50px_rgba(255,255,255,0.4),0_0_100px_rgba(157,78,221,0.4)]">
          CHRISTMAS AI WORKSHOP
        </h1>
        <p className="mx-0 mb-2 mt-2.5 text-[17px] text-[rgba(255,255,255,0.8)]">
          Master AI Tools for Your Business
        </p>
        <div className="mt-1.5 text-sm font-medium uppercase tracking-wider text-[rgb(157,78,221)]">
          Registration Form
        </div>
      </div>
    </div>
  );
}
