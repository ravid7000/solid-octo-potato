function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p className="text-sm text-center">Web SQL Runner {year}</p>
    </footer>
  );
}

export default Footer;
