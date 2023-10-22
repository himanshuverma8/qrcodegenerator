var generateButton = document.querySelector("#generateButton");
var downloadButton=document.getElementById("download-button");
var upiButton=document.getElementById("switch");
upiButton.addEventListener("click",generateUPI);
generateButton.addEventListener("click", generateQRCode);
//keypress for input field
document.querySelector("input").addEventListener("keydown",function(e){
  if(e.key==="Enter"){
    let inputValue = document.querySelector("input").value;
    if(inputValue.indexOf("@")!=-1){
      generateUPI();
    }else{
      generateQRCode();
    }
  }
});
//generate QRCode Function
function generateQRCode(){
  let inputValue = document.querySelector("input").value;
  if(inputValue.length===0){
    return;
  }
  if(inputValue.indexOf("@")!=-1){
    return;
  }
  if(!inputValue.startsWith("https://") && !inputValue.startsWith("http://")){
    inputValue = "https://"+inputValue;
  }
  let defaultImg = document.querySelector("#default-img");
  let loader = document.querySelector(".honeycomb");
  let qrCode = document.querySelector("#qrcode");
  defaultImg.style.display = "none";
  qrCode.style.display = "none";
  loader.style.display = "block";
  setTimeout(function () {
    var image = document.querySelector("#qrcode img");
    if (image) {
        qrCode.removeChild(image);
    }
    downloadButton.style.display="block";
    qrCode.style.display = "block";
    loader.style.display = "none";
    var qrcode = new QRCode("qrcode", inputValue, {
      width: 80,
      height: 80,
      colorDark: "#112FCF"
    });

  }, 1200);
}
//generate UPI Function
function generateUPI(){
  let inputValue = document.querySelector("input").value;
  if(inputValue.length===0){
    return;
  }
  if(inputValue.indexOf("@")==-1){
    return;
  }
  inputValue="upi://pay?pa="+inputValue;
  let defaultImg = document.querySelector("#default-img");
  let loader = document.querySelector(".honeycomb");
  let qrCode = document.querySelector("#qrcode");
  defaultImg.style.display = "none";
  qrCode.style.display = "none";
  loader.style.display = "block";
  setTimeout(function () {
    var image = document.querySelector("#qrcode img");
    if (image) {
        qrCode.removeChild(image);
    }
    downloadButton.style.display="block";
    qrCode.style.display = "block";
    loader.style.display = "none";
    var qrcode = new QRCode("qrcode", inputValue, {
      width: 80,
      height: 80,
    });

  }, 1200);
}
//download button
  downloadButton.addEventListener("click",function(){
    var container = document.getElementById("qrcode");
    html2canvas(container, { allowTaint: true }).then(function (canvas) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.download = "qrcode-in-temp.jpg";
    link.href = canvas.toDataURL();
    link.target = '_blank';
    link.click();
  });
  });
