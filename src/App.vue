<script>
  import {NMessageProvider} from 'naive-ui'
  
  export default {
    name:"App",
    components: {
      NMessageProvider
    }
  }
    
  </script>
  <template>
    <n-message-provider>
      <div class="ebhs-container">
        <ebhs-header/>
        <main class="ebhs-main">
          <ebhs-table/>
        </main>
      </div>
    </n-message-provider>
  </template>
  
  <style lang="scss" scoped>
  .ebhs-container {
    margin: 10px 20px;
  }
  
  .ebhs-main {
  }
  
  
  </style>
  