import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-2">Lost Monster</h3>
            <p className="text-neutral-400 text-sm">
              Built by someone who runs businesses
            </p>
          </div>

          {/* Contact */}
          <div>
            <Link
              href="mailto:hello@lostmonster.io"
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              hello@lostmonster.io
            </Link>
          </div>

          {/* Copyright */}
          <div className="pt-4 text-neutral-500 text-xs">
            <p>© {new Date().getFullYear()} Lost Monster. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

