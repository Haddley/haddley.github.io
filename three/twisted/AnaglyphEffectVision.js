import {
	LinearFilter,
	Matrix3,
	Mesh,
	NearestFilter,
	OrthographicCamera,
	PlaneGeometry,
	RGBAFormat,
	Scene,
	ShaderMaterial,
	StereoCamera,
	WebGLRenderTarget
} from 'three';

import {StereoCameraVision} from './StereoCameraVision.js';

class AnaglyphEffectVision {

	constructor( renderer, width = 512, height = 512 ) {

		// Dubois matrices from https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.7.6968&rep=rep1&type=pdf#page=4

		/*this.colorMatrixLeft = new Matrix3().fromArray( [
			0.456100, - 0.0400822, - 0.0152161,
			0.500484, - 0.0378246, - 0.0205971,
			0.176381, - 0.0157589, - 0.00546856
		] );

		this.colorMatrixRight = new Matrix3().fromArray( [
			- 0.0434706, 0.378476, - 0.0721527,
			- 0.0879388, 0.73364, - 0.112961,
			- 0.00155529, - 0.0184503, 1.2264
		] );*/

		this.colorMatrixLeft = new Matrix3().fromArray( [
			1.0671679973602295, - 0.0016435992438346148, 0.0001777536963345483, // r out
			- 0.028107794001698494, - 0.00019593400065787137, - 0.0002875397040043026, // g out
			- 0.04279090091586113, 0.000015809757314855233, - 0.00024287120322696865 // b out
	   ] );
	   
	   this.colorMatrixRight = new Matrix3().fromArray( [
		- 0.0355340838432312, - 0.06440307199954987, 0.018319187685847282, // r out
		- 0.10269022732973099, 0.8079727292060852, - 0.04835830628871918, // g out
		0.0001224992738571018, - 0.009558862075209618, 0.567823588848114 // b out
	   ] );

		const _camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

		const _scene = new Scene();

		const _stereo = new StereoCameraVision();

		const _params = { minFilter: LinearFilter, magFilter: NearestFilter, format: RGBAFormat };

		const _renderTargetL = new WebGLRenderTarget( width, height, _params );
		const _renderTargetR = new WebGLRenderTarget( width, height, _params );

		const _material = new ShaderMaterial( {

			uniforms: {

				'mapLeft': { value: _renderTargetL.texture },
				'mapRight': { value: _renderTargetR.texture },

				'colorMatrixLeft': { value: this.colorMatrixLeft },
				'colorMatrixRight': { value: this.colorMatrixRight }

			},

			vertexShader: [

				'varying vec2 vUv;',

				'void main() {',

				'	vUv = vec2( uv.x, uv.y );',
				'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

				'}'

			].join( '\n' ),

			fragmentShader: [

				'uniform sampler2D mapLeft;',
				'uniform sampler2D mapRight;',
				'varying vec2 vUv;',

				'uniform mat3 colorMatrixLeft;',
				'uniform mat3 colorMatrixRight;',

				// These functions implement sRGB linearization and gamma correction

				'float lin( float c ) {',
				'	return c <= 0.04045 ? c * 0.0773993808 :',
				'			pow( c * 0.9478672986 + 0.0521327014, 2.4 );',
				'}',

				'vec4 lin( vec4 c ) {',
				'	return vec4( lin( c.r ), lin( c.g ), lin( c.b ), c.a );',
				'}',

				'float dev( float c ) {',
				'	return c <= 0.0031308 ? c * 12.92',
				'			: pow( c, 0.41666 ) * 1.055 - 0.055;',
				'}',


				'void main() {',

				'	vec2 uv = vUv;',

				'	vec4 colorL = lin( texture2D( mapLeft, uv ) );',
				'	vec4 colorR = lin( texture2D( mapRight, uv ) );',

				'	vec3 color = clamp(',
				'			colorMatrixLeft * colorL.rgb +',
				'			colorMatrixRight * colorR.rgb, 0., 1. );',

				'	gl_FragColor = vec4(',
				'			dev( color.r ), dev( color.g ), dev( color.b ),',
				'			max( colorL.a, colorR.a ) );',

				'}'

			].join( '\n' )

		} );

		const _mesh = new Mesh( new PlaneGeometry( 2, 2 ), _material );
		_scene.add( _mesh );

		this.setSize = function ( width, height ) {

			renderer.setSize( width, height );

			const pixelRatio = renderer.getPixelRatio();

			_renderTargetL.setSize( width * pixelRatio, height * pixelRatio );
			_renderTargetR.setSize( width * pixelRatio, height * pixelRatio );

		};

		this.render = function ( scene, camera ) {

			const currentRenderTarget = renderer.getRenderTarget();

			if ( scene.matrixWorldAutoUpdate === true ) scene.updateMatrixWorld();

			if ( camera.parent === null && camera.matrixWorldAutoUpdate === true ) camera.updateMatrixWorld();

			_stereo.update( camera );

			renderer.setRenderTarget( _renderTargetL );
			renderer.clear();
			renderer.render( scene, _stereo.cameraL );

			renderer.setRenderTarget( _renderTargetR );
			renderer.clear();
			renderer.render( scene, _stereo.cameraR );

			renderer.setRenderTarget( null );
			renderer.render( _scene, _camera );

			renderer.setRenderTarget( currentRenderTarget );

		};

		this.dispose = function () {

			_renderTargetL.dispose();
			_renderTargetR.dispose();
			_mesh.geometry.dispose();
			_mesh.material.dispose();

		};

	}

}

export { AnaglyphEffectVision };
