<script setup lang="ts">
import { ref, computed } from 'vue';
import Timeline from './components/Timeline.vue';
import EventModal from './components/EventModal.vue';
import EventDetailModal from './components/EventDetailModal.vue';
import { Plus, Lock, Unlock } from 'lucide-vue-next';
import type { TimelineEvent } from './types';

const NEIGHBORHOODS = [
  'Almere Haven',
  'Almere Stad',
  'Almere Buiten',
  'Almere Hout',
  'Almere Poort',
  'Almere Pampus'
];

const initialEventsData: Record<string, TimelineEvent[]> = {
  'Almere Haven': [
    {
      id: '1',
      date: '1976',
      title: 'Eerste Paal Geslagen',
      description: 'De eerste paal voor Almere Haven wordt geslagen. Het begin van een nieuw stad.',
      color: 'text-teal-500',
      imageUrl: 'https://images.unsplash.com/photo-1534661305882-578c802eabc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZXRoZXJsYW5kcyUyMGhhcmJvciUyMGJvYXRzJTIwd2F0ZXJ8ZW58MXx8fHwxNzc0MzU2ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      date: '1984',
      title: 'Haven Officieel Geopend',
      description: 'De jachthaven van Almere Haven wordt officieel geopend voor publiek.',
      color: 'text-blue-600',
    },
  ],
  'Almere Stad': [
    {
      id: '3',
      date: '1980',
      title: 'Ontwikkeling Start',
      description: 'Begin van de ontwikkeling van het stadscentrum van Almere.',
      color: 'text-purple-600',
      imageUrl: 'https://images.unsplash.com/photo-1664993305337-582a5d02ab38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBOZXRoZXJsYW5kc3xlbnwxfHx8fDE3NzQzNTY4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ],
  'Almere Buiten': [
    {
      id: '4',
      date: '1987',
      title: 'Eerste Woning',
      description: 'De eerste woning in Almere Buiten wordt opgeleverd.',
      color: 'text-lime-500',
      imageUrl: 'https://images.unsplash.com/photo-1753468647330-0d069e1ba9f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdXRjaCUyMGNpdHklMjBwYXJrJTIwbmF0dXJlfGVufDF8fHx8MTc3NDM1NjgxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ],
  'Almere Hout': [
    {
      id: '5',
      date: '2008',
      title: 'Plannen Gepresenteerd',
      description: 'De plannen voor de nieuwe wijk Almere Hout worden gepresenteerd.',
      color: 'text-orange-500',
    },
  ],
  'Almere Poort': [
    {
      id: '6',
      date: '2001',
      title: 'Start Bouw',
      description: 'Begin van de bouw van Almere Poort, de nieuwste wijk van Almere.',
      color: 'text-pink-500',
    },
  ],
  'Almere Pampus': [
    {
      id: '7',
      date: '2020',
      title: 'Toekomstplannen',
      description: 'Presentatie van de toekomstvisie voor Almere Pampus.',
      color: 'text-purple-500',
    },
  ],
};

const selectedNeighborhood = ref('Almere Haven');
const eventsData = ref<Record<string, TimelineEvent[]>>(initialEventsData);
const isEditMode = ref(false);
const isModalOpen = ref(false);
const editingEvent = ref<TimelineEvent | undefined>();
const selectedEvent = ref<TimelineEvent | null>(null);

const currentEvents = computed(() => eventsData.value[selectedNeighborhood.value] || []);

const handleAddEvent = (eventData: Omit<TimelineEvent, 'id'>) => {
  const newEvent: TimelineEvent = {
    ...eventData,
    id: Date.now().toString(),
  };

  eventsData.value = {
    ...eventsData.value,
    [selectedNeighborhood.value]: [...currentEvents.value, newEvent].sort((a, b) => {
      const yearA = parseInt(a.date.split('-')[0]);
      const yearB = parseInt(b.date.split('-')[0]);
      return yearA - yearB;
    }),
  };
};

const handleEditEvent = (event: TimelineEvent) => {
  editingEvent.value = event;
  isModalOpen.value = true;
};

const handleUpdateEvent = (eventData: Omit<TimelineEvent, 'id'>) => {
  if (!editingEvent.value) return;

  eventsData.value = {
    ...eventsData.value,
    [selectedNeighborhood.value]: currentEvents.value
      .map((e) => (e.id === editingEvent.value!.id ? { ...eventData, id: e.id } : e))
      .sort((a, b) => {
        const yearA = parseInt(a.date.split('-')[0]);
        const yearB = parseInt(b.date.split('-')[0]);
        return yearA - yearB;
      }),
  };
  editingEvent.value = undefined;
};

const handleDeleteEvent = (id: string) => {
  if (confirm('Weet je zeker dat je dit event wilt verwijderen?')) {
    eventsData.value = {
      ...eventsData.value,
      [selectedNeighborhood.value]: currentEvents.value.filter((e) => e.id !== id),
    };
  }
};

const handleModalClose = () => {
  isModalOpen.value = false;
  editingEvent.value = undefined;
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-800 dark:text-gray-200 tracking-wide mb-2">
          50 Jaar Almere
        </h1>
        <div class="w-40 h-1 bg-gradient-to-r from-teal-400 via-lime-400 to-teal-500 mx-auto mb-4" />
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Ontdek de geschiedenis van elke wijk
        </p>
      </div>

      <!-- Neighborhood Selector -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="neighborhood in NEIGHBORHOODS"
          :key="neighborhood"
          @click="selectedNeighborhood = neighborhood"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all',
            selectedNeighborhood === neighborhood
              ? 'bg-teal-500 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
          ]"
        >
          {{ neighborhood }}
        </button>
      </div>

      <!-- Admin Controls -->
      <div class="flex justify-center gap-3 mb-8">
        <button
          @click="isEditMode = !isEditMode"
          :class="[
            'flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow',
            isEditMode
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          <Unlock v-if="isEditMode" class="w-4 h-4" />
          <Lock v-else class="w-4 h-4" />
          {{ isEditMode ? 'Bewerkingsmodus Actief' : 'Bewerken Inschakelen' }}
        </button>
        <button
          v-if="isEditMode"
          @click="isModalOpen = true"
          class="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-all shadow"
        >
          <Plus class="w-5 h-5" />
          Nieuw Event Toevoegen
        </button>
      </div>

      <!-- Timeline -->
      <Timeline
        v-if="currentEvents.length > 0"
        :events="currentEvents"
        :is-edit-mode="isEditMode"
        @edit="handleEditEvent"
        @delete="handleDeleteEvent"
        @event-click="selectedEvent = $event"
      />
      <div v-else class="text-center py-20">
        <p class="text-gray-500 dark:text-gray-400 text-lg mb-4">
          Nog geen events voor {{ selectedNeighborhood }}
        </p>
        <button
          v-if="isEditMode"
          @click="isModalOpen = true"
          class="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-all shadow"
        >
          <Plus class="w-5 h-5" />
          Voeg Eerste Event Toe
        </button>
      </div>

      <!-- Footer Info -->
      <div class="mt-16 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          TiO - Talent in Ontwikkeling
        </p>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Deze tijdlijn wordt gedurende het feestjaar uitgebreid met nieuwe verhalen en foto's
        </p>
      </div>
    </div>

    <!-- Modals -->
    <EventModal
      :is-open="isModalOpen"
      :neighborhood="selectedNeighborhood"
      :edit-event="editingEvent"
      @close="handleModalClose"
      @save="editingEvent ? handleUpdateEvent($event) : handleAddEvent($event)"
    />

    <EventDetailModal
      :event="selectedEvent"
      :is-open="!!selectedEvent"
      @close="selectedEvent = null"
    />
  </div>
</template>
