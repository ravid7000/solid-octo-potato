function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8">
      <p className="text-sm text-center font-bold">Web SQL Runner {year}</p>
    </footer>
  );
}

export default Footer;
