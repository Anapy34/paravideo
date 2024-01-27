// pvideo.js

const albums = [
    {
        name: 'Album 1',
        cover: 'https://img.youtube.com/vi/QnCs2nsZGRk/mqdefault.jpg',
        videos: [
            'https://www.youtube.com/embed/QnCs2nsZGRk',
            'https://www.youtube.com/embed/gMcbiuNYnQY'
        ]
    },
    {
        name: 'Album 2',
        cover: 'https://i.vimeocdn.com/video/747831242-883562d229153aaf8eabe591d991419b6af862c5105fd83ab44329403214fd96-d?mw=700&mh=394',
        videos: [
            'https://player.vimeo.com/video/307791576',
            'https://player.vimeo.com/video/384878999'
        ]
    },
    // Adicione mais álbuns, se necessário
];

function getVideoThumbnail(videoUrl) {
    // Implemente a lógica para obter a miniatura do vídeo
    // Similar à sua implementação anterior
}

function getVimeoVideoId(videoUrl) {
    // Implemente a lógica para obter o ID do vídeo do Vimeo
    // Similar à sua implementação anterior
}

function getYouTubeVideoId(videoUrl) {
    // Implemente a lógica para obter o ID do vídeo do YouTube
    // Similar à sua implementação anterior
}

export { albums, getVideoThumbnail, getVimeoVideoId, getYouTubeVideoId };
