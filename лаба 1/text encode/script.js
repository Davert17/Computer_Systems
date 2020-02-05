"use strict"

window.onload=()=>{
    let Base64 = {

        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    
        encode : function (input) {
    
            var output = "";
    
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    
            var i = 0;
    
            input = Base64._utf8_encode(input);
    
            while (i < input.length) {
    
                chr1 = input.charCodeAt(i++);
    
                chr2 = input.charCodeAt(i++);
    
                chr3 = input.charCodeAt(i++);
    
                enc1 = chr1 >> 2;
    
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    
                enc4 = chr3 & 63;
    
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
    
                }
                output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
    
            return output;
    
        },
    
        _utf8_encode : function (string) {
    
            string = string.replace(/\r\n/g,"\n");
    
            var utftext = "";
    
            for (var n = 0; n < string.length; n++) {
    
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
    
    
                else if((c > 127) && (c < 2048)) {
    
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
    
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
    }
    document.querySelector('#test').addEventListener('click',function(){
        let fileInput=document.querySelector('#file'),text=document.querySelector('#text');
        let file =fileInput.files[0];
        if(!file){
            console.log('error');
            return false;
        }
        let fileName=file.name;
        let reader = new FileReader();
        reader.readAsText(file,'windows-1251');
        reader.onload=()=>{

            let result=reader.result;
            let outer=Base64.encode(result);
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;base64,' + outer);

            document.querySelector('#text').insertAdjacentHTML('beforeend',outer+"</br></br>");

            let fileType=fileName.split('.')[fileName.split('.').length-1];
            element.setAttribute('download', fileName+"base64"+".txt");

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
            // function utf8_to_b64(str) {
            //     return window.btoa(unescape(encodeURIComponent(str)));
            // }
            // document.querySelector('#text').insertAdjacentHTML('beforeend',utf8_to_b64(result));
        };



        
       


    });
};































