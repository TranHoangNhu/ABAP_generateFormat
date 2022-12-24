// import generateStore from "./localStorage.js";
import { FinalText } from "./finalTextClass.js";

var isAllCheck = false;
const txtRender = document.getElementById("text");
let finalText = new FinalText();

window.getDataQueryParam = (namefile) => {
  var promise = axios({
    url: `https://abap-generate-format.vercel.app/Data/${namefile}.txt`,
    method: "GET",
    responseType: "text",
  });
  //   Thành Công
  promise.then(function (result) {
    console.log("Kết Quả: ", result.data);
    finalText[`${namefile}`] = `${result.data}`;
    // generateStore.set(finalText);
    renderTxtABAP(finalText);
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
    console.log(finalText);
  });
  checkboxPerform.forEach((checkbox) => {
    let param2 = checkbox.value;
    getDataQueryParam(param2);
    console.log(finalText);
  });
});

function renderTxtABAP(objText) {
  // let strFinalText = Object.values(objText).filter((arr, index) => arr[index] !== '').join("\n");
  let asArray = Object.entries(objText);
  let filtered = asArray.filter(([key, value]) => value !== "");
  let justStrings = Object.fromEntries(filtered);
  let strFinalText = Object.values(justStrings).join("\n");
  console.log(strFinalText);
  // let renderFinalText = strFinalText.replace(/,/g, "\n");
  // console.log(renderFinalText);
  document.querySelector("#text").innerHTML = strFinalText;
}

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

window.buttonCopy = () => {
  txtRender.select();
  txtRender.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(txtRender.value);
};
window.clearValueTxt = () => {
  txtRender.innerHTML = "";
  finalText = new FinalText();
};
window.toggle = (source) => {
  let checkboxes = document.querySelectorAll(
    'input[name="Info_program"], input[name="Info_perform"]'
  );
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    if (isAllCheck == false) {
      checkboxes[i].checked = "true";
      checkboxes[i].checked = source.checked;
    } else {
      checkboxes[i].removeAttribute("checked");
      //alert( "it is true" );
    }
  }
};
