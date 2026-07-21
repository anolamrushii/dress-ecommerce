import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SocialLinks from "./SocialLinks";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.8562711850677!2d21.149182276585957!3d42.368033534597096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13537f0928d779ff%3A0x43a1154b0dcfe660!2sEgzona%20Abazi%20Fashion%20Designer!5e1!3m2!1sen!2s!4v1784654495085!5m2!1sen!2s";

export default function Footer() {
  const tCommon = useTranslations("Common");
  const tHeader = useTranslations("Header");
  const tFooter = useTranslations("Footer");

  const EXPLORE_LINKS = [
    { label: tHeader("home"), href: "/" },
    { label: tHeader("collections"), href: "/collections" },
    { label: tHeader("about"), href: "/about" },
    { label: tHeader("contact"), href: "/contact" },
  ];

  return (
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          <div>
            <p className="font-heading text-xl text-charcoal">{tCommon("brand")}</p>
            <p className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/60">
              {tCommon("tagline")}
            </p>
            <p className="mt-4 max-w-xs font-body text-sm text-charcoal/70">
              {tFooter("description")}
            </p>
            <SocialLinks
              className="mt-5 flex gap-4"
              iconClassName="text-charcoal transition-colors hover:text-gold"
            />
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/50">
              {tFooter("explore")}
            </p>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-charcoal/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-2">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/50">
              {tFooter("visitAtelier")}
            </p>
            <p className="mt-4 font-body text-sm text-charcoal/70">{tFooter("addressLine")}</p>
            <div className="relative mt-4 aspect-[4/3] w-full max-w-md overflow-hidden border border-border sm:aspect-[16/10]">
              <iframe
                src={MAP_EMBED_SRC}
                title={tFooter("mapTitle")}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="font-body text-xs uppercase tracking-widest text-charcoal/60">
            &copy; {new Date().getFullYear()} {tCommon("brand")}. {tFooter("rightsReserved")}
          </p>
          <p className="mt-2 font-body text-xs uppercase tracking-widest text-charcoal/40">
            {tFooter("siteBy")}{" "}
            <a
              href="https://venight.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 transition-colors hover:text-gold"
            >
              Venight
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
