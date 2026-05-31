<template>
	<div class="works-panel">
		<!-- セクション一覧 -->
		<template v-for="section in sections" :key="section.key">
			<div :id="`section-${section.key}`" class="works-section">
				<h3 class="section-label">{{ section.label }}</h3>
				<div v-if="tracksBySection(section.key).length" class="works-grid">
					<TrackCard
						v-for="(track, i) in tracksBySection(section.key)"
						:key="track.title"
						:track="track"
						class="fade-in"
						:style="{ animationDelay: `${i * 0.1}s` }"
					/>
				</div>
				<p v-else class="tbc">{{ t.works.tbc }}</p>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const sectionKeys = ['latest', 'lofi', 'neosoul', 'citypop', 'rock', 'other'] as const;

const sections = computed(() => sectionKeys.map((key) => ({ key, label: t.value.works[key] })));

const allTracks = [
	{
		title: 'Jazzy Hip Hop #1',
		url_soundcloud: 'https://on.soundcloud.com/kTUiam1wnTNe0H12Yp',
		url_youtube: 'https://youtu.be/fEpoFFxDVqA',
		url_suno: 'https://suno.com/s/LsAexL5JcVY51T6h',
		section: 'lofi',
		isLatest: true,
		tags: ['Lo-fi', 'Jazz', 'Piano'],
		description: '切なくも温かいピアノの旋律が漂う、Jazzy Hip Hopトラックです。',
		description_en: 'A Jazzy Hip Hop track featuring melancholic yet warm piano melodies.',
	},
];

function tracksBySection(key: string) {
	if (key === 'latest') return allTracks.filter((t) => t.isLatest);
	return allTracks.filter((t) => t.section === key);
}
</script>

<style scoped>
.works-panel {
	display: flex;
	flex-direction: column;
	gap: 32px;
}

/* スティッキーナビ */
.section-nav {
	position: sticky;
	top: 0;
	z-index: 10;
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	padding: 8px 0 10px;
	background: linear-gradient(to bottom, var(--bg-base) 80%, transparent 100%);
}

.section-nav-btn {
	padding: 4px 12px;
	border-radius: 999px;
	font-size: 0.78rem;
	font-weight: 700;
	font-family: inherit;
	border: 1px solid rgba(123, 140, 222, 0.25);
	background: transparent;
	color: var(--text-secondary);
	cursor: pointer;
	transition: all 0.2s;
	white-space: nowrap;
}
.section-nav-btn:hover {
	background: rgba(123, 140, 222, 0.12);
	color: var(--text-primary);
	border-color: rgba(123, 140, 222, 0.4);
}

/* セクション */
.works-section {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.section-label {
	font-family: 'Cormorant Garamond', serif;
	font-size: 1.1rem;
	font-weight: 600;
	color: var(--text-primary);
	letter-spacing: 0.04em;
	padding-bottom: 6px;
	border-bottom: 1px solid rgba(123, 140, 222, 0.2);
}

.works-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
}

.tbc {
	font-size: 0.82rem;
	color: var(--text-secondary);
	font-style: italic;
	padding: 8px 0;
}
</style>
