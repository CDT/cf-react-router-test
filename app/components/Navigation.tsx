import { useState } from 'react';
import { Link, useLocation } from 'react-router';

export function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const links = [
		{ to: '/', label: 'Home' },
		{ to: '/timeline', label: 'Timeline' },
		{ to: '/civilizations', label: 'Civilizations' },
		{ to: '/quiz', label: 'Quiz' },
		{ to: '/about', label: 'About' },
	];

	const isActive = (path: string) => {
		if (path === '/') return location.pathname === '/';
		return location.pathname.startsWith(path);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-3 group">
						<div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-lg transform group-hover:rotate-12 transition-transform">
							H
						</div>
						<span className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
							World <span className="text-amber-500">History</span>
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-1">
						{links.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className={`nav-link px-4 py-2 text-sm font-medium transition-colors ${
									isActive(link.to)
										? 'text-amber-500'
										: 'text-stone-300 hover:text-white'
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2 text-stone-300 hover:text-white transition-colors"
						aria-label="Toggle menu"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{isMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden glass-dark border-t border-white/10">
					<div className="px-4 py-2 space-y-1">
						{links.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								onClick={() => setIsMenuOpen(false)}
								className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
									isActive(link.to)
										? 'text-amber-500 bg-amber-500/10'
										: 'text-stone-300 hover:text-white hover:bg-white/5'
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
