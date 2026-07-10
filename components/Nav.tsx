export default function Nav() {
  return (
    <header className="nav">
      <a href="#" className="brand" aria-label="bundl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo.png" alt="bundl" />
      </a>
      <nav className="nav-right">
        <a href="#stylists">for stylists</a>
        <a href="#waitlist" className="nav-cta">join waitlist</a>
      </nav>
    </header>
  );
}
