<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Frontend </label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend </label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">Career </label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      //copy over values of checked or not onto our array
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      //set filter
      this.filters = updatedFilters;
      //send info back to parent component for UI updates
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
