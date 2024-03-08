Particle3D=function(material){
	THREE.Particle.call(this,material);
	this.velocity=new THREE.Vector3(0.2,0.2,0.2);//速度;
	this.velocity.rotateX(5);//旋转;
	this.gravity=new THREE.Vector3(0,0.6);//加速度;
	this.drag=0.51;//速度相乘系数;
};
//Particle:粒子;
//prototype:原形;
Particle3D.prototype=new THREE.Particle();
Particle3D.prototype.constructor=Particle3D;//构造函数
Particle3D.prototype.updatePhysics=function(){
	this.velocity.multiplyScalar(this.drag);//矢量相乘函数
	this.velocity.addSelf(this.gravity);//矢量相加函数
	this.position.addSelf(this.velocity);//矢量相加函数
}
var TO_RADIANS=Math.PI/180;//角度向弧度转换系数*
THREE.Vector3.prototype.rotateY=function(angle){
	//绕Y轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempz=this.z;
	var tempx=this.x;
	this.x=(tempx*cosRY)+(tempz*sinRY);
	this.z=(tempx*-sinRY)+(tempz*cosRY);
}
THREE.Vector3.prototype.rotateX=function(angle){
	//绕X轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempz=this.z;;
	var tempy=this.y;
	this.y=(tempy*cosRY)+(tempz*sinRY);
	this.z=(tempy*-sinRY)+(tempz*cosRY);
}
THREE.Vector3.prototype.rotateZ=function(angle){
	//绕Z轴顺时针旋转angle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempx=this.x;;
	var tempy=this.y;
	this.y=(tempy*cosRY)+(tempx*sinRY);
	this.x=(tempy*-sinRY)+(tempx*cosRY);
}
function randomRange(min,max){
	return((Math.random()*(max-min))+ min);
}


// 创建粒子的函数，减少粒子数量
function createParticles(numParticles) {
    var particles = [];
    for (var i = 0; i < numParticles; i++) {
        var material = new THREE.ParticleBasicMaterial({
            color: new THREE.Color(1, 1, 1),
            size: 2
        });
        var particle = new Particle3D(material);
        particle.position.set(randomRange(-100, 100), randomRange(-100, 100), randomRange(-100, 100));
        particle.velocity.set(randomRange(-1, 1), randomRange(-1, 1), randomRange(-1, 1)).normalize().multiplyScalar(0.5); // 减慢速度
        scene.add(particle);
        particles.push(particle);
    }
    return particles;
}

// 使用 createParticles 函数创建较少的粒子
var numParticles = 100; // 减少粒子数量
var particleSystem = createParticles(numParticles);

// 更新粒子系统的函数
function updateParticleSystem(deltaTime) {
    particleSystem.forEach(function(particle) {
        particle.updatePhysics();
    });
}

// 在动画循环中调用 updateParticleSystem
function animate() {
    requestAnimationFrame(animate);
    updateParticleSystem(1 / 60); // 假设每帧更新时间为 1/60 秒
    renderer.render(scene, camera);
}
animate();