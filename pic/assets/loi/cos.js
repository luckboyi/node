var img_domain = "http://image.vronline.com/";
var video_domain =  "http://down.video.vronline.com";
//cos start
var SLICE_SIZE_512K = 524288;
var SLICE_SIZE_1M = 1048576;
var SLICE_SIZE_2M = 2097152;
var SLICE_SIZE_3M = 3145728;
var MAX_UNSLICE_FILE_SIZE = 20971520;

function Cos(tp) {
    this.appid = 10005081;
    this.sign_url =  "/upload/imgCosAppSign/";
    this.tp = tp;
}


Cos.prototype.cosapi_video_url = "http://web.file.myqcloud.com/files/v1/";
Cos.prototype.cosapi_img_url = "http://web.image.myqcloud.com/photos/v2/";
Cos.prototype.slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
Cos.prototype.sliceSize = 3 * 1024 * 1024;
Cos.prototype.setSignParams = function(params) {
  this.signParams = params;
}

Cos.prototype.getSliceSize = function(size) {
    var res = SLICE_SIZE_3M;
    if (size <= SLICE_SIZE_512K) {
        res = SLICE_SIZE_512K;
    } else if (size <= SLICE_SIZE_1M) {
        res = SLICE_SIZE_1M;
    } else if (size <= SLICE_SIZE_2M) {
        res = SLICE_SIZE_2M;
    } else if (size <= SLICE_SIZE_3M) {
        res = SLICE_SIZE_3M;
    } else {
        res = SLICE_SIZE_3M;
    }
    return res;
}

Cos.prototype.getAppSign = function(fileName,success, error,once,sha1,size) {
    var url = this.sign_url + "?tp="+this.tp+"&name="+fileName;
    if(typeof(this.signParams)=="object") {
      var addUrls = [];
      $.each(this.signParams,function(k,v){
          addUrls.push(k+'='+v);
      });
      url += "&"+addUrls.join('&');
    }
    if(typeof(once)!="undefined" && once==true) {
      url += "&once=1";
    }
    if(typeof(sha1)!="undefined") {
      url += "&sha1="+sha1;
    }
    if(typeof(size)!="undefined") {
      url += "&size="+size;
    }
    $.ajax({
        url: url,
        type: "GET",
        success: success,
        error: error
    });
}

Cos.prototype.uploadFile = function(success, error, fileName, file) {
    var that = this;
    var Qh = swfobject.getObjectById("qs");
               
    var reader = new FileReader();  
    reader.onloadend = function(e) {  
        Qh.ftn_sign_update_dataurl(e.target.result);
        var sha1 = Qh.ftn_sha1_result();
        var size = file.size;
        that.getAppSign(fileName,function(json) {
          var jsonResult = $.parseJSON(json);
          var sign = jsonResult.data.sign;
          var remotePath = jsonResult.data.remote;
          var bucket = jsonResult.data.bucket;
          var url = that.cosapi_img_url + that.appid + "/" + bucket +'/0/'+ encodeURIComponent(remotePath);
          var formData = new FormData();
          formData.append('FileContent', file);
          $.ajax({
              type: 'POST',
              url: url,
              headers : {'Authorization':'QCloud '+sign},
              data: formData,
              processData: false,
              contentType: false,
              success: success,
              error: function(err) {
                if(typeof(err.responseText)!="undefined") {
                   if(err.responseText.indexOf("-1886")>0) {
                       that.deleteFile(success,error,fileName,file)
                   }
                }
              }
          });
        }, error,false,sha1,size);
    };
    reader.readAsDataURL(file);
}

Cos.prototype.deleteFile = function(success, error, fileName,file) {
  var that = this;
    this.getAppSign(fileName,function(json) {
        var jsonResult = $.parseJSON(json);
        var sign = jsonResult.data.sign;
        var remotePath = jsonResult.data.remote;
        var bucket = jsonResult.data.bucket;
        var url = that.cosapi_img_url + that.appid + "/" + bucket +'/0/'+ encodeURIComponent(remotePath)+'/del';
        $.ajax({
            type: 'POST',
            url: url,
            headers : {'Authorization':'QCloud '+sign},
            processData: false,
            contentType: false,
            success: function(res){
              that.uploadFile(success,error,fileName,file);
            },
            error:error
        });
    }, error,true);
}

Cos.prototype.sliceUploadFile = function(success,sliceBack, error,fileName, file, insertOnly, optSliceSize){
  console.log("sliceUploadFile sha1ing")
  var that = this;
  var reader = new FileReader();
  blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  reader.onload = function(e){
        if(e.target.result != null) {
            g_totalSize += e.target.result.length;
            if (e.target.result.length != 0) {
              if(!Qh){
                Qh = swfobject.getObjectById("qs");
              }
                Qh.ftn_sign_update_dataurl(e.target.result);
            }
        }
        g_currentChunk += 1;
        if (g_currentChunk <= g_chunks ) {
            if (g_iDelayReadData > 0) clearTimeout(g_iDelayReadData);
            if (g_LoadFileDelayTime > 0){
                g_iDelayReadData = setTimeout(nextSlice, g_LoadFileDelayTime);
            }else{
                g_iDelayReadData = 0;
                nextSlice();
            }
        }
        else {
          var endTime = new Date().getTime();
          g_running = false;
          var sha1 = Qh.ftn_sha1_result();
          console.log("sliceUploadFile go")
         
          that.getAppSign(fileName,function(json){
            var jsonResult = $.parseJSON(json);
            var sign = jsonResult.data.sign;
            var remotePath = jsonResult.data.remote;
            var bucketName = jsonResult.data.bucket;
            var session = '';
            var sliceSize = 0;
            var offset = 0;

            var url = that.cosapi_video_url + that.appid + "/" + bucketName+"/"+ encodeURI(remotePath) + "?sign=" + encodeURIComponent(sign);
            var formData = new FormData();
            formData.append('op', 'upload_slice');
            formData.append('sha', sha1);
            formData.append('filesize', file.size);
            formData.append("slice_size", that.getSliceSize(optSliceSize));
            
            if(insertOnly>=0){
              formData.append('insertOnly', insertOnly);
            }
            var getSessionSuccess = function(result){
              var jsonResult = $.parseJSON(result);
              if(jsonResult.data.access_url){
                success(result);
                return;
              }
              console.log(jsonResult.data);
              session = jsonResult.data.session;
              sliceSize = jsonResult.data.slice_size;
              offset = jsonResult.data.offset
              sliceUpload();
            };
            var sliceUpload = function(){
              that.getAppSign(fileName,function(json){
                var jsonResult = $.parseJSON(json);
                var sign = jsonResult.data.sign;
                var url = that.cosapi_video_url + that.appid + "/" + bucketName +"/"+ encodeURI(remotePath);// + "?sign=" + encodeURIComponent(sign);
                var formData = new FormData();
                formData.append('op', 'upload_slice');
                formData.append('session', session);
                formData.append('offset', offset);
                formData.append('fileContent', that.slice.call(file, offset, offset + sliceSize));
                $.ajax({
                        type : 'POST',
                        url : url,
                        data : formData,
                        processData : false, 
                        contentType : false,
                        success : sliceUploadSuccess,
                        error : error
                });
              }, error);
            };
            var sliceUploadSuccess = function(result){
              var jsonResult = $.parseJSON(result);
              if(jsonResult.data.offset != undefined){
                offset = jsonResult.data.offset + sliceSize;
                sliceBack(jsonResult.data.offset);
                sliceUpload();
              } else{
                success(result);
                return;
              }
            };
            $.ajax({
                    type : 'POST',
                    url : url,
                    data : formData,
                    processData : false, 
                    contentType : false,
                    success : getSessionSuccess,
                    error : error
            });
          }, error);
        }
    };
    reader.onerror = error;
    var Qh = swfobject.getObjectById("qs");
    var g_LoadFileBlockSize = 2 * 1024 * 1024;
    var g_LoadFileDelayTime = 0;
    var g_chunkId = null;
    var g_totalSize = 0;
    var g_uniqueId = "chunk_" + (new Date().getTime());
    var g_chunks = Math.ceil(file.size / g_LoadFileBlockSize);
    var g_currentChunk = 0;
    var g_running = true;
    var g_startTime = new Date().getTime();
    var g_iDelayReadData = 0;
    var startTime = new Date().getTime();
    var nextSlice = function(i, sliceCount){
      var start = 0;
      var end = 0;
      start = g_currentChunk * g_LoadFileBlockSize;
      if(file != null) {
          end = ((start + g_LoadFileBlockSize) >= file.size) ? file.size : start + g_LoadFileBlockSize;
          reader.readAsDataURL(that.slice.call(file, start, end));
      }
    };
    nextSlice();
}