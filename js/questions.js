// DISC Assessment Questions and Mappings

// Questions (24 total)
const QUESTIONS = [
  ['Easy-going, Agreeable','Trusting, Believing in others','Adventurous, Risk taker','Tolerant, Respectful'],
  ['Soft spoken, Reserved','Optimistic, Visionary','Center of attention, Sociable','Peacemaker, Bring harmony'],
  ['Encourage others','Strive for perfection','Be part of the team','Want to establish goals'],
  ['Become frustrated','Keep my feelings inside','Tell my side of the story','Stand up to opposition'],
  ['Lively, Talkative','Fast paced, Determined','Try to maintain balance','Try to follow the rules'],
  ['Manage time efficiently','Often rushed, Feel pressured','Social things are important','Like to finish what I start'],
  ['Resist sudden change','Tend to over promise','Withdraw under pressure','Not afraid to fight'],
  ['A good encourager','A good listener','A good analyzer','A good delegator'],
  ['Results are what matter','Do it right, Accuracy counts','Make it enjoyable','Do it together'],
  ['Will do without, Self-controlled','Will buy on impulse','Will wait, No pressure','Will spend on what I want'],
  ['Friendly, Easy to be with','Unique, Bored by routine','Actively change things','Want things exact'],
  ['Non-confrontational, Giving in','Overloaded with details','Changes at the last minute','Demanding, Abrupt'],
  ['Want advancement','Satisfied with things, Content','Openly display feelings','Humble, Modest'],
  ['Cool, Reserved','Happy, Carefree','Pleasing, Kind','Bold, Daring'],
  ['Spend quality time with others','Plan for the future, Be prepared','Travel to new adventures','Receive rewards for goals met'],
  ['Rules need to be challenged','Rules make it fair','Rules make it boring','Rules make it safe'],
  ['Education, Culture','Achievements, Awards','Safety, Security','Social, Group Gatherings'],
  ['Take charge, Direct approach','Outgoing, Enthusiastic','Predictable, Consistent','Cautious, Careful'],
  ['Not easily defeated','Will do as told, Follows leader','Excitable, Cheerful','Want things orderly, Neat'],
  ['I will lead them','I will follow through','I will persuade them','I will get the facts'],
  ['Think of others first','Competitive, Like a challenge','Optimistic, Positive','Logical thinker, Systematic'],
  ['Please others, Agreeable','Laugh out loud, Animated','Courageous, Bold','Quiet, Reserved'],
  ['Want more authority','Want new opportunities','Avoid any conflict','Want clear directions'],
  ['Reliable, Dependable','Creative, Unique','Bottom line, Results oriented','Hold high standards, Accurate']
];

// Dual mappings for MOST answers (null = *)
const mapMost = [
  ['S','I',null,'C'],
  ['C','D',null,'S'],
  ['I',null,null,'D'],
  ['C','S',null,'D'],
  ['I','D','S',null],
  ['C','D','I','S'],
  ['S','I',null,null],
  ['I','S','C','D'],
  ['D','C',null,null],
  [null,'D','S','I'],
  ['S',null,'D','C'],
  [null,'C','I','D'],
  ['D','S','I',null],
  ['C','I','S','D'],
  ['S','C','I','D'],
  [null,'C','I','S'],
  [null,'D','S','I'],
  ['D',null,null,'C'],
  ['D','S','I',null],
  ['D','S','I','C'],
  ['S','D','I',null],
  ['S',null,'D','C'],
  [null,'I','S',null],
  [null,'I','D','C']
];

// Dual mappings for LEAST answers (null = *)
const mapLeast = [
  ['S','I','D','C'],
  [null,'D','I','S'],
  ['I','C','S',null],
  ['C','S','I','D'],
  [null,'D','S','C'],
  [null,'D','I','S'],
  [null,'I','C','D'],
  ['I','S','C','D'],
  ['D','C','I','S'],
  ['C','D','S',null],
  [null,'I','D','C'],
  ['S',null,'I','D'],
  ['D',null,null,'C'],
  ['C','I',null,'D'],
  ['S',null,'I','D'],
  ['D',null,'I','S'],
  ['C','D','S',null],
  ['D','I','S',null],
  ['D',null,'I','C'],
  [null,'S','I',null],
  ['S','D','I','C'],
  ['S','I','D','C'],
  ['D',null,'S','C'],
  ['S','I',null,null]
];

// DISC type descriptions
function fullName(k) {
  return {
    'D': '<strong>Dominance</strong>',
    'I': '<strong>Influence</strong>',
    'S': '<strong>Steadiness</strong>',
    'C': '<strong>Conscientiousness</strong>'
  }[k] || k;
}

function descriptionText(k) {
  const texts = {
    D: 'You are driven by results and achievements. You thrive in competitive environments and prefer to take charge of situations. You make quick decisions, embrace challenges, and focus on the bottom line. You value efficiency and direct communication.<br><br><strong>Strengths:</strong> Decisive leadership, problem-solving, goal-oriented, confident, takes initiative.<br><br><strong>Areas for Growth:</strong> May appear impatient or insensitive, could benefit from slowing down to consider others\' perspectives and building consensus.',
    
    I: 'You are enthusiastic and people-oriented. You excel at motivating others and creating positive team dynamics. You enjoy collaboration, networking, and inspiring others toward shared goals. You bring energy and optimism to any situation.<br><br><strong>Strengths:</strong> Excellent communicator, persuasive, builds relationships easily, optimistic, creative problem-solving.<br><br><strong>Areas for Growth:</strong> May struggle with follow-through on details, could benefit from better time management and maintaining focus on tasks.',
    
    S: 'You value stability and cooperation. You excel at supporting others and creating harmonious environments. You prefer predictable routines and take time to consider decisions carefully. You are known for your reliability and loyalty.<br><br><strong>Strengths:</strong> Team player, patient listener, dependable, supportive, creates stability.<br><br><strong>Areas for Growth:</strong> May avoid necessary conflicts or changes, could benefit from being more assertive and adapting to new situations more quickly.',
    
    C: 'You focus on accuracy and quality. You excel at analyzing information, following procedures, and maintaining high standards. You prefer to work systematically and ensure tasks are completed correctly. You value expertise and competence.<br><br><strong>Strengths:</strong> Detail-oriented, analytical thinking, high quality work, systematic approach, thorough planning.<br><br><strong>Areas for Growth:</strong> May get caught up in perfectionism or over-analysis, could benefit from making decisions more quickly and being more flexible with standards.'
  };
  return texts[k] || '';
}