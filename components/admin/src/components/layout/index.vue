<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTagStore } from '../../store/tag.store'
import YyHeader from './components/header/index.vue'
import YySider from './components/sider/index.vue'
import RouteTags from './components/tag/index.vue'

defineOptions({
  name: 'YyLayout',
})
const tagStore = useTagStore()

const route = useRoute()
const active = ref('')

watch(route, (val) => {
  active.value = val.meta.title as string
}, { immediate: true })
</script>

<template>
  <n-layout class=" overflow-hidden">
    <YyHeader />
    <n-layout has-sider>
      <YySider />
      <n-layout-content>
        <div class=" h-full overflow-hidden flex flex-col">
          <RouteTags />
          <div class=" overflow-auto p4 flex-1 box-border">
            <router-view v-if="!tagStore.refreshing" v-slot="{ Component }">
              <transition>
                <keep-alive :include="tagStore.keepAliveNames">
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
          <n-layout-footer>©2023 Created by 洋洋得意</n-layout-footer>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
