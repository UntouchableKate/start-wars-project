<template>
  <q-input outlined v-model="searchPhrase" @input="searchHeroes" label="Name" class="q-mb-md">
    <template v-slot:append>
      <q-icon color="primary" name="search"/>
    </template>
  </q-input>
</template>

<script>

export default {
  name: 'SearchBar',
  data() {
    return {
      searchPhrase: ''
    };
  },
  methods: {
    searchHeroes() {
      this.$emit('search', this.searchPhrase);
    }
  }
}
</script>
