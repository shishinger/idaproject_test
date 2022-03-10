<template>
	<div class="form__block" :class="{ error: error }">
		<label :for="id" class="label require">{{ labelName }}</label>
		<input
			:type="type"
			class="input"
			:id="id"
			:name="id"
			:placeholder="placeholder"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			required
		/>
		<div class="error-msg">{{ error ? errorMsg : "" }}</div>
	</div>
</template>

<script setup>
defineProps({
	id: String,
	labelName: String,
	type: String,
	placeholder: String,
	modelValue: [String, Number],
	modelModifiers: { default: () => ({}) },
	errorMsg: String,
	error: Boolean
});
defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.input[type^="number"] {
	appearance: textfield;
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		appearance: none;
		margin: 0;
	}
}
.require::after {
	content: "";
	position: absolute;
	top: 0;
	display: inline-block;
	width: 4px;
	height: 4px;
	border-radius: 50%;
	background-color: $error;
}
.error {
	.input {
		border-color: $error;
	}
	&-msg {
		position: absolute;
		bottom: -$md_r;
		font-size: 0.5em;
		letter-spacing: -0.02em;
		color: $error;
	}
}
</style>