import { asset } from "@/lib/config";

export default function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/assets/logo.png")} alt="bundl" />
        <div className="links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            instagram
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            tiktok
          </a>
          <a href="mailto:hello@bundl.app">hello@bundl.app</a>
        </div>
        <div>© bundl · 2026</div>
      </div>
    </footer>
  );
}
