function fireUploader(op) {

	var _Error_Handler = op.init && op.init.Error;
	var _FileUploaded_Handler = op.init && op.init.FileUploaded;
    op.init.Error = function() {};
    op.init.FileUploaded = function() {};

    var add_params = {};
	var option = {};
	var defaultSetting = {
		runtimes : 'html5,flash,html4',
		flash_swf_url : './Moxie.swf',
		drop_element:op.container
	}
	plupload.extend(option, op, defaultSetting);

	var uploader = new plupload.Uploader(option);
    

    function fileStart(up) {
        up.start();
    }

	uploader.bind("init",function(up) {
        if(op.cos) {
            if(!$('#qs').length){                       
                $('body').append('<object id="qs" width="0" height="0" type="application/x-shockwave-flash" data="/js/Somethingtest.swf" style="visibility: visible;"></object>');
            }
        }
        if(op.add_params) {
            add_params = op.add_params
            up.setOption({'multipart_params': add_params})
        }
		console.log("init")
	})
	uploader.bind("FilesAdded",function(up,file) {
       
        if(op.err) {
             _Error_Handler(up, 1, op.err);
        } else {
            if(op.cos) {
                var currentFile =  file[0].getNative()
                var currentFileId = file[0].id;
                up.start = function() {
                    var cos = new Cos(op.cos.appid,op.cos.signUrl,op.cos.isSave);
                    var remote_name = op.cos.remote;
                    if(op.cos.randName) {
                       remote_name = op.cos.remote+currentFileId;
                    }
                    //console.log(up.files[0])
                    cos.sliceUploadFile(_FileUploaded_Handler, _Error_Handler,op.cos.bucket,remote_name,currentFile,0);
                    up.removeFile(file[0])
                }
            }
            if(op.check) {
                    if(typeof(FileReader)!="undefined") {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[0].getNative());
                    reader.onload = (function (e) {
                        var image = new Image();
                        image.src = e.target.result;
                        image.onload = function () {
                            if(op.check.width == this.width && op.check.height == this.height) {
                                fileStart(up);
                            } else {
                                _Error_Handler(up, 1, "请传"+op.check.width+"*"+op.check.height+"尺寸的图片");
                            }
                        };
                    });
                } else {
                    add_params.checkw = op.check.width
                    add_params.checkd = op.check.height
                    up.setOption({'multipart_params': add_params})
                    fileStart(up);
                }
            } else {
                fileStart(up);
            }
        }
	})

	uploader.bind("BeforeUpload",function(up,file) {
		add_params.key = file.id
		up.setOption({'multipart_params': add_params})
		console.log("brefore upload")
	})

	uploader.bind('FileUploaded', (function(_FileUploaded_Handler) {
		return function(up,file,info) {
			  var last_step = function(up, file, data) {
                    if (_FileUploaded_Handler) {
                        _FileUploaded_Handler(up, file, data);
                    }
               };
               try {
               		var res = JSON.parse(info.response);
                    if(typeof(res.code)=="undefined" || typeof(res.data)=="undefined") {
                        _Error_Handler(up, 1, "json parse error");
                    } else {
                        if(res.code!=0) {
                             _Error_Handler(up, res.code, res.data.msg);
                        } else {
                            last_step(up, file, res.data);
                        }
                    }
               } catch (err) {
               		_Error_Handler(up, 1, "json parse error");
               }
		}
	})(_FileUploaded_Handler));

	uploader.bind('Error', (function(_Error_Handler) {
        return function(up, err) {
            var errTip = '';
            var file = err.file;
            if (file) {
                switch (err.code) {
                    case plupload.FAILED:
                        errTip = '上传失败。请稍后再试。';
                        break;
                    case plupload.FILE_SIZE_ERROR:
                        var max_file_size = up.getOption && up.getOption('max_file_size');
                        max_file_size = max_file_size || (up.settings && up.settings.max_file_size);
                        errTip = '浏览器最大可上传' + max_file_size + '。';
                        break;
                    case plupload.FILE_EXTENSION_ERROR:
                        errTip = '文件类型验证失败。请重新上传。';
                        break;                    	
                    case plupload.SECURITY_ERROR:
                        errTip = '安全配置错误。请联系网站管理员。';
                        break;
                    case plupload.GENERIC_ERROR:
                        errTip = '上传失败。请稍后再试。';
                        break;
                    case plupload.IO_ERROR:
                        errTip = '上传失败。请稍后再试。';
                        break;
                    case plupload.INIT_ERROR:
                        errTip = '网站配置错误。请联系网站管理员。';
                        uploader.destroy();
                        break;
                    default:
                        errTip = err.message + err.details;
                        break;
                }
                if (_Error_Handler) {
                    _Error_Handler(up, err, errTip);
                }
            }
        };
    })(_Error_Handler));

	uploader.init();
	return uploader;
}

var SLICE_SIZE_512K = 524288;
var SLICE_SIZE_1M = 1048576;
var SLICE_SIZE_2M = 2097152;
var SLICE_SIZE_3M = 3145728;
var MAX_UNSLICE_FILE_SIZE = 20971520;
var sha1Url = "/upload/cosSha1";
var signUrl = "/upload";
var cosAppId = 10005081;


function Cos(appid,signurl,savesha1) {

    this.appid = appid || cosAppId;
    this.sign_url = signurl || signUrl;
    if(typeof(savesha1) != "undefined") {
        this.savesha1 = savesha1
    } else {
        this.savesha1 = true;
    }
    this.sha1Url = sha1Url; 
}


Cos.prototype.cosapi_cgi_url = "http://web.file.myqcloud.com/files/v1/";
Cos.prototype.slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
Cos.prototype.sliceSize = 3 * 1024 * 1024;
Cos.prototype.getExpired = function(second){
    return Date.parse(new Date()) / 1000 + (second || 60);
}

Cos.prototype.addSha1 = function() {
    if(!$('#qs').length){                       
        $('body').append('<object id="qs" width="0" height="0" type="application/x-shockwave-flash" data="/js/Somethingtest.swf" style="visibility: visible;"></object>');
    }
}

Cos.prototype.hasFlashVersionOrBetter = function (major, minor) {
    minor = minor || 0;
    var v;
    if (navigator.plugins && navigator.plugins.length > 0) {
        var type = 'application/x-shockwave-flash';
        var mimeTypes = navigator.mimeTypes;
        if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description) {
            v = mimeTypes[type].enabledPlugin.description.replace(/^.*?([0-9]+)\.([0-9])+.*$/, '$1,$2').split(',');
        }
    }
    else {
        var flashObj = null;
        try { flashObj = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); } catch (ex) { return false; }
        if (flashObj != null) {
            var fV;
            try { fV = flashObj.GetVariable("$version"); } catch (err) { return false; }
            v = fV.replace(/^.*?([0-9]+,[0-9]+).*$/, '$1').split(',');
        }
    }
    if (v) {
        var majorVersion = parseInt(v[0], 10);
        var minorVersion = parseInt(v[1], 10);
        return majorVersion > major || (majorVersion == major && minorVersion >= minor);
    }
    return false;
}

Cos.prototype.getSliceSize = function(size){
    var res = SLICE_SIZE_3M;
    if(size<=SLICE_SIZE_512K){
        res = SLICE_SIZE_512K;
    }else if(size<=SLICE_SIZE_1M){
        res = SLICE_SIZE_1M;
    }else if(size<=SLICE_SIZE_2M){
        res = SLICE_SIZE_2M;
    }else if(size<=SLICE_SIZE_3M){
        res = SLICE_SIZE_3M;
    }else{
        res = SLICE_SIZE_3M;
    }
    return res;
}

Cos.prototype.getAppSign = function(success, error, bucketName){
    var expired = this.getExpired();
    var url = this.sign_url + "/cosAppSign?expired=" + expired + "&bucketName=" + bucketName;
    $.ajax({
        url : url,
        type : "GET",
        success : success,
        error : error
    });
}

Cos.prototype.getAppSignOnce = function(success, error, path, bucketName){
    var url = this.sign_url + "/cosAppSignOnce?path=" + encodeURIComponent(path) + "&bucketName=" + bucketName; 
    $.ajax({
        url : url,
        type : "GET",
        success : success,
        error : error
    });
}

Cos.prototype.uploadFile = function(success, error, bucketName, remotePath, file, insertOnly){
    var that = this;
    this.getAppSign(function(json){
        var jsonResult = $.parseJSON(json);
        var sign = jsonResult.data.sign;
        var url = that.cosapi_cgi_url + that.appid + "/" + bucketName + encodeURI(remotePath) + "?sign=" + encodeURIComponent(sign);
        var formData = new FormData();
        formData.append('op', 'upload');
        formData.append('fileContent', file);
        if(insertOnly>=0){//insertOnly==0 表示允许覆盖文件 1表示不允许 其他值忽略
            formData.append('insertOnly', insertOnly);
        }
        $.ajax({
            type : 'POST',
            url : url,
            data : formData,
            processData : false, 
            contentType : false,
            success : success,
            error : error
        });
    }, error, bucketName);
}

Cos.prototype.sliceUploadFile = function(success, error, bucketName, remotePath, file, insertOnly, optSliceSize){
    var that = this;
    var reader = new FileReader();
    blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

    reader.onload = function(e){
        if(e.target.result != null) {
            g_totalSize += e.target.result.length;
            if (e.target.result.length != 0) {
                if(!Qh){
                    Qh = swfobject.getObjectById("qs");
                    console.log(Qh);
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
            console.log("spend time "+(endTime-startTime));
            g_running = false;
            var sha1 = Qh.ftn_sha1_result();
            if(that.savesha1) {
                $.post(that.sha1Url,{path:bucketName+remotePath,sha1:sha1,filesize:file.size},function() {});
            }
            //getSession
            that.getAppSign(function(json){
                var jsonResult = $.parseJSON(json);
                var sign = jsonResult.data.sign;
                var session = '';
                var sliceSize = 0;
                var offset = 0;

                var url = that.cosapi_cgi_url + that.appid + "/" + bucketName + encodeURI(remotePath) + "?sign=" + encodeURIComponent(sign);
                var formData = new FormData();
                formData.append('op', 'upload_slice');
                formData.append('sha', sha1);
                formData.append('filesize', file.size);
                formData.append("slice_size", that.getSliceSize(optSliceSize));
                
                if(insertOnly>=0){//insertOnly==0 表示允许覆盖文件 1表示不允许 其他值忽略
                    formData.append('insertOnly', insertOnly);
                }
                var getSessionSuccess = function(result){
                    var jsonResult = $.parseJSON(result);
                    if(jsonResult.data.access_url){
                        success(null,null,jsonResult.data);
                        return;
                    }
                    session = jsonResult.data.session;
                    sliceSize = jsonResult.data.slice_size;
                    offset = jsonResult.data.offset
                    sliceUpload();
                };
                var sliceUpload = function(){
                    that.getAppSign(function(json){
                        var jsonResult = $.parseJSON(json);
                        var sign = jsonResult.data.sign;
                        var url = that.cosapi_cgi_url + that.appid + "/" + bucketName + encodeURI(remotePath);// + "?sign=" + encodeURIComponent(sign);
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
                    }, error, bucketName);
                };
                var sliceUploadSuccess = function(result){
                    var jsonResult = $.parseJSON(result);
                    if(jsonResult.data.offset != undefined){
                        offset = jsonResult.data.offset + sliceSize;
                        sliceUpload();
                    }
                    else{
                        success(null,null,jsonResult.data);
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
            }, error, bucketName);
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
