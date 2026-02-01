import { useState, useCallback } from 'react';
import { Link } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { quizQuestions } from '../data/history';

export function meta() {
	return [
		{ title: 'History Quiz - Test Your Knowledge | World History Explorer' },
		{ name: 'description', content: 'Challenge yourself with our interactive history quiz. Test your knowledge of world history from ancient civilizations to modern events.' },
	];
}

type QuizState = 'intro' | 'playing' | 'finished';
type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

export default function Quiz() {
	const [quizState, setQuizState] = useState<QuizState>('intro');
	const [difficulty, setDifficulty] = useState<Difficulty>('all');
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [isAnswered, setIsAnswered] = useState(false);
	const [score, setScore] = useState(0);
	const [answers, setAnswers] = useState<boolean[]>([]);

	const filteredQuestions = quizQuestions.filter(q =>
		difficulty === 'all' ? true : q.difficulty === difficulty
	);

	const shuffledQuestions = [...filteredQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
	const [questions, setQuestions] = useState(shuffledQuestions);

	const currentQuestion = questions[currentQuestionIndex];
	const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

	const startQuiz = useCallback((selectedDifficulty: Difficulty) => {
		setDifficulty(selectedDifficulty);
		const filtered = quizQuestions.filter(q =>
			selectedDifficulty === 'all' ? true : q.difficulty === selectedDifficulty
		);
		const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
		setQuestions(shuffled);
		setCurrentQuestionIndex(0);
		setSelectedAnswer(null);
		setIsAnswered(false);
		setScore(0);
		setAnswers([]);
		setQuizState('playing');
	}, []);

	const handleAnswer = (answerIndex: number) => {
		if (isAnswered) return;

		setSelectedAnswer(answerIndex);
		setIsAnswered(true);

		const isCorrect = answerIndex === currentQuestion.correctAnswer;
		if (isCorrect) {
			setScore(score + 1);
		}
		setAnswers([...answers, isCorrect]);
	};

	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedAnswer(null);
			setIsAnswered(false);
		} else {
			setQuizState('finished');
		}
	};

	const restartQuiz = () => {
		setQuizState('intro');
	};

	const getAnswerClass = (index: number) => {
		if (!isAnswered) {
			return selectedAnswer === index
				? 'border-amber-500 bg-amber-500/10'
				: 'border-stone-700 hover:border-stone-600 bg-stone-800';
		}

		if (index === currentQuestion.correctAnswer) {
			return 'correct-answer border-emerald-500 bg-emerald-500/20';
		}

		if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
			return 'wrong-answer border-red-500 bg-red-500/20';
		}

		return 'border-stone-700 bg-stone-800 opacity-50';
	};

	const getDifficultyColor = (diff: string) => {
		switch (diff) {
			case 'easy': return 'text-emerald-500 bg-emerald-500/10';
			case 'medium': return 'text-amber-500 bg-amber-500/10';
			case 'hard': return 'text-red-500 bg-red-500/10';
			default: return 'text-stone-400 bg-stone-700';
		}
	};

	const getScoreMessage = () => {
		const percentage = (score / questions.length) * 100;
		if (percentage === 100) return { emoji: '🏆', message: 'Perfect Score! You\'re a history master!' };
		if (percentage >= 80) return { emoji: '🌟', message: 'Excellent! You really know your history!' };
		if (percentage >= 60) return { emoji: '📚', message: 'Good job! Keep learning and you\'ll be a master!' };
		if (percentage >= 40) return { emoji: '🎯', message: 'Not bad! There\'s room for improvement.' };
		return { emoji: '📖', message: 'Keep studying! History is fascinating!' };
	};

	return (
		<div className="min-h-screen bg-stone-950">
			<Navigation />

			{/* Quiz Intro */}
			{quizState === 'intro' && (
				<section className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden">
					<div className="absolute inset-0 pattern-grid opacity-30" />
					<div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
						<span className="text-8xl block mb-6">🧠</span>
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
							World History <span className="text-gradient">Quiz</span>
						</h1>
						<p className="text-stone-400 text-lg max-w-2xl mx-auto mb-12">
							Test your knowledge of world history! Answer 10 questions from our collection
							spanning ancient civilizations to modern events.
						</p>

						<div className="mb-12">
							<h3 className="text-white font-semibold mb-4">Choose Your Difficulty</h3>
							<div className="flex flex-wrap justify-center gap-4">
								{[
									{ id: 'all', label: 'All Levels', icon: '🎯', desc: 'Mix of all difficulties' },
									{ id: 'easy', label: 'Easy', icon: '🌱', desc: 'Perfect for beginners' },
									{ id: 'medium', label: 'Medium', icon: '📚', desc: 'For history enthusiasts' },
									{ id: 'hard', label: 'Hard', icon: '🏆', desc: 'For the experts' },
								].map((diff) => (
									<button
										key={diff.id}
										onClick={() => startQuiz(diff.id as Difficulty)}
										className="group p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 text-left min-w-[200px]"
									>
										<span className="text-3xl block mb-2">{diff.icon}</span>
										<h4 className="text-white font-bold group-hover:text-amber-500 transition-colors">{diff.label}</h4>
										<p className="text-stone-500 text-sm">{diff.desc}</p>
									</button>
								))}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
							{[
								{ icon: '❓', value: '20+', label: 'Questions' },
								{ icon: '🏛️', value: '7', label: 'Historical Eras' },
								{ icon: '⏱️', value: '~5 min', label: 'Quiz Duration' },
							].map((stat, i) => (
								<div key={i} className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800">
									<span className="text-2xl block mb-2">{stat.icon}</span>
									<div className="text-2xl font-bold text-amber-500">{stat.value}</div>
									<div className="text-stone-400 text-sm">{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Quiz Playing */}
			{quizState === 'playing' && currentQuestion && (
				<section className="min-h-screen pt-24 pb-16">
					<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
						{/* Progress Bar */}
						<div className="mb-8">
							<div className="flex items-center justify-between mb-2">
								<span className="text-stone-400 text-sm">Question {currentQuestionIndex + 1} of {questions.length}</span>
								<span className="text-amber-500 font-medium">Score: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}</span>
							</div>
							<div className="h-2 bg-stone-800 rounded-full overflow-hidden">
								<div
									className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 progress-animated"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>

						{/* Question Card */}
						<div className="bg-stone-900 rounded-2xl border border-stone-800 p-8 mb-8">
							<div className="flex items-center justify-between mb-6">
								<span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
									{currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
								</span>
								<span className="text-stone-500 text-sm">{currentQuestion.era.charAt(0).toUpperCase() + currentQuestion.era.slice(1)} Era</span>
							</div>

							<h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
								{currentQuestion.question}
							</h2>

							<div className="space-y-4">
								{currentQuestion.options.map((option, index) => (
									<button
										key={index}
										onClick={() => handleAnswer(index)}
										disabled={isAnswered}
										className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${getAnswerClass(index)}`}
									>
										<div className="flex items-center space-x-4">
											<div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
												isAnswered && index === currentQuestion.correctAnswer
													? 'bg-emerald-500 text-white'
													: isAnswered && index === selectedAnswer
														? 'bg-red-500 text-white'
														: 'bg-stone-700 text-stone-300'
											}`}>
												{String.fromCharCode(65 + index)}
											</div>
											<span className={`text-lg ${
												isAnswered && index === currentQuestion.correctAnswer
													? 'text-emerald-400'
													: isAnswered && index === selectedAnswer
														? 'text-red-400'
														: 'text-white'
											}`}>
												{option}
											</span>
										</div>
									</button>
								))}
							</div>

							{/* Explanation */}
							{isAnswered && (
								<div className="mt-8 p-4 rounded-xl bg-stone-800 border border-stone-700 fade-in-up">
									<h4 className="text-amber-500 font-semibold mb-2">Explanation</h4>
									<p className="text-stone-300">{currentQuestion.explanation}</p>
								</div>
							)}
						</div>

						{/* Next Button */}
						{isAnswered && (
							<button
								onClick={nextQuestion}
								className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors flex items-center justify-center space-x-2 fade-in-up"
							>
								<span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}</span>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</button>
						)}
					</div>
				</section>
			)}

			{/* Quiz Finished */}
			{quizState === 'finished' && (
				<section className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden">
					<div className="absolute inset-0 pattern-dots opacity-20" />

					<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
						<span className="text-8xl block mb-6 fade-in-up">{getScoreMessage().emoji}</span>

						<h1 className="text-4xl md:text-5xl font-bold text-white mb-4 fade-in-up fade-in-up-delay-1" style={{ fontFamily: 'Playfair Display, serif' }}>
							Quiz Complete!
						</h1>

						<p className="text-stone-400 text-lg mb-8 fade-in-up fade-in-up-delay-2">
							{getScoreMessage().message}
						</p>

						{/* Score Display */}
						<div className="mb-8 fade-in-up fade-in-up-delay-3">
							<div className="inline-block p-8 rounded-2xl bg-stone-900 border border-stone-800">
								<div className="text-6xl font-bold text-gradient mb-2">
									{score}/{questions.length}
								</div>
								<div className="text-stone-400">
									{Math.round((score / questions.length) * 100)}% Correct
								</div>
							</div>
						</div>

						{/* Answer Summary */}
						<div className="flex justify-center gap-2 mb-8 fade-in-up fade-in-up-delay-3">
							{answers.map((correct, i) => (
								<div
									key={i}
									className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
										correct
											? 'bg-emerald-500 text-white'
											: 'bg-red-500 text-white'
									}`}
								>
									{i + 1}
								</div>
							))}
						</div>

						{/* Actions */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up fade-in-up-delay-4">
							<button
								onClick={restartQuiz}
								className="px-8 py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors"
							>
								Play Again
							</button>
							<Link
								to="/timeline"
								className="px-8 py-4 bg-stone-800 text-white font-bold rounded-xl hover:bg-stone-700 transition-colors border border-stone-700"
							>
								Explore Timeline
							</Link>
						</div>

						{/* Share Score */}
						<div className="mt-12 p-6 rounded-2xl bg-stone-900/50 border border-stone-800 fade-in-up fade-in-up-delay-4">
							<h3 className="text-white font-semibold mb-2">Keep Learning!</h3>
							<p className="text-stone-400 text-sm">
								Explore our timeline and civilization guides to deepen your historical knowledge.
							</p>
						</div>
					</div>
				</section>
			)}

			{quizState !== 'intro' && <Footer />}
		</div>
	);
}
