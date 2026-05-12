<script setup lang="ts">
import { ref, watch } from 'vue';
import { X, Upload } from 'lucide-vue-next';
import type { EventCategory, TimelineEvent } from '../types';

interface Props {
  isOpen: boolean;
  neighborhood: string;
  editEvent?: TimelineEvent;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  save: [event: Omit<TimelineEvent, 'id'>];
}>();

interface CategoryOption {
  label: string;
  value: EventCategory;
  icon: string;
}

const categories: CategoryOption[] = [
  { label: 'Sport', value: 'Sport', icon: '⚽' },
  { label: 'Kunst', value: 'Kunst', icon: '🎨' },
  { label: 'Cultuur', value: 'Cultuur', icon: '🎭' },
];

const formData = ref({
  date: '',
  title: '',
  description: '',
  imageUrl: '',
  color: 'text-orange-500',
  category: 'Cultuur' as EventCategory,
  categoryIcon: '🎭',
});

watch(
  () => props.editEvent,
  (newVal) => {
    if (newVal) {
      formData.value = {
        date: newVal.date,
        title: newVal.title,
        description: newVal.description,
        imageUrl: newVal.imageUrl || '',
        color: newVal.color,
        category: newVal.category,
        categoryIcon: newVal.categoryIcon,
      };
    } else {
      formData.value = {
        date: '',
        title: '',
        description: '',
        imageUrl: '',
        color: 'text-orange-500',
        category: 'Cultuur',
        categoryIcon: '🎭',
      };
    }
  }
);

const handleCategorySelect = (category: CategoryOption) => {
  formData.value.category = category.value;
  formData.value.categoryIcon = category.icon;
};

const handleSubmit = () => {
  emit('save', formData.value);
  emit('close');
};

const colors = [
  { name: 'Paars', value: 'text-purple-600' },
  { name: 'Oranje', value: 'text-orange-500' },
  { name: 'Lime', value: 'text-lime-500' },
  { name: 'Blauw', value: 'text-blue-600' },
  { name: 'Roze', value: 'text-pink-500' },
];

const imageError = ref(false);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/80 backdrop-blur-xl">
      <div class="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {{ editEvent ? 'Bewerk Event' : 'Nieuw Event Toevoegen' }} - {{ neighborhood }}
        </h2>
        <button
          @click="emit('close')"
          class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Jaar
          </label>
          <input
            v-model="formData.date"
            type="text"
            required
            class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-3xl focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-slate-900 dark:text-white"
            placeholder="bijv. 1976, 1984-1990"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Titel
          </label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-3xl focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-slate-900 dark:text-white"
            placeholder="Gebeurtenis titel"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Verhaal
          </label>
          <textarea
            v-model="formData.description"
            required
            rows="4"
            class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-3xl focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-slate-900 dark:text-white"
            placeholder="Beschrijf de gebeurtenis..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Foto URL
          </label>
          <div class="flex gap-2">
            <input
              v-model="formData.imageUrl"
              type="url"
              class="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-3xl focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-slate-900 dark:text-white"
              placeholder="https://voorbeeld.com/foto.jpg"
            />
            <button
              type="button"
              class="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-3xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <Upload class="w-4 h-4" />
              Upload
            </button>
          </div>
          <img
            v-if="formData.imageUrl && !imageError"
            :src="formData.imageUrl"
            alt="Preview"
            class="mt-3 w-full h-52 object-cover rounded-3xl"
            @error="imageError = true"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Categorie
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="category in categories"
              :key="category.value"
              type="button"
              @click="handleCategorySelect(category)"
              :class="[
                'flex items-center justify-center gap-2 rounded-3xl border px-4 py-3 text-sm font-semibold transition-all',
                formData.category === category.value
                  ? 'border-orange-400 bg-orange-100 text-orange-900 shadow-sm'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700'
              ]"
            >
              <span>{{ category.icon }}</span>
              {{ category.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Kleur
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="color in colors"
              :key="color.value"
              type="button"
              @click="formData.color = color.value"
              :class="[
                'px-4 py-2 rounded-3xl border-2 transition-all',
                formData.color === color.value
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
              ]"
            >
              <div class="flex items-center gap-2">
                <div :class="['w-4 h-4 rounded-full', color.value.replace('text-', 'bg-')]" />
                <span class="text-sm text-slate-700 dark:text-slate-200">{{ color.name }}</span>
              </div>
            </button>
          </div>
        </div>

        <div class="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            @click="emit('close')"
            class="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-3xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Annuleren
          </button>
          <button
            type="submit"
            class="flex-1 px-6 py-3 bg-orange-500 text-white rounded-3xl hover:bg-orange-600 transition-colors font-medium"
          >
            {{ editEvent ? 'Opslaan' : 'Toevoegen' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
