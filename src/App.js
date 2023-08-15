import './App.css';
const json = require('./example.json')


function GenerateSectionDefualt(title, content) {
  if(content == undefined) return;  
  return (
      <div className='Section'>
        <p className = 'SectionTitle'> {title} </p>
        <p className = 'SectionContent'>{content}</p>
      </div>
    );
}

function createTrainerQualities(value) {
  return json.trainerQuality !== undefined ? (
      <div className='Horizontal'>
        <p className='PointsTitle'>{value}</p>
        <p className='PointsValue'>{json.trainerQuality[value.toLowerCase()]}</p>
    </div>
  ) : undefined;
}

function App() {

  var ageSec = GenerateSectionDefualt('Age', json.age);

  var campTypeSec = GenerateSectionDefualt('Camp Type', json.campType);
  var likethemostSec = GenerateSectionDefualt('Liked the most', json.likedTheMost);

  var trainerFriendly = createTrainerQualities('Friendly');
  var trainerClear = createTrainerQualities('Clear');
  var trainerHelpful = createTrainerQualities('Helpful');
  var trainerEntertaining = createTrainerQualities('Entertaining');
  var trainerCool = createTrainerQualities('Cool');

  var trainerOne = 
  <div className = 'Section'>
    <p className = 'SectionTitle'>Trainer Attributes</p>
    <p className='SectionContent'>{json.trainerAttributes.attributes[1]}</p>
    <p className='SectionContent'>{json.trainerAttributes.attributes[2]}</p>
    <p className='SectionContent'>{json.trainerAttributes.attributes[3]}</p>
  </div>;


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
  </div>
);
}

export default App;
