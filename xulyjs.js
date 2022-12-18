// async function getDataQueryParam(namefile) {
//   try {
//     let result = await axios({
//       url: `./data/${namefile}.txt`,
//       method: "GET",
//       responseType: "text",
//     });
//     let DatabyInput = result.data;
//     return DatabyInput;
//   } catch (error) {
//     console.log("error: ", error);
//   }
// }
function getDataQueryParam(namefile, array) {
  var promise = axios({
    url: `./data/${namefile}.txt`,
    method: "GET",
    responseType: "text",
  });
  //   Thành Công
  promise.then(function (result) {
    console.log("Kết Quả: ", result.data);
    array[namefile].push(result.data);
  });
  //   Thất Bại
  promise.catch(function (error) {
    console.log("error: ", error);
  });
}

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
  let objFinalText = {
    include: [],
    info: [],
    initialization: [],
    start_of_selection: [],
    get_data: [],
    process_data: [],
    display_data: [],
  };
  let checkboxProgram = document.querySelectorAll(
    'input[name="Info_program"]:checked'
  );
  let checkboxPerform = document.querySelectorAll(
    'input[name="Info_perform"]:checked'
  );
  checkboxProgram.forEach((checkbox) => {
    let param = checkbox.value;
    getDataQueryParam(param, objFinalText);
  });
  checkboxPerform.forEach((checkbox) => {
    var param = checkbox.value;
    console.log(getDataQueryParam(param));
    // objFinalText.include.push(param);
  });
  console.log(objFinalText);
  var strFinalText = Object.values(objFinalText).toString();
  var finalText = strFinalText.replace(/,/g, "\n");
  console.log(finalText);
  document.querySelector("#text").innerHTML = finalText;
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
