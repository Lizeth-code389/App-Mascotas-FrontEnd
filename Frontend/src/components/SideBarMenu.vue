 <template>

  <el-menu
  :default-active="$route.path"
  router
    class="el-menu-vertical-demo"
    background-color="#777799"
    text-color="#ffffff"
    collapse-transition
  >
    <el-sub-menu index="1">
      <template #title>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEJ0lEQVR4nO2abUhTYRTHT/Q1gvrSV/uYEZVly9wkLEowUiINgog0giIQWmEhIVgpaRSRVAqBDfpQQevli2izd60tN7UXZ77WnKh3m8wXnOZ24pl3dt3udW52n3vb7h/+H3xwu8/5Peece7h3AIoUKVKkSJEiRVGquLJ/U6G+v/ncJ6dHa3WjtmdsSS7oHkNVi2tRVjcxvqxHtoH8cmsGSKEL939WadvdvqUGzXX+j9FFAwhY82HYd6L0m4p+8N2zm743OIldkzM45fNhQI5pL5bZJiIGkPF1JGIAxNkPf9mopr2WPXnDyBQK6bnTE1Hwue3uqIL3l8NHxkcNQKG+vzlw8kJipr1YuogMIDVP0j7ak+eaGoCzRqeHbJ6kfUCt47/xwPfZE1S3DKHOchkZsxoZswZ1liv+taUGKBsAZ6yz6e/x/q35QPDEJGA0r5tnshYzALRs+nLF3Qg5+WAADktqPAHQhAAYNqfFHgBm2jvX8Lgb4SuB+5bS2ANQZpvAZ06Pv9tzNzLbBK/4MyEmm6CW53YmdnAKgBYlA/C/KQF1rA9C2jAAaA5CWxttuLn2C2588Vk+ABhKg9CW15248ZlpzjICoBF9ECInzw1eVgB0FAYhf9rLFYCawiBEal62AFQUHBy8pAAKuuMcQH4UDzJjCkBG0OMsGoOQbADk8jzIpDEISQqgIMyDTBqDkKQAVGE2R2MQkjUAHYVBSNYA1DQGITkDUIltizOOAZgduLm2LX4BJBk6eIOPCwDbPg8JBr/9gXEm5gFsCXoAwg3+8KXGEskB7G+zYUOvHifstxEHbv5z934qxo73RfNsrys3UAs8IKHg3fa7ogROPGO7ERJ8x7sidNVXbQA5AGjo1YsWPPFk77UQANY3l39TD14IADftveqssI4UwHhXRWgGvCofhXgGYG0oH5MEgLqJ8QUDeM0pATEAyKoEdtcNeoIB5H7pw1H7HdEACDVBp6FyPXUAOTV9FqE7wcuep6IAELoNDtRX1FEHkHfVmr3d4hQcWIKDbTlyJmRtoVdcQtMen5OeGDG92jhy9KIplSqEHF1f22IAPCm87l97WHRLEIDQhBeJd1UbXVQBnCoeWrFPb3cuBODtyWLcYWb8aykWBxpOl4QA4HvFFY23PjbS+6EkF0KOrq81uBy6Dp5EU955TDPNfwhC/jYdK8TOnFMLvuL6LzKAq+Nl1qxDNT+b99QOTqZ+dPjIqaeY+XsEWQ9kBXGkNc/XA3ZVGV3Ue4AiRYr4tBwAVgLAGgBYCwDrACAJAEh9agBgJwCkA8AeANgLAPtY72XX0tn/0bCfSWK/I4H9zpXsNWSl1QBAxtE0AMjkBCWWM9lrrWevLZmWAcA2CgGHczK7F0kAJMczgIBWAUCiBCWQyF5btk0wgdMEd0TRBMlnRG+CfwC5CKlArQR8YAAAAABJRU5ErkJggg==" alt="repository">
        <span>Administrador</span>
      </template>


      <el-menu-item index="pais">Paises</el-menu-item>
      <el-menu-item index="departamento">Departamento</el-menu-item>
      <el-menu-item index="mascotas">Mascotas</el-menu-item>
      <el-menu-item index="raza">Raza</el-menu-item>
      <el-menu-item index="vacunas">Vacunas</el-menu-item>
      
      
      
      
      
      

    </el-sub-menu>

  </el-menu>
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
