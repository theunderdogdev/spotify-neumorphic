//this will have templates here which will be inserted into html via javascript

export const homeViewTrends = (imgName, contentText) => {
  const template = `
  <ul class="top-trends">
    <li class="top-trend">
      <img class="rec-img" src="./images/${imgName[0]}" alt="" srcset="">
      <p>${contentText[0]}</p>
    </li>
    <li class="top-trend">
      <img class="rec-img" src="./images/${imgName[1]}" alt="" srcset="">
      <p>${contentText[1]}</p>
    </li>
    <li class="top-trend">
      <img class="rec-img" src="./images/${imgName[2]}" alt="" srcset="">
      <p>${contentText[2]}</p>
    </li>
  </ul>
  <ul class="top-trends">
    <li class="top-trend">
      <img class="rec-img" src="./images/${imgName[3]}" alt="" srcset="">
      <p>${contentText[3]}</p>
    </li>
    <li class="top-trend">
      <img class="rec-img" src="./images/${imgName[4]}" alt="" srcset="">
      <p>${contentText[4]}</p>
    </li>
    <li class="top-trend">
      <img class="rec-img" src="./images/${imgName[5]}" alt="" srcset="">
      <p>${contentText[5]}</p>
    </li>
  </ul>
  `;
  return template;
};
export const homeRecents = (imgName, platlistTitle, platlistSubTitle) => {
  const template = `
      <li class="recent">
        <div class="album"><img src="./images/${imgName}" alt=""></div>
        <div class="recent-info">
            <h4>${platlistTitle}</h4>
            <h5>${platlistSubTitle}</h5>

        </div>
        </li>
  `;
  return template;
};
export const searchTopGenre = (imgNames) => {
  const template = `
      <li class="genre">
          <div class="genreinfo"><img src="./images/cover2.jpeg" alt=""></div>
          <div class="genreinfo"><img src="./images/cover3.jpeg" alt=""></div>
      </li>
  `;
};
