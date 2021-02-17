import { Component, OnInit } from '@angular/core';

import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect.js';


@Component({
	selector: 'app-demo-one',
	templateUrl: './demo-one.component.html',
	styleUrls: ['./demo-one.component.less']
})
export class DemoOneComponent implements OnInit {
	camera
	scene
	renderer
	group
	mouseX = 0
	mouseY = 0
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	constructor() { }

	ngOnInit() {
		this.init();
		this.animate();
	}


	init() {
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.z = 500;
 
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xffffff);
		this.scene.fog = new THREE.Fog(0xffffff, 1, 10000);

		const geometry = new THREE.BoxGeometry(100, 100, 100);
		const material = new THREE.MeshNormalMaterial();

		this.group = new THREE.Group();

		for (let i = 0; i < 1000; i++) {

			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = Math.random() * 2000 - 1000;
			mesh.position.y = Math.random() * 2000 - 1000;
			mesh.position.z = Math.random() * 2000 - 1000;

			mesh.rotation.x = Math.random() * 2 * Math.PI;
			mesh.rotation.y = Math.random() * 2 * Math.PI;

			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();

			this.group.add(mesh);

		}

		this.scene.add(this.group);

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		// this.stats = new Stats();
		// let stats = new Stats.Stats;
		// document.body.appendChild(this.stats.dom);


		document.addEventListener('mousemove', (event) => this.onDocumentMouseMove(event));

		window.addEventListener('resize', () => this.onWindowResize());

	}

	onWindowResize() {

		this.windowHalfX = window.innerWidth / 2;
		this.windowHalfY = window.innerHeight / 2;

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(window.innerWidth, window.innerHeight);

	}

	onDocumentMouseMove(event) {

		this.mouseX = (event.clientX - this.windowHalfX) * 10;
		this.mouseY = (event.clientY - this.windowHalfY) * 10;

	}


	animate() {

		requestAnimationFrame(() => { this.animate() });

		this.render();
		// this.stats.update();

	}

	render() {

		const time = Date.now() * 0.001;

		const rx = Math.sin(time * 0.7) * 0.5,
			ry = Math.sin(time * 0.3) * 0.5,
			rz = Math.sin(time * 0.2) * 0.5;

		this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
		this.camera.position.y += (- this.mouseY - this.camera.position.y) * 0.05;

		this.camera.lookAt(this.scene.position);

		this.group.rotation.x = rx;
		this.group.rotation.y = ry;
		this.group.rotation.z = rz;

		this.renderer.render(this.scene, this.camera);

	}

}
