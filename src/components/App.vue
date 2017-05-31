<template>
  <div id="app">
    <form id="form">
      <VueImgInputer
        theme="light"
        :onChange="cb"
        name="smfile"
      >
      </VueImgInputer>
    </form>
    <div class="text-wrap">
      <span class="text" :data-clipboard-text="url" @mouseover="initClipboard"
        @mouseout="destroyClipboard" v-if="url">{{url}}</span>
      <span class="text" :data-clipboard-text="markdownUrl" @mouseover="initClipboard"
        @mouseout="destroyClipboard" v-if="url">{{markdownUrl}}</span>
    </div>
    <p class="copyright">感谢<a href="https://sm.ms" target="_blank"> sm.ms </a>提供的api | made with <a href="https://github.com/sinchang">sinchang</a></p>
  </div>
</template>

<script>
  import VueImgInputer from 'vue-img-inputer'
  import fetch from 'unfetch'
  import Clipboard from 'clipboard'
  import toast from 'native-toast'
  import NProgress from 'nprogress'

  export default {
    name: 'app',
    data() {
      return {
        url: '',
        accept: 'image/png,image/jpg;'
      }
    },
    computed: {
      markdownUrl() {
        return `![](${this.url})`
      }
    },
    methods: {
      cb(file) {
        const formData = new FormData(document.getElementById('form'))
        formData.append('smfile', file)
        this.url = ''
        NProgress.inc()
        fetch('https://sm.ms/api/upload?ssl=true', {
          method: 'POST',
          body: formData
        }).then( r => r.json() )
          .then( res => {
            NProgress.done()
            this.url = res.data.url
          })
      },
      initClipboard({currentTarget}) {
        this.clipboard = new Clipboard(currentTarget)
        this.clipboard.on('success', e => {
          toast({message: `复制成功`, type: 'success'})
        })
        this.clipboard.on('error', e => {
          toast({message: '复制失败', type: 'error'})
        })
      },
      destroyClipboard() {
        if (this.clipboard) {
          this.clipboard.destroy()
          this.clipboard = null
        }
      },
    },
    components: {
      VueImgInputer
    }
  }
</script>
<style src="native-toast/dist/native-toast.css"></style>
<style>
  @import '../../node_modules/nprogress/nprogress.css';

  html, body, #app {
    height: 100%;
  }
  body {
    background-color: #f9f9f9;
    margin: 0;
    padding: 40px 0 0 0;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: #00ab6b;
  }
  form {
    text-align: center;
  }
  .text-wrap {
    min-height: 150px;
  }
  .text {
    display: block;
    margin: 20px auto;
    padding: 0 10px;
    background: #fbfdff;
    border: 1px solid #97a8be;
    width: 435px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    cursor: pointer;
  }
  .text:hover {
    background-color: #f0f0f0;
  }
  .copyright {
    text-align: center;
  }
</style>
