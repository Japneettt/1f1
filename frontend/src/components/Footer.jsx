export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="text-white font-semibold mb-3">Shop</h4>
          <ul className="space-y-2">
            <li>Smart Phones on EMI</li>
            <li>Laptops on EMI</li>
            <li>Headphones on EMI</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li>Return Policy</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">1Fi Shop</h4>
          <p className="text-gray-400">
            Built as an assignment project. EMI plans shown are for demo purposes only.
          </p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} 1Fi Shop. All rights reserved.
      </div>
    </footer>
  );
}