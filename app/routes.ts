import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("timeline", "routes/timeline.tsx"),
	route("eras/:eraId", "routes/era.tsx"),
	route("civilizations", "routes/civilizations.tsx"),
	route("quiz", "routes/quiz.tsx"),
	route("about", "routes/about.tsx"),
] satisfies RouteConfig;
