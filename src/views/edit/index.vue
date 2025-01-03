<template>
  <webtopo-svg-edit
    @on-return="onReturn"
    @on-preview="onPreview"
    @on-save="onSave"
  ></webtopo-svg-edit>
</template>
<script setup lang="ts">
  import { IDataModel } from '@/components/webtopo-svg-edit/types'; // 引入数据模型类型
  import { useRouter } from 'vue-router'; // 引入路由
  import WebtopoSvgEdit from '../../components/webtopo-svg-edit/index.vue'; // 引入组件
  import { ElMessage } from 'element-plus'; // 引入 ElMessage
  const router = useRouter();
  const onReturn = () => {
    console.log('点击了返回按钮');
    router.go(-1);
  };
  const onPreview = (data_model: IDataModel) => {
    console.log('点击了预览按钮，可以在此处跳转到预览页面', data_model);
    router.push({
      name: 'preview',
      query: { data_model: JSON.stringify(data_model) }
    });
  };
  const onSave = (data_model: IDataModel) => {
    console.log('点击了保存按钮，可以在此处将图存到数据库566', data_model);
    localStorage.setItem('preview_data', JSON.stringify(data_model));
    ElMessage.success('保存成功');
  };
</script>
