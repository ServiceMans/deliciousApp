<template>
	<myScrollView currentPath="/pages/rank/rank">
		<template slot="content" style="height: 100%;">
			排行榜
		</template>
	</myScrollView>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import myScrollView from '@/component/th-scroll-view/index.vue'

	const marginWindowTop = ref(0)
	const navBarHeight = ref(0)

	const init = () => {
		const menuButton = uni.getMenuButtonBoundingClientRect()
		marginWindowTop.value = menuButton.top
		navBarHeight.value = menuButton.height
	}

	const bindPickerChange = (e) => {
		currentCanteen.value = canteenOptions.value[e.detail.value].name
	}

	onMounted(() => {
		init()
	})
</script>

<style lang="scss">

</style>