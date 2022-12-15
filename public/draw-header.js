const emojicodes = ["1F590","1F595","1F596","1F5A5","1F5A","1F5B1","1F5B2","1F5BC","1F5C2","1F5C3","1F5C4","1F5D1","1F5D2","1F5D3","1F5DC","1F5DD","1F5DE","1F5E1","1F5E3","1F5EF","1F5F3","1F5FA","1F5FB","1F5FC","1F5FD","1F5FE","1F5FF","1F600","1F601","1F602","1F603","1F604","1F605","1F606","1F607","1F608","1F609","1F60A","1F60B","1F60C","1F60D","1F60E","1F60F","1F610","1F611","1F612","1F613","1F614","1F615","1F616","1F617","1F618","1F619","1F61A","1F61B","1F61C","1F61D","1F61E","1F61F","1F620","1F621","1F622","1F623","1F624","1F625","1F626","1F627","1F628","1F629","1F62A","1F62B","1F62C","1F62D","1F62E","1F62F","1F630","1F631","1F632","1F633","1F634","1F635","1F636","1F637","1F638","1F639","1F63A","1F63B","1F63C","1F63D","1F63E","1F63F","1F640","1F641","1F642","1F643","1F644","1F645","1F646","1F647","1F648","1F649","1F64A","1F64B","1F64C","1F64D","1F64E","1F64F","1F466","1F467","1F468","1F469","1F46A","1F46B","1F46C","1F46D","1F46E","1F46F","1F470","1F471","1F472","1F473","1F474","1F475","1F476","1F477","1F478","2709","270A","270B","270C","270D","270F","2712","2714","2716","271D","2721","2728","2733","2734","2744","2747","274C","274E","2753","2754","2755","2757","2763","2764","2795","2796","2797","27A1","27B0","27BF","2934","2935","2B05","2B06","2B07","2B1B","2B1C","2B50","2B55","3030","303D","3297","3299","1F004","1F0CF","1F170","1F171","1F17E","1F17F","1F18E","1F191","1F192","1F193","1F194","1F195","1F196","1F197","1F198","1F199","1F19A","1F201","1F202","1F21A","1F22F","1F232","1F233","1F234","1F235","1F236","1F237","1F238","1F239","1F23A","1F250","1F251","1F300","1F301","1F302","1F303","1F304","1F305","1F306","1F307","1F308","1F309","1F30A","1F30B","1F30C","1F30D","1F30E","1F30F","1F310","1F311","1F312","1F313","1F314","1F315","1F316","1F317","1F318","1F319","1F31A","1F31B","1F31C","1F31D","1F31E","1F31F","1F320","1F321"];

window.onload = function() {
  //select first 5 chars from one line from the 236 lines in emoticons.txt
    
    draw();
  };

  function draw(){

  let headerElement = document.getElementById('header');
  console.log(headerElement);
    for(var i=0;i<50;i++){
      const emojiNum = Math.floor(Math.random() * (235));
      const emojiElement = document.createElement("p");
      emojiElement.innerHTML = "&#x"+ emojicodes[emojiNum]+";";
      const flexstyle = "font-size: larger;height: 2rem;flex:" +  Math.floor(Math.random() * (30))+ ";"+ 
      "letter-spacing:"+ Math.floor(Math.random() * (300)-100)+ "px;";
      emojiElement.setAttribute('style',flexstyle,);
      headerElement.append(emojiElement);
    }
    const imgNum = Math.floor(Math.random() * (298));
    const fileName = "https://raw.githubusercontent.com/dariiboi/imgs-profprac/main/" + imgNum + "0.png";
    const imgElement = document.createElement("img");
    imgElement.setAttribute('src', fileName);
    imgElement.setAttribute('style', "filter: brightness(2);mix-blend-mode: darken;z-index:-2;position:absolute;max-width:10rem;"+ "right:6%");
    headerElement.append(imgElement);
  }