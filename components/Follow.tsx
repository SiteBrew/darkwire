import { getSocials } from "@/lib/feed";
import { Icon } from "./Icons";

/** Big follow buttons. */
export async function Follow() {
  const socials = await getSocials();
  return (
    <div className="follow">
      {socials.map((s) => (
        <a key={s.key} className="social" href={s.url} target="_blank" rel="noopener noreferrer me" aria-label={`Follow DarkWire on ${s.label}`}>
          <Icon name={s.key} />
          {s.label}
        </a>
      ))}
    </div>
  );
}

/** Small icon row (footer). */
export async function FollowIcons() {
  const socials = await getSocials();
  return (
    <div className="icons">
      {socials.map((s) => (
        <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer me" aria-label={`DarkWire on ${s.label}`}>
          <Icon name={s.key} />
        </a>
      ))}
    </div>
  );
}
