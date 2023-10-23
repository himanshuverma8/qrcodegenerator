var generateButton = document.querySelector("#generateButton");
var downloadButton=document.getElementById("download-button");
var upiButton=document.getElementById("switch");
const toasts=document.getElementById("toasts");
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
    createNotification("Input field can't be blank","fail");
    return;
  }
  if(inputValue.indexOf("@")!=-1){
    createNotification("use upi button to generate","fail");
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
    let image = document.querySelector("#qrcode img");
    let canvasElement = document.querySelector("canvas");
    if(canvasElement){
      canvasElement.remove();
    }
    if (image) {
        image.remove();
    }
    downloadButton.style.display="block";
    qrCode.style.display = "block";
    loader.style.display = "none";
    var qrcode = new QRCode("qrcode", inputValue, {
      width: 80,
      height: 80,
    });
    createNotification("QR Code Generated Successfully:)","success");
  }, 1200);
  
}
//generate UPI Function
function generateUPI(){
  let inputValue = document.querySelector("input").value;
  if(inputValue.length===0){
    createNotification("Input field can't be blank","fail");
    return;
  }
  if(inputValue.indexOf("@")==-1){
    createNotification("Enter a valid upi address","fail");
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
   let image = document.querySelector("#qrcode img");
    let  canvasElement = document.querySelector("canvas");
    if(canvasElement){
      canvasElement.remove();
    }
    if (image) {
        image.remove();
    }
    downloadButton.style.display="block";
    qrCode.style.display = "block";
    loader.style.display = "none";
    var qrcode = new QRCode("qrcode", inputValue, {
      width: 80,
      height: 80,
    });
    createNotification("UPI QR Generated Successfully:)","success");
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
    createNotification("Download started successfully:)","success");
    setTimeout(function(){
     createNotification("if you found this helpful share it with your friends:)","success");
    },1000);
  });
  });
  //toast notification
  function createNotification(message,type){
    const notif=document.createElement('div');
    notif.classList.add('toast');
    if(type==="success"){
      notif.classList.add('success');
    }
    if(type==="fail"){
      notif.classList.add('fail');
    }
    notif.innerHTML=message;
    toasts.appendChild(notif);
    setTimeout(function(){
      notif.remove();
    },2000);
  }