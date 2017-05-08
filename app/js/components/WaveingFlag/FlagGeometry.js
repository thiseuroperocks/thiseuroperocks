import Delaunay from 'delaunay-fast';
import { Face3, Geometry } from 'three';

import FloatingPoint from './FloatingPoint';


class Flag {
  static defaultOptions = {
    cellSize: 75,
    bleedingCellsCount: 2,
    variance: 0.75,
    width: window.innerWidth,
    height: window.innerHeight,
  }

  displayName = 'Flag';
  RAF = null;

  constructor(options) {
    this.options = {
      ...Flag.defaultOptions,
      ...options,
    };

    this.init();
  }

  init = () => {
    this.vertices = [];
    this.faces = [];
    this.pixelVariance = (this.options.variance * this.options.cellSize) / 2;
    this.setSize(this.options.width, this.options.height);

    this.generate();
  }

  setSize = (w, h) => {
    this.width = w;
    this.height = h;
    this.aspectRatio = w / h;
  }
  generate() {
    this.geometry = new Geometry();

    const minW = -50;
    const maxW = -minW;
    const minH = -30;
    const maxH = -minH;
    const halfCellSize = this.options.cellSize / 2;
    const doubleVariance = this.pixelVariance * 2;
    const negativeVariance = -this.pixelVariance;

    for (let i = minW, col = 0; i < maxW; i += this.options.cellSize, col += 1) {
      for (let j = minH; j < maxH; j += this.options.cellSize) {
        const x = (i + halfCellSize) + ((Math.random() * doubleVariance) + negativeVariance);
        const y = (j + halfCellSize) + ((Math.random() * doubleVariance) + negativeVariance);
        const z = (Math.random() * doubleVariance) + negativeVariance;

        const floatingPoint = new FloatingPoint({
          x,
          y,
          z,
          variation: this.pixelVariance,
          delay: 500 * col,
        });

        this.vertices.push(floatingPoint);

        this.geometry.vertices.push(floatingPoint.vector);
      }
    }

    this.facesVertices = Delaunay.triangulate(this.geometry.vertices.map(v => [v.x, v.y]));

    for (let i = 0; i < this.facesVertices.length - 2; i += 3) {
      this.geometry.faces.push(new Face3(
        this.facesVertices[i],      // a
        this.facesVertices[i + 1],  // b
        this.facesVertices[i + 2],  // c
      ));
    }

    this.geometry.dynamic = true;
    this.geometry.computeBoundingSphere();
    this.geometry.computeFaceNormals();

    console.log('Flag: ', {
      xRange: [minW, maxW],
      yRange: [minH, maxH],
      vertices: this.vertices,
      faces: this.faces,
    });
  }

  update = (t) => {
    for (let i = 0; i < this.vertices.length; i += 1) {
      this.vertices[i].update(t);
    }
    this.geometry.verticesNeedUpdate = true;
  }
}


export default Flag;
