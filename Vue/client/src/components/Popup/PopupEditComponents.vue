<template>
  <div class="popup">
    <div class="inner-popup">
      <div class="sphere" v-if="typeObject == 'sphere'">
        <v-text-field
          name="SphereName"
          label="Nom"
          v-model="name"
        ></v-text-field>
      </div>
      <div class="text" v-if="typeObject == 'text'">
        <v-text-field name="TextName" label="Nom" v-model="name"></v-text-field>
        <v-textarea
          name="TextContent"
          label="Contenu"
          v-model="text"
        ></v-textarea>
      </div>
      <div class="image" v-if="typeObject == 'image'">
        <v-text-field
          name="ImageName"
          label="Nom"
          v-model="name"
        ></v-text-field>
        <v-file-input
          accept="image/*"
          label="Fichier"
          v-model="file"
        ></v-file-input>
      </div>
      <div class="3dfile" v-if="typeObject == 'file3d'">
        <v-text-field
          v-model="name"
          name="file3dName"
          label="Nom"
        ></v-text-field>
        <v-file-input label="Fichier" v-model="file"></v-file-input>
        <v-slider
          v-model="sphereRadius"
          thumb-label="always"
          min="25"
          max="75"
        ></v-slider>
        <button @click="minusX">left</button>
        <button @click="plusX">right</button>
        <button @click="minusY">up</button>
        <button @click="plusY">down</button>
      </div>
      <div v-show="typeObject == 'file3d'">
        <button @click="minusX">left</button>
        <button @click="plusX">right</button>
        <button @click="minusZ">up</button>
        <button @click="plusZ">down</button>
        <canvas id="myCanva"></canvas>
        <button @click="minusY">up</button>
        <button @click="plusY">down</button>
        <canvas id="canvasY"></canvas>
      </div>
      <div class="MyButton">
        <button @click="validate">Valider</button>
        <button @click="cancel">Annuler</button>
        <button @click="test">test</button>
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
import { fabric } from "fabric";

export default {
  props: {
    status: Function,
    object: Object,
    typeObject: String,
    editSphere: Function,
    editText: Function,
    editImage: Function,
    editThreeDFiles: Function,
  },
  mounted() {
    if (this.typeObject == "file3d") {
      var canvas = new fabric.Canvas("myCanva");
      canvas.setDimensions({
        width: 279,
        height: 150,
      });

      var circle = new fabric.Circle({
        radius: this.sphereRadius,
        top: canvas.height / 2 - this.sphereRadius,
        left: canvas.width / 2 - this.sphereRadius,
        fill: "white",
        stroke: "black",
        selectable: false,
      });

      canvas.sendToBack(circle);
      var point = new fabric.Circle({
        radius: 5,
        top: this.object.z + circle.top,
        left: this.object.x + circle.left,
        fill: "black",
        selectable: false,
      });
      this.globalX = point.left;
      this.globalZ = point.top;
      canvas.bringToFront(point);

      this.canva = canvas;

      var canvas2 = new fabric.Canvas("canvasY");
      canvas.setDimensions({
        width: 279,
        height: 150,
      });

      var point2 = new fabric.Circle({
        radius: 5,
        top: this.object.y + circle.top,
        left: canvas.width / 2 - 5,
        fill: "black",
      });
      this.globalY = point2.top;
      this.centerY = point2.left;
      canvas2.bringToFront(point2);
      var circle2 = new fabric.Circle({
        radius: this.sphereRadius,
        top: canvas.height / 2 - this.sphereRadius,
        left: canvas.width / 2 - this.sphereRadius,
        fill: "white",
        stroke: "black",
        selectable: false,
      });
      canvas2.sendToBack(circle2);

      this.canvaY = canvas2;
    }
  },
  data() {
    return {
      name: this.object.name,
      text: undefined || this.object.txt,
      file: undefined || [this.object.file],
      sphereRadius: undefined || this.object.radius,
      globalX: 0,
      globalZ: 0,
      globalY: 0,
      centerY: 0,
      canva: new fabric.Canvas(),
      canvaY: new fabric.Canvas(),
    };
  },
  watch: {
    sphereRadius() {
      this.canva.remove(this.canva.getObjects()[0]);
      var circle = new fabric.Circle({
        radius: this.sphereRadius,
        top: this.canva.height / 2 - this.sphereRadius,
        left: this.canva.width / 2 - this.sphereRadius,
        fill: "white",
        stroke: "black",
        selectable: false,
      });
      this.canva.add(circle);
      this.canva.sendToBack(circle);
    },
  },
  methods: {
    cancel() {
      this.status(this.object, this.typeObject);
    },
    validate() {
      if (this.typeObject == "sphere") {
        this.editSphere(this.object, this.name);
      } else if (this.typeObject == "text") {
        this.editText(this.object, this.name, this.text);
      } else if (this.typeObject == "image") {
        this.editImage(this.object, this.name, this.file[0]);
      } else if (this.typeObject == "file3d") {
        var x = this.globalX - this.canva.getObjects()[0].left;
        var y = this.globalY - this.canvaY.getObjects()[0].top;
        var z = this.globalZ - this.canva.getObjects()[0].top;
        console.log(x, y, z);
        this.editThreeDFiles(
          this.object,
          this.name,
          this.file[0],
          x,
          z,
          this.sphereRadius,
          y
        );
      }
      this.status();
    },
    changePointCoord() {
      this.canva.remove(this.canva.getObjects()[1]);
      var point = new fabric.Circle({
        radius: 5,
        top: this.globalY,
        left: this.globalX,
        fill: "black",
        selectable: false,
      });
      this.canva.bringToFront(point);
    },
    minusX() {
      this.globalX--;
      this.changePointCoord();
    },
    plusX() {
      this.globalX++;
      this.changePointCoord();
    },
    minusZ() {
      this.globalZ--;
      this.changePointCoord();
    },
    plusZ() {
      this.globalZ++;
      this.changePointCoord();
    },
    minusY() {
      this.globalY--;
      this.changePointCoordY();
    },
    plusY() {
      this.globalY++;
      this.changePointCoordY();
    },
    changePointCoordY() {
      this.canvaY.remove(this.canvaY.getObjects()[1]);
      var point = new fabric.Circle({
        radius: 5,
        top: this.globalY,
        left: this.centerY,
        fill: "black",
      });
      this.canvaY.bringToFront(point);
    },
    test() {
      console.log(this.object);
    },
  },
};
</script>
