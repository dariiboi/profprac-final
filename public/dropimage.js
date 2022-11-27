
// import Dropzone from 'https://unpkg.com/dropzone@5/dist/min/dropzone.min.js';
Dropzone.autoDiscover = false;
var dropzoneOptions = {
          dictDefaultMessage: 'Drop Here!',
          paramName: "file",
          maxFilesize: 2, // MB
          addRemoveLinks: true,
          autoProcessQueue: false
};
let myDropzone = new Dropzone("#file-upload",dropzoneOptions);
myDropzone.on("addedfile", (file) => {
  console.log(`File added: ${file.name}`);
});