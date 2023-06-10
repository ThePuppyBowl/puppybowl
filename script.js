const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-CT-WEB-PT-B";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

const PLAYERS_API_URL = `${APIURL}/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */

const setDefaults = async () => {
  newPlayerFormContainer.innerHTML = "";
  playerContainer.innerHTML = "";
   init();
};

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(PLAYERS_API_URL);
    const players = await response.json();
    return players.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};
console.log(fetchAllPlayers());

const fetchSinglePlayer = async (playerId) => {
  try {
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (e) => {
  e.preventDefault();
  try {
    let nameValue = document.getElementsByTagName("input")[0].value;
    let breedValue = document.getElementsByTagName("input")[1].value;
    let statusValue = document.getElementsByTagName("input")[2].value;
    let imageValue = document.getElementsByTagName("input")[3].value;
    let teamidValue = document.getElementsByTagName("input")[4].value;

    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-ct-web-pt-b/players",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${nameValue}`,
          breed: `${breedValue}`,
          status: `${statusValue}`,
          image: `${imageValue}`,
          teamId: `${teamidValue}`,
        }),
      }
    );
    console.log("Status is : ", response.status);
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
   await fetch(`${PLAYERS_API_URL}/${playerId}`, { method: "DELETE" });
    setDefaults();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param play of player obyerList - an arrajects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (players) => {
  try {
    players.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("player");
      playerElement.setAttribute("id", `player-${player.id}`);
      playerElement.innerHTML = `
                <h2>${player.name}</h2>
                <p>${player.breed}</p>
                <p>${player.status}</p>
                <button class="delete-button" data-id="${player.id}">Delete</button>
                `;
      playerContainer.appendChild(playerElement);

      // delete party
      const deleteButton = playerElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async (event) => {
        await removePlayer(player.id);
        const deleted = document.getElementById(`player-${player.id}`);
        playerContainer.removeElement(deleted);
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // Create form
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", " ");

    // Create input Element for Name
    let name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("name", "Full name");
    name.setAttribute("placeholder", "Full Name");

    // Create input Element for Breed
    let breed = document.createElement("input");
    breed.setAttribute("type", "text");
    breed.setAttribute("name", "Breed");
    breed.setAttribute("placeholder", "Breed");

    // Create input Element for Status

    let status1 = document.createElement("input");
    status1.setAttribute("type", "text");
    status1.setAttribute("name", "status");
    status1.setAttribute("placeholder", "Status");
    // field.appendChild(status1);

    // let field = document.createElement("fieldset");

    // let label1 = document.createElement("label");
    // label1.setAttribute("for", "status1");
    // label1.textContent = "Field";
    // field.appendChild(label1);

    // let status1 = document.createElement("input");
    // status1.setAttribute("type", "radio");
    // status1.setAttribute("name", "status");
    // status1.setAttribute("placeholder", "Status");
    // field.appendChild(status1);

    // let label2 = document.createElement("label");
    // label2.setAttribute("for", "status1");
    // label2.textContent = "Bench";
    // field.appendChild(label2);

    // let status2 = document.createElement("input");
    // status2.setAttribute("type", "radio");
    // status2.setAttribute("name", "status");
    // status2.setAttribute("placeholder", "Status");
    // status2.setAttribute("checked","checked");
    // field.appendChild(status2);

    // Create input Element for imageUrl
    let imageUrl = document.createElement("input");
    imageUrl.setAttribute("type", "url");
    imageUrl.setAttribute("name", "imageUrl");
    imageUrl.setAttribute("placeholder", "imageUrl");

    // Create input Element for TeamId
    let teamId = document.createElement("input");
    teamId.setAttribute("type", "number");
    teamId.setAttribute("name", "TeamId");
    teamId.setAttribute("placeholder", "TeamId");

    // Create Submit button
    let submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "loginForm");
    submit.innerHTML = "Submit";
    submit.addEventListener("click", async (event) => {
      await addNewPlayer(event);
      setDefaults();
    });

    // Append the name input to the form
    form.appendChild(name);

    // Append the breed input to the form
    form.appendChild(breed);

    // Append the status input to the form
    form.appendChild(status1);

    // Append the imageUrl input to the form
    form.appendChild(imageUrl);

    // Append the TeamId input to the form
    form.appendChild(teamId);

    // Append the Submit button to the form
    form.appendChild(submit);

    // Append the form to the div
    newPlayerFormContainer.appendChild(form);

    // Section for rendering all players back to the DOM
    // init();
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
  renderNewPlayerForm();
};

init();
