import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

window.THREE = THREE;
window.THREE.GLTFLoader = GLTFLoader;
window.THREE.OrbitControls = OrbitControls;

import './components/header.js';
import './components/footer.js';
import './data.js';
import './api.js';
import './pages/form/index.js';
import './pages/main/index.js';
import './pages/vacancy/index.js';
import './main.js';