<template>
  <PopupScene
    v-if="popupScenesOpen"
    :status="openOrCloseScenesPopup"
    :add="addScenes"
  />
  <PopupSceneComponents
    v-if="popupSceneComponentOpen"
    :add="addSceneComponents"
    :status="openOrClosePopup"
    :scene="selectedScene"
  />
  <PopupEditScenesComponents
    v-if="popupEditOpen"
    :edit="editScene"
    :status="openOrCloseEditPopup"
    :scene="selectedScene"
    :sceneComponent="selectedSceneComponent"
  />
  <v-expansion-panels>
    <ul style="width: 95%">
      <li v-for="scene in scenes" :key="scene.id" class="scene">
        <v-expansion-panel>
          <v-expansion-panel-title class="title">
            <p>{{ scene.name }}</p>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul>
              <li
                v-for="sceneComponent in scene.sceneComponents"
                :key="sceneComponent.id"
                class="scene"
              >
                <v-btn
                  icon="mdi-cog"
                  color="#607D8B"
                  size="25"
                  variant="outlined"
                  @click="openOrCloseEditPopup(scene, sceneComponent)"
                ></v-btn>
                <p>{{ sceneComponent.name }}</p>
                <v-btn
                  icon="mdi-arrow-right-bold"
                  color="black"
                  size="25"
                  variant="outlined"
                  class="showScene"
                  @click="changeCurrentScene(sceneComponent)"
                ></v-btn>
                <v-btn
                  icon="mdi-close"
                  color="#EF5350"
                  size="25"
                  variant="outlined"
                  @click="deleteScene(scene, sceneComponent)"
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
                @click="openOrClosePopup(scene)"
              ></v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </li>
    </ul>
    <div class="scene" style="width: 100%">
      <v-btn
        icon="mdi-plus"
        color="#81C784"
        class="add"
        size="25"
        variant="outlined"
        @click="openOrCloseScenesPopup"
      ></v-btn>
    </div>
  </v-expansion-panels>
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

.showScene {
  display: flex;
  margin-left: auto;
}
</style>

<script>
import PopupScene from "./Popup/PopupScenes.vue";
import PopupSceneComponents from "./Popup/PopupScenesComponents.vue";
import PopupEditScenesComponents from "./Popup/PopupEditScenesComponents.vue";

export default {
  components: { PopupScene, PopupSceneComponents, PopupEditScenesComponents },
  props: {
    scenes: Array,
    addScenes: Function,
    addSceneComponents: Function,
    editScene: Function,
    deleteScene: Function,
    changeScene: Function,
  },
  data() {
    return {
      popupSceneComponentOpen: false,
      popupEditOpen: false,
      popupScenesOpen: false,
      selectedScene: null,
      selectedSceneComponent: null,
    };
  },
  methods: {
    openOrClosePopup(scene) {
      this.popupSceneComponentOpen = !this.popupSceneComponentOpen;
      this.selectedScene = scene;
    },
    openOrCloseEditPopup(scene, sceneComponent) {
      this.popupEditOpen = !this.popupEditOpen;
      this.selectedScene = scene;
      this.selectedSceneComponent = sceneComponent;
    },
    openOrCloseScenesPopup() {
      this.popupScenesOpen = !this.popupScenesOpen;
    },
    changeCurrentScene(scene) {
      this.changeScene(scene);
    },
  },
};
</script>
