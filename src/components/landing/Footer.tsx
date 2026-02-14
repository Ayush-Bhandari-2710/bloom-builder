import Logo from "@/components/shared/Logo";

const Footer = () => (
  <footer className="bg-foreground text-background px-6 md:px-12 py-12 md:py-16">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="font-display text-2xl font-semibold">Everbloom</span>
          </div>
          <p className="mt-4 text-sm opacity-70 max-w-xs">
            Create and share beautiful digital bouquets that bloom forever.
          </p>
        </div>
        <div className="flex gap-16 md:gap-20">
          <div>
            <h4 className="text-sm font-semibold opacity-90 mb-4">Product</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li><a href="#features" className="hover:opacity-100 transition-opacity">Features</a></li>
              <li><a href="#showcase" className="hover:opacity-100 transition-opacity">Examples</a></li>
              <li><a href="#how-it-works" className="hover:opacity-100 transition-opacity">How it works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold opacity-90 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 pt-8 text-center">
        <p className="text-sm opacity-60">© 2024 Everbloom. Made with 💐 and code.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
