import React from 'react';
import '../globals.css';

export default function CasesPage() {
  return (
    <div className="container mx-auto px-4 py-28">
      <h1 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Case Studies</h1>
      
      <div className="space-y-16">
        {/* Case 1 */}
        <div className="case-card backdrop-blur-sm rounded-xl overflow-hidden shadow-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tech-text bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Development and improvement of a fraud prediction model (Startup Manager)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Company: MivaTech</h3>
              <p className="text-gray-300 mb-4">Field of activity: Development of solutions to combat fraud in payment systems.</p>
              <p className="text-gray-300 mb-4">Segment: B2B (large payment processors)</p>
              <p className="text-gray-300 mb-4">Format: Development and implementation of an AI solution</p>
              <p className="text-gray-300 mb-4">Applications: New project</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Objective</h3>
              <p className="text-gray-300 mb-4">To develop and implement a fraud prediction model for a large payment processor, increasing the efficiency of detecting suspicious transactions.</p>
              
              <h3 className="text-xl font-semibold text-white mb-2">Problem</h3>
              <p className="text-gray-300 mb-4">Existing fraud detection methods are not effective enough, which leads to significant financial losses for the payment processor.</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-2">Solution</h3>
            <p className="text-gray-300 mb-4">A team has been created consisting of me (as a startup manager and investor) and a technical partner involved in development, marketing and negotiations with stakeholders.</p>
            <p className="text-gray-300 mb-4">A fraud prediction model based on Deep unsupervised learning has been developed. The model is trained on a large dataset of financial transactions (10,000,000). An internal evaluation of the model was performed; prediction accuracy improved by 8% (from the initial 90%).</p>
            
            <h3 className="text-xl font-semibold text-white mb-2">Result</h3>
            <p className="text-gray-300 mb-4">A model has been successfully developed and tested, demonstrating a significant improvement in the accuracy of fraud forecasting. The model's performance exceeded the customer's previous performance. (Growth from 90% to 98%)</p>
            
            <h3 className="text-xl font-semibold text-white mb-2">Key findings</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Despite the technical success, the project was not implemented due to the customer's decision to work with competitors and the personal circumstances of the team.</li>
              <li>The invested $300,000 did not bring the expected result.</li>
              <li>Gained valuable experience in developing AI models, managing startup projects, interacting with clients, and assessing risks.</li>
              <li>Confirmed understanding of the anti-fraud solutions market.</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-white mb-2">Lessons learned</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>The importance of careful hypothesis testing at the pre-sale stage.</li>
              <li>The need to coordinate a market entry strategy and a financing plan, taking into account possible risks.</li>
              <li>The importance of building reliable relationships with key stakeholders in the customer company.</li>
            </ul>
          </div>
        </div>
        
        {/* Case 2 */}
        <div className="case-card backdrop-blur-sm rounded-xl overflow-hidden shadow-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tech-text bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Improving the efficiency of analysts (Financial Analyst)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Field of activity</h3>
              <p className="text-gray-300 mb-4">Financial transaction analysis</p>
              <p className="text-gray-300 mb-4">Segment: Internal Team</p>
              <p className="text-gray-300 mb-4">Format: Training and mentoring</p>
              <p className="text-gray-300 mb-4">Applications: Existing team members</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Objective</h3>
              <p className="text-gray-300 mb-4">To increase the efficiency of the team</p>
              
              <h3 className="text-xl font-semibold text-white mb-2">Problem</h3>
              <p className="text-gray-300 mb-4">Inconsistent decision-making in financial transactions, leading to inefficiency.</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-2">Solution</h3>
            <p className="text-gray-300 mb-4">A standardized operational procedure (SOP) has been developed and implemented with elements of creative problem solving, without departing from certain regulations. 4 SOP officers have been trained.</p>
            
            <h3 className="text-xl font-semibold text-white mb-2">Result</h3>
            <p className="text-gray-300 mb-4">An increase in team efficiency by 10% due to the introduction of creative ideas within the framework of the SOP.</p>
            
            <p className="text-gray-300 italic">I have an NDA with this company, so it is not possible to provide more detailed information.</p>
          </div>
        </div>
        
        {/* Case 3 */}
        <div className="case-card backdrop-blur-sm rounded-xl overflow-hidden shadow-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tech-text bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Improving Customer satisfaction (VIP Support Manager)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Company: i-Gaming</h3>
              <p className="text-gray-300 mb-4">Field of activity: VIP customer support</p>
              <p className="text-gray-300 mb-4">Sales Segment: Existing VIP clients</p>
              <p className="text-gray-300 mb-4">Sales format: Direct communication (chat + calls)</p>
              <p className="text-gray-300 mb-4">Applications: Incoming customer requests</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Objective</h3>
              <p className="text-gray-300 mb-4">To increase customer satisfaction</p>
              
              <h3 className="text-xl font-semibold text-white mb-2">Problem</h3>
              <p className="text-gray-300 mb-4">A large volume of customer requests (more than 500 per day) with the potential for a negative experience.</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-2">Solution</h3>
            <p className="text-gray-300 mb-4">Providing high-quality, customer-oriented service with fast responses, effective analysis, and actionable solutions.</p>
            
            <h3 className="text-xl font-semibold text-white mb-2">Result</h3>
            <p className="text-gray-300 mb-4">Maintaining a high level of customer satisfaction, leaving each customer in a positive mood after solving their problems.</p>
            
            <p className="text-gray-300 italic">I have an NDA with this company, so it is not possible to provide more detailed information.</p>
          </div>
        </div>
        
        {/* Case 4 */}
        <div className="case-card backdrop-blur-sm rounded-xl overflow-hidden shadow-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tech-text bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Lead Generation for Target Reached (Web developer, co-founder)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Company: Target Reached</h3>
              <p className="text-gray-300 mb-4">Field of activity: Web development services</p>
              <p className="text-gray-300 mb-4">Sales segment: Foreign companies</p>
              <p className="text-gray-300 mb-4">Sales format: Cold outreach (Google Maps, Facebook, Instagram cold calls)</p>
              <p className="text-gray-300 mb-4">Applications: Generated via Google Maps, Instagram, and cold calls</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Objective</h3>
              <p className="text-gray-300 mb-4">To attract foreign clients for web development services</p>
              
              <h3 className="text-xl font-semibold text-white mb-2">Problem</h3>
              <p className="text-gray-300 mb-4">The difficulty in reaching potential customers in foreign markets.</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-2">Solution</h3>
            <p className="text-gray-300 mb-4">A cold-outreach strategy has been implemented, generating leads through Google Maps and cold calls.</p>
            
            <h3 className="text-xl font-semibold text-white mb-2">Result</h3>
            <p className="text-gray-300 mb-4">Within a period of 2 weeks, 3 foreign clients were attracted who ordered various web development services. The skills of lead generation and negotiation are demonstrated.</p>
          </div>
        </div>
        
        {/* Case 5 */}
        <div className="case-card backdrop-blur-sm rounded-xl overflow-hidden shadow-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tech-text bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Improving English language skills in Meet2Talk (English Teacher)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Company: Meet2Talk</h3>
              <p className="text-gray-300 mb-4">Field of activity: English language teaching</p>
              <p className="text-gray-300 mb-4">Sales segment: People who want to improve their English</p>
              <p className="text-gray-300 mb-4">Sales format: Conversation Club</p>
              <p className="text-gray-300 mb-4">Applications: Word of mouth, recommendations</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Objective</h3>
              <p className="text-gray-300 mb-4">To improve students' English language skills</p>
              
              <h3 className="text-xl font-semibold text-white mb-2">Problem</h3>
              <p className="text-gray-300 mb-4">Students need to improve their spoken English, grammar, and vocabulary.</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-2">Solution</h3>
            <p className="text-gray-300 mb-4">A communicative approach has been introduced, focused on conversation, vocabulary expansion and grammar. We used YouTube videos and AI tools for personalized learning.</p>
            
            <h3 className="text-xl font-semibold text-white mb-2">Result</h3>
            <p className="text-gray-300 mb-4">More than 200 satisfied customers improved their English language skills within 7 months.</p>
          </div>
        </div>
      </div>
    </div>
    
  );
  
}