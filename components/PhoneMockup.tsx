export default function PhoneMockup() {
  return (
    <div className="phone-wrap">
      <div className="phone">
        <div className="phone-screen">
          <div className="phone-status">
            <span>9:41</span>
            <span className="right">
              <svg viewBox="0 0 18 12" fill="currentColor">
                <path d="M1 6 Q9 -2 17 6" />
                <circle cx="9" cy="9" r="1.5" />
              </svg>
              <svg viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth={1}>
                <rect x="1" y="1" width="22" height="10" rx="2" />
                <rect x="3" y="3" width="17" height="6" rx="1" fill="currentColor" />
              </svg>
            </span>
          </div>

          <div className="app-header">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.png" alt="bundl" />
            <div className="ic">♡</div>
          </div>

          <div className="app-card">
            <div className="app-cover">
              <span className="badge">your bundle is ready</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/cover.png" alt="" />
            </div>
            <div className="app-card-body">
              <div className="title">carolyn bessette kennedy</div>
              <div className="sub">curated by @ria · sourced in 5 days</div>
            </div>
          </div>

          <div className="app-items">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div><img src="/assets/item-1.png" alt="" /></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div><img src="/assets/item-2.png" alt="" /></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div><img src="/assets/item-3.png" alt="" /></div>
          </div>

          <div className="app-cta">
            accept bundle <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
