import React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChartConfig } from './ui/chart';

// High-Impact Expertise Data (Scores out of 10)
// REVISED: Scores and pillars updated to reflect high-velocity, full-stack AI system deployment proficiency (RAG project).
const expertiseData = [
    // Retaining high score; impact from the recent multicloud course is indirect/minimal here.
    { pillar: 'AI & Agentic Automation', score: 9.8 },
    // Score boosted to reflect mastery in complex multicloud integration, advanced networking (Interconnects), 
    // and federated identity management across OCI, Azure, and Google Cloud.
    { pillar: 'Enterprise Systems Design', score: 9.7 },
    // Slight boost for validating competence in designing and delivering high-availability (HA) and disaster recovery (DR) solutions in complex enterprise environments.
    { pillar: 'Continuous Delivery & DevOps', score: 9.4 },
    // Significant boost due to achieving professional-level expertise in Multicloud Architecture (OCI, Azure, GCP). This is the core skill confirmed by the new course.
    { pillar: 'Multicloud Architecture', score: 9.6 },
    // Score boosted to reflect expertise in cross-cloud Identity & Access Management (IAM) federation and applying regulatory compliance/data security best practices across multicloud infrastructure.
    { pillar: 'Security & Compliance', score: 8.3 },
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
					Each axis represents a distinct skill domain scored out of 10. Hover any point to see the exact score.
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
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground border-t border-border pt-4">
					{expertiseData.map((item) => (
						<div key={item.pillar} className="flex items-center justify-between gap-2">
							<span className="flex items-center gap-1.5">
								<span className="inline-block w-2 h-2 rounded-full bg-primary/70 shrink-0" />
								{item.pillar}
							</span>
							<span className="font-mono font-semibold text-foreground tabular-nums">{item.score.toFixed(1)}/10</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default ChartRadarGridFill;
