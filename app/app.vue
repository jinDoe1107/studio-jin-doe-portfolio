<template>
  <div class="app-wrapper">
    <NuxtRouteAnnouncer />

    <!-- 背景動画（A/B 2枚重ねでクロスディゾルブ） -->
    <div class="video-bg">
      <video
        ref="videoA"
        autoplay
        muted
        playsinline
        class="video-el"
        :class="{ 'video-el--visible': activeSlot === 'a' }"
        @timeupdate="onTimeUpdate"
      />
      <video
        ref="videoB"
        muted
        playsinline
        class="video-el"
        :class="{ 'video-el--visible': activeSlot === 'b' }"
        @timeupdate="onTimeUpdate"
      />
      <div class="video-overlay" />
    </div>

    <AppHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const FADE_SEC = 1.5

const videoA = ref<HTMLVideoElement | null>(null)
const videoB = ref<HTMLVideoElement | null>(null)
const activeSlot = ref<'a' | 'b'>('a')
const videos = ref<string[]>([])
const currentIndex = ref(0)
const transitioning = ref(false)

function activeEl() {
  return activeSlot.value === 'a' ? videoA.value : videoB.value
}
function inactiveEl() {
  return activeSlot.value === 'a' ? videoB.value : videoA.value
}

function pickNextIndex() {
  if (videos.value.length <= 1) return 0
  let next: number
  do {
    next = Math.floor(Math.random() * videos.value.length)
  } while (next === currentIndex.value)
  return next
}

function crossfade() {
  if (transitioning.value || !videos.value.length) return
  transitioning.value = true

  const nextIndex = pickNextIndex()
  const next = inactiveEl()
  if (!next) return

  next.src = videos.value[nextIndex]!
  next.load()
  next.play().catch(() => {})

  activeSlot.value = activeSlot.value === 'a' ? 'b' : 'a'
  currentIndex.value = nextIndex

  setTimeout(() => { transitioning.value = false }, FADE_SEC * 1000)
}

function onTimeUpdate(e: Event) {
  const el = e.target as HTMLVideoElement
  // アクティブなスロットの動画だけ監視
  if (el !== activeEl()) return
  if (!el.duration || transitioning.value) return
  if (el.currentTime >= el.duration - FADE_SEC) {
    crossfade()
  }
}

onMounted(async () => {
  videos.value = await $fetch<string[]>('/playlist.json')
  const el = videoA.value
  if (!el || !videos.value.length) return
  const startIndex = Math.floor(Math.random() * videos.value.length)
  currentIndex.value = startIndex
  el.src = videos.value[startIndex]!
  el.load()
  el.play().catch(() => {})
})
</script>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.video-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.video-el {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity v-bind('`${FADE_SEC}s`') ease;
}

.video-el--visible {
  opacity: 1;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 15, 20, 0.60) 0%,
    rgba(18, 20, 32, 0.55) 50%,
    rgba(13, 15, 20, 0.60) 100%
  );
}

.main-content {
  flex: 1;
  padding: 64px 0 0;
}
</style>
