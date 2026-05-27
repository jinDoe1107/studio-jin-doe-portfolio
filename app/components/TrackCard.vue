<template>
  <div class="track-card glass-card">
    <div class="embed-wrapper">
      <iframe
        v-if="youtubeId"
        :src="`https://www.youtube.com/embed/${youtubeId}`"
        width="100%"
        height="220"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <iframe
        v-else-if="track.url_soundcloud"
        :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url_soundcloud)}&color=%23c8a2f0&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`"
        width="100%"
        height="166"
        frameborder="0"
        allow="autoplay; encrypted-media"
        scrolling="no"
      />
    </div>
    <div class="track-info">
      <h3 class="track-title">{{ track.title }}</h3>
      <p v-if="desc" class="track-desc">{{ desc }}</p>

      <div class="platform-links">
        <a
          v-if="track.url_youtube"
          :href="track.url_youtube"
          target="_blank"
          rel="noopener noreferrer"
          class="platform-link platform-link--yt"
        >▶ YouTube</a>
        <a
          v-if="track.url_soundcloud"
          :href="track.url_soundcloud"
          target="_blank"
          rel="noopener noreferrer"
          class="platform-link platform-link--sc"
        >☁ SoundCloud</a>
        <a
          v-if="track.url_suno"
          :href="track.url_suno"
          target="_blank"
          rel="noopener noreferrer"
          class="platform-link platform-link--suno"
        >🎵 Suno</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Track {
  title: string
  url_soundcloud?: string
  url_youtube?: string
  url_suno?: string
  section: string
  description?: string
  description_en?: string
}

const props = defineProps<{ track: Track }>()

const { lang } = useLang()

const desc = computed(() =>
  lang.value === 'en' && props.track.description_en
    ? props.track.description_en
    : props.track.description
)

// YouTube URL から動画IDを抽出
const youtubeId = computed(() => {
  const url = props.track.url_youtube
  if (!url) return null
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
})
</script>

<style scoped>
.track-card {
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.track-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.embed-wrapper {
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
  background: rgba(200, 162, 240, 0.08);
}

.track-info {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.track-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
}

.track-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.platform-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.platform-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.platform-link--sc {
  background: rgba(255, 85, 0, 0.12);
  color: #ff7733;
  border-color: rgba(255, 85, 0, 0.25);
}
.platform-link--sc:hover { background: rgba(255, 85, 0, 0.22); }

.platform-link--yt {
  background: rgba(255, 0, 0, 0.12);
  color: #ff4444;
  border-color: rgba(255, 0, 0, 0.25);
}
.platform-link--yt:hover { background: rgba(255, 0, 0, 0.22); }

.platform-link--suno {
  background: rgba(123, 140, 222, 0.12);
  color: var(--accent-blue);
  border-color: rgba(123, 140, 222, 0.25);
}
.platform-link--suno:hover { background: rgba(123, 140, 222, 0.22); }
</style>
