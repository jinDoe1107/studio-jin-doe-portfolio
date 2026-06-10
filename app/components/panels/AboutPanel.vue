<template>
	<div class="about-panel">
		<section class="content-section fade-in fade-in-delay-1">
			<h2 class="section-title">{{ t.about.sectionTitle }}</h2>
			<div class="prose glass-card">
				<p>{{ t.about.p1 }}</p>
				<p>{{ t.about.p2 }}</p>
				<p>{{ t.about.p3 }}</p>
				<p>{{ t.about.p4 }}</p>
			</div>
		</section>

		<section class="content-section">
			<h3 class="section-title">{{ t.about.artistsTitle }}</h3>
			<div class="artist-list">
				<div v-for="artist in artists" :key="artist.name" class="artist-item glass-card">
					<span class="artist-name">{{ artist.name }}</span>
					<span class="artist-genre">{{ artist.genre }}</span>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const artists = [
	{ name: 'Pay Money To My Pain', genre: 'Post-Hardcore' },
	{ name: 'Bullet for my Valentine', genre: 'Metalcore' },
	{ name: 'Deftones', genre: 'Alt Metal / Shoegaze' },
	{ name: 'Taproot', genre: 'Alternative Metal' },
	{ name: 'Tom Misch', genre: 'Neo Soul' },
	{ name: 'nujabes', genre: 'Lo-fi Hip-Hop' },
	{ name: 'Ginger Root', genre: 'City Pop' },
	{ name: 'カーリー・ジラフ', genre: 'Indie Pop' },
	{ name: 'mex.fS', genre: 'Lap tap/Percussive guitarist' },
	{ name: '井草聖二-Seiji Igusa', genre: 'Solo Guitar' },
	{ name: '凛として時雨', genre: 'Math Rock' },
	{ name: 'P.O.W', genre: 'Hardcore' },
	{ name: 'Refused', genre: 'Hardcore Punk' },
	{ name: 'the Cabs', genre: 'Math Rock' },
	{ name: 'MR.BIG', genre: 'Hard Rock' },
	{ name: 'MOROHA', genre: 'Folk Hip-Hop' },
	{ name: 'Kenny Wayne Shepherd', genre: 'Blues Rock' },
	{ name: 'ペトロールズ', genre: 'Indie Rock' },
	{ name: 'はっぴいえんど', genre: 'Japanese Folk Rock' },
	{ name: 'Breaking Benjamin', genre: 'Post-Grunge' },
	{ name: 'My Chemical Romance', genre: 'Emo / Alt Rock' },
	{ name: 'Tempalay', genre: 'Psychedelic Rock' },
	{ name: 'Andy McKee', genre: 'Fingerstyle Guitar' },
	{ name: 'Architects', genre: 'Metalcore' },
	{ name: 'Fuzzy Control', genre: 'Punk Rock' },
	{ name: 'Hocus Pocus', genre: 'Hip-Hop' },
	{ name: 'King Gnu', genre: 'Art Rock' },
	{ name: 'LiSA', genre: 'J-Pop / Rock' },
	{ name: 'Memphis May Fire', genre: 'Metalcore' },
	{ name: 'Raujika', genre: 'J-Pop' },
	{ name: 'Slow Pulp', genre: 'Emo / Shoegaze' },
	{ name: 'Three Days Grace', genre: 'Post-Grunge' },
	{ name: 'Vulfpeck', genre: 'Indie Funk' },
	{ name: '', genre: 'and more...' },
];
</script>

<style scoped>
.about-panel {
	display: flex;
	flex-direction: column;
	gap: 32px;
}

.section-title {
	font-family: 'Cormorant Garamond', serif;
	font-size: 1.4rem;
	font-weight: 600;
	color: var(--text-primary);
	margin-bottom: 16px;
}
.prose {
	padding: 20px 24px;
	display: flex;
	flex-direction: column;
	gap: 12px;
}
.prose p {
	color: var(--text-primary);
	line-height: 1.9;
	font-size: 0.9rem;
}

.artist-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.artist-item {
	position: relative;
	padding: 10px 18px 14px;
	min-height: 2.8rem;
}
.artist-name {
	display: block;
	font-size: 0.9rem;
	font-weight: 700;
	color: var(--text-primary);
	text-align: left;
}
.artist-genre {
	position: absolute;
	right: 18px;
	bottom: 0px;
	font-size: 0.75rem;
	color: var(--text-secondary);
}
</style>
