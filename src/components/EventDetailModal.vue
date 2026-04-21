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
      class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="relative">
        <img
          v-if="event.imageUrl"
          :src="event.imageUrl"
          :alt="event.title"
          class="w-full h-96 object-cover rounded-t-lg"
        />
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors shadow-lg"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="p-8">
        <div :class="['inline-block text-3xl font-bold mb-4', event.color]">
          {{ event.date }}
        </div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {{ event.title }}
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {{ event.description }}
        </p>
      </div>
    </div>
  </div>
</template>
