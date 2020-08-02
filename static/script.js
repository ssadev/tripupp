$("#upload-img-btn").click(function () {
  $("#qn-img-inp").click();
});

$("#qn-img-inp").on("change", function () {
  console.log("Processing.....");
  var formData = new FormData();
  var fileToUpload = $("#qn-img-inp")[0].files[0];
  formData.append("file", fileToUpload);
  formData.append("language", "eng");
  formData.append("apikey", "8067cf257288957");
  formData.append("isOverlayRequired", true);
  $.ajax({
    data: formData,
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    type: "POST",
    success: function (ocrParsedResult) {
      console.log(ocrParsedResult);
      var parsedResults = ocrParsedResult["ParsedResults"];
      var ocrExitCode = ocrParsedResult["OCRExitCode"];
      var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
      var errorMessage = ocrParsedResult["ErrorMessage"];
      var errorDetails = ocrParsedResult["ErrorDetails"];
      var processingTimeInMilliseconds =
        ocrParsedResult["ProcessingTimeInMilliseconds"];
      if (parsedResults != null) {
        let textOnImg = "";
        $.each(parsedResults, function (index, value) {
          var exitCode = value["FileParseExitCode"];
          var parsedText = value["ParsedText"];
          var errorMessage = value["ParsedTextFileName"];
          var errorDetails = value["ErrorDetails"];

          var textOverlay = value["TextOverlay"];
          var pageText = "";
          switch (+exitCode) {
            case 1:
              pageText = parsedText;
              break;
            case 0:
            case -10:
            case -20:
            case -30:
            case -99:
            default:
              pageText += "Error: " + errorMessage;
              break;
          }
          let textOnImg2 = "";
          $.each(textOverlay["Lines"], function (index, value) {
            textOnImg2 += " " + value.LineText;
          });
          textOnImg += textOnImg2;
        });
        fileToUpload = null;
        console.log(textOnImg);
        window.location = "/search/?q=" + textOnImg;
      }
    },
    error: function (e) {
      console.log(e);
    },
  });
});
