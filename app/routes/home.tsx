import { Link } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { eras, civilizations, timelineEvents } from '../data/history';

export function meta() {
	return [
		{ title: 'World History Explorer - Journey Through Time' },
		{ name: 'description', content: 'Explore the fascinating journey of human civilization from prehistoric times to the modern era. Interactive timeline, quizzes, and comprehensive historical content.' },
	];
}

export default function Home() {
	const featuredEras = eras.slice(1, 5);
	const featuredCivilizations = civilizations.slice(0, 4);
	const recentEvents = timelineEvents.slice(-8).reverse();

	return (
		<div className="min-h-screen bg-stone-950">
			<Navigation />

			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
				{/* Animated Background Elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl float-animation" />
					<div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl float-animation-delayed" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-500/10 rounded-full rotate-slow" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-500/5 rounded-full rotate-slow" style={{ animationDirection: 'reverse' }} />
				</div>

				{/* Pattern Overlay */}
				<div className="absolute inset-0 pattern-dots opacity-20" />

				{/* Content */}
				<div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
					<div className="fade-in-up">
						<span className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
							Explore Human Civilization
						</span>
					</div>

					<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 fade-in-up fade-in-up-delay-1" style={{ fontFamily: 'Playfair Display, serif' }}>
						Journey Through
						<br />
						<span className="shimmer-text">World History</span>
					</h1>

					<p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto mb-8 fade-in-up fade-in-up-delay-2">
						From the first sparks of civilization to the digital age, explore the events,
						people, and ideas that shaped humanity's extraordinary journey.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up fade-in-up-delay-3">
						<Link
							to="/timeline"
							className="group px-8 py-4 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-all duration-300 flex items-center space-x-2 pulse-glow"
						>
							<span>Explore Timeline</span>
							<svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
						<Link
							to="/quiz"
							className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
						>
							Test Your Knowledge
						</Link>
					</div>

					{/* Stats */}
					<div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 fade-in-up fade-in-up-delay-4">
						{[
							{ value: '3.3M+', label: 'Years of History' },
							{ value: '7', label: 'Historical Eras' },
							{ value: '10+', label: 'Civilizations' },
							{ value: '20+', label: 'Quiz Questions' },
						].map((stat, i) => (
							<div key={i} className="text-center">
								<div className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">{stat.value}</div>
								<div className="text-stone-400 text-sm">{stat.label}</div>
							</div>
						))}
					</div>
				</div>

				{/* Scroll Indicator */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
					<svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					</svg>
				</div>
			</section>

			{/* Featured Eras Section */}
			<section className="py-24 bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
							Historical Periods
						</span>
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							Explore the Ages
						</h2>
						<p className="text-stone-400 max-w-2xl mx-auto">
							Journey through distinct periods that defined human civilization, each with its own character, achievements, and legacy.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{featuredEras.map((era, i) => (
							<Link
								key={era.id}
								to={`/eras/${era.id}`}
								className="era-card group relative overflow-hidden rounded-2xl bg-stone-800 border border-stone-700 hover:border-amber-500/50 stagger-item"
							>
								{/* Gradient Overlay */}
								<div className={`absolute inset-0 bg-gradient-to-br ${era.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

								<div className="relative p-6 z-10">
									<span className="text-4xl mb-4 block">{era.icon}</span>
									<h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
										{era.name}
									</h3>
									<p className="text-stone-400 text-sm mb-4 group-hover:text-stone-200 transition-colors">
										{era.period}
									</p>
									<p className="text-stone-500 text-sm line-clamp-2 group-hover:text-stone-300 transition-colors">
										{era.description.substring(0, 100)}...
									</p>

									<div className="mt-4 flex items-center text-amber-500 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
										<span>Explore Era</span>
										<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</div>
							</Link>
						))}
					</div>

					<div className="text-center mt-12">
						<Link
							to="/timeline"
							className="inline-flex items-center text-amber-500 hover:text-amber-400 font-medium transition-colors"
						>
							<span>View Complete Timeline</span>
							<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</div>
				</div>
			</section>

			{/* Interactive Feature Section */}
			<section className="py-24 bg-stone-950 relative overflow-hidden">
				<div className="absolute inset-0 pattern-grid opacity-30" />

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
								Interactive Learning
							</span>
							<h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
								Learn History Your Way
							</h2>
							<p className="text-stone-400 text-lg mb-8">
								Our interactive platform makes learning history engaging and memorable.
								Explore timelines, test your knowledge with quizzes, and dive deep into civilizations.
							</p>

							<div className="space-y-4">
								{[
									{ icon: '📜', title: 'Interactive Timeline', desc: 'Scroll through 3.3 million years of human history' },
									{ icon: '🏛️', title: 'Civilization Explorer', desc: 'Deep dive into the world\'s greatest civilizations' },
									{ icon: '🧠', title: 'Knowledge Quizzes', desc: 'Test and expand your historical knowledge' },
									{ icon: '📚', title: 'Comprehensive Content', desc: 'Detailed information on every era and event' },
								].map((feature, i) => (
									<div key={i} className="flex items-start space-x-4 p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:border-amber-500/30 transition-colors">
										<span className="text-2xl">{feature.icon}</span>
										<div>
											<h3 className="text-white font-semibold">{feature.title}</h3>
											<p className="text-stone-400 text-sm">{feature.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							{/* Decorative Timeline Preview */}
							<div className="relative bg-stone-900 rounded-2xl border border-stone-800 p-6 overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

								<h3 className="text-lg font-semibold text-white mb-6">Recent History</h3>

								<div className="space-y-4">
									{recentEvents.map((event, i) => (
										<div key={i} className="flex items-center space-x-4 stagger-item">
											<div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
											<div className="flex-1 flex items-center justify-between">
												<span className="text-stone-300 text-sm">{event.event}</span>
												<span className="text-stone-500 text-xs">{event.year > 0 ? event.year : `${Math.abs(event.year)} BCE`}</span>
											</div>
										</div>
									))}
								</div>

								<Link
									to="/timeline"
									className="mt-6 flex items-center justify-center w-full py-3 bg-amber-600/20 text-amber-500 rounded-lg hover:bg-amber-600/30 transition-colors font-medium"
								>
									View Full Timeline
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Civilizations Section */}
			<section className="py-24 bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
							Ancient Civilizations
						</span>
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							Great Civilizations
						</h2>
						<p className="text-stone-400 max-w-2xl mx-auto">
							Discover the empires and cultures that shaped the course of human history.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{featuredCivilizations.map((civ, i) => (
							<div
								key={civ.id}
								className="group relative p-6 rounded-2xl bg-stone-800 border border-stone-700 hover:border-amber-500/50 transition-all duration-300 stagger-item"
							>
								<div className="flex items-start space-x-4">
									<div className={`w-12 h-12 rounded-xl ${civ.color} flex items-center justify-center text-white text-xl font-bold`}>
										{civ.name[0]}
									</div>
									<div className="flex-1">
										<h3 className="text-xl font-bold text-white mb-1">{civ.name}</h3>
										<p className="text-amber-500 text-sm mb-3">{civ.period}</p>
										<p className="text-stone-400 text-sm line-clamp-2">{civ.description}</p>

										<div className="mt-4 flex flex-wrap gap-2">
											{civ.achievements.slice(0, 3).map((achievement, j) => (
												<span key={j} className="px-2 py-1 text-xs bg-stone-700 text-stone-300 rounded-full">
													{achievement}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link
							to="/civilizations"
							className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-colors"
						>
							<span>Explore All Civilizations</span>
							<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</div>
				</div>
			</section>

			{/* Quiz CTA Section */}
			<section className="py-24 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 relative overflow-hidden">
				<div className="absolute inset-0 pattern-dots opacity-20" />
				<div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					<span className="inline-block text-6xl mb-6">🧠</span>
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
						Test Your Historical Knowledge
					</h2>
					<p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
						Think you know your history? Challenge yourself with our interactive quizzes
						covering everything from ancient civilizations to modern events.
					</p>
					<Link
						to="/quiz"
						className="inline-flex items-center px-8 py-4 bg-white text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
					>
						<span>Start Quiz</span>
						<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</Link>
				</div>
			</section>

			{/* Fun Facts Section */}
			<section className="py-24 bg-stone-950">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							Did You Know?
						</h2>
						<p className="text-stone-400">Fascinating facts from across history</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								fact: 'The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.',
								era: 'Ancient China',
								icon: '🏯'
							},
							{
								fact: 'Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.',
								era: 'Ancient Egypt',
								icon: '👑'
							},
							{
								fact: 'The Roman Empire had a peak population of around 70 million people, about 21% of the world\'s population at the time.',
								era: 'Roman Empire',
								icon: '🏛️'
							},
						].map((item, i) => (
							<div key={i} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/30 transition-colors">
								<span className="text-4xl block mb-4">{item.icon}</span>
								<p className="text-white mb-4">{item.fact}</p>
								<span className="text-amber-500 text-sm font-medium">{item.era}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
