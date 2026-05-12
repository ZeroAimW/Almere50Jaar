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
      color: 'text-orange-500',
      category: 'Cultuur',
      categoryIcon: '🎭',
      imageUrl: 'https://images.unsplash.com/photo-1534661305882-578c802eabc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZXRoZXJsYW5kcyUyMGhhcmJvciUyMGJvYXRzJTIwd2F0ZXJ8ZW58MXx8fHwxNzc0MzU2ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      date: '1984',
      title: 'Haven Officieel Geopend',
      description: 'De jachthaven van Almere Haven wordt officieel geopend voor publiek.',
      color: 'text-orange-600',
      category: 'Sport',
      categoryIcon: '⚽',
    },
  ],
  'Almere Stad': [
    {
      id: '3',
      date: '1980',
      title: 'Ontwikkeling Start',
      description: 'Begin van de ontwikkeling van het stadscentrum van Almere.',
      color: 'text-amber-600',
      category: 'Kunst',
      categoryIcon: '🎨',
      imageUrl: 'https://images.unsplash.com/photo-1664993305337-582a5d02ab38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBOZXRoZXJsYW5kc3xlbnwxfHx8fDE3NzQzNTY4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ],
  'Almere Buiten': [
    {
      id: '4',
      date: '1987',
      title: 'Eerste Woning',
      description: 'De eerste woning in Almere Buiten wordt opgeleverd.',
      color: 'text-orange-500',
      category: 'Cultuur',
      categoryIcon: '🎭',
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
      category: 'Kunst',
      categoryIcon: '🎨',
    },
  ],
  'Almere Poort': [
    {
      id: '6',
      date: '2001',
      title: 'Start Bouw',
      description: 'Begin van de bouw van Almere Poort, de nieuwste wijk van Almere.',
      color: 'text-orange-600',
      category: 'Sport',
      categoryIcon: '⚽',
    },
  ],
  'Almere Pampus': [
    {
      id: '7',
      date: '2020',
      title: 'Toekomstplannen',
      description: 'Presentatie van de toekomstvisie voor Almere Pampus.',
      color: 'text-amber-600',
      category: 'Cultuur',
      categoryIcon: '🎭',
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
  <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,152,0,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.12),_transparent_30%),linear-gradient(180deg,#fff8f0_0%,#fff0e0_100%)] text-slate-900 relative overflow-hidden py-14">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-200 opacity-30 blur-3xl" />
      <div class="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-slate-200 opacity-30 blur-3xl" />
    </div>

    <div class="relative container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <span class="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm mb-4">
          ⚽ 🎨 🎭 Sport, Kunst en Cultuur in Almere
        </span>
        <h1 class="text-6xl sm:text-7xl font-bold tracking-tight text-slate-900 mb-4">
          50 Jaar Almere
        </h1>
        <p class="text-base sm:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Een feestelijke tijdlijn met wijkverhalen, klikbare bolletjes en inspirerende beelden. Scroll door de geschiedenis en ontdek wat Almere vormde.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-slate-700 shadow-sm ring-1 ring-slate-200">
            <span class="text-orange-500">⚽</span> Sport
          </div>
          <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-slate-700 shadow-sm ring-1 ring-slate-200">
            <span class="text-indigo-500">🎨</span> Kunst
          </div>
          <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-slate-700 shadow-sm ring-1 ring-slate-200">
            <span class="text-amber-500">🎭</span> Cultuur
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="neighborhood in NEIGHBORHOODS"
          :key="neighborhood"
          @click="selectedNeighborhood = neighborhood"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all shadow-sm',
            selectedNeighborhood === neighborhood
              ? 'bg-orange-500 text-white shadow-lg scale-105'
              : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
          ]"
        >
          {{ neighborhood }}
        </button>
      </div>

      <div class="flex justify-center gap-3 mb-8">
        <button
          @click="isEditMode = !isEditMode"
          :class="[
            'flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow',
            isEditMode
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          ]"
        >
          <Unlock v-if="isEditMode" class="w-4 h-4" />
          <Lock v-else class="w-4 h-4" />
          {{ isEditMode ? 'Bewerkingsmodus Actief' : 'Bewerken Inschakelen' }}
        </button>
        <button
          v-if="isEditMode"
          @click="isModalOpen = true"
          class="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all shadow"
        >
          <Plus class="w-5 h-5" />
          Nieuw Event Toevoegen
        </button>
      </div>

      <Timeline
        v-if="currentEvents.length > 0"
        :events="currentEvents"
        :is-edit-mode="isEditMode"
        @edit="handleEditEvent"
        @delete="handleDeleteEvent"
        @event-click="selectedEvent = $event"
      />
      <div v-else class="text-center py-20">
        <p class="text-slate-600 text-lg mb-4">
          Nog geen events voor {{ selectedNeighborhood }}
        </p>
        <button
          v-if="isEditMode"
          @click="isModalOpen = true"
          class="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all shadow"
        >
          <Plus class="w-5 h-5" />
          Voeg Eerste Event Toe
        </button>
      </div>

      <div class="mt-16 text-center">
        <p class="text-sm text-slate-500 mb-2">
          TiO - Talent in Ontwikkeling
        </p>
        <p class="text-xs text-slate-400">
          Deze tijdlijn wordt gedurende het feestjaar uitgebreid met nieuwe verhalen en foto's.
        </p>
      </div>
    </div>

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
