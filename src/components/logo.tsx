import Image from "next/image";

type LogoProps = { inverse?: boolean; compact?: boolean };

export function Logo({ inverse = false, compact = false }: LogoProps) {
  return (
    <span className="logo" aria-label="Highsol">
      <Image
        className={inverse ? "logo-image is-inverse" : "logo-image"}
        src={compact ? "/brand/highsol-mark.svg" : "/brand/highsol-logo.svg"}
        alt="Highsol"
        width={compact ? 64 : 320}
        height={64}
        unoptimized
      />
    </span>
  );
}
