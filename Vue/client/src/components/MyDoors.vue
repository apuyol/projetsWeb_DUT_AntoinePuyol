<template>
  <PopupDoors
    v-if="popupOpen"
    :status="openOrClosePopup"
    :add="addDoor"
    :scenes="scenes"
  />
  <PopudEditDoors
    v-if="editPopupOpen"
    :status="openOrCloseEditPopup"
    :edit="editDoor"
    :item="selected"
    :scenes="scenes"
  />
  <ul>
    <li v-for="door in doors" :key="door.id" class="scene">
      <v-btn
        icon="mdi-cog"
        color="#607D8B"
        size="25"
        variant="outlined"
        @click="openOrCloseEditPopup(door)"
      ></v-btn>
      <p>{{ door.name }}</p>
      <v-btn
        icon="mdi-close"
        color="#EF5350"
        size="25"
        variant="outlined"
        @click="removeDoor(door)"
      ></v-btn>
      <v-btn
        icon="mdi-arrow-right-bold"
        color="black"
        size="25"
        variant="outlined"
        @click="sendToCanva(door)"
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
import PopupDoors from "./Popup/PopupDoors.vue";
import PopudEditDoors from "./Popup/PopupEditDoors.vue";

export default {
  components: { PopupDoors, PopudEditDoors },
  props: {
    doors: Array,
    addDoor: Function,
    removeDoor: Function,
    editDoor: Function,
    addCanva: Function,
    scenes: Array,
  },
  data() {
    return {
      popupOpen: false,
      editPopupOpen: false,
      selected: null,
    };
  },
  methods: {
    openOrClosePopup() {
      this.popupOpen = !this.popupOpen;
    },
    openOrCloseEditPopup(object) {
      this.editPopupOpen = !this.editPopupOpen;
      this.selected = object;
    },
    sendToCanva(door) {
      this.addCanva(door, "door");
    },
  },
};
</script>
