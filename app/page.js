'use client';

    import { useState, useEffect } from 'react';
    import supabase from '../utils/supabaseClient';

    export default function Home() {
      const [servers, setServers] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [filteredServers, setFilteredServers] = useState([]);

      useEffect(() => {
        const fetchServers = async () => {
          try {
            const { data, error } = await supabase
              .from('servers')
              .select('*')
              .order('popularity_score', { ascending: false });

            if (error) {
              console.error('Error fetching servers:', error);
            } else {
              setServers(data);
              setFilteredServers(data);
            }
          } catch (error) {
            console.error('Error fetching servers:', error);
          }
        };

        fetchServers();
      }, []);

      useEffect(() => {
        const filterServers = () => {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          const filtered = servers.filter(server =>
            server.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            server.description.toLowerCase().includes(lowerCaseSearchTerm) ||
            server.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
          );
          setFilteredServers(filtered);
        };

        filterServers();
      }, [searchTerm, servers]);

      return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
          <h1 className="text-4xl font-bold mb-8">
            Popular MCP Servers
          </h1>
          <input
            type="text"
            placeholder="Search servers..."
            className="p-2 border border-gray-300 rounded mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServers.map(server => (
              <div key={server.id} className="border p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">{server.name}</h2>
                <p className="text-gray-700 mb-2">{server.description}</p>
                <p className="text-gray-500">
                  Tags: {server.tags.join(', ')}
                </p>
                <p className="text-gray-500">
                  Workflows: {server.workflows_count || 0}
                </p>
              </div>
            ))}
          </div>
        </main>
      );
    }
