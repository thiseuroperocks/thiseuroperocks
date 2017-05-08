import { Vector3 } from 'three';

class FloatingPoint {
  constructor({ x, y, z, variation, delay, velocity }) {
    this.delay = delay;
    this.startTime = null;

    this.gravityVector = new Vector3(x, y, z);
    this.vector = new Vector3(x, y, z);
    this.variation = variation;
    this.velocity = velocity || 0.01;
    this.direction = new Vector3(0, 0, this.velocity);
  }

  update(t) {
    if (!this.startTime) {
      this.startTime = t;
    }

    if (t < this.startTime + this.delay) {
      return;
    }

    if (this.isFarAway()) {
      if (this.direction.z < 0) {
        this.startTime = null;
        this.delay = 2000;
      }

      this.direction.negate();
    }

    this.vector.add(this.direction);
  }
  isFarAway() {
    return this.vector.distanceTo(this.gravityVector) > this.variation;
  }
}

export default FloatingPoint;
