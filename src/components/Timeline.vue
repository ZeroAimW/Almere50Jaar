<script setup lang="ts">
import { Edit2, Trash2, Image as ImageIcon } from 'lucide-vue-next';
import type { TimelineEvent } from '../types';

interface Props {
  events: TimelineEvent[];
  isEditMode?: boolean;
}

withDefaults(defineProps<Props>(), {
  isEditMode: false
});

const emit = defineEmits<{
  edit: [event: TimelineEvent];
  delete: [id: string];
  eventClick: [event: TimelineEvent];
}>();
</script>

<template>
  <div class="relative w-full max-w-6xl mx-auto px-8 py-16 overflow-x-auto">
    <!-- Horizontal line -->
    <div class="absolute left-8 right-8 top-1/2 h-0.5 bg-gray-300 dark:bg-gray-600" />

    <div class="relative flex justify-between items-center min-w-max">
      <div
        v-for="(event, index) in events"
        :key="event.id"
        class="relative flex flex-col items-center flex-1 min-w-[180px]"
      >
        <!-- Content above -->
        <div v-if="index % 2 === 0" class="mb-24 text-center px-2 group">
          <div :class="['text-2xl font-bold mb-3', event.color]">
            {{ event.date }}
          </div>
          <img
            v-if="event.imageUrl"
            :src="event.imageUrl"
            :alt="event.title"
            class="w-32 h-24 object-cover rounded-lg mb-2 mx-auto cursor-pointer hover:opacity-80 transition-opacity"
            @click="emit('eventClick', event)"
          />
          <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm">
            {{ event.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 max-w-[160px] mx-auto line-clamp-3">
            {{ event.description }}
          </p>
          <div v-if="isEditMode" class="flex gap-2 justify-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              @click="emit('edit', event)"
              class="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Edit2 class="w-3 h-3" />
            </button>
            <button
              @click="emit('delete', event.id)"
              class="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <Trash2 class="w-3 h-3" />
            </button>
          </div>
        </div>

        <!-- Vertical connector and dot -->
        <div class="relative flex flex-col items-center">
          <div
            v-if="index % 2 === 0"
            :class="['w-0.5 h-20', event.color.replace('text-', 'bg-')]"
          />

          <div :class="['w-5 h-5 rounded-full border-4 bg-white dark:bg-gray-900 z-10 relative', event.color.replace('text-', 'border-')]">
            <ImageIcon v-if="event.imageUrl" class="absolute -top-1 -right-1 w-3 h-3 text-teal-500" />
          </div>

          <div
            v-if="index % 2 !== 0"
            :class="['w-0.5 h-20', event.color.replace('text-', 'bg-')]"
          />
        </div>

        <!-- Content below -->
        <div v-if="index % 2 !== 0" class="mt-24 text-center px-2 group">
          <div :class="['text-2xl font-bold mb-3', event.color]">
            {{ event.date }}
          </div>
          <img
            v-if="event.imageUrl"
            :src="event.imageUrl"
            :alt="event.title"
            class="w-32 h-24 object-cover rounded-lg mb-2 mx-auto cursor-pointer hover:opacity-80 transition-opacity"
            @click="emit('eventClick', event)"
          />
          <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm">
            {{ event.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 max-w-[160px] mx-auto line-clamp-3">
            {{ event.description }}
          </p>
          <div v-if="isEditMode" class="flex gap-2 justify-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              @click="emit('edit', event)"
              class="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Edit2 class="w-3 h-3" />
            </button>
            <button
              @click="emit('delete', event.id)"
              class="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <Trash2 class="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
