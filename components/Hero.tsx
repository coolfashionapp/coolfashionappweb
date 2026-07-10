import WaitlistForm from "@/components/WaitlistForm";
import PhoneMockup from "@/components/PhoneMockup";

export default function Hero() {
  return (
    <section className="hero" id="waitlist">
      <div className="hero-copy">
        <h1>
          curated vintage style bundles,<br />
          <em>handpicked by stylists</em> just for you.
        </h1>
        <p className="hero-sub">
          a curated bundle of clothing items, personalized to fit your budget,
          style, &amp; size — sourced by an independent stylist, shipped to your
          door.
        </p>
        <WaitlistForm />
      </div>

      <PhoneMockup />
    </section>
  );
}
