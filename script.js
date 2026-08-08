const vocabulary = [

  {
    word: "martyrium",
    definition:
      "velmi těžká, dlouhá nebo utrpením naplněná zkušenost"
  },

  {
    word: "milník",
    definition:
      "významný bod nebo okamžik ve vývoji něčeho"
  },

  {
    word: "utáhnout",
    definition:
      "finančně zvládnout něco zaplatit nebo si něco dovolit"
  },

  {
    word: "opruz",
    definition:
      "něco velmi otravného, nepříjemného nebo protivného"
  },

  {
    word: "frustrace",
    definition:
      "pocit zklamání, bezmoci nebo nespokojenosti způsobený tím, že se nedaří dosáhnout cíle"
  },

  {
    word: "vyvstávat",
    definition:
      "objevovat se, vznikat jako otázka, problém nebo potřeba"
  },

  {
    word: "protlouci se",
    definition:
      "nějak zvládnout obtížnou situaci nebo období, často s omezenými možnostmi"
  },

  {
    word: "váznout",
    definition:
      "neprobíhat plynule, zpomalovat se nebo se komplikovat"
  },

  {
    word: "stát o něco",
    definition:
      "chtít něco, mít o něco zájem nebo o něco usilovat"
  },

  {
    word: "nabádat",
    definition:
      "vyzývat, vybízet nebo přesvědčovat někoho k určitému jednání"
  },

  {
    word: "notný",
    definition:
      "značný, velký nebo vydatný"
  },

  {
    word: "dvousečná zbraň",
    definition:
      "něco, co může mít pozitivní i negativní účinek"
  },

  {
    word: "čtyřka (pajzl)",
    definition:
      "hovorové označení pro velmi obyčejnou, často zanedbanou hospodu"
  },

  {
    word: "vypulírovaný",
    definition:
      "dokonale upravený, naleštěný nebo velmi pečlivě upravený"
  },

  {
    word: "nevraživost",
    definition:
      "nepřátelský, nepřející nebo nepříjemný vztah mezi lidmi"
  },

  {
    word: "ontologická jistota",
    definition:
      "základní pocit jistoty a bezpečí spojený s vědomím, že člověk má stabilní místo k životu"
  }

];

let selectedWord = null;
let selectedDefinition = null;
let completed = 0;


/* =========================
   ELEMENTY
========================= */

const wordsContainer =
  document.getElementById("words");

const definitionsContainer =
  document.getElementById("definitions");

const feedback =
  document.getElementById("feedback");

const progressText =
  document.getElementById("progressText");

const progressBar =
  document.getElementById("progressBar");

const success =
  document.getElementById("success");

const restart =
  document.getElementById("restart");


/* =========================
   SHUFFLE
========================= */

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


/* =========================
   VYTVOŘENÍ KARET
========================= */

function createCards() {

  wordsContainer.innerHTML = "";
  definitionsContainer.innerHTML = "";

  selectedWord = null;
  selectedDefinition = null;
  completed = 0;

  feedback.textContent = "";
  feedback.className = "feedback";

  success.classList.add("hidden");

  updateProgress();


  /* Slova */

  shuffle(vocabulary).forEach((item, index) => {

    const card = document.createElement("button");

    card.className = "card";
    card.textContent = item.word;

    card.dataset.id = index;

    card.addEventListener("click", () => {

      selectWord(card);

    });

    wordsContainer.appendChild(card);

  });


  /* Významy */

  shuffle(vocabulary).forEach((item, index) => {

    const card = document.createElement("button");

    card.className = "card";
    card.textContent = item.definition;

    card.dataset.id = index;

    card.addEventListener("click", () => {

      selectDefinition(card);

    });

    definitionsContainer.appendChild(card);

  });

}


/* =========================
   VÝBĚR SLOVA
========================= */

function selectWord(card) {

  if (card.classList.contains("correct")) {
    return;
  }

  document
    .querySelectorAll("#words .card")
    .forEach(item => {
      item.classList.remove("selected");
    });

  card.classList.add("selected");

  selectedWord = card;

  checkPair();
}


/* =========================
   VÝBĚR VÝZNAMU
========================= */

function selectDefinition(card) {

  if (card.classList.contains("correct")) {
    return;
  }

  document
    .querySelectorAll("#definitions .card")
    .forEach(item => {
      item.classList.remove("selected");
    });

  card.classList.add("selected");

  selectedDefinition = card;

  checkPair();
}


/* =========================
   KONTROLA DVOJICE
========================= */

function checkPair() {

  if (!selectedWord || !selectedDefinition) {
    return;
  }


  const wordId =
    Number(selectedWord.dataset.id);

  const definitionId =
    Number(selectedDefinition.dataset.id);


  if (wordId === definitionId) {

    /* SPRÁVNĚ */

    selectedWord.classList.remove("selected");
    selectedDefinition.classList.remove("selected");

    selectedWord.classList.add("correct");
    selectedDefinition.classList.add("correct");

    completed++;

    feedback.textContent =
      "✓ Správně.";

    feedback.className =
      "feedback correctMessage";

    selectedWord = null;
    selectedDefinition = null;

    updateProgress();


    if (completed === vocabulary.length) {

      setTimeout(() => {

        success.classList.remove("hidden");

      }, 400);

    }

  } else {

    /* ŠPATNĚ */

    selectedWord.classList.add("wrong");
    selectedDefinition.classList.add("wrong");

    feedback.textContent =
      "Tohle není správná dvojice. Zkus to znovu.";

    feedback.className =
      "feedback wrongMessage";


    setTimeout(() => {

      if (selectedWord) {
        selectedWord.classList.remove("selected");
        selectedWord.classList.remove("wrong");
      }

      if (selectedDefinition) {
        selectedDefinition.classList.remove("selected");
        selectedDefinition.classList.remove("wrong");
      }

      selectedWord = null;
      selectedDefinition = null;

      feedback.textContent = "";
      feedback.className = "feedback";

    }, 800);

  }

}


/* =========================
   PROGRESS
========================= */

function updateProgress() {

  progressText.textContent =
    `${completed} / ${vocabulary.length}`;

  const percentage =
    (completed / vocabulary.length) * 100;

  progressBar.style.width =
    `${percentage}%`;

}


/* =========================
   RESTART
========================= */

restart.addEventListener("click", () => {

  createCards();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================
   START
========================= */

createCards();

const oddOneOutQuestions = [
  {
    options: [
      "frustrace",
      "nevraživost",
      "milník"
    ],
    answer: "milník"
  },

  {
    options: [
      "utáhnout nájem",
      "utáhnout výdaje",
      "utáhnout frustraci"
    ],
    answer: "utáhnout frustraci"
  },

  {
    options: [
      "martyrium",
      "opruz",
      "milník"
    ],
    answer: "milník"
  },

  {
    options: [
      "stát o něco",
      "nabádat někoho",
      "váznout"
    ],
    answer: "váznout"
  },

  {
    options: [
      "vypulírovaný",
      "notný",
      "čtyřka"
    ],
    answer: "čtyřka"
  },

  {
    options: [
      "protlouci se",
      "utáhnout nájem",
      "nevraživost"
    ],
    answer: "nevraživost"
  },

  {
    options: [
      "vyvstávat",
      "váznout",
      "vypulírovaný"
    ],
    answer: "vypulírovaný"
  },

  {
    options: [
      "dvousečná zbraň",
      "ontologická jistota",
      "opruz"
    ],
    answer: "opruz"
  }
];


let oddScore = 0;
let oddAnswered = 0;


function createOddOneOut() {

  const container =
    document.getElementById("oddOneOut");

  container.innerHTML = "";

  oddScore = 0;
  oddAnswered = 0;

  document
    .getElementById("oddResult")
    .style.display = "none";


  oddOneOutQuestions.forEach(
    (question, index) => {

      const card =
        document.createElement("div");

      card.className =
        "odd-question";


      const questionText =
        document.createElement("div");

      questionText.className =
        "odd-question-text";

      questionText.innerHTML =
        `<strong>${index + 1}.</strong>
         Které slovo sem nepatří?`;


      const options =
        document.createElement("div");

      options.className =
        "odd-options";


      const feedback =
        document.createElement("div");

      feedback.className =
        "odd-feedback";


      /*
       * Zamícháme pořadí možností,
       * aby správná odpověď nebyla vždy
       * na stejném místě.
       */

      const shuffledOptions =
        [...question.options]
        .sort(() => Math.random() - 0.5);


      shuffledOptions.forEach(
        optionText => {

          const button =
            document.createElement("button");

          button.className =
            "odd-option";

          button.textContent =
            optionText;


          button.addEventListener(
            "click",
            function () {

              /*
               * Pokud už byla otázka
               * zodpovězena, nic neděláme.
               */

              if (
                options.dataset.answered ===
                "true"
              ) {
                return;
              }


              if (
                optionText ===
                question.answer
              ) {

                button.classList.add(
                  "correct"
                );

                feedback.textContent =
                  "✓ Správně";

                feedback.classList.add(
                  "correct"
                );


                options.dataset.answered =
                  "true";


                options
                  .querySelectorAll(
                    ".odd-option"
                  )
                  .forEach(
                    btn => {
                      btn.classList.add(
                        "disabled"
                      );
                    }
                  );


                oddScore++;
                oddAnswered++;


                checkOddFinished();

              } else {

                button.classList.add(
                  "wrong"
                );

                feedback.textContent =
                  "✕ Zkus to znovu.";

                feedback.classList.add(
                  "wrong"
                );


                setTimeout(
                  () => {

                    button.classList.remove(
                      "wrong"
                    );

                    feedback.textContent =
                      "";

                    feedback.classList.remove(
                      "wrong"
                    );

                  },
                  700
                );
              }

            }
          );


          options.appendChild(button);

        }
      );


      card.appendChild(
        questionText
      );

      card.appendChild(
        options
      );

      card.appendChild(
        feedback
      );


      container.appendChild(
        card
      );

    }
  );
}


function checkOddFinished() {

  if (
    oddAnswered !==
    oddOneOutQuestions.length
  ) {
    return;
  }


  const result =
    document.getElementById(
      "oddResult"
    );


  document.getElementById(
    "oddScore"
  ).textContent =
    `${oddScore} / ${oddOneOutQuestions.length}`;


  if (
    oddScore ===
    oddOneOutQuestions.length
  ) {

    document.getElementById(
      "oddText"
    ).textContent =
      "Výborně! Všechny výrazy jsi správně rozlišila.";

  } else {

    document.getElementById(
      "oddText"
    ).textContent =
      "Dobrá práce! Některé výrazy si ještě zopakuj.";

  }


  result.style.display =
    "block";
}


document
  .getElementById("restartOdd")
  .addEventListener(
    "click",
    createOddOneOut
  );


createOddOneOut();
