<template>
    <el-row class="tac">
      <el-col :span="12">
        
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          backgroun-color="#242629"
          text-color="#fff"
          collapse-transition
          
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Administrador</span>
            </template>
            
              <el-menu-item index="1-2">Personas</el-menu-item>
              <el-menu-item index="1-3">Cargos</el-menu-item>
              <el-menu-item index="1-4">Paises</el-menu-item>
           
            
          </el-sub-menu>
          
        
          <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Configuración</span>
            </template>

            
            <el-menu-item index="1-2">Personas</el-menu-item>
              <el-menu-item index="1-3">Cargos</el-menu-item>
              <el-menu-item index="1-4">Paises</el-menu-item>

              </el-sub-menu>

        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
   import {Location} from '@element-plus/icons-vue';

</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  /* height: 100%; */
}



.el-menu-vertical-demo {
  width: 250px;
  min-height: 100%;
}
</style>






   
  