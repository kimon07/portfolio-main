/* WebGL underwater details: refractive spheres and deforming kelp blades. */
class UnderwaterScene {
  constructor(scene) {
    this.scene = scene;
    this.gl = scene.gl;
    this.clock = 0;
    this.lastTime = null;
    const gl = this.gl;
    this.bubbleProgram = createProgram(gl, UnderwaterScene.sphereVertex, UnderwaterScene.sphereFragment);
    this.kelpProgram = createProgram(gl, UnderwaterScene.kelpVertex, UnderwaterScene.kelpFragment);
    this.bubbleUniforms = this.uniforms(this.bubbleProgram, [
      "uViewProjection", "uView", "uCenter", "uRadius", "uSquash", "uCamera",
      "uScene", "uViewport", "uOpacity", "uPixelRadius", "uHighlight", "uRotation", "uSoftness",
    ]);
    this.kelpUniforms = this.uniforms(this.kelpProgram, [
      "uTime", "uOrigin", "uSize", "uViewport", "uMirror", "uCards[0]", "uCardCount",
    ]);
    this.coralProgram = createProgram(gl, UnderwaterScene.coralVertex, UnderwaterScene.coralFragment);
    this.coralUniforms = this.uniforms(this.coralProgram, ["uTime", "uOrigin", "uSize", "uViewport", "uMirror", "uPalette"]);
    this.coral = this.createCoral();
    this.sphere = this.createSphere();
    this.kelp = this.createKelp();
    this.sceneTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.textureWidth = 0;
    this.textureHeight = 0;
    this.layer = document.createElement("div");
    this.layer.className = "underwater-controls";
    this.layer.setAttribute("role", "group");
    this.layer.setAttribute("aria-label", "배경의 입체 물방울");
    scene.experience.append(this.layer);
    // Loose edge clusters leave the artwork's central space open.
    // Radius is reduced by 28%; depth softens the more distant bubbles.
    this.bubbles = [
      [.075, .25, 54, .08], [.12, .35, 10, .65], [.045, .38, 7, .9],
      [.915, .74, 46, .16], [.96, .64, 9, .72], [.855, .82, 7, .95],
      [.075, .73, 23, .55], [.155, .84, 18, .72], [.115, .79, 8, .85],
      [.915, .27, 18, .38], [.955, .35, 9, .7],
    ].map(([x, y, radius, depth], index) => {
      const button = document.createElement("button");
      button.className = "underwater-bubble-hit";
      button.type = "button";
      button.hidden = true;
      button.setAttribute("aria-label", "물방울 " + (index + 1) + " 터뜨리기");
      this.layer.append(button);
      const bubble = { x, y, radius: radius * .72, depth, button, poppedAt: null, hover: false, visible: false };
      button.addEventListener("pointerdown", event => event.stopPropagation());
      button.addEventListener("pointerenter", () => {
        bubble.hover = true;
        scene.pointerInside = false;
        scene.setHover(-1);
      });
      button.addEventListener("pointerleave", () => { bubble.hover = false; });
      button.addEventListener("focus", () => { bubble.hover = true; });
      button.addEventListener("blur", () => { bubble.hover = false; });
      button.addEventListener("click", event => {
        event.stopPropagation();
        if (bubble.poppedAt !== null || !bubble.visible) return;
        bubble.poppedAt = this.clock;
        bubble.popOrigin = { ...bubble.screen };
        button.setAttribute("aria-disabled", "true");
      });
      return bubble;
    });
    this.cardRects = new Float32Array(32 * 4);
    this.footerRects = [];
    this.resize();
  }

  uniforms(program, names) {
    return Object.fromEntries(names.map(name => [name, this.gl.getUniformLocation(program, name)]));
  }

  resize() {
    this.footerRects = Array.from(document.querySelectorAll(".topbar, .bottombar, .side-caption"))
      .map(node => node.getBoundingClientRect()).filter(r => r.width && r.height);
  }

  createSphere() {
    const gl = this.gl, vertices = [], indices = [];
    const rows = 40, cols = 64;
    for (let row = 0; row <= rows; row++) {
      const phi = row / rows * Math.PI;
      for (let col = 0; col <= cols; col++) {
        const theta = col / cols * Math.PI * 2;
        vertices.push(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
      }
    }
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const a = row * (cols + 1) + col, b = a + cols + 1;
        indices.push(a, a + 1, b, a + 1, b + 1, b);
      }
    }
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    const location = gl.getAttribLocation(this.bubbleProgram, "aPosition");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    return { vao, count: indices.length };
  }

  createKelp() {
    const gl = this.gl, vertices = [], indices = [];
    // Each blade grows from a branching stipe, with a wide, lobed lamina.
    // x/y = attachment; length/width = blade dimensions; lean/depth = 3D curvature.
    const blades = [
      [-.1, .03, 1.14, .052, -.18, -.12],
      [.015, .015, 1.3, .068, .02, -.15],
      [.13, .015, 1.08, .078, .16, -.1],
      [-.29, .02, .72, .044, -.2, -.07],
      [.34, .02, .88, .054, .2, -.1],
      [-.43, .025, .58, .038, -.28, -.04],
      [.47, .02, .68, .046, .3, -.08],
    ];
    const rows = 44, cols = 14;
    blades.forEach(([bx, by, length, width, lean, depth], blade) => {
      const start = vertices.length / 12;
      for (let row = 0; row <= rows; row++) {
        const t = row / rows;
        for (let col = 0; col <= cols; col++) {
          const u = col / cols * 2 - 1;
          vertices.push(u, t, bx, by, length, width, lean, depth, blade * 1.91, blade === 0 ? 1 : 0, 0, 0);
        }
      }
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const a = start + row * (cols + 1) + col, b = a + cols + 1;
          indices.push(a, b, a + 1, a + 1, b, b + 1);
        }
      }
    });
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    ["aUV", "aBase", "aShape", "aDetail"].forEach((name, index) => {
      const location = gl.getAttribLocation(this.kelpProgram, name);
      gl.enableVertexAttribArray(location);
      const size = index < 2 ? 2 : 4;
      const offset = [0, 8, 16, 32][index];
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 48, offset);
    });
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    return { vao, count: indices.length };
  }

  createCoral() {
    const gl = this.gl, vertices = [], indices = [];
    const vertex = (p, n, color) => { vertices.push(...p, ...n, ...color); };
    const ellipsoid = (center, radii, color) => {
      const start = vertices.length / 9, rows = 8, cols = 12;
      for (let row = 0; row <= rows; row++) {
        const phi = row / rows * Math.PI;
        for (let col = 0; col <= cols; col++) {
          const theta = col / cols * Math.PI * 2;
          const n = [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
          vertex(n.map((value, i) => center[i] + value * radii[i]), n, color);
        }
      }
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        const a = start + row * (cols + 1) + col, b = a + cols + 1;
        indices.push(a, a + 1, b, a + 1, b + 1, b);
      }
    };
    const branch = (root, length, angle, radius, depth, seed, color) => {
      const start = vertices.length / 9, rows = 9, sides = 9;
      const dx = Math.sin(angle), dy = Math.cos(angle);
      const bend = Math.sin(seed * 2.3) * length * .17;
      const end = [root[0] + dx * length, root[1] + dy * length, root[2] + Math.sin(seed) * .018];
      for (let row = 0; row <= rows; row++) {
        const t = row / rows, r = radius * (1 - t * .4);
        const cx = root[0] + dx * length * t + Math.sin(t * Math.PI) * bend;
        const cy = root[1] + dy * length * t;
        const cz = root[2] + (end[2] - root[2]) * t;
        for (let side = 0; side <= sides; side++) {
          const a = side / sides * Math.PI * 2;
          const n = [dy * Math.cos(a), -dx * Math.cos(a), Math.sin(a)];
          vertex([cx + n[0] * r, cy + n[1] * r, cz + n[2] * r], n, color);
        }
      }
      for (let row = 0; row < rows; row++) for (let side = 0; side < sides; side++) {
        const a = start + row * (sides + 1) + side, b = a + sides + 1;
        indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
      ellipsoid(end, [radius * .86, radius * .92, radius * .86], color);
      if (depth > 0) {
        branch(end, length * .7, angle - .51 + Math.sin(seed) * .13, radius * .66, depth - 1, seed + 2.1, color);
        branch(end, length * .62, angle + .62, radius * .62, depth - 1, seed + 4.3, color);
      }
    };
    // Layered coral branches and rounded seabed stones create the foreground reef.
    branch([-.18, .045, .06], .3, -.28, .044, 2, 1.7, [.04, .48, .62]);
    branch([.31, .045, -.04], .25, .2, .038, 2, 3.1, [.3, .2, .66]);
    branch([-.43, .025, -.1], .2, -.4, .027, 2, 5.4, [.82, .25, .5]);
    branch([.08, .04, .08], .22, -.72, .025, 2, 7.2, [.06, .52, .76]);
    branch([.08, .04, .08], .2, .72, .022, 2, 8.8, [.76, .22, .58]);
    [
      [[-.22, .025, .16], [.14, .045, .08], [.24, .45, .44]],
      [[.08, .028, .04], [.18, .065, .1], [.34, .58, .5]],
    ].forEach(([center, radii, color]) => ellipsoid(center, radii, color));
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    ["aPosition", "aNormal", "aColor"].forEach((name, i) => {
      const location = gl.getAttribLocation(this.coralProgram, name);
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 36, i * 12);
    });
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    return { vao, count: indices.length };
  }

  project(position) {
    const p = transformPoint(this.scene.viewProjection, [...position, 1]);
    return {
      x: (p[0] / p[3] * .5 + .5) * window.innerWidth,
      y: (.5 - p[1] / p[3] * .5) * window.innerHeight,
      w: p[3], depth: p[2] / p[3],
    };
  }

  // Distance to the actual rotated card polygon, rather than its oversized bounding box.
  cardDistance(x, y, points) {
    if (pointInQuad(x, y, points)) return 0;
    let distance = Infinity;
    for (let i = 0; i < 4; i++) {
      const a = points[i], b = points[(i + 1) % 4];
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1)));
      distance = Math.min(distance, Math.hypot(x - a[0] - dx * t, y - a[1] - dy * t));
    }
    return distance;
  }

  render(time) {
    const scene = this.scene, gl = this.gl;
    const delta = this.lastTime === null ? 0 : Math.max(0, Math.min((time - this.lastTime) / 1000, .05));
    this.lastTime = time;
    this.clock += delta;
    const hidden = scene.sceneMode !== "index" || scene.introOpen || scene.focus ||
      scene.detailOpen || scene.menuOpen || scene.profileOpen || scene.teamOpen ||
      scene.contactOpen || scene.transitioning;
    this.layer.hidden = Boolean(hidden);
    if (hidden) return;
    const reduced = scene.isReducedMotion();
    if (!reduced) this.motionTime = (this.motionTime || 0) + delta;
    const motion = this.motionTime || 0;
    const width = window.innerWidth, height = window.innerHeight;
    if (this.width !== width || this.height !== height) {
      this.width = width; this.height = height; this.resize();
    }
    const mobile = width <= 760;
    const compact = mobile || height < 540;
    const mobilePositions = [[.09,.25],[.15,.32],[.06,.37],[.91,.73],[.96,.64],[.84,.79],[.07,.68],[.16,.79],[.10,.75],[.90,.25],[.95,.34]];
    const draw = [];
    this.bubbles.forEach((bubble, index) => {
      let age = bubble.poppedAt === null ? -1 : this.clock - bubble.poppedAt;
      if (age > 2.2) {
        bubble.poppedAt = null; age = -1;
        bubble.button.removeAttribute("aria-disabled");
      }
      const cluster = Math.floor(index / 3);
      // Shared current keeps the clusters together; individual bobbing adds buoyancy.
      // Distant bubbles move more gently, with an 8–11 second floating cycle.
      const phase = index * 2.07;
      const floatSpeed = .58 + (index % 4) * .075;
      const floatAmount = Math.min(30, height * .035) * (1 - bubble.depth * .25);
      const driftX = Math.sin(motion * .3 + cluster * 1.71) * Math.min(14, width * .012) +
        Math.sin(motion * floatSpeed * .72 + phase) * Math.min(7, width * .008);
      const driftY = Math.sin(motion * floatSpeed + phase) * floatAmount +
        Math.sin(motion * .24 + cluster * 2.07) * Math.min(8, height * .009);
      const [fx, fy] = mobile ? mobilePositions[index] : [bubble.x, bubble.y];
      const bubbleScale = compact ? Math.min(.65, width / 650, height / 700) : Math.min(1.2, width / 1440, height / 850);
      const radius = bubble.radius * bubbleScale;
      let x = Math.max(radius + 8, Math.min(width - radius - 8, fx * width + driftX));
      let y = Math.max(100 + radius, Math.min(height - (mobile ? 130 : 78) - radius, fy * height + driftY));
      if (age >= 0 && age < .7 && bubble.popOrigin) {
        x = bubble.popOrigin.x; y = bubble.popOrigin.y;
      }
      const world = [x - width / 2, height / 2 - y, 0];
      bubble.visible = true;
      bubble.screen = { x, y, radius, envelope: Math.max(radius * 1.12, 22), gap: 8 };
      const hitSize = Math.max(44, radius * 2);
      bubble.rotation = motion * (.16 + index % 3 * .045) + index * 1.73;
      const squash = 1 + Math.sin(motion * floatSpeed + phase + Math.PI / 2) * .035;
      bubble.button.style.width = hitSize + "px";
      bubble.button.style.height = hitSize + "px";
      bubble.button.style.transform = "translate(-50%, -50%) translate(" + x + "px, " + y + "px)";
      if (age < 0) {
        draw.push({ bubble, world, radius, opacity: .92, squash });
      } else if (!reduced && age < .7) {
        if (age < .1) draw.push({ bubble, world, radius, opacity: .92, squash: 1 - age * 2.5 });
        else if (age < .22) draw.push({ bubble, world, radius: radius * (1 + (age - .1) * 3), opacity: .8 * (1 - (age - .1) / .12), squash: 1.05 });
        const burst = Math.max(0, age - .1);
        for (let j = 0; burst > 0 && j < (compact ? 8 : 12); j++) {
          const angle = j * 2.39996 + index;
          const travel = radius * (.65 + burst * (2.5 + j % 3));
          draw.push({
            bubble, world: [world[0] + Math.cos(angle) * travel, world[1] + Math.sin(angle) * travel - burst * burst * 150, 0],
            radius: Math.max(1.5, radius * (.035 + j % 3 * .024)) * (1 - burst * .65), opacity: (1 - burst / .6) * .9, squash: .8 + burst * .6,
          });
        }
      } else if (age > 1.8) {
        const appear = Math.min(1, (age - 1.8) / .4);
        draw.push({ bubble, world, radius: radius * (reduced ? 1 : .65 + appear * .35), opacity: appear * .92, squash });
      }
    });

    // A separate background pass: artwork is drawn afterwards, above every decoration.
    // No card proximity culling, position changes or visibility toggling.
    gl.disable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);
    if (this.textureWidth !== gl.drawingBufferWidth || this.textureHeight !== gl.drawingBufferHeight) {
      this.textureWidth = gl.drawingBufferWidth; this.textureHeight = gl.drawingBufferHeight;
      gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGB, 0, 0, this.textureWidth, this.textureHeight, 0);
    } else {
      gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, this.textureWidth, this.textureHeight);
    }
    gl.useProgram(this.bubbleProgram);
    gl.bindVertexArray(this.sphere.vao);
    const projection = new Float32Array([
      2 / width, 0, 0, 0, 0, 2 / height, 0, 0, 0, 0, -.0001, 0, 0, 0, 0, 1,
    ]);
    const u = this.bubbleUniforms;
    gl.uniformMatrix4fv(u.uViewProjection, false, projection);
    gl.uniformMatrix4fv(u.uView, false, createMat4());
    gl.uniform3f(u.uCamera, 0, 0, 10000);
    gl.uniform2f(u.uViewport, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform1i(u.uScene, 2);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    draw.forEach(item => {
      gl.uniform3fv(u.uCenter, item.world);
      gl.uniform1f(u.uRadius, item.radius);
      gl.uniform1f(u.uSquash, item.squash);
      gl.uniform1f(u.uOpacity, item.opacity * (1 - item.bubble.depth * .48));
      gl.uniform1f(u.uSoftness, item.bubble.depth);
      gl.uniform1f(u.uPixelRadius, item.radius * gl.drawingBufferHeight / height);
      gl.uniform1f(u.uHighlight, item.bubble.hover ? .35 : 0);
      gl.uniform1f(u.uRotation, item.bubble.rotation);
      gl.drawElements(gl.TRIANGLES, this.sphere.count, gl.UNSIGNED_SHORT, 0);
    });
    gl.disable(gl.CULL_FACE);
    gl.bindVertexArray(null);
    gl.depthMask(true);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.activeTexture(gl.TEXTURE0);
  }

  updateHitTargets() {
    const scene = this.scene;
    if (scene.sceneMode !== "index") this.layer.hidden = true;
    this.bubbles.forEach(bubble => {
      if (!bubble.screen) return;
      const { x, y, envelope, gap } = bubble.screen;
      // Only the invisible hit target yields to artwork. The sphere stays in place.
      const clearOfUI = this.footerRects.every(rect => x + envelope < rect.left || x - envelope > rect.right || y + envelope < rect.top || y - envelope > rect.bottom);
      const interactive = bubble.visible && clearOfUI && scene.hitAreas.every(area => this.cardDistance(x, y, area.points) > envelope + gap);
      bubble.interactive = interactive;
      bubble.button.hidden = !interactive;
    });
  }

  renderReef(time, width, height) {
    const gl = this.gl;
    const mobile = width < 600;
    const size = Math.min(height * .28, mobile ? 152 : 246);
    const kelpSize = Math.min(height * (mobile ? .24 : .34), mobile ? 128 : 280);
    const clusters = [
      [width * (mobile ? .07 : .04), height - (mobile ? 126 : 8), 1, 1.02, 0],
      [width * (mobile ? .93 : .96), height - (mobile ? 126 : 7), -.9, .9, .15],
    ];
    clusters.forEach(([x, y, mirror, factor, palette], index) => {
      const u = this.kelpUniforms;
      gl.useProgram(this.kelpProgram);
      gl.bindVertexArray(this.kelp.vao);
      gl.uniform2f(u.uViewport, width, height);
      gl.uniform1i(u.uCardCount, 0);
      gl.uniform1f(u.uTime, time + index * 3.8);
      gl.uniform2f(u.uOrigin, x, y);
      gl.uniform1f(u.uSize, kelpSize * factor);
      gl.uniform1f(u.uMirror, mirror);
      gl.drawElements(gl.TRIANGLES, this.kelp.count, gl.UNSIGNED_SHORT, 0);
    });
  }

}

UnderwaterScene.sphereVertex = `#version 300 es
precision highp float;
in vec3 aPosition;
uniform mat4 uViewProjection;
uniform mat4 uView;
uniform vec3 uCenter;
uniform float uRadius;
uniform float uSquash;
uniform float uRotation;
out vec3 vNormal;
out vec3 vWorld;
out vec3 vViewNormal;
void main() {
  vec3 shape = vec3(1.0 / sqrt(uSquash), uSquash, 1.0);
  float c = cos(uRotation), s = sin(uRotation);
  mat3 rotation = mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0);
  vNormal = normalize(rotation * (aPosition / shape));
  vViewNormal = mat3(uView) * vNormal;
  vWorld = uCenter + rotation * (aPosition * shape) * uRadius;
  gl_Position = uViewProjection * vec4(vWorld, 1.0);
}`;

UnderwaterScene.sphereFragment = `#version 300 es
precision highp float;
in vec3 vNormal;
in vec3 vWorld;
in vec3 vViewNormal;
uniform vec3 uCamera;
uniform sampler2D uScene;
uniform vec2 uViewport;
uniform float uOpacity;
uniform float uPixelRadius;
uniform float uHighlight;
uniform float uRotation;
uniform float uSoftness;
out vec4 outColor;
void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(uCamera - vWorld);
  float facing = max(dot(N, V), 0.0);
  float fresnel = pow(1.0 - facing, 2.6);
  vec2 uv = gl_FragCoord.xy / uViewport;
  vec2 bend = vViewNormal.xy * uPixelRadius / uViewport * (0.16 + 0.72 * pow(1.0 - facing, 1.8));
  vec3 refracted = texture(uScene, clamp(uv - bend, vec2(.001), vec2(.999))).rgb;
  // Reflections inherit the existing scene palette; the clear center transmits the tiles.
  vec3 environment = texture(uScene, clamp(uv + N.xy * uPixelRadius / uViewport * 1.6, vec2(.001), vec2(.999))).rgb;
  vec3 reflected = mix(environment * .32, vec3(1.0), smoothstep(-.5, .95, N.y) * .7);
  vec3 color = mix(refracted, reflected, fresnel * .585);
  vec3 H = normalize(normalize(vec3(-.6, .85, 1.2)) + V);
  float softbox = pow(max(dot(N, H), 0.0), mix(110.0, 65.0, uSoftness));
  float secondary = pow(max(dot(N, normalize(vec3(.45, -.55, .65))), 0.0), mix(95.0, 55.0, uSoftness));
  float angle = atan(N.y, N.x);
  float radial = length(N.xy);
  float arc = exp(-pow((radial - .90) / mix(.035, .065, uSoftness), 2.0));
  float arcLight = pow(max(0.0, sin(angle * 2.0 + uRotation)), 8.0);
  float innerArc = exp(-pow((radial - .76) / mix(.028, .05, uSoftness), 2.0)) * pow(max(0.0, cos(angle + uRotation * .65 + 1.2)), 14.0);
  float glints = pow(max(0.0, sin(angle * 7.0 - uRotation * 1.4)), 24.0) * arc;
  float rim = smoothstep(.72, .98, fresnel);
  color += vec3(1.0) * (softbox * 1.4 + secondary * .65 + arc * arcLight * .72 + innerArc * .32 + glints * .5 + rim * .24) * .75 * (1.0 - uSoftness * .25);
  color += fresnel * uHighlight * .12;
  // Fade the silhouette over roughly 0.4–1.8 pixels for a slight depth blur.
  float edgeWidth = mix(.4, 1.8, uSoftness) / max(uPixelRadius, 1.0);
  float edge = smoothstep(0.0, edgeWidth, 1.0 - radial);
  outColor = vec4(color, uOpacity * (.82 + fresnel * .18) * edge);
}`;

UnderwaterScene.kelpVertex = `#version 300 es
precision highp float;
in vec2 aUV;
in vec2 aBase;
in vec4 aShape;
in vec4 aDetail;
uniform float uTime;
uniform vec2 uOrigin;
uniform float uSize;
uniform vec2 uViewport;
uniform float uMirror;
out vec3 vSurface;
out vec2 vUV;
out vec2 vScreen;
out float vSeed;
void main() {
  float u = aUV.x, t = aUV.y;
  float seed = aDetail.x;
  float length = aShape.x, width = aShape.y, lean = aShape.z;
  float edge = abs(u);
  float outline = pow(max(sin(t * 3.14159265), 0.0), .62);
  outline *= 1.0 + .19 * sin(t * 22.0 + seed) + .08 * sin(t * 43.0 + seed);
  float side = u * width * outline;
  float curl = sin(t * 5.5 + seed) * .42 + sin(uTime * .7 - t * 2.2 + seed) * .22;
  float x = aBase.x + lean * (t * t * .5 + t * .5) + side * cos(curl);
  float y = aBase.y + length * t;
  float z = aShape.w + side * sin(curl) + sin(t * 5.0 + seed) * .085;
  // Stipes stay rooted; travelling water waves bend and twist the lamina.
  x += sin(uTime * .61 - y * 2.8) * y * y * .045;
  x += sin(uTime * .83 - t * 3.2 + seed) * t * t * .025;
  z += sin(uTime * .72 - y * 2.0 + seed) * t * .055;
  z += sin(t * 28.0 + seed + uTime * .8) * pow(edge, 2.3) * outline * .028;
  y += sin(t * 20.0 + seed) * edge * edge * .012;
  vSurface = vec3(x * uMirror, y, z);
  vec2 pixel = uOrigin + vec2(vSurface.x, -y) * uSize;
  vScreen = pixel;
  vUV = aUV;
  vSeed = seed;
  gl_Position = vec4(pixel.x / uViewport.x * 2.0 - 1.0, 1.0 - pixel.y / uViewport.y * 2.0, .72 - z * .12, 1.0);
}`;

UnderwaterScene.kelpFragment = `#version 300 es
precision highp float;
in vec3 vSurface;
in vec2 vUV;
in vec2 vScreen;
in float vSeed;
uniform vec4 uCards[32];
uniform int uCardCount;
out vec4 outColor;
void main() {
  float clearance = 1.0;
  for (int i = 0; i < 32; i++) {
    if (i >= uCardCount) break;
    vec4 card = uCards[i];
    vec2 d = max(max(card.xy - vScreen, vScreen - card.zw), vec2(0.0));
    float distance = length(d);
    if (distance < 22.0) discard;
    clearance = min(clearance, smoothstep(22.0, 44.0, distance));
  }
  vec3 normal = normalize(cross(dFdx(vSurface), dFdy(vSurface)));
  if (normal.z < 0.0) normal = -normal;
  vec3 light = normalize(vec3(-.45, .8, .9));
  float diffuse = max(dot(normal, light), 0.0);
  float thinEdge = smoothstep(.5, 1.0, abs(vUV.x));
  float transmission = pow(max(dot(-normal, light), 0.0), 1.2) + thinEdge * .23;
  float variation = sin(vUV.y * 8.0 + vSeed) * .09 + sin(vUV.x * 13.0 + vUV.y * 31.0) * .035;
  vec3 dark = vec3(.025, .13, .32);
  vec3 cyan = vec3(.04, .66, .72);
  vec3 color = mix(dark, cyan, clamp(diffuse * .8 + transmission + variation, 0.0, 1.0));
  float coralTint = smoothstep(.35, 1.0, vUV.y) * (.16 + .08 * sin(vSeed));
  color = mix(color, vec3(.82, .25, .62), coralTint * thinEdge);
  float midrib = exp(-abs(vUV.x) * 70.0);
  float branch = abs(sin((vUV.y * 12.0 - abs(vUV.x) * 1.7) * 3.14159));
  float veins = (1.0 - smoothstep(.0, .10, branch)) * .038;
  color += vec3(.15, .62, .78) * (midrib * .22 + veins);
  float sheen = pow(max(dot(normal, normalize(light + vec3(0, 0, 1))), 0.0), 38.0);
  color += vec3(.3, 1.0, .72) * sheen * .24;
  color = mix(color, vec3(.1569, .3451, 1.0), .16);
  outColor = vec4(color, .96 * clearance);
}`;

UnderwaterScene.coralVertex = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
in vec3 aColor;
uniform vec2 uViewport;
uniform vec2 uOrigin;
uniform float uSize;
uniform float uMirror;
uniform float uTime;
out vec3 vNormal;
out vec3 vColor;
out vec3 vPosition;
void main() {
  vec3 p = aPosition;
  // Coral stems flex gently together, with smaller motion at their roots.
  p.x += sin(uTime * .48 - p.y * 2.8 + p.x * 3.0) * p.y * p.y * .025;
  p.z += sin(uTime * .61 - p.y * 2.0) * p.y * .012;
  vNormal = normalize(vec3(aNormal.x * sign(uMirror), aNormal.yz));
  vColor = aColor;
  vPosition = p;
  vec2 pixel = uOrigin + vec2(p.x * uMirror, -p.y) * uSize;
  gl_Position = vec4(pixel.x / uViewport.x * 2.0 - 1.0, 1.0 - pixel.y / uViewport.y * 2.0, .3 - p.z * .1, 1.0);
}`;

UnderwaterScene.coralFragment = `#version 300 es
precision highp float;
in vec3 vNormal;
in vec3 vColor;
in vec3 vPosition;
uniform float uPalette;
out vec4 outColor;
void main() {
  vec3 n = normalize(vNormal);
  float diffuse = max(dot(n, normalize(vec3(-.4, .75, 1.0))), 0.0);
  vec3 palette = mix(vColor, vec3(vColor.b, vColor.r * .58 + vColor.g * .45, vColor.r * .76 + vColor.b * .25), uPalette);
  float grain = sin(vPosition.x * 430.0) * sin(vPosition.y * 380.0) * .015;
  vec3 color = palette * (.68 + diffuse * .58 + grain);
  color += palette * .18;
  float rim = pow(1.0 - abs(n.z), 3.0);
  color += palette * rim * .10;
  color = mix(color, vec3(.1569, .3451, 1.0), .11);
  outColor = vec4(color, .9);
}`;
