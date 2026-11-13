---
type: post
slug: xcode4
title: "XCode C++ (Part 4)"
date: "2023-03-27"
part: 4
builds_on: []
topics: [opengl-glsl, matrix-math, shader-uniforms, rotation-logic]
tools: [OpenGL, GLM, C++, Xcode]
status: current
checked: "2026-11-06"
source_hash: "55599b696c8b"
generated_by: gemma4:12b
---

**Summary.** I explain how to rotate a triangle in a 3D scene using OpenGL and C++. I demonstrate how to implement rotation matrices and pass them to the vertex shader as uniforms.

## What I did
- I integrated the GLM library for mathematics.
- I updated the vertex shader to accept a rotation matrix.
- I calculated a rotation matrix using the glm::rotate function.
- I passed the rotation matrix to the shader via a uniform.
- I successfully rotated the triangle by 10 degrees.

## Claims
- I used the GLM library for graphics-related mathematics.
  > "I used OpenGL Mathematics (GLM), a header only C++ mathematics library for graphics software based on GLSL specifications."
- I rotated the triangle by 10 degrees around the z-axis.
  > "With these changes, I rotated the triangle by 10 degrees around the z-axis."
- The glm::rotate function requires a matrix, an angle in radians, and an axis.
  > "The glm::rotate() function takes a matrix, an angle (in radians), and an axis of rotation."
- I used glUniformMatrix4fv to pass the matrix data to the shader.
  > "I set the value of the transform uniform using glUniformMatrix4fv(), passing the uniform location, the number of matrices (1), whether to transpose (false), and a pointer to the matrix data from glm::value_ptr()."

## Outcome
I built a system to rotate a triangle by 10 degrees around the z-axis. I successfully integrated GLM to handle the necessary transformation matrices.

## Caveats
The post does not show the specific implementation of the vertex shader code.
