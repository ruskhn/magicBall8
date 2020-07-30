describe("Main functions should work correct", () => {
  beforeEach(() => {
    document.body.innerHTML += `
    <div id="ball" class="front-cover">
       </div>
       <div class="front-input">
         <div class="container column">
           <div class="answer">
             <p id="status" class="eight-ball_title item"></p>
             <p id="answer" class="eight-ball_title item">Result will be here</p>
           </div>
           <input type="text" id="question" class="input" required placeholder="Enter you question"/>
           <button id="submitButton" class="submitButton item">
             <span>Submit</span>
           </button>
         </div>
       </div>
       <div class="container row">
      <div>History</div>
      <div id="history"></div>
  </div>
    `;

    const submitButton = document.getElementById("submitButton");
    const status = document.getElementById("status");
    const answer = document.getElementById("answer");
    const question = document.getElementById("question");
    const ball = document.getElementById("ball");
    const history = document.getElementById("history");
  });

  test("someTest", () => {
    expect(submitButton).toBeDefined();
    expect(status.innerHTML).toBe(undefined);
    expect(answer.innerHTML).toBe("Result will be here");
  });
});
