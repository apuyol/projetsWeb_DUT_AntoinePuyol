<template>
  <div class="popup">
    <div class="inner-popup">
      <v-text-field
        v-model="name"
        name="SceneComponentsName"
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
    edit: Function,
    scene: Object,
    sceneComponent: Object,
  },
  data() {
    return {
      name: this.sceneComponent.name,
      width: this.sceneComponent.width,
      height: this.sceneComponent.height,
    };
  },
  methods: {
    cancel() {
      this.status();
    },

    validate() {
      this.edit(
        this.scene,
        this.sceneComponent,
        this.name,
        this.width,
        this.height
      );
      this.status();
    },
  },
};
</script>
