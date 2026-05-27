<template>
	<div class="links-panel">
		<h2 class="section-title">SNS Links</h2>
		<a
			v-for="link in socialLinks"
			:key="link.label"
			:href="link.url"
			target="_blank"
			rel="noopener noreferrer"
			class="link-card glass-card"
		>
			<span class="link-icon">{{ link.icon }}</span>
			<div class="link-info">
				<p class="link-label">{{ link.label }}</p>
				<p class="link-handle">{{ link.handle }}</p>
			</div>
			<span class="link-arrow">→</span>
		</a>
	</div>
</template>

<script setup lang="ts">
const socialLinks = [
	{ label: 'X (Twitter)', icon: '𝕏', handle: '@studio_jin_doe', url: 'https://x.com/' },
	{
		label: 'SoundCloud',
		icon: '☁️',
		handle: 'studiojindoe',
		url: 'https://soundcloud.com/studiojindoe',
	},
	{ label: 'YouTube', icon: '▶️', handle: 'studio jin doe', url: 'https://youtube.com/' },
	{ label: 'Suno', icon: '🎵', handle: '@jin_doe', url: 'https://suno.com/@jin_doe' },
	{
		label: 'Instagram',
		icon: '📷',
		handle: '@studio.jin.doe',
		url: 'https://www.instagram.com/studio.jin.doe/',
	},
];
</script>

<style scoped>
.section-title {
	font-family: 'Cormorant Garamond', serif;
	font-size: 1.4rem;
	font-weight: 600;
	color: var(--text-primary);
	margin-bottom: 16px;
}
.links-panel {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.link-card {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 16px 20px;
	transition: all 0.25s;
}
.link-card:hover {
	transform: translateX(4px);
	box-shadow: var(--shadow-hover);
}

.link-icon {
	font-size: 1.5rem;
	flex-shrink: 0;
	width: 36px;
	text-align: center;
}
.link-info {
	flex: 1;
}
.link-label {
	font-weight: 700;
	font-size: 0.95rem;
	color: var(--text-primary);
}
.link-handle {
	font-size: 0.78rem;
	color: var(--text-muted);
	margin-top: 2px;
}
.link-arrow {
	font-size: 0.9rem;
	color: var(--text-muted);
	transition: color 0.2s;
}
.link-card:hover .link-arrow {
	color: var(--accent-blue);
}
</style>
