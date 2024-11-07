<script setup>

import NavBar from './NavBar.vue';

import SideBarMenu from './SideBarMenu.vue';

</script>



<template>
    <el-container style="height: 100vh;">
        <el-header>
           <NavBar />
        </el-header>

        <el-container>
        <el-aside width="250px">
            <SideBarMenu />
        </el-aside >   
        
        <el-main>
           <!-- aca debe estar el slot del layout -->
            <slot name="slotLayout"></slot>
        </el-main>
        
    </el-container>


    </el-container>
    


  </template>
  


<style lang="css">
/* estilos css*/
.el-header{
    padding:0px;
    height:auto;


}

.el-container{
    flex:1;
}
</style>