<template>
  <svg :width="svgWidth" height="100">
    <!-- text1 元素 -->
    <text
      ref="text1"
      x="60"
      y="55"
      :font-family="props.fontFamily"
      :font-size="props.fontSize"
      :fill="props.fill"
    >
      {{ props.uniqueKey }}
    </text>

    <!-- 包含边框的 text2 元素 -->
    <g ref="text2Group">
      <rect
        v-if="rectVisible"
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
        fill="none"
        :stroke="props.borderColor"
        :stroke-width="props.borderWidth"
      />
      <text
        ref="text2"
        x="90"
        y="55"
        :font-family="props.fontFamily"
        :font-size="props.fontSize"
        :fill="props.fill"
      >
        <!-- {{ props.value }} -->
        {{ props.input }}
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, nextTick } from 'vue';

  const emit = defineEmits(['update-width']);

  const props = defineProps({
    fontFamily: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 15
    },
    text: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    },
    uniqueKey: {
      type: String,
      default: ''
    },
    input: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: '#FFFFFF'
    },
    borderWidth: {
      type: Number,
      default: 0.5 // 调整为更细的边框
    }
  });

  const text1 = ref<SVGTextElement | null>(null);
  const text2 = ref<SVGTextElement | null>(null);
  const text2Group = ref<SVGGElement | null>(null);
  const svgWidth = ref(200);

  // 定义边框属性
  const rect = ref({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  // 控制边框的可见性
  const rectVisible = ref(false);

  const updateRect = () => {
    if (text2.value) {
      const bbox = text2.value.getBBox();
      // 设置边框的位置和大小，减少内边距
      const padding = 3; // 减少内边距
      rect.value.x = bbox.x - padding;
      rect.value.y = bbox.y - padding;
      rect.value.width = bbox.width + padding * 2;
      rect.value.height = bbox.height + padding * 2;
      rectVisible.value = true;
    }
  };

  onMounted(() => {
    updateRect();

    if (text1.value && text2.value) {
      const width1 = text1.value.getBBox().width;
      const width2 = text2.value.getBBox().width;
      svgWidth.value = Math.max(width1 + 60, width2 + 100); // 加上适当的边距
      emit('update-width', svgWidth.value);
    }
  });

  // 监听 props.value 的变化，更新边框
  watch(
    () => props.value,
    () => {
      // 延迟执行以确保文本内容已更新
      nextTick(() => {
        updateRect();
      });
    }
  );

  // 监听字体、字号等属性的变化，更新边框
  watch(
    () => [props.fontFamily, props.fontSize],
    () => {
      nextTick(() => {
        updateRect();
      });
    }
  );
</script>

<style scoped>
  /* 您的样式代码 */
</style>
