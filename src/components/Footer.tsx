import { data } from "@/constants/socialLinks";

export default function Footer() {
  return (
    <section className="section-center py-4 text-center">
      <ul>
        {data.map((link) => (
          <li
            key={link.id}
            className="mx-2 mb-4 inline-block list-none lg:hidden"
          >
            <a
              href={link.url}
              className="text-xl text-white"
              rel="me noopener"
              target="_blank"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <p>Copyright &copy; 2020 - 2025 Alex Leung</p>
    </section>
  );
}
