<script setup lang="ts">
import { X } from 'lucide-vue-next';
import type { TimelineEvent } from '../types';

interface Props {
  event: TimelineEvent | null;
  isOpen: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    v-if="isOpen && event"
    class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    @click="emit('close')"
  >
    <div
      class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/70 backdrop-blur-xl"
      @click.stop
    >
      <div class="relative">
        <img
          v-if="event.imageUrl"
          :src="event.imageUrl"
          :alt="event.title"
          class="w-full h-96 object-cover rounded-t-3xl"
        />
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-colors shadow-lg"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-8">
        <div class="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 mb-4">
          <span>{{ event.categoryIcon }}</span>
          {{ event.category }}
        </div>
        <div :class="['inline-block text-4xl font-bold mb-4', event.color]">
          {{ event.date }}
        </div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          {{ event.title }}
        </h2>
        <p class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {{ event.description }}
        </p>
      </div>
    </div>
  </div>
</template>
