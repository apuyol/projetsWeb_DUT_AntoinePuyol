<template>
  <PopupComponent
    v-if="popupOpen"
    :status="openOrClosePopup"
    :addSphere="addComponentSphere"
    :addImage="addImage"
    :addText="addText"
    :addThreeDFiles="addThreeDFiles"
  />
  <PopupEditComponent
    v-if="editPopupOpen"
    :status="openOrCloseEditPopup"
    :editImage="editImage"
    :editSphere="editComponentSphere"
    :editText="editText"
    :object="selected"
    :typeObject="selectedType"
    :editThreeDFiles="editThreeDFiles"
  />
  <h3 v-if="spheres.length != 0">Spheres</h3>
  <ul>
    <li v-for="sphere in spheres" :key="sphere.id" class="scene">
      <v-btn
        icon="mdi-cog"
        color="#607D8B"
        size="25"
        variant="outlined"
        @click="openOrCloseEditPopup(sphere, 'sphere')"
      ></v-btn>
      <p>{{ sphere.name }}</p>
      <v-btn
        icon="mdi-close"
        color="#EF5350"
        size="25"
        variant="outlined"
        @click="removeComponent(sphere, 'sphere')"
      ></v-btn>
      <v-btn
        icon="mdi-arrow-right-bold"
        color="black"
        size="25"
        variant="outlined"
        @click="sendToCanva(sphere)"
      ></v-btn>
    </li>
  </ul>
  <h3 v-if="texts.length != 0">Textes</h3>
  <ul>
    <li v-for="text in texts" :key="text.id" class="scene">
      <v-btn
        icon="mdi-cog"
        color="#607D8B"
        size="25"
        variant="outlined"
        @click="openOrCloseEditPopup(text, 'text')"
      ></v-btn>
      <p>{{ text.name }}</p>
      <v-btn
        icon="mdi-close"
        color="#EF5350"
        size="25"
        variant="outlined"
        @click="removeComponent(text, 'text')"
      ></v-btn>
      <v-btn
        icon="mdi-arrow-right-bold"
        color="black"
        size="25"
        variant="outlined"
        @click="sendToCanva(text)"
      ></v-btn>
    </li>
  </ul>
  <h3 v-if="images.length != 0">Images</h3>
  <ul>
    <li v-for="image in images" :key="image.id" class="scene">
      <v-btn
        icon="mdi-cog"
        color="#607D8B"
        size="25"
        variant="outlined"
        @click="openOrCloseEditPopup(image, 'image')"
      ></v-btn>
      <p>{{ image.name }}</p>
      <v-btn
        icon="mdi-close"
        color="#EF5350"
        size="25"
        variant="outlined"
        @click="removeComponent(image, 'image')"
      ></v-btn>
      <v-btn
        icon="mdi-arrow-right-bold"
        color="black"
        size="25"
        variant="outlined"
        @click="sendToCanva(image)"
      ></v-btn>
    </li>
  </ul>
  <h3 v-if="threeDFiles.length != 0">Fichier 3D</h3>
  <ul>
    <li v-for="file3d in threeDFiles" :key="file3d.id" class="scene">
      <v-btn
        icon="mdi-cog"
        color="#607D8B"
        size="25"
        variant="outlined"
        @click="openOrCloseEditPopup(file3d, 'file3d')"
      ></v-btn>
      <p>{{ file3d.name }}</p>
      <v-btn
        icon="mdi-close"
        color="#EF5350"
        size="25"
        variant="outlined"
        @click="removeComponent(file3d, 'file3d')"
      ></v-btn>
      <v-btn
        icon="mdi-arrow-right-bold"
        color="black"
        size="25"
        variant="outlined"
        @click="sendToCanva(file3d)"
      ></v-btn>
    </li>
  </ul>
  <div class="scene" style="width: 100%">
    <v-btn
      icon="mdi-plus"
      color="#81C784"
      class="add"
      size="25"
      variant="outlined"
      @click="openOrClosePopup"
    ></v-btn>
  </div>
</template>

<style scoped>
.scene {
  display: flex;
  justify-content: space-between;
  margin: 5%;
}

.add {
  display: flex;
  margin-left: auto;
}
</style>

<script>
import PopupComponent from "./Popup/PopupMyComponents.vue";
import PopupEditComponent from "./Popup/PopupEditComponents.vue";

export default {
  components: { PopupComponent, PopupEditComponent },

  props: {
    spheres: Array,
    texts: Array,
    images: Array,
    addComponentSphere: Function,
    addText: Function,
    addImage: Function,
    removeComponent: Function,
    editImage: Function,
    editText: Function,
    editComponentSphere: Function,
    addCanva: Function,
    threeDFiles: Array,
    addThreeDFiles: Function,
    editThreeDFiles: Function,
  },
  data() {
    return {
      popupOpen: false,
      editPopupOpen: false,
      selected: null,
      selectedType: "",
    };
  },
  methods: {
    openOrClosePopup() {
      this.popupOpen = !this.popupOpen;
    },
    openOrCloseEditPopup(object, type) {
      this.editPopupOpen = !this.editPopupOpen;
      this.selected = object;
      this.selectedType = type;
    },
    sendToCanva(component) {
      this.addCanva(component, "component");
    },
  },
};
</script>
