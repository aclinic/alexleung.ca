import { data } from "@/constants/socialLinks";

const Footer = () => {
  return (
    <section className="section-center pt-20 pb-4 text-center">
      {data.map((link) => (
        <li key={link.id} className="list-none inline-block mx-2 mb-4 lg:hidden">
          <a href={link.url} className="text-xl text-black dark:text-white">{link.icon}</a>
        </li>
      ))}
      <p>Copyright &copy; 2020 - 2025 Alex Leung</p>
    </section>
  );
};

export default Footer;
