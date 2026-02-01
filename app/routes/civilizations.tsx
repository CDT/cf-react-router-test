import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { civilizations } from '../data/history';

export function meta() {
	return [
		{ title: 'Civilizations Explorer - World History' },
		{ name: 'description', content: 'Explore the great civilizations that shaped human history. From Ancient Egypt to the Ottoman Empire, discover their achievements, key figures, and lasting legacies.' },
	];
}

type RegionFilter = 'all' | string;
type SortOption = 'chronological' | 'name' | 'duration';

export default function Civilizations() {
	const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('all');
	const [sortBy, setSortBy] = useState<SortOption>('chronological');
	const [expandedCiv, setExpandedCiv] = useState<string | null>(null);

	const regions = useMemo(() => {
		const uniqueRegions = [...new Set(civilizations.map(c => c.region))];
		return uniqueRegions;
	}, []);

	const filteredAndSortedCivilizations = useMemo(() => {
		let filtered = civilizations;

		if (selectedRegion !== 'all') {
			filtered = civilizations.filter(c => c.region === selectedRegion);
		}

		switch (sortBy) {
			case 'chronological':
				return [...filtered].sort((a, b) => a.startYear - b.startYear);
			case 'name':
				return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
			case 'duration':
				return [...filtered].sort((a, b) =>
					(b.endYear - b.startYear) - (a.endYear - a.startYear)
				);
			default:
				return filtered;
		}
	}, [selectedRegion, sortBy]);

	const formatYear = (year: number) => {
		if (year < 0) return `${Math.abs(year)} BCE`;
		return `${year} CE`;
	};

	const getDuration = (start: number, end: number) => {
		return Math.abs(end - start);
	};

	return (
		<div className="min-h-screen bg-stone-950">
			<Navigation />

			{/* Hero Section */}
			<section className="pt-24 pb-12 bg-gradient-to-b from-stone-900 to-stone-950 relative overflow-hidden">
				<div className="absolute inset-0 pattern-grid opacity-30" />
				<div className="absolute top-20 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="text-center">
						<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
							Explore History
						</span>
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
							Great <span className="text-gradient">Civilizations</span>
						</h1>
						<p className="text-stone-400 text-lg max-w-2xl mx-auto">
							Journey through the empires and cultures that shaped human history.
							From the pyramids of Egypt to the libraries of Baghdad.
						</p>
					</div>

					{/* Stats */}
					<div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
						{[
							{ value: civilizations.length, label: 'Civilizations' },
							{ value: regions.length, label: 'Regions' },
							{ value: '5,000+', label: 'Years Covered' },
							{ value: '50+', label: 'Key Achievements' },
						].map((stat, i) => (
							<div key={i} className="p-4 rounded-xl bg-stone-900/50 border border-stone-800 text-center">
								<div className="text-2xl font-bold text-amber-500">{stat.value}</div>
								<div className="text-stone-400 text-sm">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Filters */}
			<section className="sticky top-16 z-40 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800 py-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
						{/* Region Filter */}
						<div className="flex items-center flex-wrap gap-2">
							<span className="text-stone-500 text-sm mr-2">Region:</span>
							<button
								onClick={() => setSelectedRegion('all')}
								className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
									selectedRegion === 'all'
										? 'bg-amber-600 text-white'
										: 'bg-stone-800 text-stone-300 hover:bg-stone-700'
								}`}
							>
								All
							</button>
							{regions.map((region) => (
								<button
									key={region}
									onClick={() => setSelectedRegion(region)}
									className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
										selectedRegion === region
											? 'bg-amber-600 text-white'
											: 'bg-stone-800 text-stone-300 hover:bg-stone-700'
									}`}
								>
									{region}
								</button>
							))}
						</div>

						{/* Sort */}
						<div className="flex items-center gap-2">
							<span className="text-stone-500 text-sm">Sort:</span>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as SortOption)}
								className="px-3 py-1.5 rounded-lg bg-stone-800 text-white border border-stone-700 text-sm focus:outline-none focus:border-amber-500"
							>
								<option value="chronological">Chronological</option>
								<option value="name">Alphabetical</option>
								<option value="duration">Duration</option>
							</select>
						</div>
					</div>
				</div>
			</section>

			{/* Civilizations Grid */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{filteredAndSortedCivilizations.map((civ) => {
							const isExpanded = expandedCiv === civ.id;
							const duration = getDuration(civ.startYear, civ.endYear);

							return (
								<div
									key={civ.id}
									className={`rounded-2xl bg-stone-900 border transition-all duration-300 overflow-hidden ${
										isExpanded ? 'border-amber-500/50' : 'border-stone-800 hover:border-stone-700'
									}`}
								>
									{/* Header */}
									<div
										className="p-6 cursor-pointer"
										onClick={() => setExpandedCiv(isExpanded ? null : civ.id)}
									>
										<div className="flex items-start justify-between">
											<div className="flex items-start space-x-4">
												<div className={`w-14 h-14 rounded-xl ${civ.color} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
													{civ.name[0]}
												</div>
												<div>
													<h3 className="text-xl font-bold text-white mb-1">{civ.name}</h3>
													<p className="text-amber-500 text-sm">{civ.period}</p>
													<p className="text-stone-500 text-sm">{civ.region}</p>
												</div>
											</div>
											<div className="text-right">
												<div className="text-stone-400 text-sm mb-1">{duration.toLocaleString()} years</div>
												<svg
													className={`w-5 h-5 text-stone-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
												</svg>
											</div>
										</div>

										<p className="text-stone-400 text-sm mt-4 line-clamp-2">{civ.description}</p>

										{/* Quick Stats */}
										<div className="flex flex-wrap gap-2 mt-4">
											{civ.achievements.slice(0, 3).map((achievement, j) => (
												<span key={j} className="px-2 py-1 text-xs bg-stone-800 text-stone-300 rounded-full">
													{achievement}
												</span>
											))}
											{civ.achievements.length > 3 && (
												<span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-500 rounded-full">
													+{civ.achievements.length - 3} more
												</span>
											)}
										</div>
									</div>

									{/* Expanded Content */}
									{isExpanded && (
										<div className="px-6 pb-6 space-y-6 border-t border-stone-800 pt-6 fade-in-up">
											{/* Full Description */}
											<div>
												<h4 className="text-white font-semibold mb-2">Overview</h4>
												<p className="text-stone-400 text-sm">{civ.description}</p>
											</div>

											{/* Timeline Bar */}
											<div>
												<h4 className="text-white font-semibold mb-2">Timeline</h4>
												<div className="relative h-8 bg-stone-800 rounded-lg overflow-hidden">
													<div
														className={`absolute h-full ${civ.color} opacity-60`}
														style={{
															left: `${((civ.startYear + 4000) / 6000) * 100}%`,
															width: `${(duration / 6000) * 100}%`,
														}}
													/>
													<div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-stone-500">
														<span>{formatYear(civ.startYear)}</span>
														<span>{formatYear(civ.endYear)}</span>
													</div>
												</div>
											</div>

											{/* Achievements */}
											<div>
												<h4 className="text-white font-semibold mb-2">Key Achievements</h4>
												<div className="grid grid-cols-2 gap-2">
													{civ.achievements.map((achievement, j) => (
														<div key={j} className="flex items-center space-x-2 p-2 rounded-lg bg-stone-800">
															<svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
															</svg>
															<span className="text-stone-300 text-sm">{achievement}</span>
														</div>
													))}
												</div>
											</div>

											{/* Notable Figures */}
											<div>
												<h4 className="text-white font-semibold mb-2">Notable Figures</h4>
												<div className="flex flex-wrap gap-2">
													{civ.notableFigures.map((figure, j) => (
														<div key={j} className="flex items-center space-x-2 px-3 py-2 rounded-full bg-stone-800">
															<div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white text-xs font-bold">
																{figure[0]}
															</div>
															<span className="text-stone-300 text-sm">{figure}</span>
														</div>
													))}
												</div>
											</div>

											{/* Legacy */}
											<div>
												<h4 className="text-white font-semibold mb-2">Legacy</h4>
												<p className="text-stone-400 text-sm">{civ.legacy}</p>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* World Map Preview */}
			<section className="py-24 bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							Civilizations Across the Globe
						</h2>
						<p className="text-stone-400 max-w-2xl mx-auto">
							From every corner of the world, great civilizations arose, each contributing unique innovations and cultural achievements to human history.
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{regions.map((region) => {
							const regionCivs = civilizations.filter(c => c.region === region);
							return (
								<button
									key={region}
									onClick={() => setSelectedRegion(region)}
									className="p-4 rounded-xl bg-stone-800 border border-stone-700 hover:border-amber-500/50 transition-all text-center group"
								>
									<div className="text-3xl mb-2">
										{region.includes('Africa') ? '🌍' :
											region.includes('Europe') ? '🏰' :
											region.includes('Asia') ? '🏯' :
											region.includes('America') ? '🗿' :
											region.includes('Middle') ? '🕌' : '🌐'}
									</div>
									<h4 className="text-white font-medium text-sm group-hover:text-amber-500 transition-colors">{region}</h4>
									<p className="text-stone-500 text-xs">{regionCivs.length} civilization{regionCivs.length !== 1 ? 's' : ''}</p>
								</button>
							);
						})}
					</div>
				</div>
			</section>

			{/* Quiz CTA */}
			<section className="py-16 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 relative overflow-hidden">
				<div className="absolute inset-0 pattern-dots opacity-20" />
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					<span className="text-5xl block mb-4">🧠</span>
					<h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
						Test Your Knowledge
					</h2>
					<p className="text-amber-100 mb-6">
						Think you know these civilizations? Challenge yourself with our quiz!
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
