'use client'

import { useState } from 'react'
import { Play, Clock, X } from 'lucide-react'

// Base de données des vidéos par objectif
const videosByGoal = {
  lose_weight: [
    {
      id: 1,
      title: 'Cardio HIIT pour brûler les graisses',
      description: 'Entraînement intense de 20 minutes pour maximiser la perte de poids',
      duration: '20 min',
      level: 'Intermédiaire',
      category: 'Cardio',
      thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    },
    {
      id: 2,
      title: 'Circuit training full body',
      description: 'Enchaînement d\'exercices pour brûler un maximum de calories',
      duration: '30 min',
      level: 'Débutant',
      category: 'Circuit',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    },
    {
      id: 3,
      title: 'Marche active et renforcement',
      description: 'Combinaison parfaite pour perdre du poids progressivement',
      duration: '25 min',
      level: 'Débutant',
      category: 'Cardio',
      thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    }
  ],
  gain_muscle: [
    {
      id: 4,
      title: 'Programme prise de masse - Pectoraux',
      description: 'Développez votre torse avec ces exercices ciblés',
      duration: '35 min',
      level: 'Intermédiaire',
      category: 'Force',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    },
    {
      id: 5,
      title: 'Entraînement jambes et fessiers',
      description: 'Construisez des jambes puissantes avec squats et fentes',
      duration: '40 min',
      level: 'Avancé',
      category: 'Force',
      thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    },
    {
      id: 6,
      title: 'Dos et biceps - Hypertrophie',
      description: 'Programme complet pour un dos large et des bras volumineux',
      duration: '45 min',
      level: 'Intermédiaire',
      category: 'Force',
      thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    }
  ],
  maintain: [
    {
      id: 7,
      title: 'Routine équilibrée corps complet',
      description: 'Maintenez votre forme avec cet entraînement complet',
      duration: '30 min',
      level: 'Intermédiaire',
      category: 'Maintenance',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    },
    {
      id: 8,
      title: 'Yoga et mobilité',
      description: 'Préservez votre souplesse et votre bien-être',
      duration: '25 min',
      level: 'Débutant',
      category: 'Mobilité',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    },
    {
      id: 9,
      title: 'Renforcement fonctionnel',
      description: 'Exercices pratiques pour le quotidien',
      duration: '20 min',
      level: 'Débutant',
      category: 'Fonctionnel',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
      videoUrl: 'https://www.youtube.com/watch?v=kVeUGPILNUI'
    }
  ]
}

const categories = [
  { id: 'all', label: 'Tous', value: null },
  { id: 'lose_weight', label: 'Perdre du poids', value: 'lose_weight' },
  { id: 'gain_muscle', label: 'Prendre du muscle', value: 'gain_muscle' },
  { id: 'maintain', label: 'Maintenir ma forme', value: 'maintain' }
]

// Fonction pour extraire l'ID YouTube de l'URL
const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split('v=')[1]?.split('&')[0]
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`
}

export default function ExercicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  // Filtrer les vidéos selon la catégorie sélectionnée
  const getFilteredVideos = () => {
    if (!selectedCategory) {
      return [
        ...videosByGoal.lose_weight,
        ...videosByGoal.gain_muscle,
        ...videosByGoal.maintain
      ]
    }
    return videosByGoal[selectedCategory as keyof typeof videosByGoal] || []
  }

  const filteredVideos = getFilteredVideos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Tutoriels exercices
        </h1>
        <p className="text-gray-600 text-center">
          Découvrez nos tutoriels pour maîtriser les exercices et atteindre vos objectifs
        </p>
      </div>

      {/* Filtres par catégorie */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de vidéos */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
            >
              {/* Thumbnail avec gradient overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30"></div>
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Badge catégorie */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-purple-600">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {video.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{video.duration}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    video.level === 'Débutant' 
                      ? 'bg-green-100 text-green-700'
                      : video.level === 'Intermédiaire'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {video.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message si aucune vidéo */}
      {filteredVideos.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-gray-500 text-lg">
            Aucune vidéo disponible pour cette catégorie
          </p>
        </div>
      )}

      {/* MODALE VIDÉO */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modale */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedVideo.title}
                </h2>
                <p className="text-purple-100">
                  {selectedVideo.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="ml-4 p-2 hover:bg-white/20 rounded-full transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Vidéo YouTube */}
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer modale */}
            <div className="p-6 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{selectedVideo.duration}</span>
                </div>
                <span className={`px-4 py-2 rounded-full font-medium ${
                  selectedVideo.level === 'Débutant' 
                    ? 'bg-green-100 text-green-700'
                    : selectedVideo.level === 'Intermédiaire'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {selectedVideo.level}
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
                  {selectedVideo.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}