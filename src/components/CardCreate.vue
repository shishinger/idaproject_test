<template>
	<form @submit.prevent="addCard" class="form">
		<req-input
			v-bind="reqInputs.name"
			v-model="reqInputs.name.reqValue"
			@update:modelValue="isNotEmpty(reqInputs.name)"
		/>
		<div class="form__block">
			<label for="description" class="label">Описание товара</label>
			<textarea
				class="input"
				name="description"
				id="description"
				placeholder="Введите описание товара"
				v-model="cardDesc"
				rows="6"
			></textarea>
		</div>
		<req-input
			v-bind="reqInputs.link"
			v-model="reqInputs.link.reqValue"
			@update:modelValue="isNotEmpty(reqInputs.link)"
		/>
		<req-input
			v-bind="reqInputs.price"
			v-model="reqInputs.price.reqValue"
			@update:modelValue="isNotEmpty(reqInputs.price)"
		/>
		<button type="submit" class="btn" :disabled="isDisabled">Добавить товар</button>
	</form>
	<transition-group tag="ul" name="fade" class="gallery">
		<li
			class="card"
			v-for="card in cards"
			:key="card"
			:class="{ open: isOpen }"
			@touchend="isOpen = !isOpen"
		>
			<button class="card__delete" @click="removeCard(card)">
				<img src="@/assets/delete.svg" alt />
				<span class="hidden">Удалить</span>
			</button>

			<img :src="card.link" class="card__img" alt />

			<div class="card__about">
				<h3 class="card__title">{{ card.title }}</h3>
				<p class="card__desc">{{ card.desc }}</p>
				<p class="card__price">{{ card.price }}</p>
			</div>
		</li>
		<template #fallback>load</template>
	</transition-group>
	<modal-added v-if="added" />
</template>

<script setup>
import { ref, watchEffect } from "vue";
import ReqInput from "./ReqInput.vue";
import ModalAdded from "./ModalAdded.vue";

const STORAGE_KEY = "cards";
const isOpen = ref(false);
const added = ref(false);
const cards = ref(JSON.
	parse(localStorage.getItem(STORAGE_KEY) || "[]"));

watchEffect(() => {
	localStorage.setItem(STORAGE_KEY,
		JSON.stringify(cards.value));
});

const reqInputs = ref({
	name: {
		id: "name",
		type: "text",
		labelName: "Наименование товара",
		placeholder: "Введите наименование товара",
		error: false,
		errorMsg: "",
		reqValue: ""
	},
	link: {
		id: "link",
		type: "url",
		labelName: "Ссылка на изображение товара",
		placeholder: "Введите ссылку",
		error: false,
		errorMsg: "",
		reqValue: ""
	},
	price: {
		id: "price",
		type: "number",
		labelName: "Цена товара",
		placeholder: "Введите цену",
		error: false,
		errorMsg: "",
		reqValue: ""
	}
});
const cardDesc = ref("");
const isDisabled = ref(true);

function isNotEmpty(prop) {
	if (prop.reqValue === "") {
		prop.error = true;
		prop.errorMsg = "Поле является обязательным";
	} else if (prop == reqInputs.value.link) {
		isURL(prop);
	}
	else {
		prop.error = false;
		isValid();
	}
}
function isURL(link) {
	try {
		let url = new URL(link.reqValue);
		console.log(url);
		link.error = false;
	} catch (e) {
		link.error = true;
		link.errorMsg = "Введите валидный URL";
	}
}
function isValid() {
	if (reqInputs.value.name.reqValue !== ""
		&& reqInputs.value.link.reqValue !== ""
		&& reqInputs.value.price.reqValue !== "") {

		isDisabled.value = false;
	} else {
		isDisabled.value = true;
	}
}
function showModal() {
	added.value = true;
	setTimeout(() => added.value = false, 1000);
}
function addCard() {
	if (isDisabled.value === false) {
		cards.value.push({
			title: reqInputs.value.name.reqValue,
			desc: cardDesc.value,
			link: reqInputs.value.link.reqValue,
			price: reqInputs.value.price.reqValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		});
		reqInputs.value.name.reqValue = "";
		cardDesc.value = "";
		reqInputs.value.link.reqValue = "";
		reqInputs.value.price.reqValue = "";
		isDisabled.value = true;
		showModal();
	}
}
function removeCard(card) {
	cards.value.splice(cards.value.indexOf(card), 1);
}
</script>

<style lang="scss">
.label {
	position: relative;
	display: block;
	font-size: $sm;
	width: 100%;
}
.input {
	width: 100%;
	padding: $sm $nm;
	font-size: $md_r;
	border-radius: $xs_r;
	box-shadow: $elem_shadow;
	resize: none;
}
.form {
	position: sticky;
	top: $lg_r;
	align-self: start;
	@extend %flex_col;
	justify-content: flex-start;
	row-gap: $nm;
	padding: $lg_r;
	box-shadow: $card_shadow;
	border-radius: 4px;
	transition: transform $timing $fast, box-shadow $timing $fast;
	&:focus-within {
		transform: scale(1.04);
		box-shadow: $card_shadow_h;
	}
	@include tablet-only {
		position: static;
	}
	&__block {
		display: flex;
		flex-direction: column;
		row-gap: $xs;
	}
}
.btn {
	margin-top: $lg;
	padding: $sm_r;
	font-size: $md;
	color: $btn_color;
	background: $success;
	box-shadow: $elem_shadow;
	border-radius: $sm_r;
	text-align: center;
	cursor: pointer;
	transition: box-shadow $timing $fast;
	&:disabled {
		background-color: $disabled_bg;
		color: $disabled_text;
		cursor: not-allowed;
	}
	@include hover {
		&:hover {
			box-shadow: $elem_shadow;
		}
	}
	&:active {
		box-shadow: inset $elem_shadow;
	}
}
.gallery {
	grid-column: 2 / 3;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	grid-auto-rows: auto;
	grid-gap: $nm_r;
	@include tablet-only {
		grid-column: 1 / 2;
	}
}
.card {
	position: relative;
	@extend %flex_col;
	box-shadow: $card_shadow;
	transition: box-shadow $timing $fast;
	&__delete {
		position: absolute;
		top: -$sm_r;
		right: -$sm_r;
		padding: $sm;
		background-color: $error;
		box-shadow: $elem_shadow;
		border-radius: $sm_r;
		transform: scale(0);
		transition: transform $timing $fast;
		cursor: pointer;
	}
	&__img {
		border-radius: $xs_r $xs_r 0 0;
		background-color: #000;
	}
	&__about {
		padding: $nm_r;
		@extend %flex_col;
		row-gap: $nm_r;
	}
	&__title {
		font-weight: 600;
		font-size: 1.25em;
	}
	&__desc {
		margin-bottom: $nm_r;
	}
	&__price {
		font-weight: 600;
		font-size: $lg;
		&::after {
			content: " руб.";
		}
	}
	@include hover {
		&:hover {
			cursor: pointer;
			box-shadow: $card_shadow_h;
			.card__delete {
				transform: scale(1);
			}
		}
	}
	&.open .card__delete {
		transform: scale(1);
	}
}
.fade-move,
.fade-enter-active,
.fade-leave-active,
.v-enter-active,
.v-leave-active {
	transition: all $timing $slow;
}
.fade-enter-from,
.v-enter-from {
	transform: scale(0.01);
}
.fade-leave-to,
.v-leave-to {
	transform: scale(0.01);
}
</style>