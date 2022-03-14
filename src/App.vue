<template>
	<h1 class="hidden">Idaproject Frontend-developer test</h1>
	<header class="header">
		<h2>Добавление товара</h2>
	</header>
	<main>
		<section>
			<h2 class="hidden">Галерея</h2>
			<card-create />
		</section>
	</main>
</template>

<script setup>
import CardCreate from "./components/CardCreate.vue";

</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap");
*,
::before,
::after {
	margin: 0;
	border: 0;
	padding: 0;
	box-sizing: border-box;
}
:focus {
	outline: 2px solid $focus;
}
html {
	background-color: $bg;
	color: $text;
	scrollbar-gutter: stable;
}
main,
section {
	display: contents;
}
#app {
	position: relative;
	display: grid;
	grid-template-columns: 332px 3fr;
	grid-gap: 1rem;
	font-family: "Source Sans Pro", sans-serif;
	font-weight: 400;
	font-size: 16px;
	line-height: 1.3;
	margin: $xxl_r;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	isolation: isolate;
	@include tablet-only {
		grid-template-columns: 1fr;
	}
}
img,
picture,
video,
canvas,
svg {
	display: block;
	max-width: 100%;
}
input,
button,
textarea,
select {
	font-family: inherit;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
	overflow-wrap: break-word;
}
h2 {
	font-weight: 600;
	font-size: $xl;
}
.hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	border: 0;
	padding: 0;
	white-space: nowrap;
	clip-path: inset(100%);
	clip: rect(0 0 0 0);
	overflow: hidden;
}
</style>
