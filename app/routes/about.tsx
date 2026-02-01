import { Link } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function meta() {
	return [
		{ title: 'About - World History Explorer' },
		{ name: 'description', content: 'Learn about the World History Explorer project - an interactive platform for learning about human civilization through engaging content and quizzes.' },
	];
}

export default function About() {
	return (
		<div className="min-h-screen bg-stone-950">
			<Navigation />

			{/* Hero Section */}
			<section className="pt-24 pb-16 bg-gradient-to-b from-stone-900 to-stone-950 relative overflow-hidden">
				<div className="absolute inset-0 pattern-grid opacity-30" />
				<div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="text-center">
						<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
							About This Project
						</span>
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
							Exploring the <span className="text-gradient">Story of Humanity</span>
						</h1>
						<p className="text-stone-400 text-lg max-w-2xl mx-auto">
							World History Explorer is an interactive learning platform designed to make
							the fascinating journey of human civilization accessible and engaging for everyone.
						</p>
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-24 bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium mb-4">
								Our Mission
							</span>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
								Making History Come Alive
							</h2>
							<p className="text-stone-400 text-lg mb-6">
								We believe that understanding our past is essential for navigating the present
								and shaping a better future. History is not just a collection of dates and facts;
								it's the story of human triumph, tragedy, innovation, and resilience.
							</p>
							<p className="text-stone-400 text-lg">
								Our platform transforms this rich tapestry of human experience into an
								engaging, interactive journey that anyone can enjoy, regardless of their
								background or prior knowledge.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							{[
								{ icon: '📜', title: 'Interactive Timeline', desc: 'Scroll through millions of years of human history' },
								{ icon: '🏛️', title: 'Civilization Explorer', desc: 'Deep dive into the world\'s greatest cultures' },
								{ icon: '🧠', title: 'Knowledge Quizzes', desc: 'Test and reinforce your learning' },
								{ icon: '📚', title: 'Comprehensive Content', desc: 'Curated information on every era' },
							].map((feature, i) => (
								<div key={i} className="p-6 rounded-2xl bg-stone-800 border border-stone-700">
									<span className="text-3xl block mb-3">{feature.icon}</span>
									<h3 className="text-white font-semibold mb-2">{feature.title}</h3>
									<p className="text-stone-400 text-sm">{feature.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-24 bg-stone-950">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							Why World History Explorer?
						</h2>
						<p className="text-stone-400 max-w-2xl mx-auto">
							We've designed every aspect of this platform with learning in mind.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								icon: '🎯',
								title: 'Engaging & Interactive',
								desc: 'No more boring textbooks. Explore history through interactive timelines, clickable maps, and dynamic content that responds to your curiosity.',
							},
							{
								icon: '🌍',
								title: 'Comprehensive Coverage',
								desc: 'From prehistoric stone tools to the digital revolution, we cover over 3 million years of human history across all continents and civilizations.',
							},
							{
								icon: '✨',
								title: 'Beautiful Design',
								desc: 'Learning should be a pleasure. Our carefully crafted interface makes exploring history a visually stunning experience.',
							},
							{
								icon: '📱',
								title: 'Accessible Everywhere',
								desc: 'Whether you\'re on your phone, tablet, or computer, World History Explorer adapts to provide the best experience on any device.',
							},
							{
								icon: '🎓',
								title: 'Educational Focus',
								desc: 'Every feature is designed with education in mind. Quizzes help reinforce learning, and explanations provide deeper understanding.',
							},
							{
								icon: '🔄',
								title: 'Always Expanding',
								desc: 'We\'re constantly adding new content, civilizations, events, and quiz questions to keep your learning journey fresh and exciting.',
							},
						].map((feature, i) => (
							<div key={i} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-colors">
								<span className="text-4xl block mb-4">{feature.icon}</span>
								<h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
								<p className="text-stone-400">{feature.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Content Overview */}
			<section className="py-24 bg-stone-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							What You'll Discover
						</h2>
						<p className="text-stone-400 max-w-2xl mx-auto">
							Our platform covers the full span of human history, organized into distinct eras and featuring the world's most influential civilizations.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Eras */}
						<div className="p-6 rounded-2xl bg-stone-800 border border-stone-700">
							<h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
								<span>📅</span> Historical Eras
							</h3>
							<div className="space-y-3">
								{[
									{ name: 'Prehistoric Era', period: '3.3M BCE - 3000 BCE', icon: '🦣' },
									{ name: 'Ancient World', period: '3000 BCE - 500 CE', icon: '🏛️' },
									{ name: 'Medieval Period', period: '500 CE - 1500 CE', icon: '⚔️' },
									{ name: 'Renaissance & Reformation', period: '1400 CE - 1600 CE', icon: '🎨' },
									{ name: 'Early Modern Period', period: '1600 CE - 1800 CE', icon: '⚡' },
									{ name: 'Modern Era', period: '1800 CE - 1945 CE', icon: '🏭' },
									{ name: 'Contemporary World', period: '1945 CE - Present', icon: '🌐' },
								].map((era, i) => (
									<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-stone-700/50">
										<div className="flex items-center gap-3">
											<span className="text-xl">{era.icon}</span>
											<span className="text-white font-medium">{era.name}</span>
										</div>
										<span className="text-stone-400 text-sm">{era.period}</span>
									</div>
								))}
							</div>
						</div>

						{/* Stats */}
						<div className="space-y-6">
							<div className="p-6 rounded-2xl bg-stone-800 border border-stone-700">
								<h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
									<span>📊</span> By the Numbers
								</h3>
								<div className="grid grid-cols-2 gap-4">
									{[
										{ value: '3.3M+', label: 'Years of History' },
										{ value: '7', label: 'Historical Eras' },
										{ value: '10+', label: 'Civilizations' },
										{ value: '30+', label: 'Key Events' },
										{ value: '20+', label: 'Quiz Questions' },
										{ value: '50+', label: 'Key Figures' },
									].map((stat, i) => (
										<div key={i} className="p-4 rounded-xl bg-stone-700/50 text-center">
											<div className="text-2xl font-bold text-amber-500">{stat.value}</div>
											<div className="text-stone-400 text-sm">{stat.label}</div>
										</div>
									))}
								</div>
							</div>

							<div className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/50 to-orange-900/50 border border-amber-800/50">
								<h3 className="text-xl font-bold text-white mb-4">Ready to Explore?</h3>
								<p className="text-amber-100/80 mb-4">
									Start your journey through the ages with our interactive timeline.
								</p>
								<Link
									to="/timeline"
									className="inline-flex items-center px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-500 transition-colors"
								>
									<span>View Timeline</span>
									<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Learning Philosophy */}
			<section className="py-24 bg-stone-950">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							Our Learning Philosophy
						</h2>
					</div>

					<div className="space-y-8">
						{[
							{
								title: 'Curiosity-Driven Exploration',
								desc: 'We don\'t dictate a single path through history. Our platform allows you to follow your curiosity, jumping between eras and civilizations as your interests guide you.',
							},
							{
								title: 'Context Over Memorization',
								desc: 'Understanding why events happened is more valuable than memorizing dates. Our content emphasizes connections, causes, and consequences.',
							},
							{
								title: 'Active Learning',
								desc: 'Through quizzes and interactive elements, you actively engage with the material rather than passively consuming it, leading to better retention.',
							},
							{
								title: 'Inclusive History',
								desc: 'History belongs to all of humanity. We strive to represent civilizations from every corner of the world, telling the full story of human achievement.',
							},
						].map((principle, i) => (
							<div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-stone-900 border border-stone-800">
								<div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xl flex-shrink-0">
									{i + 1}
								</div>
								<div>
									<h3 className="text-xl font-bold text-white mb-2">{principle.title}</h3>
									<p className="text-stone-400">{principle.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 relative overflow-hidden">
				<div className="absolute inset-0 pattern-dots opacity-20" />
				<div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					<span className="text-6xl block mb-6">🌍</span>
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
						Begin Your Journey
					</h2>
					<p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
						History is the story of us all. Every innovation, every struggle, every triumph
						has led to this moment. Are you ready to explore where we came from?
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/timeline"
							className="px-8 py-4 bg-white text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition-colors"
						>
							Explore the Timeline
						</Link>
						<Link
							to="/quiz"
							className="px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors border border-white/30"
						>
							Take the Quiz
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
