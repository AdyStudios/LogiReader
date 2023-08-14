import './App.css';
const json = require('./example.json')


function App() {
  var ageSec = json.age !== undefined ? 
    <div className='Section'>
      <p className = 'SectionTitle'> Age </p>
      <p className = 'SectionContent'>{json.age}</p>
    </div>
    : undefined;
  var campTypeSec = json.campType !== undefined ?
    <div className='Section'>
      <p className = 'SectionTitle'> Camp Type </p>
      <p className = 'SectionContent'>{json.campType}</p>
    </div>
    : undefined;
  var likethemostSec = json.likedTheMost !== undefined ?
    <div className='Section'>
      <p className = 'SectionTitle'> Liked the most </p>
      <p className = 'SectionContent'>{json.likedTheMost}</p>
    </div>
    : undefined;
  var trainerClear = json.trainerQuality !== undefined ?
    <div className='Section'>
      <p className = 'SectionTitle'> Trainer Quality </p>
      <div className='Horizontal'>
        <p className = 'PointsTitle'>Clear</p>
        <p className = 'PointsValue'>{json.trainerQuality.clear}</p>
      </div>
    </div>
    : undefined;
  var trainerFriendly = json.trainerQuality !== undefined ?
    <div className='Section'>
      <div className='Horizontal'>
        <p className = 'PointsTitle'>Friendly</p>
        <p className = 'PointsValue'>{json.trainerQuality.friendly}</p>
      </div>
    </div>
    : undefined;
  var trainerHelpful = json.trainerQuality !== undefined ? 
    <div className='Section'>
      <div className='Horizontal'>
        <p className = 'PointsTitle'>Helpful</p>
        <p className = 'PointsValue'>{json.trainerQuality.helpful}</p>
      </div>
    </div>
    : undefined;
  var trainerHelpful = json.trainerQuality !== undefined ?
    <div className='Section'>
      <div className='Horizontal'>
        <p className = 'PointsTitle'>Helpful</p>
        <p className = 'PointsValue'>{json.trainerQuality.helpful}</p>
      </div>
    </div>
    : undefined;



  return(
  <div className='App'>
        {ageSec}
        {campTypeSec}
        {likethemostSec}
        {trainerClear}
        {trainerFriendly}
        {trainerHelpful}  
  </div>
);
}

export default App;
