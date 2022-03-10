<template>
	<div class="sort">
		<label for="sort" class="hidden">Сортировать</label>
		<select name="sort" id="sort" class="sort__btn">
			<option
				v-for="sortItem in sortList"
				:key="sortItem"
				:value="sortItem"
			>{{ sortItem }}</option>
		</select>
	</div>
</template>

<script setup>
const sortList = ["По цене min", "По цене max", "По наименованию"];
// TODO: SORTING
</script>

<style lang="scss" scoped>
.sort {
	position: relative;
	margin-left: auto;
	align-self: end;
	@include mobile-only {
		grid-row-start: 3;
	}
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		right: $nm_r;
		margin-top: -3px;
		width: 8px;
		height: 6px;
		background-image: url("../assets/stack.svg#arrow");
	}
	&__btn {
		width: 100%;
		max-width: 10em;
		height: min-content;

		padding: $sm_r $xxl_r $sm_r $nm_r;
		background-color: $bg;
		color: $disabled_text;
		font-size: $md;
		box-shadow: $elem_shadow;
		border-radius: $xs_r;
		appearance: none;
	}
}
</style>