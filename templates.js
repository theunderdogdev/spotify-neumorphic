//this will have templates here which will be inserted into html via javascript
/** 
 *
 * @param {string[6]} imgName
 * @param {string[6]} contentText
 * @returns {string}
 */
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
/**
 *
 * @param {string} imgName
 * @param {string} platlistTitle
 * @param {string} platlistSubTitle
 * @returns {string}
 */
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
/**
 *
 * @param {string[2]} imgNames
 * @returns {string}
 */
export const searchTopGenres = (imgNames) => {
  const template = `
      <li class="genre">
          <div class="genreinfo"><img src="./images/${imgNames[0]}" alt=""></div>
          <div class="genreinfo"><img src="./images/${imgNames[1]}" alt=""></div>
      </li>
  `; 
  return template;
};
/**
 * 
 * @param {string} imgName 
 * @param {string} title 
 * @param {string} description 
 * @returns {string}
 */
export const generatePlaylist = (imgName, title, description)=>{
  const template = `
  <li class="playlist">
    <div class="wrap-cover">
        <img src="./images/${imgName}" alt="">
    </div>
    <div class="text-info">
        <h3 class="title">${title}</h3>
        <div class="desc">${description}</div>
    </div>
    <button class="subcontroller">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f5f5f5" class="bi bi-three-dots" viewBox="0 0 16 16"> <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" /> </svg>
    </button>
    <div class="data-assets">
        <button class="controller" data-image="${imgName}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#f5f5f5" class="bi bi-play-fill" viewBox="0 0 16 16"> <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" /> </svg>
        </button>
        <button class="subcontroller">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#f5f5f5" class="bi bi-check-lg" viewBox="0 0 16 16"> <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" /> </svg>
        </button>
        <button class="subcontroller">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f5f5f5" class="bi bi-heart-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" /> </svg>
        </button>

    </div>
  </li>`
      return template;
}