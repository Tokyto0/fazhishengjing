export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-mist pt-[76px]" role="status" aria-label="页面加载中">
      <div className="text-center">
        <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-signal" />
        <p className="mt-4 text-sm text-slate-500">正在整理知识脉络…</p>
      </div>
    </div>
  );
}
