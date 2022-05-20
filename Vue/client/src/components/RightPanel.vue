<template>
  <canvas id="c"></canvas>
</template>

<script>
import image from "./ressources/planIUT.png";
import { fabric } from "fabric";

export default {
  emits: ["myCanva"],
  mounted() {
    var canvas = new fabric.Canvas("c");
    /** 
    fabric.Image.fromURL(image, function (oImg) {
      canvas.setDimensions({ width: oImg.width, height: oImg.height });
      canvas.setBackgroundImage(oImg);
    });
    */
    // Zoom du site de fabric
    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
    canvas.width = 500;
    this.$emit("myCanva", canvas);
  },
  data() {
    return {
      image: image,
    };
  },
};
</script>
