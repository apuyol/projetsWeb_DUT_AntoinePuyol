<template>
  <div class="popup">
    <div class="inner-popup">
      <v-text-field v-model="name" name="SphereName" label="Nom"></v-text-field>
      <h3>Vidéo</h3>
      <v-file-input label="Fichier" v-model="file"></v-file-input>
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
    group: Object,
    sphere: Object,
  },
  data() {
    return {
      name: this.sphere.name,
      file: undefined || [this.sphere.video],
    };
  },
  methods: {
    cancel() {
      this.status();
    },

    validate() {
      this.edit(this.group, this.sphere, this.name, this.file[0]);
      this.status();
    },
  },
};
</script>
