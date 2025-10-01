import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChartConfig } from './ui/chart';

// High-Impact Expertise Data (Scores out of 10)
// REVISED: Scores and pillars updated to reflect high-velocity, full-stack AI system deployment proficiency (RAG project).
const expertiseData = [
	// Reflects end-to-end RAG deployment, architectural fluency, and immediate application of GenAI certifications.
	{ pillar: 'AI & Agentic Automation', score: 9.8 },
	// Renamed to emphasize architectural design, backend integration (Supabase), and serverless optimization (Vercel pivot).
	{ pillar: 'System Architecture & Integration', score: 9.5 },
	// Score boosted to reflect high technical velocity (HTV), autonomy, and full-project ownership in under a week.
	{ pillar: 'High-Velocity Project Delivery', score: 9.3 },
	// Reflects proficiency in Azure/Cloud concepts and building scalable systems (Serverless/Docker).
	{ pillar: 'Cloud & Enterprise Systems', score: 8.5 },
	// Maintaining a solid score based on existing certifications and relevance to Systems Development (Recon tools).
	{ pillar: 'Cybersecurity & Compliance', score: 7.8 },
];

// Chart Configuration
const chartConfig: ChartConfig = {
	score: {
		label: 'Expertise Score',
		color: 'hsl(var(--primary))',
	},
};

interface ChartProps {
	chartConfig: ChartConfig;
}

// NOTE: I am assuming the ChartContainer and related utility components (like CustomTooltip) are defined elsewhere
// or are functioning correctly in your environment. I am focusing only on the data and pillar names.
export const ChartRadarGridFill = ({ chartConfig }: ChartProps) => {
	// Utility components like ChartContainer are mocked here for file completeness if needed,
	// but rely on your local implementation for full functionality.
	const ChartContainer = ({ children, config }: { children: React.ReactNode; config: ChartConfig }) => {
		return <div className="relative h-[350px] w-full">{children}</div>;
	};

	const CustomTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="rounded-lg border bg-background p-2 shadow-sm">
					<div className="grid gap-1">
						<h3 className="font-semibold">{data.pillar}</h3>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Score</span>
							<span className="font-mono font-bold">{data.score.toFixed(1)}/10</span>
						</div>
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Expertise Radar</CardTitle>
				<CardDescription>
					Visual representation of core technical competencies and delivery capabilities.
				</CardDescription>
			</CardHeader>
			<CardContent className="pl-2">
				<ChartContainer config={chartConfig}>
					<ResponsiveContainer width="100%" height={350}>
						<RadarChart data={expertiseData}>
							<PolarGrid />
							<PolarAngleAxis dataKey="pillar" />
							<Radar
								dataKey="score"
								stroke="var(--color-score)"
								fill="var(--color-score)"
								fillOpacity={0.6}
							/>
							<Tooltip content={<CustomTooltip />} />
						</RadarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default ChartRadarGridFill;
