<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon icon="mdi-toy-brick-search-outline" class="icon"></v-icon>
        <p>Mes Scènes</p>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="scene">
          <p>Scène principale</p>
          <v-btn
            icon="mdi-close"
            color="#EF5350"
            class="remove"
            size="25"
            variant="outlined"
          ></v-btn>
        </div>
        <MyScenes
          :addScenes="addScenes"
          :scenes="scenes"
          :addSceneComponents="addSceneComponents"
          :deleteScene="deleteScene"
          :editScene="editScene"
          :changeScene="changeScene"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel style="background-color: #508f58">
      <v-expansion-panel-title>
        <v-icon icon="mdi-earth" class="icon"></v-icon>
        <p>Mes Bulles</p>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <MyBubbles
          :addGroup="addGroup"
          :addSphere="addSphere"
          :deleteSphere="deleteSphere"
          :editSphere="editSphere"
          :groups="groups"
          :addCanva="addCanva"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel style="background-color: #81508f">
      <v-expansion-panel-title>
        <v-icon icon="mdi-door" class="icon"></v-icon>
        <p>Mes Portes</p>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <MyDoors
          :addDoor="addDoor"
          :doors="doors"
          :editDoor="editDoor"
          :removeDoor="removeDoor"
          :addCanva="addCanva"
          :scenes="scenes"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel style="background-color: #4d7275">
      <v-expansion-panel-title>
        <v-icon icon="mdi-clipboard-file-outline" class="icon"></v-icon>
        <p>Mes Composants</p>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <MyComponents
          :addComponentSphere="addComponentSphere"
          :addImage="addImage"
          :addText="addText"
          :editComponentSphere="editComponentSphere"
          :editImage="editImage"
          :editText="editText"
          :images="images"
          :removeComponent="removeComponent"
          :spheres="spheres"
          :texts="texts"
          :addCanva="addCanva"
          :addThreeDFiles="addThreeDFiles"
          :threeDFiles="threeDFiles"
          :editThreeDFiles="editThreeDFiles"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.icon {
  margin-right: 10%;
}
.scene {
  display: flex;
  margin: 5%;
}

.remove {
  margin-left: auto;
}

.add {
  display: flex;
  margin-left: auto;
}
</style>

<script>
import MyScenes from "./MyScenes.vue";
import MyBubbles from "./MyBubbles.vue";
import MyDoors from "./MyDoors.vue";
import MyComponents from "./MyComponents.vue";
export default {
  components: { MyScenes, MyBubbles, MyDoors, MyComponents },
  props: {
    scenes: Array,
    addScenes: Function,
    addSceneComponents: Function,
    editScene: Function,
    deleteScene: Function,
    groups: Array,
    addSphere: Function,
    deleteSphere: Function,
    editSphere: Function,
    addGroup: Function,
    doors: Array,
    addDoor: Function,
    removeDoor: Function,
    editDoor: Function,
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
    changeScene: Function,
    threeDFiles: Array,
    addThreeDFiles: Function,
    editThreeDFiles: Function,
  },
  data() {
    return {
      //
    };
  },
};
</script>
