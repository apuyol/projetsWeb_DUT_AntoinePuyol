<template>
  <div class="popup">
    <div class="inner-popup">
      <h3>Veuillez choisir un nom</h3>
      <v-text-field v-model="name" name="SceneName" label="Nom"></v-text-field>
      <div class="MyButton">
        <button @click="validate">Valider</button>
        <button @click="cancel">Annuler</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner-popup {
  width: 20%;
  background: #fff;
  padding: 32px;
}
.MyButton {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
export default {
  props: {
    status: Function,
    add: Function,
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    cancel() {
      this.status();
    },

    validate() {
      this.add(this.name);
      this.status();
    },
  },
};
</script>
