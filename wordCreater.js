// PizZip is required because docx/pptx/xlsx files are all zipped files, and
// the PizZip library allows us to load the file in memory
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

// Load the docx file as binary content
function createWord(file, outPutFile) {
    const content = fs.readFileSync(
      path.resolve(__dirname, file),
      "binary"
  );

  // Unzip the content of the file
  const zip = new PizZip(content);

  // This will parse the template, and will throw an error if the template is
  // invalid, for example, if the template is "{user" (no closing tag)
  const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
  });

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render({
      reportName : "Отчет наставника 1 уровня",
      startDate: "01.03.2024",
      endDate: "31.03.2024",
  });

  // Get the zip document and generate it as a nodebuffer
  const buf = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
  });
  
  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, outPutFile), buf);
  return outPutFile;
}

module.exports = createWord;