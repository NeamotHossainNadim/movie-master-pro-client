const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center mt-10">
      <p>© {new Date().getFullYear()} MovieMaster Pro. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" target="_blank" rel="noopener noreferrer">X</a>
        <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
