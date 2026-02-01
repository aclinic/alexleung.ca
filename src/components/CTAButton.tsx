import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-200 ease-expo-out";

  const variants = {
    primary:
      "bg-gradient-to-br from-blue-500 to-accent-primary text-white hover:from-blue-600 hover:to-accent-primary-hover hover:scale-105 shadow-lg shadow-blue-500/20",
    secondary:
      "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 hover:scale-105 backdrop-blur-sm",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedStyles}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedStyles}>
      {children}
    </Link>
  );
}
