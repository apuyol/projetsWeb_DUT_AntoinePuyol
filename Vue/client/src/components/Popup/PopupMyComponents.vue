<template>
  <div class="popup">
    <div class="inner-popup" id="inner-popup">
      <h3>Veuillez choisir une categorie</h3>
      <v-combobox v-model="categorie" :items="items"></v-combobox>
      <div class="sphere" v-if="categorie == 'sphere'">
        <v-text-field
          v-model="name"
          name="SphereName"
          label="Nom"
        ></v-text-field>
      </div>
      <div class="text" v-if="categorie == 'texte'">
        <v-text-field v-model="name" name="TextName" label="Nom"></v-text-field>
        <v-textarea v-model="text" name="text" label="Texte"></v-textarea>
      </div>
      <div class="image" v-if="categorie == 'image'">
        <v-text-field
          v-model="name"
          name="ImageName"
          label="Nom"
        ></v-text-field>
        <v-file-input
          accept="image/*"
          label="Fichier"
          v-model="file"
        ></v-file-input>
      </div>
      <div id="3dfile" v-if="categorie == 'fichier 3d'">
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
      </div>
      <div v-show="is3dFile">
        <button @click="minusX">left</button>
        <button @click="plusX">right</button>
        <button @click="minusZ">up</button>
        <button @click="plusZ">down</button>
        <canvas id="d"></canvas>
        <button @click="minusY">up</button>
        <button @click="plusY">down</button>
        <canvas id="canvasY"></canvas>
      </div>

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
.canvas-container {
  display: none;
}
</style>

<script>
import { fabric } from "fabric";

export default {
  props: {
    status: Function,
    addSphere: Function,
    addText: Function,
    addImage: Function,
    addThreeDFiles: Function,
  },
  data() {
    return {
      categorie: "sphere",
      items: ["sphere", "texte", "image", "fichier 3d"],
      name: "",
      text: "",
      file: [],
      sphereRadius: 50,
      canva: new fabric.Canvas(),
      canvaY: new fabric.Canvas(),
      is3dFile: false,
      pointX: 0,
      pointZ: 0,
      pointY: 0,
      centerY: 0,
    };
  },
  watch: {
    categorie() {
      if (this.categorie == "fichier 3d") {
        this.is3dFile = true;
        this.createCanva();
        document.getElementsByClassName("canvas-container")[0].style.display =
          "block";
      } else {
        if (this.is3dFile) {
          document.getElementsByClassName("canvas-container")[0].style.display =
            "none";
        }
        this.is3dFile = false;
        this.sphereRadius = 50;
      }
    },
    sphereRadius() {
      this.canva.remove(this.canva.getObjects()[0]);
      this.canvaY.remove(this.canvaY.getObjects()[0]);
      var circle = new fabric.Circle({
        radius: this.sphereRadius,
        top: this.canva.height / 2 - this.sphereRadius,
        left: this.canva.width / 2 - this.sphereRadius,
        fill: "white",
        stroke: "black",
        selectable: false,
      });
      this.canva.sendToBack(circle);
      this.canvaY.sendToBack(circle);
    },
  },
  methods: {
    cancel() {
      this.status();
    },

    validate() {
      if (this.categorie == "sphere") {
        this.addSphere(this.name);
      } else if (this.categorie == "texte") {
        this.addText(this.name, this.text);
      } else if (this.categorie == "image") {
        this.addImage(this.name, this.file[0]);
      } else if (this.categorie == "fichier 3d") {
        var x = this.pointX - this.canva.getObjects()[0].left;
        var y = this.pointY - this.canvaY.getObjects()[0].top;
        var z = this.pointZ - this.canva.getObjects()[0].top;
        this.addThreeDFiles(
          this.name,
          this.file[0],
          x,
          z,
          this.canva.getObjects()[0].radius,
          y
        );
      }
      this.status();
    },
    changePointCoord() {
      this.canva.remove(this.canva.getObjects()[1]);
      var point = new fabric.Circle({
        radius: 5,
        top: this.pointZ,
        left: this.pointX,
        fill: "black",
      });
      this.canva.bringToFront(point);
    },
    changePointCoordY() {
      this.canvaY.remove(this.canvaY.getObjects()[1]);
      var point = new fabric.Circle({
        radius: 5,
        top: this.pointY,
        left: this.centerY,
        fill: "black",
      });
      this.canvaY.bringToFront(point);
    },
    minusX() {
      this.pointX--;
      this.changePointCoord();
    },
    plusX() {
      this.pointX++;
      this.changePointCoord();
    },
    minusZ() {
      this.pointZ--;
      this.changePointCoord();
    },
    plusZ() {
      this.pointZ++;
      this.changePointCoord();
    },
    minusY() {
      this.pointY--;
      this.changePointCoordY();
    },
    plusY() {
      this.pointY++;
      this.changePointCoordY();
    },
    createCanva() {
      var canvas = new fabric.Canvas("d");
      canvas.setDimensions({
        width: document.getElementById("inner-popup").clientWidth - 50,
        height: 150,
      });

      var point = new fabric.Circle({
        radius: 5,
        top: canvas.height / 2 - 5,
        left: canvas.width / 2 - 5,
        fill: "black",
      });
      this.pointX = point.left;
      this.pointZ = point.top;
      canvas.bringToFront(point);
      var circle = new fabric.Circle({
        radius: 50,
        top: canvas.height / 2 - 50,
        left: canvas.width / 2 - 50,
        fill: "white",
        stroke: "black",
        selectable: false,
      });
      canvas.sendToBack(circle);

      this.canva = canvas;

      var canvas2 = new fabric.Canvas("canvasY");
      canvas.setDimensions({
        width: document.getElementById("inner-popup").clientWidth - 50,
        height: 150,
      });

      var point2 = new fabric.Circle({
        radius: 5,
        top: canvas.height / 2 - 5,
        left: canvas.width / 2 - 5,
        fill: "black",
      });
      this.pointY = point2.top;
      this.centerY = point2.left;
      canvas2.bringToFront(point2);
      var circle2 = new fabric.Circle({
        radius: 50,
        top: canvas.height / 2 - 50,
        left: canvas.width / 2 - 50,
        fill: "white",
        stroke: "black",
        selectable: false,
      });
      canvas2.sendToBack(circle2);

      this.canvaY = canvas2;
    },
  },
};
</script>
