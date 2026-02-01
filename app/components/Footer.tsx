import { Link } from 'react-router';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-stone-900 border-t border-stone-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand */}
					<div className="col-span-1 md:col-span-2">
						<Link to="/" className="flex items-center space-x-3 mb-4">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-lg">
								H
							</div>
							<span className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
								World <span className="text-amber-500">History</span>
							</span>
						</Link>
						<p className="text-stone-400 text-sm max-w-md">
							Explore the fascinating journey of human civilization. From the first stone tools to the digital age,
							discover the events, people, and ideas that shaped our world.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-white font-semibold mb-4">Explore</h3>
						<ul className="space-y-2">
							<li>
								<Link to="/timeline" className="text-stone-400 hover:text-amber-500 transition-colors text-sm">
									Interactive Timeline
								</Link>
							</li>
							<li>
								<Link to="/civilizations" className="text-stone-400 hover:text-amber-500 transition-colors text-sm">
									Civilizations
								</Link>
							</li>
							<li>
								<Link to="/quiz" className="text-stone-400 hover:text-amber-500 transition-colors text-sm">
									Test Your Knowledge
								</Link>
							</li>
							<li>
								<Link to="/about" className="text-stone-400 hover:text-amber-500 transition-colors text-sm">
									About This Project
								</Link>
							</li>
						</ul>
					</div>

					{/* Eras */}
					<div>
						<h3 className="text-white font-semibold mb-4">Historical Eras</h3>
						<ul className="space-y-2">
							<li>
								<Link to="/eras/ancient" className="text-stone-400 hover:text-amber-500 transition-colors text-sm">
									Ancient World
								</Link>
							</li>
							<li>
								<Link to="/eras/medieval" className="text-stone-400 hover:text-amber-500 transition-colors text-sm">
									Medieval Period
								</Link>
							</li>
							<li>
								<Link to="/eras/renaissance" className="text-stone-400 hover:text-amber-500 transition-colors text-sm">
									Renaissance
								</Link>
							</li>
							<li>
								<Link to="/eras/modern" className="text-stone-400 hover:text-amber-500 transition-colors text-sm">
									Modern Era
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center">
					<p className="text-stone-500 text-sm">
						{currentYear} World History Explorer. Built for learning.
					</p>
					<div className="flex items-center space-x-6 mt-4 md:mt-0">
						<span className="text-stone-500 text-sm">Made with curiosity</span>
						<div className="flex items-center space-x-1">
							{['stone-600', 'amber-600', 'amber-500', 'amber-400'].map((color, i) => (
								<div key={i} className={`w-2 h-2 rounded-full bg-${color}`} />
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
