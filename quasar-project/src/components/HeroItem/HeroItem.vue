<template>
  <q-item class="bg-secondary text-grey-2 q-mb-xs rounded-borders text-weight-light">
    <q-item-section><span v-html="highlightedName"></span></q-item-section>
  </q-item>
</template>

<script>

export default {
  name: 'HeroItem',
  props: {
    name: {
      type: String,
      required: true
    },
    searchQuery: {
      type: String,
      required: true,
    }
  },
  computed: {
    highlightedName() {
      if (!this.searchQuery) {
        return this.name;
      }

      const regex = new RegExp(this.searchQuery, 'gi');
      const matches = this.name.match(regex);

      if (!matches) {
        return this.name;
      }

      const highlightedName = this.name.split(regex);
      const highlightedParts = [];

      for (let i = 0; i < highlightedName.length; i++) {
        highlightedParts.push(highlightedName[i]);

        if (matches[i]) {
          highlightedParts.push(`<span class="text-weight-bold">${matches[i]}</span>`);
        }
      }

      return highlightedParts.join('');
    }
  }

}
</script>
