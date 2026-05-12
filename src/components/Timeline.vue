<script setup lang="ts">
import { Edit2, Trash2 } from 'lucide-vue-next';
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
  <div class="relative w-full max-w-6xl mx-auto px-4 py-16 overflow-x-auto scroll-smooth">
    <div class="absolute left-4 right-4 top-1/2 h-1 bg-slate-200" />

    <div class="relative flex items-start min-w-[1100px] gap-8">
      <div
        v-for="(event, index) in events"
        :key="event.id"
        class="relative flex flex-col items-center min-w-[230px]"
      >
        <div
          class="fade-in-up w-full max-w-[260px]"
          :style="{ animationDelay: `${index * 80}ms` }"
        >
          <div
            class="group relative cursor-pointer overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 p-5 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            @click="emit('eventClick', event)"
          >
            <div class="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 shadow-lg ring-4 ring-white" />
            <div class="text-4xl font-extrabold tracking-tight mb-3" :class="event.color">
              {{ event.date }}
            </div>
            <div class="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-800 mb-4">
              <span>{{ event.categoryIcon }}</span>
              {{ event.category }}
            </div>
            <img
              v-if="event.imageUrl"
              :src="event.imageUrl"
              :alt="event.title"
              class="h-36 w-full rounded-3xl object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <h3 class="text-lg font-semibold text-slate-900 mt-4">
              {{ event.title }}
            </h3>
            <p class="text-sm text-slate-600 mt-2 line-clamp-4">
              {{ event.description }}
            </p>
            <div
              v-if="isEditMode"
              class="mt-4 flex flex-wrap justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <button
                @click.stop="emit('edit', event)"
                class="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                <Edit2 class="w-4 h-4" />
              </button>
              <button
                @click.stop="emit('delete', event.id)"
                class="p-2 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-colors"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="relative mt-6 flex flex-col items-center">
          <div :class="['h-20 w-1 rounded-full', event.color.replace('text-', 'bg-')]" />
          <div class="mt-2 h-5 w-5 rounded-full bg-orange-500 shadow-xl" />
        </div>
      </div>
    </div>
  </div>
</template>
