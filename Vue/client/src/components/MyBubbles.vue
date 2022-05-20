<template>
  <PopupBubbles
    v-if="popupSphereOpen"
    :group="selectedGroup"
    :status="openOrClosePopup"
    :add="addSphere"
  />
  <PopupEditBubbles
    v-if="popupEditOpen"
    :group="selectedGroup"
    :sphere="selectedSphere"
    :status="openOrCloseEditPopup"
    :edit="editSphere"
  />
  <PopupGroups
    v-if="popupGroupsOpen"
    :status="openOrCloseGroupsPopup"
    :add="addGroup"
  />
  <v-expansion-panels>
    <ul style="width: 95%">
      <li v-for="group in groups" :key="group.id" class="scene">
        <v-expansion-panel>
          <v-expansion-panel-title>{{ group.name }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul>
              <li
                v-for="sphere in group.spheres"
                :key="sphere.id"
                class="scene"
              >
                <v-btn
                  icon="mdi-cog"
                  color="#607D8B"
                  size="25"
                  variant="outlined"
                  @click="openOrCloseEditPopup(group, sphere)"
                ></v-btn>
                <p>{{ sphere.name }}</p>
                <v-btn
                  icon="mdi-close"
                  color="#EF5350"
                  size="25"
                  variant="outlined"
                  @click="deleteSphere(group, sphere)"
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
            <div class="scene" style="width: 100%">
              <v-btn
                icon="mdi-plus"
                color="#81C784"
                class="add"
                size="25"
                variant="outlined"
                @click="openOrClosePopup(group)"
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
        @click="openOrCloseGroupsPopup"
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
</style>

<script>
import PopupBubbles from "./Popup/PopupBubbles.vue";
import PopupEditBubbles from "./Popup/PopupEditBubbles.vue";
import PopupGroups from "./Popup/PopupGroups.vue";

export default {
  components: { PopupBubbles, PopupEditBubbles, PopupGroups },
  props: {
    groups: Array,
    addSphere: Function,
    deleteSphere: Function,
    editSphere: Function,
    addGroup: Function,
    addCanva: Function,
  },
  data() {
    return {
      popupSphereOpen: false,
      popupEditOpen: false,
      popupGroupsOpen: false,
      selectedGroup: null,
      selectedSphere: null,
    };
  },
  methods: {
    openOrClosePopup(group) {
      this.popupSphereOpen = !this.popupSphereOpen;
      this.selectedGroup = group;
    },
    openOrCloseEditPopup(group, sphere) {
      this.popupEditOpen = !this.popupEditOpen;
      this.selectedGroup = group;
      this.selectedSphere = sphere;
    },
    openOrCloseGroupsPopup() {
      this.popupGroupsOpen = !this.popupGroupsOpen;
    },
    sendToCanva(sphere) {
      this.addCanva(sphere, "bubble");
    },
  },
};
</script>
