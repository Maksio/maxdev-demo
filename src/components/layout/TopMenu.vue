<script setup lang="ts">
const MenuLinks = [
  {label: 'Documentation', url: '/documentatiom'},
  {label: 'Contacts', url: '/contacts'},
  {label: 'Log in', url: '/login', class: 'accented'},
]
</script>

<template>
  <div class="menu-links">
    <a v-for="item in MenuLinks"
       :key="item.label"
       :href="item.url"
       class="menu-link"
       :class="item.class">
      {{ item.label }}
    </a>
  </div>
</template>

<style scoped lang="stylus">
.accented {
  font-weight: 600;
}

.menu-link {
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  font-weight: 300;
  color: #494949;
}

.menu-links {
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
</style>