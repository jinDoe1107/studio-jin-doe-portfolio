<template>
	<div class="tools-panel">
		<h2 class="section-title">{{ t.tools.sectionTitle }}</h2>
		<a
			v-for="tool in tools"
			:key="tool.name"
			:href="tool.url"
			target="_blank"
			rel="noopener noreferrer"
			class="tool-card glass-card"
		>
			<div class="tool-image-wrapper">
				<img :src="tool.image" :alt="tool.name" class="tool-image" loading="lazy" />
			</div>
			<div class="tool-info">
				<h3 class="tool-name">{{ tool.name }}</h3>
				<p class="tool-desc">{{ desc(tool) }}</p>
				<span class="tool-link">{{ t.tools.openLink }} <span class="tool-link-arrow">→</span></span>
			</div>
		</a>
	</div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { lang } = useLang();

interface Tool {
	name: string;
	description: string;
	description_en?: string;
	image: string;
	url: string;
}

const tools: Tool[] = [
	{
		name: 'Fretglyph',
		description: 'ギターのスケール表示アプリ',
		description_en: 'A guitar scale visualizer app.',
		image: '/images/tools/fretglyph.png',
		url: 'https://studiojindoe.com/tools/fretglyph/',
	},
];

function desc(tool: Tool) {
	return lang.value === 'en' && tool.description_en ? tool.description_en : tool.description;
}
</script>

<style scoped>
.tools-panel {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.tool-card {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	transition:
		transform 0.25s ease,
		box-shadow 0.25s ease;
}
.tool-card:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-hover);
}

.tool-image-wrapper {
	background: rgba(200, 162, 240, 0.08);
	border-radius: var(--radius-lg) var(--radius-lg) 0 0;
	overflow: hidden;
}
.tool-image {
	display: block;
	width: 100%;
	height: auto;
	object-fit: cover;
}

.tool-info {
	padding: 16px 20px 20px;
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.tool-name {
	font-family: 'Cormorant Garamond', serif;
	font-size: 1.15rem;
	font-weight: 700;
	color: var(--text-primary);
}

.tool-desc {
	font-size: 0.85rem;
	color: var(--text-secondary);
	line-height: 1.6;
}

.tool-link {
	margin-top: 4px;
	font-size: 0.8rem;
	font-weight: 700;
	color: var(--accent-blue);
	display: inline-flex;
	align-items: center;
	gap: 4px;
}
.tool-link-arrow {
	transition: transform 0.2s;
}
.tool-card:hover .tool-link-arrow {
	transform: translateX(4px);
}
</style>
