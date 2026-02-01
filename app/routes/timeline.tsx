import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { eras, timelineEvents } from '../data/history';

export function meta() {
	return [
		{ title: 'Interactive Timeline - World History Explorer' },
		{ name: 'description', content: 'Explore human history through an interactive timeline spanning over 3 million years. From prehistoric times to the modern era.' },
	];
}

type EraFilter = 'all' | string;

export default function Timeline() {
	const [selectedEra, setSelectedEra] = useState<EraFilter>('all');
	const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

	const filteredEvents = useMemo(() => {
		if (selectedEra === 'all') return timelineEvents;
		return timelineEvents.filter(e => e.era === selectedEra);
	}, [selectedEra]);

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

	const getEraColor = (eraId: string) => {
		const era = eras.find(e => e.id === eraId);
		if (!era) return 'bg-stone-600';
		const colorMap: Record<string, string> = {
			prehistoric: 'bg-stone-500',
			ancient: 'bg-amber-500',
			medieval: 'bg-purple-500',
			renaissance: 'bg-rose-500',
			'early-modern': 'bg-blue-500',
			modern: 'bg-emerald-500',
			contemporary: 'bg-cyan-500',
		};
		return colorMap[eraId] || 'bg-stone-500';
	};

	const getEraGradient = (eraId: string) => {
		const gradientMap: Record<string, string> = {
			prehistoric: 'from-stone-600 to-stone-800',
			ancient: 'from-amber-600 to-amber-800',
			medieval: 'from-purple-600 to-purple-800',
			renaissance: 'from-rose-600 to-rose-800',
			'early-modern': 'from-blue-600 to-blue-800',
			modern: 'from-emerald-600 to-emerald-800',
			contemporary: 'from-cyan-600 to-cyan-800',
		};
		return gradientMap[eraId] || 'from-stone-600 to-stone-800';
	};

	return (
		<div className="min-h-screen bg-stone-950">
			<Navigation />

			{/* Hero Section */}
			<section className="pt-24 pb-12 bg-gradient-to-b from-stone-900 to-stone-950">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
							Interactive Timeline
						</span>
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
							Journey Through <span className="text-gradient">Time</span>
						</h1>
						<p className="text-stone-400 text-lg max-w-2xl mx-auto">
							Explore over 3.3 million years of human history. Click on any event to learn more about the moments that shaped our world.
						</p>
					</div>
				</div>
			</section>

			{/* Era Filter */}
			<section className="sticky top-16 z-40 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800 py-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-center flex-wrap gap-2">
						<button
							onClick={() => setSelectedEra('all')}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
								selectedEra === 'all'
									? 'bg-amber-600 text-white'
									: 'bg-stone-800 text-stone-300 hover:bg-stone-700'
							}`}
						>
							All Eras
						</button>
						{eras.map((era) => (
							<button
								key={era.id}
								onClick={() => setSelectedEra(era.id)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
									selectedEra === era.id
										? `bg-gradient-to-r ${era.color} text-white`
										: 'bg-stone-800 text-stone-300 hover:bg-stone-700'
								}`}
							>
								<span>{era.icon}</span>
								<span className="hidden sm:inline">{era.name}</span>
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-16 relative">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Timeline Line */}
					<div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/50 via-amber-600 to-amber-500/50 transform -translate-x-1/2" />

					{/* Events */}
					<div className="relative space-y-12">
						{filteredEvents.map((event, index) => {
							const isLeft = index % 2 === 0;
							const isHovered = hoveredEvent === index;

							return (
								<div
									key={index}
									className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
									onMouseEnter={() => setHoveredEvent(index)}
									onMouseLeave={() => setHoveredEvent(null)}
								>
									{/* Content */}
									<div className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
										<div
											className={`p-6 rounded-2xl bg-stone-900 border transition-all duration-300 ${
												isHovered
													? 'border-amber-500/50 shadow-lg shadow-amber-500/10 transform scale-105'
													: 'border-stone-800'
											}`}
										>
											<div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
												<span className={`w-3 h-3 rounded-full ${getEraColor(event.era)}`} />
												<span className="text-amber-500 text-sm font-medium">{formatYear(event.year)}</span>
											</div>
											<h3 className="text-lg font-bold text-white mb-2">{event.event}</h3>
											<Link
												to={`/eras/${event.era}`}
												className="text-stone-400 text-sm hover:text-amber-500 transition-colors inline-flex items-center gap-1"
											>
												<span>Learn more about this era</span>
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
												</svg>
											</Link>
										</div>
									</div>

									{/* Center Node */}
									<div className="absolute left-1/2 transform -translate-x-1/2">
										<div
											className={`w-6 h-6 rounded-full border-4 border-stone-950 transition-all duration-300 ${
												isHovered
													? `${getEraColor(event.era)} scale-150`
													: getEraColor(event.era)
											}`}
										/>
									</div>

									{/* Spacer */}
									<div className="w-5/12" />
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Era Summaries */}
			<section className="py-24 bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							Explore Each Era
						</h2>
						<p className="text-stone-400 max-w-2xl mx-auto">
							Dive deeper into the distinct periods that shaped human civilization.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{eras.map((era) => (
							<Link
								key={era.id}
								to={`/eras/${era.id}`}
								className="group relative overflow-hidden rounded-2xl bg-stone-800 border border-stone-700 hover:border-amber-500/50 transition-all duration-300"
							>
								<div className={`absolute inset-0 bg-gradient-to-br ${era.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

								<div className="relative p-6 z-10">
									<div className="flex items-center justify-between mb-4">
										<span className="text-4xl">{era.icon}</span>
										<span className={`w-3 h-3 rounded-full ${getEraColor(era.id)}`} />
									</div>
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
				</div>
			</section>

			{/* Timeline Facts */}
			<section className="py-16 bg-stone-950">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
						{[
							{ value: formatYear(-3300000), label: 'First Human Tools' },
							{ value: '~5,000', label: 'Years of Written History' },
							{ value: '32', label: 'Major Events Covered' },
							{ value: '7', label: 'Historical Eras' },
						].map((stat, i) => (
							<div key={i} className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
								<div className="text-2xl md:text-3xl font-bold text-amber-500 mb-2">{stat.value}</div>
								<div className="text-stone-400 text-sm">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
