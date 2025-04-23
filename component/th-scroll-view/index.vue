<template>
	<view class="container">
		<!-- 页面内容 -->
		<scroll-view class="content" :scroll-y="true" @scroll="onScroll">
			<slot name="content" />
		</scroll-view>

		<tabbar :currentPath="currentPath"></tabbar>
	</view>

</template>

<script setup>
import { reactive, ref, computed,defineProps,defineEmits } from 'vue'
import tabbar from '@/component/th-tabbar/index.vue'
	const emit = defineEmits(['onScroll']);
	const props = defineProps({
	  currentPath: {
	    type: String,
		default: '/pages/index/index'
	  }
	});
	
	const onScroll = (e)=>{
		emit('onScroll',e);
	}
</script>

<style lang="scss" scoped>
.container {
	position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $uni-bg-color;
  .content {
    height:100%;
	padding-bottom: 150rpx;
	box-sizing: border-box;
  }
}
</style>