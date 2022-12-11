var objFinalText = {
  addInclude: [],
  addInfo: [],
  addInitialization: [],
  addStartOfSelection: [],
  addGetData: [],
  addProcessData: [],
  addDisplayData: [],
};

/*
  - Bị khoảng trống lớn khi add khác hệ.
  - Khách hệ thì cách nhau 1 \n. 
*/

objFinalText.addInfo.push(`
&*********************************************************************
* OBJECT            :
* TITLE             :
* PRICE ID          :
* REQUEST BY        :
*&*********************************************************************&
&                        MODIFICATION LOG
&---------------------------------------------------------------------
* Transport number  :
* Modification ID   :
* ABAPer            :
* Date modified     :
* FS version        :
* Requested by      :
* Description       :
&---------------------------------------------------------------------
*----------------------------------------------------------------------*
*      I N I T I A L I Z A T I O N
*----------------------------------------------------------------------*
INITIALIZATION.
    PERFORM INIT.
  PERFORM GET_DATA.
    REPORT ZMM_PG_ZMM13.

    INCLUDE ZMM_PG_ZMM13_TOP.

    INCLUDE ZMM_PG_ZMM13_F01.
`);

/* 
  Biến object (objFinalText) thành chuỗi theo thứ tự để xử lý.
*/
var strFinalText = Object.values(objFinalText).toString();

console.log(strFinalText);

/*
  -Xử lý chuỗi của biến strFinalText: Bỏ tất cả dấu phẩy trong chuỗi thành \n xuống hàng 
*/
var finalText = strFinalText.replace(/,/g, "\n");

console.log(finalText);

document.querySelector("#text").innerHTML = finalText;

function loadXMLDoc(dir) {
  var checkList = document.querySelector("input.form-check-input");
  var xhttp = new XMLHttpRequest() || new ActiveXObject("MSXML2.XMLHTTP");
  xhttp.onreadystatechange = function () {
    if (
      this.readyState == 4 &&
      this.status == 200 &&
      checkList.checked === true
    ) {
      console.log(this.responseText + "\n");
      document.querySelector("#text").innerHTML += this.responseText + "\n";
    } else if (!checkList.checked) {
      console.log("123");
    }
  };
  xhttp.open("GET", dir, true);
  xhttp.send();
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

function buttonCopy() {
  var copyText = document.getElementById("text");

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);
}
