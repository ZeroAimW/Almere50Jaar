<script setup lang="ts">
import { ref, watch } from 'vue';
import { X, Upload } from 'lucide-vue-next';
import type { TimelineEvent } from '../types';

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

const formData = ref({
  date: '',
  title: '',
  description: '',
  imageUrl: '',
  color: 'text-teal-500',
});

watch(() => props.editEvent, (newVal) => {
  if (newVal) {
    formData.value = {
      date: newVal.date,
      title: newVal.title,
      description: newVal.description,
      imageUrl: newVal.imageUrl || '',
      color: newVal.color,
    };
  } else {
    formData.value = {
      date: '',
      title: '',
      description: '',
      imageUrl: '',
      color: 'text-teal-500',
    };
  }
});

const handleSubmit = () => {
  emit('save', formData.value);
  emit('close');
};

const colors = [
  { name: 'Paars', value: 'text-purple-600' },
  { name: 'Teal', value: 'text-teal-500' },
  { name: 'Lime', value: 'text-lime-500' },
  { name: 'Blauw', value: 'text-blue-600' },
  { name: 'Oranje', value: 'text-orange-500' },
  { name: 'Roze', value: 'text-pink-500' },
];

const imageError = ref(false);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {{ editEvent ? 'Bewerk Event' : 'Nieuw Event Toevoegen' }} - {{ neighborhood }}
        </h2>
        <button
          @click="emit('close')"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Jaar
          </label>
          <input
            v-model="formData.date"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="bijv. 1976, 1984-1990"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Titel
          </label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Gebeurtenis titel"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Verhaal
          </label>
          <textarea
            v-model="formData.description"
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Beschrijf de gebeurtenis..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Foto URL
          </label>
          <div class="flex gap-2">
            <input
              v-model="formData.imageUrl"
              type="url"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://voorbeeld.com/foto.jpg"
            />
            <button
              type="button"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <Upload class="w-4 h-4" />
              Upload
            </button>
          </div>
          <img
            v-if="formData.imageUrl && !imageError"
            :src="formData.imageUrl"
            alt="Preview"
            class="mt-3 w-full h-48 object-cover rounded-lg"
            @error="imageError = true"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kleur
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="color in colors"
              :key="color.value"
              type="button"
              @click="formData.color = color.value"
              :class="[
                'px-4 py-2 rounded-lg border-2 transition-all',
                formData.color === color.value
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              ]"
            >
              <div class="flex items-center gap-2">
                <div :class="['w-4 h-4 rounded-full', color.value.replace('text-', 'bg-')]" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ color.name }}</span>
              </div>
            </button>
          </div>
        </div>

        <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            @click="emit('close')"
            class="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Annuleren
          </button>
          <button
            type="submit"
            class="flex-1 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
          >
            {{ editEvent ? 'Opslaan' : 'Toevoegen' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
