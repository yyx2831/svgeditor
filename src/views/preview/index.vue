<template>
  <div>
    <webtopo-svg-preview
      v-if="parsedDataModel"
      :data-model="parsedDataModel"
      :canvas-drag="true"
    ></webtopo-svg-preview>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import WebtopoSvgPreview from '@/components/webtopo-svg-preview/index.vue';
  import { IDataModel } from '@/components/webtopo-svg-edit/types';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  // 定义接收的 props
  const props = defineProps<{
    data_model: string;
  }>();

  const parsedDataModel = ref<IDataModel | null>(null);

  const parseDataModel = () => {
    const dataModelParam = route.query.data_model as string;
    console.log('接收到的 Data Model:', dataModelParam);
    if (dataModelParam) {
      try {
        // parsedDataModel.value = JSON.parse(decodeURIComponent(dataModelParam));
        let a = JSON.parse(decodeURIComponent(dataModelParam));
        // 直接删掉a.config.background_color这一条, 也就是删除背景颜色, 默认会有辅助线
        delete a.config.background_color;
        parsedDataModel.value = a;
        console.log('解析后的 Data Model:', parsedDataModel.value, 'a:', a);
      } catch (error) {
        console.error('解析 data_model 失败:', error);
      }
    } else {
      console.warn('没有接收到 data_model 参数');
    }
  };

  onMounted(() => {
    parseDataModel();
  });

  // 监听 props 的变化，以防在同一个组件实例中 params 变化
  watch(
    () => props.data_model,
    () => {
      parseDataModel();
    }
  );
</script>
