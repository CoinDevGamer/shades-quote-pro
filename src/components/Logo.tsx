import logoUrl from "@/assets/logo.png";

export function Logo({
  className = "h-9 w-auto",
  alt = "Shades & Space",
}: {
  className?: string;
  alt?: string;
}) {
  return <img src={logoUrl} alt={alt} className={className} draggable={false} />;
}

export default Logo;
