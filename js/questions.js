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
    'D': '<span class="gradient-text">Dominance</span>',
    'I': '<span class="gradient-text">Influence</span>',
    'S': '<span class="gradient-text">Steadiness</span>',
    'C': '<span class="gradient-text">Conscientiousness</span>'
  }[k] || k;
}

function descriptionText(k) {
  const texts = {
    D: `
      <div class="disc-summary">
        <div class="style-overview">
          <h4>Overview</h4>
          <p>You are direct, results-oriented leaders who thrive on challenges and making quick decisions. You prefer environments where you can take control, solve problems, and drive toward goals efficiently. You value competence, achievement, and getting things done.</p>
        </div>
        
        <div class="strengths-section">
          <h4>Key Strengths</h4>
          <ul>
            <li><strong>Decisive Leadership:</strong> Makes quick, confident decisions even under pressure</li>
            <li><strong>Results-Focused:</strong> Drives toward goals with determination and persistence</li>
            <li><strong>Problem-Solving:</strong> Tackles challenges head-on with innovative solutions</li>
            <li><strong>Direct Communication:</strong> Clear, straightforward, and efficient in interactions</li>
            <li>Maintains focus on objectives and bottom-line results</li>
          </ul>
        </div>
        
        <div class="growth-section">
          <h4>Areas for Development</h4>
          <ul>
            <li><strong>Patience with Others:</strong> May need to slow down to consider different perspectives</li>
            <li><strong>Collaborative Approach:</strong> Could benefit from involving others in decision-making</li>
            <li><strong>Attention to Details:</strong> May overlook important specifics in pursuit of quick results</li>
            <li><strong>Emotional Sensitivity:</strong> Could improve awareness of impact on others' feelings</li>
          </ul>
        </div>
      </div>
    `,
    
    I: `
      <div class="disc-summary">
        <div class="style-overview">
          <h4>Overview</h4>
          <p>You are enthusiastic, people-focused communicators who excel at inspiring and motivating others. You thrive in social environments, enjoy building relationships, and prefer collaborative approaches to achieving goals. You value recognition, social interaction, and positive team dynamics.</p>
        </div>

        <div class="strengths-section">
          <h4>Key Strengths</h4>
          <ul>
            <li><strong>Persuasive Communication:</strong> Naturally influences and inspires others with enthusiasm</li>
            <li><strong>Relationship Building:</strong> Creates strong connections and networks easily</li>
            <li><strong>Team Motivation:</strong> Energizes groups and builds positive team spirit</li>
            <li><strong>Creative Problem-Solving:</strong> Generates innovative ideas through brainstorming</li>
            <li><strong>Optimistic Outlook:</strong> Maintains positive attitude and sees opportunities</li>
          </ul>
        </div>
        
        <div class="growth-section">
          <h4>Areas for Development</h4>
          <ul>
            <li><strong>Follow-Through:</strong> May need systems to ensure task completion</li>
            <li><strong>Time Management:</strong> Could benefit from better prioritization and scheduling</li>
            <li><strong>Attention to Detail:</strong> May need to focus more on accuracy and specifics</li>
            <li><strong>Realistic Planning:</strong> Could improve at setting achievable timelines</li>
          </ul>
        </div>
      </div>
    `,
    
    S: `
      <div class="disc-summary">
        <div class="style-overview">
          <h4>Overview</h4>
          <p>You are reliable, patient team players who value stability and cooperation. You excel at supporting others, maintaining harmony, and creating consistent, dependable results. You prefer predictable environments and collaborative decision-making processes.</p>
        </div>
      
        <div class="strengths-section">
          <h4>Key Strengths</h4>
          <ul>
            <li><strong>Reliable Support:</strong> Consistently delivers dependable results and assistance</li>
            <li><strong>Patient Listening:</strong> Provides thoughtful attention to others' needs and concerns</li>
            <li><strong>Team Collaboration:</strong> Works well with others and builds consensus</li>
            <li><strong>Steady Performance:</strong> Maintains consistent quality and effort over time</li>
            <li><strong>Loyalty & Commitment:</strong> Demonstrates strong dedication to team and organization</li>
          </ul>
        </div>
        
        <div class="growth-section">
          <h4>Areas for Development</h4>
          <ul>
            <li><strong>Assertiveness:</strong> Could benefit from expressing opinions and needs more directly</li>
            <li><strong>Change Adaptation:</strong> May need support when facing rapid or unexpected changes</li>
            <li><strong>Decision Speed:</strong> Could work on making decisions more quickly when needed</li>
            <li><strong>Conflict Resolution:</strong> May need to address issues directly rather than avoiding them</li>
          </ul>
        </div>
      </div>
    `,
    
    C: `
      <div class="disc-summary">
        <div class="style-overview">
          <h4>Overview</h4>
          <p>You are analytical, detail-oriented professionals who focus on accuracy and quality. You excel at systematic thinking, thorough analysis, and maintaining high standards. You value expertise, precision, and well-researched solutions.</p>
        </div>
        
        <div class="strengths-section">
          <h4>Key Strengths</h4>
          <ul>
            <li><strong>Analytical Thinking:</strong> Thoroughly examines data and considers multiple perspectives</li>
            <li><strong>Quality Focus:</strong> Maintains high standards and attention to detail</li>
            <li><strong>Systematic Approach:</strong> Creates organized, methodical processes and procedures</li>
            <li><strong>Risk Assessment:</strong> Identifies potential problems and develops contingency plans</li>
            <li><strong>Technical Expertise:</strong> Develops deep knowledge and competence in specialized areas</li>
          </ul>
        </div>
        
        <div class="growth-section">
          <h4>Areas for Development</h4>
          <ul>
            <li><strong>Decision Timing:</strong> May need to make decisions with incomplete information</li>
            <li><strong>Flexibility:</strong> Could benefit from adapting standards when perfection isn't required</li>
            <li><strong>Delegation:</strong> May need to trust others to maintain quality standards</li>
            <li><strong>Communication Style:</strong> Could work on explaining complex ideas more simply</li>
          </ul>
        </div>
      </div>
    `
  };
  return texts[k] || '';
}