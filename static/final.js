 
 ////////////////////////// first letter capital //////////////////////
      jQuery(document).ready(function ($) {
        $("#textInput").keyup(function (event) {
          var textBox = event.target;
          var start = textBox.selectionStart;
          var end = textBox.selectionEnd;
          textBox.value =
            textBox.value.charAt(0).toUpperCase() +
            textBox.value.slice(1).toLowerCase();
          textBox.setSelectionRange(start, end);
        });
      });
      /////////////////////////////////////////////////////////////////////
      //////////////////// voice load //////////////////////////
      $(document).ready(function () {
        var voices = window.speechSynthesis.getVoices();
      });

      //////////////////////////////////////////////////////////
      function runSpeechRecognition() {
        var action = document.getElementById("action");
        // new speech recognition object
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();

        // This runs when the speech recognition service starts
        recognition.onstart = function () {
          action.innerHTML = "Listening, please speak...";
          var mic = document.getElementById("mic");
          mic.style.display = "none";
          
        };

        recognition.onspeechend = function () {
          action.innerHTML = "Stopped listening, hope you are done...";
          recognition.stop();
          mic.style.display = "block";
        };

        // This runs when the speech recognition service returns result
        recognition.onresult = function (event) {
          var transcript = event.results[0][0].transcript;
          var userHtml =
            '<p class = "userText"><span>' + transcript + "</span></p>";
          $("#textInput").val("");
          $(".chat").append(userHtml);
          $(".chat").stop().animate({ scrollTop: $(".chat")[0].scrollHeight}, 0);
  
          document
            .getElementById("userInput")
            .scrollIntoView({ block: "start", behaviour: "smooth" });
          $.get("/get", { msg: transcript }).done(function (data) {
            var botHtml = '<p class ="botText"><span>' + data + "</span></p>";

            ////////////////// voice ////////////////////////////////////////
            let speech = new SpeechSynthesisUtterance();
            speech.lang = "en-US";
            speech.text = data;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            // speech.voice = speechSynthesis.getVoices().filter(function (voice) {
            //   return voice.name == "Google UK English Female";
            // })[0];
            window.speechSynthesis.speak(speech);
            ////////////////////////////////////////////////////////////////////

            $(".chat").append(botHtml);
      
            $(".chat").stop().animate({ scrollTop: $(".chat")[0].scrollHeight}, 1000);
            document
              .getElementById("userInput")
              .scrollIntoView({ block: "start", behaviour: "smooth" });
          });
        };
        // start recognition
        recognition.start();
      }

      function getBotResponse() {
        var rawText = $("#textInput").val();
        var userHtml = '<p class = "userText"><span>' + rawText + "</span></p>";
        $("#textInput").val("");
        $(".chat").append(userHtml);
        $(".chat").stop().animate({ scrollTop: $(".chat")[0].scrollHeight}, 1000);
 
        document
          .getElementById("userInput")
          .scrollIntoView({ block: "start", behaviour: "smooth" });
        $.get("/get", { msg: rawText }).done(function (data) {
          var botHtml = '<p class ="botText"><span>' + data + "</span></p>";

          ////////////////// voice ////////////////////////////////////////
          let speech = new SpeechSynthesisUtterance();
          speech.lang = "en-US";
          speech.text = data;
          speech.volume = 1;
          speech.rate = 1;
          speech.pitch = 1;
          speech.voice = speechSynthesis.getVoices().filter(function (voice) {
            return voice.name == "Google UK English Female";
          })[0];
          window.speechSynthesis.speak(speech);
          ////////////////////////////////////////////////////////////////////

          $(".chat").append(botHtml);
           $(".chat").stop().animate({ scrollTop: $(".chat")[0].scrollHeight}, 1000);
          document
            .getElementById("userInput")
            .scrollIntoView({ block: "start", behaviour: "smooth" });
        });
      }
            function search(ele) {
            if(event.key === 'Enter') {
                getBotResponse();        
            }
        }
