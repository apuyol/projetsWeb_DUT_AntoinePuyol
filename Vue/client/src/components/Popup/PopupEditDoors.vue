<template>
  <div class="popup">
    <div class="inner-popup">
      <v-combobox
        v-model="sceneA"
        :items="items"
        label="Scene A"
        outlined
        dense
      ></v-combobox>
      <v-combobox
        v-model="sceneB"
        :items="items"
        label="Scene B"
        outlined
        dense
      ></v-combobox>
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
    item: Object,
    scenes: Array,
  },
  mounted() {
    this.scenes.forEach((gr) => {
      gr.sceneComponents.forEach((scn) => {
        this.items.push(scn.name);
      });
    });
  },
  data() {
    return {
      sceneA: this.item.sceneA,
      sceneB: this.item.sceneB,
      items: [],
    };
  },
  methods: {
    cancel() {
      this.status(this.item);
    },

    validate() {
      this.name = this.sceneA + " - " + this.sceneB;
      this.edit(this.item, this.name, this.sceneA, this.sceneB);
      this.status();
    },
  },
};
</script>
