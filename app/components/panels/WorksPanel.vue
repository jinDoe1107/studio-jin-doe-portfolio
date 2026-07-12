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

		<!-- SNS Links への誘導 -->
		<div class="sns-footer">
			<button class="sns-cta" @click="$emit('open-links')">
				<span>{{ t.works.snsCallout }}</span>
				<span class="sns-cta-arrow">→</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const { t } = useI18n();

defineEmits<{ 'open-links': [] }>();

const sectionKeys = ['latest', 'lofi', 'neosoul', 'citypop', 'rock', 'other'] as const;

const sections = computed(() => sectionKeys.map((key) => ({ key, label: t.value.works[key] })));

const allTracks = [
	{
		title: 'Jazzy Hip Hop #1',
		url_soundcloud: 'https://on.soundcloud.com/kTUiam1wnTNe0H12Yp',
		url_youtube: 'https://youtu.be/fEpoFFxDVqA',
		url_suno: 'https://suno.com/s/LsAexL5JcVY51T6h',
		section: 'lofi',
		isLatest: false,
		tags: ['Lo-fi', 'Jazz', 'Piano'],
		description: '切なくも温かいピアノの旋律が漂う、Jazzy Hip Hopトラックです。',
		description_en: 'A Jazzy Hip Hop track featuring melancholic yet warm piano melodies.',
	},
	{
		title: 'Jazzy Hip Hop #2',
		url_soundcloud: 'https://on.soundcloud.com/Unkx3EPK0nddmd0DAa',
		url_youtube: 'https://youtu.be/3NSX5fFC-Ds',
		url_suno: 'https://suno.com/s/VF8CQPBe5evhyHKE',
		section: 'lofi',
		isLatest: false,
		tags: ['Lo-fi', 'Jazz', 'Piano'],
		description: '切なくも温かいピアノの旋律が漂う、Jazzy Hip Hopトラックの２作目です。',
		description_en: 'A Jazzy Hip Hop track featuring melancholic yet warm piano melodies.',
	},
	{
		title: 'Neo Soul #1',
		url_soundcloud: 'https://on.soundcloud.com/pB2EaBcEZ0pFetmjNA',
		url_youtube: 'https://youtu.be/6M9YdHmbtkg',
		url_suno: 'https://suno.com/s/bGKDCBH3Pl3Rdt5j',
		section: 'neosoul',
		isLatest: false,
		tags: ['NeoSoul', 'Guitar', 'chill'],
		description: 'メロウなギターの旋律が漂う、Neo Soul の第1作目です。',
		description_en: 'Laid-back Neo Soul, carried by a gentle guitar melody that quietly floats by.',
	},
	{
		title: 'Jazzy Hip Hop #3',
		url_soundcloud:
			'https://soundcloud.com/studiojindoe/jazzy-hip-hop-3?si=b04568c93a51472fbd3c944fd112abc4&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
		url_youtube: 'https://youtu.be/pQzRRlt3kPY',
		url_suno: 'https://suno.com/song/a9619742-c7d5-477e-91d8-ed92c396ada7',
		section: 'lofi',
		isLatest: false,
		tags: ['Lo-fi', 'Jazz', 'Piano'],
		description: '温かいピアノとギターの旋律が漂う、Jazzy Hip Hopトラックの第3作目です。',
		description_en: 'A Jazzy Hip Hop track featuring warm piano and guitar melodies.',
	},
	{
		title: 'Jazzy Hip Hop #4',
		url_soundcloud:
			'https://soundcloud.com/studiojindoe/jazzy-hiphop-4?si=d3cae79cf43f462db7ce3341f23898fb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
		url_youtube: 'https://youtu.be/Tr3d7RXVIho',
		url_suno: 'https://suno.com/s/d6PBj1jOuxNkOIHh',
		section: 'lofi',
		isLatest: false,
		tags: ['Lo-fi', 'Jazz', 'Piano'],
		description: '不安定なギターの旋律が漂う、Jazzy Hip Hopトラックの第4作目です。',
		description_en: 'A Jazzy Hip Hop track featuring unstable guitar melodies.',
	},
	{
		title: 'Downhill',
		url_soundcloud:
			'https://soundcloud.com/studiojindoe/downhill?si=5c53c7b26d55479382796c16936daf1f&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
		url_youtube: 'https://youtu.be/reiXHeRDhSk',
		url_suno: 'https://suno.com/s/MPwka6epfCy289Eo',
		section: 'rock',
		isLatest: false,
		tags: ['Rock', 'Alternative'],
		description: '制御不能な感情と、自分自身への嫌悪をテーマにしたロックナンバーです',
		description_en: 'A rock number themed around uncontrollable emotions and self-loathing.',
	},
	{
		title: 'Letters',
		url_soundcloud: '',
		url_youtube: 'https://youtu.be/1EUYBfMVMVY',
		url_suno: 'https://suno.com/s/jsaefw9QB5qCb23J',
		section: 'rock',
		isLatest: true,
		tags: ['Rock', 'Alternative', 'Metal', 'Post-Hardcore'],
		description:
			'失った相手への未練と、自分自身への後悔を描いた楽曲です。捨てられない手紙を、忘れてはいけない過去と罰の証として表現しました。',
		description_en:
			'A song that depicts lingering feelings for a lost partner and regret towards oneself. The unreturnable letter is expressed as a testament to a past that must not be forgotten and as a form of punishment.',
	},
	{
		title: 'Trash Words',
		url_soundcloud: '',
		url_youtube: 'https://youtu.be/jPS9GaDTtEk',
		url_suno: 'https://suno.com/s/3Me1PeT2d54s7I4Z',
		section: 'rock',
		isLatest: true,
		tags: ['Rock', 'Alternative', 'Metal', 'Post-Hardcore'],
		description:
			'何も知らないくせに、勝手に人の限界を決める言葉。自分を否定してきた人たちへ向けた曲です。',
		description_en:
			'A song directed at those who, without knowing anything, arbitrarily set limits on others. It is aimed at those who have denied me.',
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

.sns-footer {
	padding-top: 16px;
	border-top: 1px solid rgba(123, 140, 222, 0.2);
}

.sns-cta {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 12px 18px;
	border-radius: var(--radius-md);
	border: 1px solid rgba(123, 140, 222, 0.25);
	background: transparent;
	color: var(--text-secondary);
	font-family: inherit;
	font-size: 0.85rem;
	cursor: pointer;
	transition: all 0.2s;
}

.sns-cta:hover {
	background: rgba(123, 140, 222, 0.1);
	color: var(--text-primary);
	border-color: rgba(123, 140, 222, 0.45);
}

.sns-cta-arrow {
	color: var(--accent-blue);
	transition: transform 0.2s;
}

.sns-cta:hover .sns-cta-arrow {
	transform: translateX(4px);
}
</style>
