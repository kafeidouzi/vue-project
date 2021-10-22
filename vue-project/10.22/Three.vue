<template>
  <canvas></canvas>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  data() {
    return {
      controls :'',
      scene:'',
      camera:'',
      renderer:'',
      cube:''
    }
  },
  created() {
    this.init()
    this.animate()
  },
  methods:{
    init() {
      this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( this.renderer.domElement );

			var geometry = new THREE.BoxGeometry();
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			this.cube = new THREE.Mesh( geometry, material );
			this.scene.add( this.cube );

      this.camera.position.z = 5;
      this.controls = new OrbitControls(this.camera,this.renderer.domElement)
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度，阻尼越小越灵敏
      this.controls.dampingFactor = 0.5;
      // 是否可以缩放
      this.controls.enableZoom = true;
      //是否自动旋转
      this.controls.autoRotate = false;
      //设置相机距离原点的最近距离
      this.controls.minDistance = 20;
      //设置相机距离原点的最远距离
      this.controls.maxDistance = 1000;
      //是否开启右键拖拽
      this.controls.enablePan = true;
      //上下翻转的最大角度
      this.controls.maxPolarAngle = 1.5;
      //上下翻转的最小角度
      this.controls.minPolarAngle = 0.0;
      // 是否可以旋转
      this.enableRotate = true
    },
    animate() {
        requestAnimationFrame( this.animate );

				this.cube.rotation.x += 0.01;
				this.cube.rotation.y += 0.01;

				this.renderer.render( this.scene, this.camera );
    }
  }
}
</script>

<style>

</style>