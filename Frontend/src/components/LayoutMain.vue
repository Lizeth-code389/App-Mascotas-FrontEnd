<script setup>

import NavBar from './NavBar.vue'

import SideBarMenu from './SideBarMenu.vue'

</script>



<template>
    <el-container>
        <el-header>
           <NavBar />
        </el-header>

        <el-container>
        <el-aside>
            <SideBarMenu />
        </el-aside>   
        
        <el-main>
            main
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