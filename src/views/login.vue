<script setup lang="ts">
import { useRouter } from "vue-router";
import { ipcRenderer } from "electron";
const router = useRouter();

function goto() {
	ipcRenderer.send("dll");
	router.push("/test");
}
</script>
<template>
	<div class="h-full">
		<header class="drag header flex-center">login</header>
		<div class="flex-center" style="height: calc(100% - 60px)">
			<ElButton @click="goto" type="primary">goto test</ElButton>
		</div>
	</div>
</template>
