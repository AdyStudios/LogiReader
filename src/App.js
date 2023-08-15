import './App.css';
const json = require('./example.json')

const LangHu = require('./lang/hu.json');
//const LangEn = require('./lang/en.json');

var currentLang = LangHu;

function GenerateSectionDefualt(title, content) {
  if(content == undefined) return;  
  return (
      <div className='Section'>
        <p className = 'SectionTitle'> {title} </p>
        <p className = 'SectionContent'>{content}</p>
      </div>
    );
}

function createTrainerQualities(title, value) {
  return json.trainerQuality !== undefined ? (
      <div className='Horizontal'>
        <p className='PointsTitle'>{title}</p>
        <p className='PointsValue'>{json.trainerQuality[value.toLowerCase()]}</p>
    </div>
  ) : undefined;
}

function App() {

  var ageSec = GenerateSectionDefualt(currentLang.age, json.age);

  var campTypeSec = GenerateSectionDefualt(currentLang.campType, json.campType);
  var likethemostSec = GenerateSectionDefualt(currentLang.likedTheMost, json.likedTheMost);

  var trainerFriendly = createTrainerQualities(currentLang.trainerQuality.friendly, 'Friendly');
  var trainerClear = createTrainerQualities(currentLang.trainerQuality.clear, 'Clear');
  var trainerHelpful = createTrainerQualities(currentLang.trainerQuality.helpful, 'Helpful');
  var trainerEntertaining = createTrainerQualities(currentLang.trainerQuality.entertaining, 'Helpful');
  var trainerCool = createTrainerQualities(currentLang.trainerQuality.cool, 'Cool');

  var animatorSat = GenerateSectionDefualt(currentLang.animatorsSatisfaction, json.animatorsSatisfaction);

  var trainerOne = 
  <div className = 'Section'>
    <p className = 'SectionTitle'>{currentLang.trainerAttributesText}</p>
    <p className='SectionContent'>{json.trainerAttributes.attributes[1]}</p>
    <p className='SectionContent'>{json.trainerAttributes.attributes[2]}</p>
    <p className='SectionContent'>{json.trainerAttributes.attributes[3]}</p>
  </div>;

//TODO: replace "strict" with red background!!
  var leaderAttributes =
  <div className = 'Section'>
    <p className = 'SectionTitle'>{currentLang.leadTrainerAttributesText}</p>
    <div className='Horizontal'>
    <p className='SectionContent'>{json.campLeadAttributes.attributes[1]}</p>
    <p className='SectionContent'>{json.campLeadAttributes.attributes[2]}</p>
    <p className='SectionContent'>{json.campLeadAttributes.attributes[3]}</p>
    </div>
  </div>;

  var favLesAct = GenerateSectionDefualt(currentLang.favoriteLeasureActivity, json.favoriteLeasureActivity);
  var knowMylog = GenerateSectionDefualt(currentLang.knowMyLogiscool, json.knowMyLogiscool);

  var likeTheMost = GenerateSectionDefualt(currentLang.openText.likeTheMost, json.openText.likeTheMost);
  var myBiggestAchievement = GenerateSectionDefualt(currentLang.openText.myBiggestAchievement, json.openText.myBiggestAchievement);
  var aboutLogiscool = GenerateSectionDefualt(currentLang.openText.aboutLogiscool, json.openText.aboutLogiscool);

  return(
  <div className='App'>
        {ageSec}
        {campTypeSec}
        {likethemostSec}
        <div className='Section'>
          <p className='SectionTitle'>Trainer Qualities</p>
            {trainerClear}
            {trainerFriendly}
            {trainerHelpful}
            {trainerEntertaining}
            {trainerCool}
        </div>
        {trainerOne}
        {animatorSat}
        {leaderAttributes}
        {favLesAct}
        {knowMylog}
        {likeTheMost}
        {myBiggestAchievement}
        {aboutLogiscool}
  </div>
);
}

export default App;
