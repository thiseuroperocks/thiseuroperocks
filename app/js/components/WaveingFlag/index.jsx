import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

import Flag from './FlagGeometry';


const Canvas = styled.canvas`
  width: 100% !important;
  height: 100vh !important;
`;

class WaveingFlag extends Component {
  static propTypes = {
    cameraFov: PropTypes.number,    // Camera frustum vertical field of view
    cameraNear: PropTypes.number,   // Camera frustum near plane
    cameraFar: PropTypes.number,    // Camera frustum far plane
    wireframe: PropTypes.bool,
    backgroundColor: PropTypes.number,
    flagColor: PropTypes.number,
    fogIntensity: PropTypes.number,
  };
  static defaultProps = {
    cameraFov: 75,
    cameraNear: 0.1,
    cameraFar: 1000,
    wireframe: false,
    backgroundColor: 0x190F1B,
    flagColor: 0x515F9E,
    fogIntensity: 0.05,
  };

  displayName = 'WaveingFlag';

  state = {};

  /** React Lifecycle **/
  componentWillMount() {
    // register handlers
    window.addEventListener('resize', this.resizeHandler);
  }
  componentDidMount() {
    const {
      cameraFov,
      cameraNear,
      cameraFar,
      backgroundColor,
      fogIntensity,
    } = this.props;

    this.resizeHandler();

    // setup SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(backgroundColor);

    // setup FOG
    if (fogIntensity > 0) {
      this.fog = new THREE.FogExp2(backgroundColor, fogIntensity);
      this.scene.fog = this.fog;
    }

    // setup RENDERER
    this.setupRenderer();

    // setup CAMERA
    this.camera = new THREE.PerspectiveCamera(cameraFov, this.aspectRatio, cameraNear, cameraFar);
    this.camera.position.set(0, 0, 20);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // setup FLAG GEOMETRY
    this.setupFlag();

    // setup LIGHT
    this.ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(this.ambientLight);

    this.directionalLightOne = new THREE.DirectionalLight(0xffffff, 1.75);
    this.directionalLightOne.position.set(-50, 20, 20);

    this.scene.add(this.directionalLightOne);

    this.directionalLightTwo = new THREE.DirectionalLight(0xCC77AE, 1.75);
    this.directionalLightTwo.position.set(20, 0, 20);
    this.scene.add(this.directionalLightTwo);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);

    this.RAF = cancelAnimationFrame(this.RAF);
  }

  /** Internal Methods **/
  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.RAF = requestAnimationFrame(this.animateHandler);

    return true;
  }
  setupFlag = () => {
    const { wireframe, flagColor } = this.props;

    this.flag = new Flag({
      cellSize: 5,
      variance: 0.5,
    });

    const material = !wireframe ? new THREE.MeshPhongMaterial({
      color: flagColor,
      shading: THREE.SmoothShading,
      side: THREE.DoubleSide,
    }) : new THREE.MeshBasicMaterial({
      color: flagColor,
      wireframe: true,
    });

    // this.flagQuaternion = new THREE.Quaternion();
    // if (mode === 'horizontal') {
    //   this.flagQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI * 0.2);
    // } else {
    //   this.flagQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI * 0.25);
    // }

    this.flagMesh = new THREE.Mesh(this.flag.geometry, material);
    // this.flagMesh.setRotationFromQuaternion(this.flagQuaternion);
    this.scene.add(this.flagMesh);
  }
  resizeHandler = () => {
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.aspectRatio = this.width / this.height;

    if (this.camera) {
      this.camera.aspect = this.aspectRatio;
      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(this.width, this.height);
    }
  }
  animateHandler = (t) => {
    this.flag.update(t);

    this.renderer.render(this.scene, this.camera);

    if (this.RAF) {
      this.RAF = requestAnimationFrame(this.animateHandler);
    }
  }

  /** Render **/
  render() {
    return <Canvas innerRef={(r) => { this.canvas = r; }} />;
  }
}


export default WaveingFlag;
