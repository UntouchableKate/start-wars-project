<template>
  <q-page class="q-px-xs q-px-md-xl q-py-md-xl">
    <div class="row justify-center justify-md-start">
      <div class="col-auto">
        <h1 class="text-h2">StarWars Search</h1>
        <SearchBar @search="handleSearch"/>
        <template v-if="loading">
          <div class="loader">Loading...</div>
        </template>
        <template v-else>
          <template v-if="hasResults">
            <q-list>
              <HeroItem v-for="hero in heroes" :name="hero.name"
                        :key="hero.name" :searchQuery="searchQuery"
              />
            </q-list>
          </template>
          <div class="flex flex-center text-weight-medium" v-else-if="noResults">
            Nothing found
          </div>
          <div class="flex flex-center text-weight-medium" v-else>
            Enter search phrase
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import SearchBar from 'components/SearchBar/SearchBar.vue';
import HeroItem from 'components/HeroItem/HeroItem.vue';
import api from '../services/api-services';

export default {
  name: 'PageIndex',
  components: {
    SearchBar,
    HeroItem,
  },
  data() {
    return {
      heroes: [],
      searchQuery: '',
      loading: false,
    };
  },
  computed: {
    hasResults() {
      return this.heroes.length > 0;
    },
    noResults() {
      return !this.hasResults && this.searchQuery && !this.loading
    }
  },
  methods: {
    handleSearch(searchPhrase) {
      const trimmedSearchPhrase = searchPhrase.trim();
      if (trimmedSearchPhrase === '') {
        this.heroes = [];
        this.searchQuery = null;
        return;
      }
      this.searchQuery = trimmedSearchPhrase;
      this.loading = true;

      try {
        api.fetchSearchHero(trimmedSearchPhrase).then(data => {
          this.heroes = data;
        }).finally(() => {
          this.loading = false;
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
