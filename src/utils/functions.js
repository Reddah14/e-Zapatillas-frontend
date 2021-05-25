import Vue from 'vue'

const objFunctions = new Vue({
    data: {
        MAX_FILE_SIZE: 60000
    },
    methods: {
        // Converts from bytes to megabytes
        bytesToMegabytes(bytes) {
            const value = bytes * Math.pow(10, -6);
            return value;
        },
        // Checks mime type
        checkMimetype(signature) {
            const signatures = [
                "89504E47", // image/png
                "47494638", // image/gif
                "FFD8FFDB", // image/jpeg
                "FFD8FFE0",
                "FFD8FFE1",
                "FFD8FFE2",
                "FFD8FFE3",
                "FFD8FFE8",
                "3C3F786D", // svg/xml
                "3C737667"
            ];

            return signatures.includes(signature);
        },
        // Gets mime type signature
        getMimeTypeSignature(data) {
            const uint = new Uint8Array(data);
            let bytes = [];
            uint.forEach(byte => {
                bytes.push(byte.toString(16));
            });
            return bytes.join("").toUpperCase();
        },
        // Add duration to upload
        resolveAfterTime(time) {
            return x => {
                return new Promise(resolve => setTimeout(() => resolve(x), time));
            };
        },
        bin2String(array) {
          return String.fromCharCode.apply(String, array);
        },
        // Converts file to base64 string
        fileToBase64(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader(),
            readerBase64 = new FileReader(),
            blob = file.slice(0, 4);
            reader.readAsArrayBuffer(blob);
            reader.onloadend = e => {
              let isValidMimeType = this.checkMimetype(this.getMimeTypeSignature(e.target.result));
        //MAX IMAGE SIZE: 56kb
              if ( this.bytesToMegabytes(file.size) > this.bytesToMegabytes(this.MAX_FILE_SIZE) ) {
                this.$objToaster.ToastifyDangerMsg("Archivo demasiado pesado (MAX 60 KB)");
                return;
              }
              if (isValidMimeType === false) {
                this.$objToaster.ToastifyDangerMsg("Tipo de archivo no soportado");
                return;
              }
              readerBase64.readAsDataURL(file);
            };
            readerBase64.onloadend = () => {
              let res = readerBase64.result;
              resolve(res);
            };
            reader.onerror = error => reject(error);
            readerBase64.onerror = error => reject(error);
          });
        },
        RemoveStorageCredentials(){
          this.$q.sessionStorage.remove('userToken');
          this.$q.sessionStorage.remove('userName');
          this.$q.sessionStorage.remove('userID_role');
        },
        restoreUserToken(){
          this.$api.defaults.headers.common['Authorization'] = this.$q.sessionStorage.getItem('userToken');
        }
    }
})

Vue.prototype.$objFunctions = objFunctions