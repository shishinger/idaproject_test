<template>
  <transition>
    <div class="modal">
      <p>Карточка добавлена</p>
    </div>
  </transition>
</template>

<style lang="scss">
.modal {
  position: absolute;
  top: 50vh;
  left: 50vw;
  margin: -25px 0 0 -25px;
  padding: $nm;
  font-weight: 600;
  background-color: $bg;
  border: 1px solid $success;
  box-shadow: $card_shadow;
  border-radius: $md_r;
  @include mobile-only {
    left: 25vw;
  }
}
</style>