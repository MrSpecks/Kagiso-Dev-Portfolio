import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChartConfig } from './ui/chart';

// High-Impact Expertise Data (Scores out of 10)
const expertiseData = [
	{ pillar: 'AI & Agentic Automation', score: 10.0 },
	{ pillar: 'UI/UX & Full-Stack Engineering', score: 9.0 },
	{ pillar: 'Agile & Project Delivery', score: 8.5 },
	{ pillar: 'Cloud & Enterprise Systems', score: 8.0 },
	{ pillar: 'Cybersecurity & Compliance', score: 7.5 },
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

export const ChartRadarGridFill = ({ chartConfig }: ChartProps) => {
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

const ChartContainer = ({ children, config }: { children: React.ReactNode; config: ChartConfig }) => {
	return <div className="relative h-[350px] w-full">{children}</div>;
};

export default ChartRadarGridFill;
