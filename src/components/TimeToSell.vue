<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue'
</script>

<template>
  <div class="bloc">
    <img src="../assets/img/onde-corail.svg" alt="" />

    <div>
      <p>C'est le moment de vendre</p>

      <BtnPublishOffer />
    </div>

    <img src="../assets/img/feuille-bleue.svg" alt="" />
  </div>
</template>

<style scoped>
.bloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--orange-pale);
  border-radius: 20px;
  margin-bottom: 35px;
}
.bloc > div {
  display: flex;
  align-items: center;
  gap: 20px;

  font-weight: bold;
}
p {
  font-size: 20px;
}
img:first-child {
  border-radius: 15px 0 0 15px;
}
img:last-child {
  border-radius: 0 15px 15px 0;
}
</style>
