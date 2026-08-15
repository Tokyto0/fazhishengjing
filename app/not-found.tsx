import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[75vh] place-items-center bg-mist px-5 pt-[76px] text-center">
      <div>
        <p className="font-display text-8xl font-bold text-blue-100">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">这份资料还在路上</h1>
        <p className="mt-4 text-slate-600">页面不存在、已迁移，或内容正在归档中。</p>
        <Link href="/" className="button-primary mt-8"><ArrowLeft className="h-4 w-4" />返回首页</Link>
      </div>
    </section>
  );
}
