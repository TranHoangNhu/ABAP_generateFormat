import generateStore from "./localStorage.js";
import { FinalText } from "./finalTextClass.js";

let finalText = new FinalText();

window.getDataQueryParam = (namefile) => {
  var promise = axios({
    url: `./data/${namefile}.txt`,
    method: "GET",
    responseType: "text",
  });
  //   Thành Công
  promise.then(function (result) {
    console.log("Kết Quả: ", result.data);
    finalText[`${namefile}`].push(`${result.data}`);
    generateStore.set(finalText);
  });
  //   Thất Bại
  promise.catch(function (error) {
    console.log("error: ", error);
  });
};
/* 
  Biến object (objFinalText) thành chuỗi theo thứ tự để xử lý.
  var strFinalText = Object.values(objFinalText).toString();
  console.log(strFinalText);
*/

/*
  -Xử lý chuỗi của biến strFinalText: Bỏ tất cả dấu phẩy trong chuỗi thành \n xuống hàng 
  var finalText = strFinalText.replace(/,/g, "\n");
  
  console.log(finalText);
  
  document.querySelector("#text").innerHTML = finalText;
*/

// function loadXMLDoc(dir) {
//   var checkList = document.querySelector("input.form-check-input");
//   var xhttp = new XMLHttpRequest() || new ActiveXObject("MSXML2.XMLHTTP");
//   xhttp.onreadystatechange = function () {
//     if (
//       this.readyState == 4 &&
//       this.status == 200 &&
//       checkList.checked === true
//     ) {
//       console.log(this.responseText);
//       document.querySelector("#text").innerHTML += this.responseText + "\n";
//      } else if (!checkList.checked) {
//       console.log("123");
//     }
//   };
//   xhttp.open("GET", dir, true);
//   xhttp.send();
// }
const btn_generate = document.querySelector("#btn_generate");
const btn_RenderTxt = document.querySelector("#btn_renderTxt");
btn_generate.addEventListener("click", (event) => {
  let checkboxProgram = document.querySelectorAll(
    'input[name="Info_program"]:checked'
  );
  let checkboxPerform = document.querySelectorAll(
    'input[name="Info_perform"]:checked'
  );
  checkboxProgram.forEach((checkbox) => {
    let param1 = checkbox.value;
    getDataQueryParam(param1);
    // generateStore.set(objFinalText);
    // Object.assign(objFinalText, textRender);
  });
  checkboxPerform.forEach((checkbox) => {
    let param2 = checkbox.value;
    getDataQueryParam(param2);
    // generateStore.set(objFinalText);
    // Object.assign(objFinalText, textRender);
  });
});

function renderTxtABAP() {
  let finalText = generateStore.get() || [];
  let strFinalText = Object.values(finalText).toString();
  // console.log(strFinalText);
  let renderFinalText = strFinalText.replace(/,/g, "\n");
  // console.log(renderFinalText);
  document.querySelector("#text").innerHTML = renderFinalText;
}

btn_RenderTxt.addEventListener("click", (event) => {
  let finalText = generateStore.get() || [];
  let strFinalText = Object.values(finalText).toString();
  // console.log(strFinalText);
  let renderFinalText = strFinalText.replace(/,/g, "\n");
  // console.log(renderFinalText);
  document.querySelector("#text").innerHTML = renderFinalText;
});

function loadXMLDocFile(dỉr_file) {
  var checkLoad = document.getElementById(dỉr_file);
  checkLoad.addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      document.getElementById("text").innerHTML += fr.result + "\n";
    };

    fr.readAsText(this.files[0]);
  });
}

function buttonCopy() {
  var copyText = document.getElementById("text");

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);
}

window.onload = function () {
  // Call Api của thư viện axios (index.html line 132) để get data theo tên file và cấu trúc mảng
  generateStore.get();
  renderTxtABAP();
};
