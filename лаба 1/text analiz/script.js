"use strict"

window.onload=()=>{

document.querySelector('#test').addEventListener('click',function(){
    let fileInput=document.querySelector('#file'),text=document.querySelector('#text');
    

    //console.log('і'==='І');
    let file =fileInput.files[0];
    if(!file){
        console.log('error');
        return false;
    }
    let fileName=file.name;
    let reader = new FileReader();
    let encodyngType='windows-1251';
    if(document.getElementById('base').checked) encodyngType='base64';
    reader.readAsText(file,encodyngType);

    reader.onload = function() {
        // text.insertAdjacentText('beforeend',reader.result);
         
        let result=reader.result.toLocaleLowerCase(),
        uaAlphabet=['а','б','в','г','ґ','д','е','є','ж','з','и','і','ї','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ю','я'];
        // console.log(result);
        let arrayFromResult=result.split('') ;

        let numberOfSymbols=arrayFromResult.reduce((prevVal,item)=>{
            if(uaAlphabet.includes(item))
           return ++prevVal;

           return prevVal;

        },0);

        let frequency=uaAlphabet.map((item)=>{
            // let i=(result.match(new RegExp(item, "g")) || []).length;
            return (result.match(new RegExp(item, "g")) || []).length / numberOfSymbols;
        });

        let entropy = -frequency.reduce((prev,item)=>{
            

            if(!item)return prev;
            let h= item*Math.log2(item);
            // console.log(h);
            
            prev +=h;
            return prev;
        },0);

        let inforamtionCountByte=(entropy*numberOfSymbols)/8;

        let trAlph="<tr><td>Алфавіт</td>"+uaAlphabet.reduce((pr,item)=>{
            pr +="<td>"+item+"</td>";
            return pr;
        },'')+"</tr>";

        let trFreq="<tr><td>Частота</td>"+frequency.reduce((pr,item)=>{
            pr +="<td>"+item+"</td>";
            return pr;
        },'')+"</tr>";


        let trEntr="<tr><td>Ентропія</td><td>" +entropy+"</td></tr>",trInf="<tr><td>Кількість інформації (байт)</td><td>" +inforamtionCountByte+"</td></tr>";
        text.insertAdjacentHTML('beforeend',`
        Ім'я файлу: ${fileName}
        <table>
            ${trAlph}
            ${trFreq}
            ${trEntr}
            ${trInf}
        </table>


        `);
        
        //  console.log(inforamtionCountByte);


      };




    //.replace(/\n/g,"<br />")
});


};