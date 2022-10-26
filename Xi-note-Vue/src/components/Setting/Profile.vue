<template>
  <div class="change-box">
    <input type="file" accept="image/*" ref="imgReader" id="imgReader" @change="uploadProfile($event)" v-show="false">
    <h2>更改头像</h2>
    <div v-show="showCropper" class="showCropper">
      <!-- 一个用于给Cropper.js覆盖使用的img  -->
      <div width="320" height="320">
        <img id="cropImg" ref="cropImg" width="320" height="320">
      </div>
      <!-- 用于预览的div  -->
      <div class="preview-con">
        <div class="preview">
          <div class="previewText">裁剪预览</div>
          <div class="previewBox" ref="pre"></div>
          <p>仅支持2M以内的jpg\png格式图片</p>
        </div>
        <div class="btn-box">
          <button @click="upload()">确定</button>
          <button @click="cancel()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Profile',
  props: ['showChange'],
  data() {
    return {
      imgData: '',
      showCropper: false,
      cropper: null
    }
  },
  methods: {
    ...mapActions(['updateProfile']),
    getBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
        // readAsDataURL
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
          reject(newError('文件流异常'));
        };
      });
    },
    // 读取从本地上传的图片并进行预览
    uploadProfile(e) {
      // 读取上传文件
      let reader = new FileReader();
      const file = e.target.files[0];
      if (file) {
        //readAsDataURL方法可以将File对象转化为data:URL格式的字符串（base64编码）
        reader.readAsDataURL(file);
        // 当文件成功读取时，执行load 事件
        reader.onload = (e) => {
          this.showCropper = true;
          this.$emit('increase-width', true);
          let dataURL = reader.result;
          this.$refs.cropImg.src = dataURL;
          // 创建cropper实例
          this.cropper = new this.$cropper(this.$refs.cropImg, {
            aspectRatio: 16 / 16,
            // 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
            viewMode: 3,
            minContainerWidth: 80,
            minContainerHeight: 80,
            dragMode: 'move',
            preview: [this.$refs.pre]
          })
        }
      }
    },
    // 将裁剪的图片处理成blob数据流并分发axios
    upload() {
      //getCroppedCanvas方法可以将裁剪区域的数据转换成canvas数据
      this.cropper.getCroppedCanvas({
        maxWidth: 500,
        maxHeight: 500,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      }).toBlob((blob) => {
        //将blob转换为base64
        this.getBase64(blob).then(res => {
          // 从local获取id
          let id = window.localStorage.getItem('id');
          // 将base64进行urencode编码防止+号丢失
          const result = encodeURIComponent(res);
          const data = {
            croppedImg: result,
            id
          }
          this.updateProfile(data)
        })
      });
      // 关闭窗口
      this.cancel()
    },
    // 取消上传
    cancel() {
      if (this.cropper) {
        this.cropper.destroy();
      }
      this.showCropper = false;
      this.$emit('increase-width', false);
    }
  },
}
</script>

<style lang="less" scoped>
.change-box {
  text-align: center;
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #fff;
  box-shadow: -5px 0 10px #ccc;
  height: 25rem;

  h2 {
    padding-bottom: .7rem;
    .h3-font(1rem);
    line-height: 1rem;
    border-bottom: 1px solid @theme-color;
  }
}


// 裁剪框
.showCropper {
  .flex;
  align-items: flex-start;
  justify-content: space-around;
  width: 28rem;
  height: 20rem;
  padding-top: .5rem;
}

// 预览框
.preview-con {
  height: 100%;
  .flex-column;
  justify-content: space-between;

  .preview {
    .flex-column;

    p {
      .remind-font(.5rem)
    }
  }

  .previewText {
    .remind-font();
  }
}

.previewBox {
  box-shadow: 0 0 5px #adadad;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-top: 10px;
  overflow: hidden;
}

// 按钮框
.btn-box {
  height: 5rem;
  .flex-column;
  justify-content: space-between;
}
</style>