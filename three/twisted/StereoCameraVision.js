import { Matrix4 } from 'https://unpkg.com/three@0.150.1/src/math/Matrix4.js';
import * as MathUtils from 'https://unpkg.com/three@0.150.1/src/math/MathUtils.js';
import { PerspectiveCamera } from 'https://unpkg.com/three@0.150.1/src/cameras/PerspectiveCamera.js';

const _eyeRight = /*@__PURE__*/ new Matrix4();
const _eyeLeft = /*@__PURE__*/ new Matrix4();
const _projectionMatrix = /*@__PURE__*/ new Matrix4();

class StereoCameraVision {

	constructor() {

		this.type = 'StereoCameraVision';

		this.aspect = 1;

		this.eyeSep = 0.064;

		this.cameraL = new PerspectiveCamera();
		this.cameraL.layers.enable(1);
		this.cameraL.matrixAutoUpdate = false;

		this.cameraR = new PerspectiveCamera();
		this.cameraR.layers.enable(2);
		this.cameraR.matrixAutoUpdate = false;

		this._cache = {
			focus: null,
			fov: null,
			aspect: null,
			near: null,
			far: null,
			zoom: null,
			eyeSep: null
		};

	}

	update(camera) {

		const cache = this._cache;

		const needsUpdate = cache.focus !== camera.focus || cache.fov !== camera.fov ||
			cache.aspect !== camera.aspect * this.aspect || cache.near !== camera.near ||
			cache.far !== camera.far || cache.zoom !== camera.zoom || cache.eyeSep !== this.eyeSep;

		if (needsUpdate) {

			cache.focus = camera.focus;
			cache.fov = camera.fov;
			cache.aspect = camera.aspect * this.aspect;
			cache.near = camera.near;
			cache.far = camera.far;
			cache.zoom = camera.zoom;
			cache.eyeSep = this.eyeSep;

			// debugger;

			// Off-axis stereoscopic effect based on
			// http://paulbourke.net/stereographics/stereorender/

			_projectionMatrix.copy(camera.projectionMatrix);
			const eyeSepHalf = cache.eyeSep / 2;
			const eyeSepOnProjection = eyeSepHalf * cache.near / cache.focus;
			const ymax = (cache.near * Math.tan(MathUtils.DEG2RAD * cache.fov * 0.5)) / cache.zoom;
			let xmin, xmax;

			// translate xOffset

			_eyeLeft.elements[12] = - eyeSepHalf;
			_eyeRight.elements[12] = eyeSepHalf;

			// translate right 1 unit

			// _eyeRight.elements[ 3 ] = -1;

			// for left eye

			xmin = - ymax * cache.aspect + eyeSepOnProjection;
			xmax = ymax * cache.aspect + eyeSepOnProjection;

			_projectionMatrix.elements[0] = 2 * cache.near / (xmax - xmin);
			_projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);

			this.cameraL.projectionMatrix.copy(_projectionMatrix);

			// for right eye

			xmin = - ymax * cache.aspect - eyeSepOnProjection;
			xmax = ymax * cache.aspect - eyeSepOnProjection;

			_projectionMatrix.elements[0] = 2 * cache.near / (xmax - xmin);
			_projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);

			this.cameraR.projectionMatrix.copy(_projectionMatrix);

		}

		this.cameraL.matrixWorld.copy(camera.matrixWorld).multiply(_eyeLeft);
		this.cameraR.matrixWorld.copy(camera.matrixWorld).multiply(_eyeRight);

		// Use the matrixWorld matrix to perform a transformation
		/*const translationMatrix = new THREE.Matrix4().makeTranslation(1, 1, 1);
		matrixWorld.multiply(translationMatrix);*/

		// Rotate the right camera by 45 degrees around the z-axis in world space
		// const rotationMatrix = new Matrix4().makeRotationZ(Math.PI / 4);

		const rotationMatrix = new Matrix4().makeRotationZ(MathUtils.degToRad(-5))
		const makeTranslation = new Matrix4().makeTranslation(0, 0, 0);

		this.cameraR.matrixWorld.copy(this.cameraR.matrixWorld).multiply(rotationMatrix);
		this.cameraR.matrixWorld.copy(this.cameraR.matrixWorld).multiply(makeTranslation);

	}

}

export { StereoCameraVision };