import React, { useState } from 'react';

    const initialIdeas = [
      {
        id: 1,
        title: 'Automated Content Creation',
        description: 'Use a combination of GPT-3 and a headless CMS to automatically generate blog posts.',
        upvotes: 0,
        tags: ['content', 'automation', 'gpt-3']
      },
      {
        id: 2,
        title: 'Personalized Learning Platform',
        description: 'Create a platform that adapts to individual learning styles using AI-powered recommendations.',
        upvotes: 0,
        tags: ['education', 'ai', 'personalization']
      },
      {
        id: 3,
        title: 'Smart Home Automation',
        description: 'Develop a system that uses sensor data to automate home tasks and optimize energy usage.',
        upvotes: 0,
        tags: ['home', 'automation', 'iot']
      },
      {
        id: 4,
        title: 'AI-Powered Customer Support',
        description: 'Implement a chatbot that can handle common customer queries and escalate complex issues to human agents.',
        upvotes: 0,
        tags: ['customer support', 'ai', 'chatbot']
      },
      {
        id: 5,
        title: 'Predictive Maintenance System',
        description: 'Use machine learning to predict equipment failures and schedule maintenance proactively.',
        upvotes: 0,
        tags: ['maintenance', 'machine learning', 'predictive']
      }
    ];

    function App() {
      const [ideas, setIdeas] = useState(initialIdeas);
      const [searchTerm, setSearchTerm] = useState('');

      const handleUpvote = (id) => {
        setIdeas(ideas.map(idea =>
          idea.id === id ? { ...idea, upvotes: idea.upvotes + 1 } : idea
        ));
      };

      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };

      const filteredIdeas = ideas.filter(idea =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      return (
        <div>
          <input
            type="text"
            placeholder="Search ideas..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredIdeas.map(idea => (
            <div key={idea.id} className="mcp-idea">
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              <p>Tags: {idea.tags.join(', ')}</p>
              <button className="upvote-button" onClick={() => handleUpvote(idea.id)}>
                Upvote ({idea.upvotes})
              </button>
            </div>
          ))}
        </div>
      );
    }

    export default App;
