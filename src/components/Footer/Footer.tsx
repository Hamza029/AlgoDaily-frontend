function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center border-t-2 bg-white border-gray-200 absolute bottom-0 w-full h-8">
      AlgoDaily © {currentYear}
    </div>
  );
}

export default Footer;
