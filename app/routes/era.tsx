import { Link, useParams } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { eras, civilizations, timelineEvents } from '../data/history';

export function meta({ params }: { params: { eraId: string } }) {
	const era = eras.find(e => e.id === params.eraId);
	return [
		{ title: era ? `${era.name} - World History Explorer` : 'Era Not Found' },
		{ name: 'description', content: era?.description || 'Explore historical eras' },
	];
}

export default function EraPage() {
	const { eraId } = useParams();
	const era = eras.find(e => e.id === eraId);

	if (!era) {
		return (
			<div className="min-h-screen bg-stone-950 flex items-center justify-center">
				<Navigation />
				<div className="text-center p-8">
					<h1 className="text-6xl font-bold text-amber-500 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Era Not Found</h1>
					<p className="text-stone-400 text-xl mb-6">The requested era could not be found.</p>
					<Link to="/timeline" className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors">
						View Timeline
					</Link>
				</div>
			</div>
		);
	}

	const currentIndex = eras.findIndex(e => e.id === eraId);
	const previousEra = currentIndex > 0 ? eras[currentIndex - 1] : null;
	const nextEra = currentIndex < eras.length - 1 ? eras[currentIndex + 1] : null;

	const eraEvents = timelineEvents.filter(e => e.era === eraId);
	const relatedCivilizations = civilizations.filter(c => {
		return c.startYear >= era.startYear && c.startYear <= era.endYear;
	});

	const formatYear = (year: number) => {
		if (year < 0) {
			const absYear = Math.abs(year);
			if (absYear >= 1000000) {
				return `${(absYear / 1000000).toFixed(1)}M BCE`;
			}
			if (absYear >= 1000) {
				return `${(absYear / 1000).toFixed(0)}K BCE`;
			}
			return `${absYear} BCE`;
		}
		return `${year} CE`;
	};

	return (
		<div className="min-h-screen bg-stone-950">
			<Navigation />

			{/* Hero Section */}
			<section className={`relative pt-24 pb-32 bg-gradient-to-br ${era.color} overflow-hidden`}>
				<div className="absolute inset-0 pattern-dots opacity-20" />
				<div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					{/* Breadcrumb */}
					<nav className="flex items-center space-x-2 text-sm mb-8">
						<Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
						<span className="text-white/40">/</span>
						<Link to="/timeline" className="text-white/60 hover:text-white transition-colors">Timeline</Link>
						<span className="text-white/40">/</span>
						<span className="text-white">{era.name}</span>
					</nav>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<span className="text-6xl mb-6 block">{era.icon}</span>
							<h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
								{era.name}
							</h1>
							<p className="text-2xl text-white/80 mb-6">{era.period}</p>
							<p className="text-white/70 text-lg leading-relaxed">
								{era.description}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
								<div className="text-3xl font-bold text-white mb-2">{era.keyEvents.length}</div>
								<div className="text-white/70 text-sm">Key Events</div>
							</div>
							<div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
								<div className="text-3xl font-bold text-white mb-2">{era.keyFigures.length}</div>
								<div className="text-white/70 text-sm">Key Figures</div>
							</div>
							<div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
								<div className="text-3xl font-bold text-white mb-2">{era.achievements.length}</div>
								<div className="text-white/70 text-sm">Major Achievements</div>
							</div>
							<div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
								<div className="text-3xl font-bold text-white mb-2">{relatedCivilizations.length}</div>
								<div className="text-white/70 text-sm">Civilizations</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Key Events */}
			<section className="py-24 bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
							Timeline
						</span>
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							Key Events
						</h2>
						<p className="text-stone-400 max-w-2xl mx-auto">
							The pivotal moments that defined this era and shaped the course of history.
						</p>
					</div>

					<div className="relative">
						{/* Timeline line */}
						<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-amber-500/30" />

						<div className="space-y-8">
							{era.keyEvents.map((event, i) => (
								<div key={i} className="relative pl-20">
									{/* Node */}
									<div className="absolute left-6 w-5 h-5 rounded-full bg-amber-500 border-4 border-stone-900" />

									<div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 hover:border-amber-500/50 transition-all duration-300 group">
										<div className="flex items-center justify-between mb-2">
											<span className="text-amber-500 font-bold">{event.year}</span>
											<span className="text-stone-500 text-sm">{event.significance}</span>
										</div>
										<h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
											{event.title}
										</h3>
										<p className="text-stone-400">{event.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Key Figures & Achievements */}
			<section className="py-24 bg-stone-950">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Key Figures */}
						<div>
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
								Key Figures
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{era.keyFigures.map((figure, i) => (
									<div
										key={i}
										className="p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-colors flex items-center space-x-4"
									>
										<div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-lg">
											{figure[0]}
										</div>
										<span className="text-white font-medium">{figure}</span>
									</div>
								))}
							</div>
						</div>

						{/* Achievements */}
						<div>
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
								Major Achievements
							</h2>
							<div className="space-y-3">
								{era.achievements.map((achievement, i) => (
									<div
										key={i}
										className="flex items-center space-x-4 p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-colors"
									>
										<div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<span className="text-white">{achievement}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Civilizations */}
			{relatedCivilizations.length > 0 && (
				<section className="py-24 bg-stone-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
								Civilizations
							</span>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
								Civilizations of This Era
							</h2>
							<p className="text-stone-400 max-w-2xl mx-auto">
								The great cultures and empires that flourished during the {era.name}.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{relatedCivilizations.map((civ) => (
								<div
									key={civ.id}
									className="p-6 rounded-2xl bg-stone-800 border border-stone-700 hover:border-amber-500/50 transition-all duration-300"
								>
									<div className="flex items-start space-x-4">
										<div className={`w-12 h-12 rounded-xl ${civ.color} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
											{civ.name[0]}
										</div>
										<div className="flex-1">
											<h3 className="text-xl font-bold text-white mb-1">{civ.name}</h3>
											<p className="text-amber-500 text-sm mb-2">{civ.period}</p>
											<p className="text-stone-400 text-sm mb-4">{civ.description}</p>
											<div className="flex flex-wrap gap-2">
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
								className="inline-flex items-center text-amber-500 hover:text-amber-400 font-medium transition-colors"
							>
								<span>View All Civilizations</span>
								<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</Link>
						</div>
					</div>
				</section>
			)}

			{/* Navigation between eras */}
			<section className="py-16 bg-stone-950 border-t border-stone-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						{previousEra ? (
							<Link
								to={`/eras/${previousEra.id}`}
								className="flex items-center space-x-4 p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all group"
							>
								<svg className="w-6 h-6 text-stone-400 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
								<div>
									<span className="text-stone-500 text-sm block">Previous Era</span>
									<span className="text-white font-medium">{previousEra.icon} {previousEra.name}</span>
								</div>
							</Link>
						) : (
							<div />
						)}

						{nextEra ? (
							<Link
								to={`/eras/${nextEra.id}`}
								className="flex items-center space-x-4 p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all group text-right"
							>
								<div>
									<span className="text-stone-500 text-sm block">Next Era</span>
									<span className="text-white font-medium">{nextEra.icon} {nextEra.name}</span>
								</div>
								<svg className="w-6 h-6 text-stone-400 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						) : (
							<div />
						)}
					</div>
				</div>
			</section>

			{/* Quiz CTA */}
			<section className="py-16 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 relative overflow-hidden">
				<div className="absolute inset-0 pattern-dots opacity-20" />
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					<h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
						Test Your Knowledge of the {era.name}
					</h2>
					<p className="text-amber-100 mb-6">
						Think you've learned about this era? Take our quiz to test your knowledge!
					</p>
					<Link
						to="/quiz"
						className="inline-flex items-center px-6 py-3 bg-white text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition-colors"
					>
						<span>Take the Quiz</span>
						<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</Link>
				</div>
			</section>

			<Footer />
		</div>
	);
}
