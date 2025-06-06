export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Menu 1 */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Products</h3>
          <ul className="space-y-2 text-sm">
            <li>App</li>
            <li>Analytics</li>
            <li>Token List</li>
            <li>DeFi</li>
          </ul>
        </div>

        {/* Menu 2 */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Menu 3 */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
