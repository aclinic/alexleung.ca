import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/now/", label: "Now" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

type NavItemProps = {
  href: string;
  label: string;
  active: boolean;
  mobile?: boolean;
  tabIndex?: number;
  onClick?: () => void;
};

function NavItem({
  href,
  label,
  active,
  mobile = false,
  tabIndex,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={
        mobile
          ? `mobile-nav-link ${active ? "mobile-nav-link--active" : "mobile-nav-link--inactive"}`
          : `nav-link ${active ? "nav-link--active" : "nav-link--inactive"}`
      }
      tabIndex={tabIndex}
    >
      {label}
    </Link>
  );
}

type DesktopNavProps = {
  isActive: (href: string) => boolean;
};

export function DesktopNav({ isActive }: DesktopNavProps) {
  return (
    <ul className="hidden gap-8 md:flex">
      {navLinks.map((link) => (
        <li key={link.href}>
          <NavItem {...link} active={isActive(link.href)} />
        </li>
      ))}
    </ul>
  );
}

type MobileNavDrawerProps = {
  isOpen: boolean;
  isActive: (href: string) => boolean;
  onClose: () => void;
};

export function MobileNavDrawer({
  isOpen,
  isActive,
  onClose,
}: MobileNavDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 top-[var(--header-height)] z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <div
        className={`fixed left-0 right-0 top-[var(--header-height)] z-40 border-b border-white/10 bg-black/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <ul className="flex flex-col py-8">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className={`transition-all duration-300 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              <NavItem
                {...link}
                active={isActive(link.href)}
                mobile
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
