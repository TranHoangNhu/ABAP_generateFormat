// import generateStore from "./localStorage.js";
import { TabOneClass } from "./models/tabOneClass.js";
import { TabTwoClass } from "./models/tabTwoClass.js";

var isAllCheck = false;
const txtRender = document.getElementById("text");
let finalTextTab1 = new TabOneClass();
let finalTextTab2 = new TabTwoClass();

window.getDataQueryParamTab1 = (namefile) => {
  var promise = axios({
    url: `./Data/${namefile}.txt`,
    method: "GET",
    responseType: "text",
  });
  //   Thành Công
  promise.then(function (result) {
    console.log("Kết Quả: ", result.data);
    finalTextTab1[`${namefile}`] = `${result.data}`;
    let paramInclude = String(
      document.querySelector("#custom_data_include").value
    );
    let strThirdFirst = paramInclude.slice(0, 3);
    if (paramInclude) {
      finalTextTab1.include = ` 
         INCLUDE ${strThirdFirst}_in_${paramInclude}_top.

         INCLUDE ${strThirdFirst}_in_${paramInclude}_f01.
      `;
    }
    renderTxtABAP(finalTextTab1);
  });
  //   Thất Bại
  promise.catch(function (error) {
    console.log("error: ", error);
  });
};

window.getDataQueryParamTab2 = (namefile) => {
  var promise = axios({
    url: `./Data/${namefile}.txt`,
    method: "GET",
    responseType: "text",
  });
  //   Thành Công
  promise.then(function (result) {
    console.log("Kết Quả: ", result.data);
    finalTextTab2[`${namefile}`] = `${result.data}`;
    // generateStore.set(finalTextTab2);
    renderTxtABAP(finalTextTab2);
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
  var finalTextTab1 = strFinalText.replace(/,/g, "\n");
  
  console.log(finalTextTab1);
  
  document.querySelector("#text").innerHTML = finalTextTab1;
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
  let checkboxPerform2 = document.querySelectorAll(
    'input[name="Info_perform2"]:checked'
  );
  checkboxProgram.forEach((checkbox) => {
    let param1 = checkbox.value;
    getDataQueryParamTab1(param1);
    // console.log(finalTextTab1);
  });
  checkboxPerform.forEach((checkbox) => {
    let param2 = checkbox.value;
    getDataQueryParamTab1(param2);
    // console.log(finalTextTab1);
  });
  checkboxPerform2.forEach((checkbox) => {
    let param3 = checkbox.value;
    getDataQueryParamTab2(param3);
    // console.log(finalTextTab2);
  });
});

function renderTxtABAP(objText) {
  // let strFinalText = Object.values(objText).filter((arr, index) => arr[index] !== '').join("\n");
  let asArray = Object.entries(objText);
  let filtered = asArray.filter(([key, value]) => value !== "");
  let justStrings = Object.fromEntries(filtered);
  let strFinalText = Object.values(justStrings).join("\n");
  // let custominput = document.querySelector("#custom_data_include");
  // if (window.location.hash == "#item1" && custominput.value !== "") {
  //   strFinalText += `
  //   *&---------------------------------------------------------------------*
  //   *& Form ${custominput.value}
  //   *&---------------------------------------------------------------------*
  //   *& text
  //   *&---------------------------------------------------------------------*
  //   *& -->  p1        text
  //   *& <--  p2        text
  //   *&---------------------------------------------------------------------*
  //   FORM ${custominput.value}.
  //     " Into code
  //   ENDFORM.
  //   `;
  // }
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
// event toggle button clear
window.clearValueTxt = () => {
  txtRender.innerHTML = "";
  finalTextTab1 = new TabOneClass();
  finalTextTab2 = new TabTwoClass();
};
// event toggle check all
window.toggle = (source) => {
  let checkboxes = document.querySelectorAll(
    'input[name="Info_program"], input[name="Info_perform"], input[name="Info_perform2"]'
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
