<template>
  <div class="popup">
    <div class="inner-popup">
      <h3>Veuillez choisir un nom</h3>
      <v-text-field
        v-model="name"
        name="SceneComponentName"
        label="Nom"
      ></v-text-field>
      <h3>Longueur en métre</h3>
      <v-slider
        v-model="width"
        thumb-label="always"
        min="50"
        max="1000"
      ></v-slider>
      <h3>Largeur en métre</h3>
      <v-slider
        v-model="height"
        thumb-label="always"
        min="50"
        max="1000"
      ></v-slider>
      <v-file-input
        accept="image/*"
        label="Carte"
        v-model="file"
      ></v-file-input>
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
    scene: Object,
  },
  data() {
    return {
      name: "",
      file: [],
      width: 100,
      height: 100,
    };
  },
  methods: {
    cancel() {
      this.status();
    },

    validate() {
      this.add(this.scene, this.name, this.file, this.width, this.height);
      this.status();
    },
  },
};
</script>
