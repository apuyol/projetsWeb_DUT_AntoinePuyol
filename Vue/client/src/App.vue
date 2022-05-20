<template>
  <v-app>
    <v-main>
      <splitpanes class="default-theme" style="height: 100%">
        <pane size="20">
          <LeftPanel
            :addCanva="addCanva"
            :addScenes="addScene"
            :scenes="scenes"
            :addSceneComponents="addSceneComponents"
            :deleteScene="deleteScene"
            :editScene="editScene"
            :addGroup="addGroup"
            :addSphere="addSphere"
            :deleteSphere="deleteSphere"
            :editSphere="editSphere"
            :groups="groups"
            :addDoor="addDoor"
            :doors="doors"
            :editDoor="editDoor"
            :removeDoor="removeDoor"
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
            :changeScene="changeScene"
            :addThreeDFiles="addThreeDFiles"
            :threeDFiles="threeDFiles"
            :editThreeDFiles="editThreeDFiles"
          />
          <v-btn color="#EF5350" @click="deleteOnCanva">Supprimer</v-btn>
        </pane>
        <pane>
          <RightPanel @myCanva="(cv) => (myCanva = cv)" />
        </pane>
      </splitpanes>
    </v-main>
  </v-app>
</template>

<style scoped>
splitpanes__pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import LeftPanel from "./components/LeftPanel.vue";
import RightPanel from "./components/RightPanel.vue";
import { fabric } from "fabric";

let sceneId = 0;
let groupId = 0;
let doorId = 0;
let sphereId = 0;
let textId = 0;
let imageId = 0;
let threeDId = 0;

export default defineComponent({
  name: "App",
  components: { Splitpanes, Pane, LeftPanel, RightPanel },

  data() {
    return {
      myCanva: new fabric.Canvas(),
      dict: [
        { scene: "", component: [{ left: 0, top: 0, color: "", text: "" }] },
      ],
      currentScene: { id: 0, name: "Atelier", map: null, width: 0, height: 0 },
      groups: [
        {
          id: 0,
          name: "groupe 1",
          spheres: [{ id: 0, name: "Atelier", video: null }],
        },
      ],
      scenes: [
        {
          id: 0,
          name: "GMP",
          sceneComponents: [
            { id: 0, name: "Atelier", map: null, width: 0, height: 0 },
          ],
        },
      ],
      doors: [{ id: 0, name: "", sceneA: "", sceneB: "" }],
      spheres: [{ id: 0, name: "sphere 1" }],
      texts: [{ id: 0, name: "texte 1", txt: "I am text 1" }],
      images: [{ id: 0, name: "image 1", file: null }],
      threeDFiles: [
        { id: 0, name: "3d 1", file: [0], x: 0, z: 0, radius: 0, y: 0 },
      ],
    };
  },
  mounted() {
    this.threeDFiles = [];
    this.doors = [];
    this.scenes = [];
    this.spheres = [];
    this.groups = [];
    this.texts = [];
    this.images = [];
  },
  methods: {
    addSceneComponents(
      scene: {
        id: number;
        name: string;
        sceneComponent: Array<{ id: number; name: string; map: any }>;
      },
      n: string,
      map: any,
      height: number,
      width: number
    ) {
      if (!this.sceneComponentAlreadyExist(n)) {
        var id = 0;
        if (this.scenes[scene.id].sceneComponents.length != 0) {
          id = this.scenes[scene.id].sceneComponents[
            this.scenes[scene.id].sceneComponents.length - 1
          ].id++;
        }
        this.scenes[scene.id].sceneComponents.push({
          id: id,
          name: n,
          map: map,
          width: width,
          height: height,
        });
        console.log(map);
        this.dict.push({ scene: n, component: [] });
      } else {
        alert("Un composant de scéne a déjà ce nom");
      }
    },
    deleteScene(
      scene: {
        id: number;
        name: string;
        sceneComponent: Array<{ id: number; name: string }>;
      },
      sceneComponent: { id: number; name: string }
    ) {
      this.scenes[scene.id].sceneComponents = this.scenes[
        scene.id
      ].sceneComponents.filter((s) => s !== sceneComponent);
    },
    editScene(
      scene: {
        id: number;
        name: string;
        sceneComponent: Array<{ id: number; name: string }>;
      },
      sceneComponent: {
        id: number;
        name: string;
        map: any;
        width: number;
        height: number;
      },
      name: string,
      map: any,
      width: number,
      height: number
    ) {
      this.scenes[scene.id].sceneComponents[sceneComponent.id].name = name;
      this.scenes[scene.id].sceneComponents[sceneComponent.id].map = map;
      this.scenes[scene.id].sceneComponents[sceneComponent.id].width = width;
      this.scenes[scene.id].sceneComponents[sceneComponent.id].height = height;
    },
    addScene(name: string) {
      if (!this.alreadyExist(name, this.scenes)) {
        this.scenes.push({
          id: sceneId++,
          name: name,
          sceneComponents: [],
        });
      } else {
        alert("Une scéne a déjà ce nom");
      }
    },
    addSphere(
      group: {
        id: number;
        name: string;
        spheres: { id: number; name: string };
      },
      n: string,
      video: any
    ) {
      if (!this.alreadyExist(n, this.groups[group.id].spheres)) {
        this.groups[group.id].spheres.push({
          id: this.groups[group.id].spheres.length,
          name: n,
          video: video,
        });
      } else {
        alert("Une bulle a déjà ce nom");
      }
    },
    deleteSphere(
      group: {
        id: number;
        name: string;
        spheres: { id: number; name: string };
      },
      sphere: { id: number; name: string }
    ) {
      this.groups[group.id].spheres = this.groups[group.id].spheres.filter(
        (s) => s !== sphere
      );
    },
    editSphere(
      group: {
        id: number;
        name: string;
        spheres: { id: number; name: string; video: any };
      },
      sphere: { id: number; name: string; video: any },
      name: string,
      video: any
    ) {
      this.groups[group.id].spheres[sphere.id].name = name;
      this.groups[group.id].spheres[sphere.id].video = video;
    },
    addGroup(name: string) {
      if (!this.alreadyExist(name, this.groups)) {
        this.groups.push({ id: groupId++, name: name, spheres: [] });
      } else {
        alert("Un groupe a déjà ce nom");
      }
    },
    addDoor(name: string, sceneA: string, sceneB: string) {
      if (!this.alreadyExist(name, this.doors)) {
        this.doors.push({
          id: doorId++,
          name: name,
          sceneA: sceneA,
          sceneB: sceneB,
        });
      } else {
        alert("Une porte a déjà ce nom");
      }
    },
    removeDoor(door: { id: number; name: string }) {
      this.doors = this.doors.filter((t) => t !== door);
    },
    editDoor(
      door: { id: number; name: string; sceneA: string; sceneB: string },
      name: string,
      sceneA: string,
      sceneB: string
    ) {
      this.doors[door.id].name = name;
      this.doors[door.id].sceneA = sceneA;
      this.doors[door.id].sceneB = sceneB;
    },
    addComponentSphere(name: string) {
      if (!this.alreadyExist(name, this.spheres)) {
        this.spheres.push({ id: sphereId++, name: name });
      } else {
        alert("Une sphere a déjà ce nom");
      }
    },
    addText(name: string, t: string) {
      if (!this.alreadyExist(name, this.texts)) {
        this.texts.push({ id: textId++, name: name, txt: t });
      } else {
        alert("Un texte a déjà ce nom");
      }
    },
    addImage(name: string, f: any) {
      if (!this.alreadyExist(name, this.images)) {
        this.images.push({ id: imageId++, name: name, file: f });
      } else {
        alert("Une image a déjà ce nom");
      }
    },
    removeComponent(component: any, type: string) {
      if (type == "sphere") {
        this.spheres = this.spheres.filter((t) => t !== component);
      } else if (type == "text") {
        this.texts = this.texts.filter((t) => t !== component);
      } else if (type == "image") {
        this.images = this.images.filter((t) => t !== component);
      } else if (type == "file3d") {
        this.threeDFiles = this.threeDFiles.filter((t) => t !== component);
      }
    },
    editImage(
      img: { id: number; name: string; file: File },
      name: string,
      file: any
    ) {
      let tmpId = img.id;
      this.images[tmpId].name = name;
      this.images[tmpId].file = file;
    },
    editText(
      txt: { id: number; name: string; txt: string },
      name: string,
      content: string
    ) {
      let tmpId = txt.id;
      this.texts[tmpId].name = name;
      this.texts[tmpId].txt = content;
    },
    editComponentSphere(sph: { id: number; name: string }, name: string) {
      let tmpId = sph.id;
      this.spheres[tmpId].name = name;
    },
    addCanva(obj: any, type: string) {
      var color = "";
      if (type == "bubble") {
        color = "#508f58";
      } else if (type == "door") {
        color = "#81508f";
      } else if (type == "component") {
        color = "#4d7275";
      }
      var circle = new fabric.Circle({
        radius: 20,
        fill: color,
        originX: "center",
        originY: "center",
        top: 30,
      });
      var text = new fabric.Text(obj.name, {
        fontSize: 30,
        originX: "center",
        originY: "center",
        top: 0,
      });
      var group = new fabric.Group([circle, text], {
        left: 150,
        top: 100,
      });
      this.myCanva.add(group);
    },
    deleteOnCanva() {
      this.myCanva.getActiveObjects().forEach((obj: any) => {
        this.myCanva.remove(obj);
      });
      this.myCanva.discardActiveObject().renderAll();
    },
    changeScene(scene: any) {
      console.log(scene);
      this.dict.forEach((myObject) => {
        if (myObject.scene == this.currentScene.name) {
          myObject.component = [];
          this.myCanva
            .getObjects()
            .forEach(
              (object: {
                left: number;
                top: number;
                _objects: { text: string; fill: string }[];
              }) => {
                myObject.component.push({
                  left: object.left,
                  top: object.top,
                  color: object._objects[0].fill,
                  text: object._objects[1].text,
                });
              }
            );
        }
      });
      this.currentScene = scene;
      const reader = new FileReader();
      reader.readAsDataURL(scene.map[0]);
      reader.onload = () => {
        fabric.Image.fromURL(reader.result, (img: any) => {
          this.myCanva.clear();
          this.myCanva.setDimensions({ width: img.width, height: img.height });
          this.myCanva.setBackgroundImage(img);
          this.loadSceneComponent(scene.name);
        });
      };
    },
    loadSceneComponent(sceneName: string) {
      this.dict.forEach((myObject) => {
        if (myObject.scene == sceneName) {
          myObject.component.forEach((comp) => {
            var circle = new fabric.Circle({
              radius: 20,
              fill: comp.color,
              originX: "center",
              originY: "center",
              top: 30,
            });
            var text = new fabric.Text(comp.text, {
              fontSize: 30,
              originX: "center",
              originY: "center",
              top: 0,
            });
            var group = new fabric.Group([circle, text], {
              left: comp.left,
              top: comp.top,
            });
            this.myCanva.add(group);
          });
        }
      });
    },
    addThreeDFiles(
      name: string,
      file: Array<number>,
      x: number,
      z: number,
      radius: number,
      y: number
    ) {
      if (!this.alreadyExist(name, this.threeDFiles)) {
        this.threeDFiles.push({
          id: threeDId++,
          name: name,
          file: file,
          x: x,
          z: z,
          radius: radius,
          y: y,
        });
      } else {
        alert("Un fichier 3d a déjà ce nom");
      }
    },
    editThreeDFiles(
      file3d: {
        id: number;
        name: string;
        file: Array<number>;
        x: number;
        z: number;
        radius: number;
        y: number;
      },
      name: string,
      file: Array<number>,
      x: number,
      z: number,
      radius: number,
      y: number
    ) {
      let tmpId = file3d.id;
      console.log(this.threeDFiles);
      this.threeDFiles[tmpId].name = name;
      this.threeDFiles[tmpId].file = file;
      this.threeDFiles[tmpId].x = x;
      this.threeDFiles[tmpId].z = z;
      this.threeDFiles[tmpId].y = y;
      this.threeDFiles[tmpId].radius = radius;
    },
    alreadyExist(myObjectName: string, myList: Array<any>) {
      var present = false;
      myList.forEach((obj) => {
        if (obj.name == myObjectName) {
          present = true;
        }
      });
      return present;
    },
    sceneComponentAlreadyExist(myObjectName: string) {
      var present = false;
      this.scenes.forEach((grp) => {
        grp.sceneComponents.forEach((scn) => {
          if (scn.name == myObjectName) {
            present = true;
          }
        });
      });
      return present;
    },
  },
});
</script>
