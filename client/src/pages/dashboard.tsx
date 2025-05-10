import { useApi } from '@/contexts/ApiContext';
import { Job } from '@/lib/internship';
import { UserProfile } from '@/lib/types';
import React, { useEffect, useState } from 'react';

interface SkillMatch {
  skill: string;
  matchCount: number;
  percentage: number;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [internships, setInternships] = useState<Job[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillMatches, setSkillMatches] = useState<SkillMatch[]>([]);
  const [showRecommended, setShowRecommended] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [internshipsData, profileData] = await Promise.all([
          api.getInternships(),
          api.profile()
        ]);
        setInternships(internshipsData || []);
        setUserProfile(profileData || null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setInternships([]);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [api]);

  // Calculate skill matches and recommendations
  useEffect(() => {
    if (!userProfile || !internships.length) {
      setSkillMatches([]);
      return;
    }

    const skillCounts = new Map<string, number>();
    const totalJobs = internships.length;

    internships.forEach(job => {
      if (job.skills) {
        job.skills.forEach(skill => {
          if (skill && skill.name) {
            skillCounts.set(skill.name, (skillCounts.get(skill.name) || 0) + 1);
          }
        });
      }
    });

    const matches: SkillMatch[] = Array.from(skillCounts.entries()).map(([skill, count]) => ({
      skill,
      matchCount: count,
      percentage: (count / totalJobs) * 100
    }));

    setSkillMatches(matches.sort((a, b) => b.percentage - a.percentage));
  }, [userProfile, internships]);

  const getUserSkills = () => userProfile?.skills?.map(s => s.name) || [];
  const getMissingSkills = () => {
    const userSkills = getUserSkills();
    return skillMatches
      .filter(match => !userSkills.includes(match.skill))
      .slice(0, 5);
  };

  const calculateJobMatch = (job: Job) => {
    if (!userProfile || !job.skills) return 0;
    const userSkills = getUserSkills();
    const matchingSkills = job.skills.filter(skill => 
      skill && skill.name && userSkills.includes(skill.name)
    ).length;
    return job.skills.length > 0 ? (matchingSkills / job.skills.length) * 100 : 0;
  };

  const filteredInternships = internships
    .filter(internship => {
      if (!internship) return false;
      
      const matchesSearch = 
        internship.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.skills?.some(skill => skill?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.every(skill => 
          internship.skills?.some(s => s?.name === skill)
        );

      const matchesRecommended = !showRecommended || calculateJobMatch(internship) > 50;
      
      return matchesSearch && matchesSkills && matchesRecommended;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'salary') {
        const salaryA = a.salary || 0;
        const salaryB = b.salary || 0;
        return salaryB - salaryA;
      }
      if (sortBy === 'match') {
        return calculateJobMatch(b) - calculateJobMatch(a);
      }
      return 0;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Section */}
        {userProfile && userProfile.skills && (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seu Perfil</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {userProfile.skills.map(skill => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            
            {/* Skill Recommendations */}
            {skillMatches.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Habilidades em Alta</h3>
                <div className="flex flex-wrap gap-2">
                  {getMissingSkills().map(match => (
                    <span
                      key={match.skill}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                      title={`${match.percentage.toFixed(1)}% das vagas requerem esta habilidade`}
                    >
                      {match.skill} ({match.percentage.toFixed(1)}%)
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Vagas de Estágio</h1>
          
          {/* Filtros e Busca */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar vagas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="recent">Mais recentes</option>
                <option value="salary">Maior salário</option>
                <option value="match">Melhor match</option>
              </select>

              <button
                onClick={() => setShowRecommended(!showRecommended)}
                className={`px-4 py-2 rounded-full border-2 ${
                  showRecommended 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'border-gray-200 text-gray-700'
                }`}
              >
                Recomendados
              </button>
            </div>
          </div>

          {/* Skill Filters */}
          {skillMatches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Filtrar por Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {skillMatches.slice(0, 10).map(match => (
                  <button
                    key={match.skill}
                    onClick={() => {
                      setSelectedSkills(prev => 
                        prev.includes(match.skill)
                          ? prev.filter(s => s !== match.skill)
                          : [...prev, match.skill]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedSkills.includes(match.skill)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {match.skill} ({match.percentage.toFixed(1)}%)
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lista de Vagas */}
          <div className="space-y-4">
            {filteredInternships.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhuma vaga encontrada com os filtros selecionados.
              </div>
            ) : (
              filteredInternships.map((internship) => {
                const matchPercentage = calculateJobMatch(internship);
                return (
                  <div
                    key={internship.id}
                    className="border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {internship.name}
                          </h2>
                          {matchPercentage > 0 && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {matchPercentage.toFixed(0)}% match
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{internship.company?.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {internship.salary ? `R$ ${internship.salary.toLocaleString()}` : 'A combinar'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {internship.skills?.map((skill) => (
                            <span
                              key={skill.id}
                              className={`px-3 py-1 rounded-full text-sm ${
                                userProfile?.skills?.some(s => s.name === skill.name)
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a 
                        href={internship.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 ml-4"
                      >
                        Candidatar-se
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
