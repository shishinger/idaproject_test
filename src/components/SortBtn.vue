<template>
	<label for="sort" class="hidden">Сортировать</label>
	<select name="sort" id="sort" class="sort">
		<option
			v-for="sortItem in sortList"
			:key="sortItem"
			:value="sortItem"
		>{{ sortItem }}</option>
	</select>
</template>

<script setup>
const sortList = ["По цене min", "По цене max", "По наименованию"];
</script>

<style lang="scss" scoped>
.sort {
	margin-left: auto;
	height: min-content;
	align-self: end;
	padding: $sm_r $nm_r;
	background-color: $bg;
	color: $disabled_text;
	font-size: $md;
	box-shadow: $elem_shadow;
	@include mobile-only {
		grid-row-start: 3;
	}
}
</style>